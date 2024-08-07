import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { usePDF } from 'react-to-pdf';
import IconPencilPaper from '../../components/Icon/IconPencilPaper';
import IconMapPin from '../../components/Icon/IconMapPin';
import IconMail from '../../components/Icon/IconMail';
import { ApiCall } from '../../Services/Api';
import { editProfileUrl, updateBankDetailsurl, updateNomineeDetailsurl } from '../../utils/EndPoints';
import IconCashBanknotes from '../../components/Icon/IconCashBanknotes';
import IconBox from '../../components/Icon/IconBox';
import IconPencil from '../../components/Icon/IconPencil';
import IconPhoneCall from '../../components/Icon/IconPhoneCall';
import { userProfileApi } from '../../store/UserSlice';
import IconUser from '../../components/Icon/IconUser';
import IconNotes from '../../components/Icon/IconNotes';
import IconCode from '../../components/Icon/IconCode';
import IconCreditCard from '../../components/Icon/IconCreditCard';
import IconAward from '../../components/Icon/IconAward';
import Certificate from '../Components/certificate';
import Invoice from '../Components/invoice';
import { formatDate, formatDateforProfileEdit } from '../../utils/FormateDate';
import IconCalendar from '../../components/Icon/IconCalendar';

const Profile = () => {
    const [editProfleData, setEditProfileData] = useState({
        name: '',
        address: '',
        phone: '',
        dateOfBirth:'',
        email: '',
        password: '',
    });
    
    const [bankDetails, setBankDetails] = useState({
        holderName: '',
        accountNum: '',
        bankName: '',
        ifscCode: '',
    });

    const [nomineeDetail, setNomineeDetails] = useState({
        name: '',
        phone: '',
        address: '',
        bankName: '',
        ifscCode: '',
        accountNum: '',
        aadhaarNum: '',
        pancardNum: '',
    });
    const [editUserModal, setEditUserModal] = useState(false);
    const [updateBankModal, setUpdateBankModal] = useState(false);
    const [updateNomineeModal, setUpdateNomineeModal] = useState(false);
    const [confirmPassword, setConfirmPasswod] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);
    const [userView, setUserView] = useState(false);

    const { user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const { toPDF, targetRef } = usePDF({ filename: `${user.name}-invoiceSlip` });

    useEffect(() => {
        const userPackageType = sessionStorage.getItem('packageType');
        dispatch(userProfileApi());
        setBankDetails(user?.bankDetails);
        setEditProfileData(user);
        setNomineeDetails(user?.nomineeDetails);
        if (userPackageType === 'Franchise') {
            setUserView(true);
        }
    }, []);

    useEffect(() => {
        setBankDetails(user?.bankDetails);
        setNomineeDetails(user?.nomineeDetails);
        setEditProfileData(user);
    }, [user]);

    useEffect(() => {
        if (confirmPassword === editProfleData.password) {
            setErrorMessage(false);
        } else {
            setErrorMessage(true);
        }
    }, [confirmPassword]);

    const generatePdf = async () => {
        try {
            if (targetRef.current) {
                await toPDF(targetRef.current);
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    // ---------- Edit profile --------------
    const editProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editProfleData.password === confirmPassword) {
        } else {
            setErrorMessage(true);
        }
        if (editProfleData.name || editProfleData.address || editProfleData.phone ||editProfleData.dateOfBirth || editProfleData.email || editProfleData.password) {
            try {
                const response = await ApiCall('post', editProfileUrl, editProfleData);

                if (response instanceof Error) {
                    console.error('Error fetching state list:', response.message);
                } else if (response.status === 200) {
                    // setProfileDetails(response?.data);
                    dispatch(userProfileApi());
                    setEditUserModal(false);
                    setEditProfileData({
                        name: '',
                        address: '',
                        phone: '',
                        dateOfBirth: '',
                        email: '',
                        password: '',
                    });
                    setConfirmPasswod('');
                } else {
                    console.error('Error fetching state list. Unexpected status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching state list:', error);
            }
        } else {
            console.log('please enter profile details');
        }
    };

    // ----------update the bank details ----------------

    const handleBankDetails = async (e: React.FormEvent) => {
        e.preventDefault();
        if (bankDetails.holderName || bankDetails.accountNum || bankDetails.bankName || bankDetails.ifscCode) {
            try {
                const response = await ApiCall('post', updateBankDetailsurl, bankDetails);

                if (response instanceof Error) {
                    console.error('Error fetching state list:', response.message);
                } else if (response.status === 200) {
                    setBankDetails(response?.data);
                    setUpdateBankModal(false);
                    dispatch(userProfileApi());
                    setBankDetails({
                        holderName: '',
                        accountNum: '',
                        bankName: '',
                        ifscCode: '',
                    });
                } else {
                    console.error('Error fetching state list. Unexpected status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching state list:', error);
            }
        } else {
            console.log('please enter bank details');
        }
    };
    // ----------update Nominee details ----------------

    const handleNomineeDetails = async (e: React.FormEvent) => {
        e.preventDefault();
        if (
            nomineeDetail.name ||
            nomineeDetail.phone ||
            nomineeDetail.address ||
            nomineeDetail.bankName ||
            nomineeDetail.ifscCode ||
            nomineeDetail.accountNum ||
            nomineeDetail.aadhaarNum ||
            nomineeDetail.pancardNum
        ) {
            try {
                const response = await ApiCall('post', updateNomineeDetailsurl, nomineeDetail);

                if (response instanceof Error) {
                    console.error('Error fetching state list:', response.message);
                } else if (response.status === 200) {
                    setNomineeDetails(response?.data);
                    setUpdateNomineeModal(false);
                    dispatch(userProfileApi());
                    setNomineeDetails({
                        name: '',
                        phone: '',
                        address: '',
                        bankName: '',
                        ifscCode: '',
                        accountNum: '',
                        aadhaarNum: '',
                        pancardNum: '',
                    });
                } else {
                    console.error('Error fetching state list. Unexpected status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching state list:', error);
            }
        } else {
            console.log('please enter bank details');
        }
    };
    // ---------------------------------

    
    const today = new Date().toISOString().split('T')[0];

    return (
        <>
            <div>
                <div className="pt-5">
                    {userView && (
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
                            <div className="panel lg:h-[120px] sm:h-auto flex gap-4  items-center justify-center bg-[#DDE4EB] text-white ">
                                <div className="flex h-full justify-between items-center  dark:text-white-light">
                                    <IconCashBanknotes className="w-10 h-10 text-warning" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-[25px] font-semibold text-primary">₹{user?.directIncome}</h1>
                                    <h5 className="font-semibold text-md text-primary">Direct Income</h5>
                                </div>
                            </div>
                            <div className="panel lg:h-[120px] sm:h-auto flex gap-4  items-center justify-center bg-[#DDE4EB] text-white">
                                <div className="flex h-full justify-between items-center  dark:text-white-light">
                                    <IconCashBanknotes className="w-10 h-10 text-warning" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-[25px] font-semibold text-primary">₹{user?.inDirectIncome}</h1>
                                    <h5 className="font-semibold text-md text-primary">InDirect Income</h5>
                                </div>
                            </div>

                            <div className="panel lg:h-[120px]  sm:h-auto flex gap-4  items-center justify-center bg-[#DDE4EB] text-white">
                                <div className="flex h-full justify-between items-center  dark:text-white-light">
                                    <IconCashBanknotes className="w-10 h-10 text-warning" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-[25px] font-semibold text-primary">₹{user?.totalLevelIncome}</h1>
                                    <h5 className="font-semibold text-md text-primary">Level Income</h5>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5"> */}
                    <div className="flex flex-wrap justify-between">
                        <div className="panel mb-5 bg-primary w-full px-10">
                            <div className="flex items-center justify-between">
                                <h5 className="font-semibold text-warning text-lg dark:text-white-light">Profile</h5>
                                <div onClick={() => setEditUserModal(true)} className="ltr:ml-auto rtl:mr-auto btn btn-primary p-2 rounded-full cursor-pointer">
                                    <IconPencilPaper />
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="flex flex-col justify-center items-center py-2">
                                    <img src="/assets/images/userProfile.jpg" alt="img" className="w-24 h-24 rounded-full object-cover mb-5" />
                                    <p className="font-semibold text-white text-xl">{user?.name}</p>
                                    <p className={user?.userStatus === 'approved' ? 'text-warning' : 'text-warning'}>{user?.userStatus}</p>
                                </div>
                                <div className="mt-5 flex m-auto space-y-4 flex-wrap  text-white gap-10 font-semibold text-base">
                                    <ul className="mt-5 sm:m-auto space-y-4 max-w-[300px] ">
                                        <li className="flex items-center gap-3">
                                            <IconMail className="w-5 h-5 shrink-0" fill />
                                            Email : {user?.email}
                                        </li>
                                        <li className="flex items-center gap-2 ">
                                            <IconPhoneCall fill />
                                            Phone : {user?.phone}
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <IconMapPin className="shrink-0" fill />
                                            Address : {user?.address}
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <IconCalendar className="shrink-0" fill />
                                            Date of birth: {formatDate(user?.dateOfBirth)}
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <IconBox className="shrink-0" />
                                            User Id : {user?.ownSponserId}
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <IconCashBanknotes className="shrink-0" fill />
                                            Package Amount : {user?.actualPackageAmount || user?.tempPackageAmount}
                                        </li>
                                    </ul>
                                    <ul className="mt-5 sm:m-auto space-y-4 ">
                                        {userView && (
                                            <li className="flex items-center gap-3">
                                                <IconCashBanknotes className="shrink-0" fill />
                                                Wallet Amount : {user?.walletAmount}
                                            </li>
                                        )}
                                        <li className="flex items-center gap-3">
                                            <IconAward className="shrink-0" fill />
                                            Points: {user?.points}
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <IconBox className="shrink-0" />
                                            Package Type : {user?.packageType}
                                        </li>
                                        {userView ? (
                                            <>
                                                <li className="flex items-center gap-3">
                                                    <IconPencil className="shrink-0" fill />
                                                    Franchise Type : {user?.franchise}
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <IconPencil className="shrink-0" fill />
                                                    Franchise Name : {user?.franchiseName}
                                                </li>
                                            </>
                                        ) : (
                                            <li className="flex items-center gap-3">
                                                <IconPencil className="shrink-0" fill />
                                                Package Name : {user?.franchise}
                                            </li>
                                        )}

                                        <li className="flex items-center gap-3">
                                            <IconAward className="shrink-0" fill />
                                            Pool Rank: {user?.pool}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {userView && (
                            <div className="panel mb-5 p-5 bg-[#DDE4EB]  w-full">
                                <div className="flex mb-5 ">
                                    <h5 className="font-semibold text-primary text-lg dark:text-white-light">Bank Details</h5>
                                    <div onClick={() => setUpdateBankModal(true)} className="ltr:ml-auto rtl:mr-auto btn btn-primary p-2 rounded-full cursor-pointer">
                                        <IconPencilPaper />
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <ul className="mt-5  space-y-4 text-primary font-semibold text-base">
                                        <li>
                                            <div className="flex items-center gap-3 ">
                                                <IconUser className="w-5 h-5 shrink-0" fill />
                                                Account Holder Name : {user?.bankDetails?.holderName}
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex items-center gap-3">
                                                <IconNotes className="w-5 h-5 shrink-0" fill />
                                                Bank Name : {user?.bankDetails?.bankName}
                                            </div>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <IconPencilPaper fill />
                                            Account Number : {user?.bankDetails?.accountNum}
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <IconCode className="shrink-0" fill />
                                            IFSC code : {user?.bankDetails?.ifscCode}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {userView && (
                <div className="bg-primary w-full p-5">
                    <div className="flex mb-5 ">
                        <h5 className="font-semibold text-warning text-lg dark:text-white-light">Nominee Details</h5>
                        <div onClick={() => setUpdateNomineeModal(true)} className="ltr:ml-auto rtl:mr-auto btn btn-primary p-2 rounded-full cursor-pointer">
                            <IconPencilPaper />
                        </div>
                    </div>
                    <ul className="mt-5 m-auto space-y-4 text-white font-semibold text-base">
                        <li>
                            <div className="flex items-center gap-3">
                                <IconUser className="w-5 h-5 shrink-0" fill />
                                Name : {user?.nomineeDetails?.name}
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center gap-3">
                                <IconPhoneCall fill />
                                Phone : {user?.nomineeDetails?.phone}
                            </div>
                        </li>
                        <li className="flex items-center gap-3">
                            <IconPencilPaper fill />
                            Address : {user?.nomineeDetails?.address}
                        </li>
                        <li className="flex items-center gap-3">
                            <IconNotes className="w-5 h-5 shrink-0" fill />
                            Bank Name : {user?.nomineeDetails?.bankName}
                        </li>
                        <li className="flex items-center gap-3">
                            <IconPencilPaper fill />
                            Account Number : {user?.nomineeDetails?.accountNum}
                        </li>
                        <li className="flex items-center gap-3">
                            <IconCode className="shrink-0" fill />
                            IFSC Code : {user?.nomineeDetails?.ifscCode}
                        </li>
                        <li className="flex items-center gap-3">
                            <IconCreditCard className="shrink-0" fill />
                            Aadhaar Number : {user?.nomineeDetails?.aadhaarNum}
                        </li>
                        <li className="flex items-center gap-3">
                            <IconCreditCard className="shrink-0" fill />
                            Pancard Number : {user?.nomineeDetails?.pancardNum}
                        </li>
                    </ul>
                </div>
            )}
            <div className="mt-5">
                {/* <button className='ml-auto bg-primary text-warning p-2 rounded-md m-2'  onClick={generatePdf}>download Certificate</button> */}
                <div ref={targetRef}>
                    <Certificate userDetails={user} />
                </div>
            </div>
            <div className="mt-5">
                <div>
                    <Invoice userDetails={user} />
                </div>
            </div>
            {/* edit user profile modal */}
            <div>
                <Transition appear show={editUserModal} as={Fragment}>
                    <Dialog
                        as="div"
                        open={editUserModal}
                        onClose={() => {
                            setEditUserModal(false);
                        }}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div id="register_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                            <div className="flex items-start justify-center min-h-screen px-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="panel border-0 py-1 px-4 rounded-lg overflow-hidden w-full max-w-[500px] my-8 text-black dark:text-white-dark">
                                        <div className="flex items-center justify-between p-5 font-semibold text-lg dark:text-white">
                                            <h5 className="text-warning">Update Profile</h5>
                                            <button type="button" onClick={() => setEditUserModal(false)} className="text-white-dark hover:text-dark text-[28px] p-2">
                                                ×
                                            </button>
                                        </div>
                                        <div className="p-5">
                                            <form onSubmit={editProfile} className="  rounded-md p-4 mb-5 bg-white dark:bg-black w-full  md:max-w-[486px] ">
                                                <div className="flex flex-col  gap-2">
                                                    <div className="">
                                                        <label htmlFor="name">Full Name</label>
                                                        <input
                                                            onChange={(e) => setEditProfileData({ ...editProfleData, name: e.target.value })}
                                                            id="name"
                                                            type="text"
                                                            value={editProfleData?.name}
                                                            placeholder="Enter your name"
                                                            className="form-input"
                                                        />
                                                    </div>

                                                    <div className="">
                                                        <label htmlFor="address">Address</label>
                                                        <input
                                                            onChange={(e) => setEditProfileData({ ...editProfleData, address: e.target.value })}
                                                            id="address"
                                                            value={editProfleData?.address}
                                                            type="text"
                                                            placeholder="Address"
                                                            className="form-input"
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <label htmlFor="email">Phone</label>
                                                        <input
                                                            onChange={(e) => setEditProfileData({ ...editProfleData, phone: e.target.value })}
                                                            id="phone"
                                                            value={editProfleData?.phone}
                                                            type="number"
                                                            placeholder="phone"
                                                            className="form-input"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="Email">Date Of Birth</label>
                                                        <div className="relative text-white-dark">
                                                            <input
                                                                onChange={(e) => setEditProfileData({ ...editProfleData, dateOfBirth: e.target.value })}
                                                                id="dateOfBirth"
                                                                type="date"
                                                                value={formatDateforProfileEdit(editProfleData?.dateOfBirth)}
                                                                required
                                                                max={today}
                                                                className="form-input ps-10 placeholder:text-white-dark"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <label htmlFor="newPassword">New Password</label>
                                                        <input
                                                            onChange={(e) => setEditProfileData({ ...editProfleData, password: e.target.value })}
                                                            id="newPassword"
                                                            type="text"
                                                            value={editProfleData?.password}
                                                            placeholder="Enter new password"
                                                            className="form-input"
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                                        <input
                                                            onChange={(e) => setConfirmPasswod(e.target.value)}
                                                            id="confirmPassword"
                                                            type="text"
                                                            value={confirmPassword}
                                                            placeholder="Enter confirm Password"
                                                            className="form-input"
                                                        />
                                                    </div>
                                                    {errorMessage && <p className="text-red-600">Passwords do not match.</p>}
                                                    <div className="sm:col-span-2 mt-3">
                                                        <button type="submit" className="btn btn-primary border-none">
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
            {/* edit user profile end */}
            {/* update bank details */}
            <div>
                <Transition appear show={updateBankModal} as={Fragment}>
                    <Dialog
                        as="div"
                        open={updateBankModal}
                        onClose={() => {
                            setUpdateBankModal(false);
                        }}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div id="register_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                            <div className="flex items-start justify-center min-h-screen px-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="panel border-0 py-1 px-4 rounded-lg overflow-hidden w-full max-w-[500px] my-8 text-black dark:text-white-dark">
                                        <div className="flex items-center justify-between p-5 font-semibold text-lg dark:text-white">
                                            <h5 className="text-warning">Update Bank Details</h5>
                                            <button type="button" onClick={() => setUpdateBankModal(false)} className="text-white-dark hover:text-dark text-[28px] p-2">
                                                ×
                                            </button>
                                        </div>
                                        <div className="p-5">
                                            <form onSubmit={handleBankDetails} className=" dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black w-full  md:max-w-[486px]">
                                                <div className="flex flex-col">
                                                    <div className="flex flex-col gap-5">
                                                        <div className="mr-2">
                                                            <label htmlFor="bankname">Bank Name</label>
                                                            <input
                                                                onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                                                                id="bankname"
                                                                type="text"
                                                                value={bankDetails?.bankName}
                                                                placeholder="Enter bank name"
                                                                className="form-input"
                                                            />
                                                        </div>
                                                        <div className="mr-2">
                                                            <label htmlFor="holderName">Account holder name</label>
                                                            <input
                                                                onChange={(e) => setBankDetails({ ...bankDetails, holderName: e.target.value })}
                                                                id="holderName"
                                                                type="text"
                                                                value={bankDetails?.holderName}
                                                                placeholder="Enter holder name"
                                                                className="form-input"
                                                            />
                                                        </div>

                                                        <div className="mr-2">
                                                            <label htmlFor="ACNumber">Account Number</label>
                                                            <input
                                                                onChange={(e) => setBankDetails({ ...bankDetails, accountNum: e.target.value })}
                                                                id="ACNumber"
                                                                value={bankDetails?.accountNum}
                                                                type="text"
                                                                placeholder="Account number"
                                                                className="form-input"
                                                            />
                                                        </div>
                                                        <div className="mr-2">
                                                            <label htmlFor="ifsc">IFSC code</label>
                                                            <input
                                                                onChange={(e) => setBankDetails({ ...bankDetails, ifscCode: e.target.value })}
                                                                id="ifsc"
                                                                value={bankDetails?.ifscCode}
                                                                type="text"
                                                                placeholder="Enter IfscCode"
                                                                className="form-input"
                                                            />
                                                        </div>

                                                        <div className="sm:col-span-2 mt-3">
                                                            <button type="submit" className="btn btn-primary border-none">
                                                                Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
            {/* update nominee details */}
            <div>
                <Transition appear show={updateNomineeModal} as={Fragment}>
                    <Dialog
                        as="div"
                        open={updateNomineeModal}
                        onClose={() => {
                            setUpdateNomineeModal(false);
                        }}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div id="register_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                            <div className="flex items-start justify-center min-h-screen px-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="panel border-0 py-1 px-4 rounded-lg overflow-hidden w-full max-w-[500px] my-8 text-black dark:text-white-dark">
                                        <div className="flex items-center justify-between p-5 font-semibold text-lg dark:text-white">
                                            <h5 className="text-warning">Update Nominee Details</h5>
                                            <button type="button" onClick={() => setUpdateNomineeModal(false)} className="text-white-dark hover:text-dark text-[28px] p-2">
                                                ×
                                            </button>
                                        </div>
                                        <div className="p-5">
                                            <form onSubmit={handleNomineeDetails} className=" dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black w-full  md:max-w-[486px]">
                                                <div className="flex flex-col">
                                                    <div className="flex flex-col gap-5">
                                                        <div className="mr-2">
                                                            <label htmlFor="nomineeName">Name</label>
                                                            <input
                                                                onChange={(e) => setNomineeDetails({ ...nomineeDetail, name: e.target.value })}
                                                                id="nomineeName"
                                                                type="text"
                                                                value={nomineeDetail?.name}
                                                                placeholder="Enter name"
                                                                className="form-input"
                                                            />
                                                        </div>
                                                        <div className="mr-2">
                                                            <label htmlFor="Phone">Phone</label>
                                                            <input
                                                                onChange={(e) => setNomineeDetails({ ...nomineeDetail, phone: e.target.value })}
                                                                id="Phone"
                                                                type="text"
                                                                value={nomineeDetail?.phone}
                                                                placeholder="Enter Phone"
                                                                className="form-input"
                                                            />
                                                        </div>
                                                        <div className="mr-2">
                                                            <label htmlFor="bankName">Bank Name</label>
                                                            <input
                                                                onChange={(e) => setNomineeDetails({ ...nomineeDetail, bankName: e.target.value })}
                                                                id="bankName"
                                                                type="text"
                                                                value={nomineeDetail?.bankName}
                                                                placeholder="Enter Bank Name"
                                                                className="form-input"
                                                            />
                                                        </div>

                                                        <div className="mr-2">
                                                            <label htmlFor="ACNumber">Account Number</label>
                                                            <input
                                                                onChange={(e) => setNomineeDetails({ ...nomineeDetail, accountNum: e.target.value })}
                                                                id="ACNumber"
                                                                value={nomineeDetail?.accountNum}
                                                                type="text"
                                                                placeholder="Account number"
                                                                className="form-input"
                                                            />
                                                        </div>
                                                        <div className="mr-2">
                                                            <label htmlFor="ifsc">IFSC code</label>
                                                            <input
                                                                onChange={(e) => setNomineeDetails({ ...nomineeDetail, ifscCode: e.target.value })}
                                                                id="ifsc"
                                                                value={nomineeDetail?.ifscCode}
                                                                type="text"
                                                                placeholder="Enter IfscCode"
                                                                className="form-input"
                                                            />
                                                        </div>
                                                        <div className="mr-2">
                                                            <label htmlFor="address">Address</label>
                                                            <input
                                                                onChange={(e) => setNomineeDetails({ ...nomineeDetail, address: e.target.value })}
                                                                id="address"
                                                                value={nomineeDetail?.address}
                                                                type="text"
                                                                placeholder="Enter Address"
                                                                className="form-input"
                                                            />
                                                        </div>
                                                        <div className="mr-2">
                                                            <label htmlFor="aadhaarNum">Aadhaar Number</label>
                                                            <input
                                                                onChange={(e) => setNomineeDetails({ ...nomineeDetail, aadhaarNum: e.target.value })}
                                                                id="address"
                                                                value={nomineeDetail?.aadhaarNum}
                                                                type="text"
                                                                placeholder="Enter Aadhaar Number"
                                                                className="form-input"
                                                            />
                                                        </div>
                                                        <div className="mr-2">
                                                            <label htmlFor="pancardNum">PanCard Number</label>
                                                            <input
                                                                onChange={(e) => setNomineeDetails({ ...nomineeDetail, pancardNum: e.target.value })}
                                                                id="address"
                                                                value={nomineeDetail?.pancardNum}
                                                                type="text"
                                                                placeholder="Enter Pancard Number"
                                                                className="form-input"
                                                            />
                                                        </div>

                                                        <div className="sm:col-span-2 mt-3">
                                                            <button type="submit" className="btn btn-primary border-none">
                                                                Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    );
};

export default Profile;
