import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import Dropdown from '../../components/Dropdown';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import IconPencilPaper from '../../components/Icon/IconPencilPaper';
import IconCoffee from '../../components/Icon/IconCoffee';
import IconCalendar from '../../components/Icon/IconCalendar';
import IconMapPin from '../../components/Icon/IconMapPin';
import IconMail from '../../components/Icon/IconMail';
import IconPhone from '../../components/Icon/IconPhone';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconDribbble from '../../components/Icon/IconDribbble';
import IconGithub from '../../components/Icon/IconGithub';
import IconShoppingBag from '../../components/Icon/IconShoppingBag';
import IconTag from '../../components/Icon/IconTag';
import IconCreditCard from '../../components/Icon/IconCreditCard';
import IconClock from '../../components/Icon/IconClock';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
import { ApiCall } from '../../Services/Api';
import { editProfileUrl, getProfileUrl, updateBankDetailsurl } from '../../utils/EndPoints';
import IconCashBanknotes from '../../components/Icon/IconCashBanknotes';
import IconBox from '../../components/Icon/IconBox';
import IconPencil from '../../components/Icon/IconPencil';
import IconPhoneCall from '../../components/Icon/IconPhoneCall';
interface ProfileDetails {
    name: string;
    address: string;
    phone: string;
    email: string;
    franchise: string;
    franchiseN: string;
    userStatus: string;
    walletAmount: string;
}

const Profile = () => {
    const [profielDetails, setProfileDetails] = useState<ProfileDetails>({
        name: '',
        address: '',
        phone: '',
        email: '',
        franchise: '',
        franchiseN: '',
        userStatus: '',
        walletAmount: '',
    });
    const [editProfleData, setEditProfileData] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        password: '',
    });
    const [bankDetails, setBankDetails] = useState({
        accountNumber: '',
        bankName: '',
        ifscCode: '',
    });

    const [confirmPassword, setConfirmPasswod] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Profile'));
        getProfile();
    }, []);
    useEffect(() => {
        if (confirmPassword === editProfleData.password) {
            setErrorMessage(false);
        } else {
            setErrorMessage(true);
        }
    }, [confirmPassword]);

    //----------Get user profile -----------

    const getProfile = async () => {
        try {
            const response = await ApiCall('get', getProfileUrl);
            console.log(response);

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setProfileDetails(response?.data);
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };
    //--------------------------------

    // ---------- Edit profile --------------
    const editProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editProfleData.password === confirmPassword) {
        } else {
            setErrorMessage(true);
        }
        try {
            const response = await ApiCall('post', editProfileUrl, editProfleData);
            console.log(response);

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setProfileDetails(response?.data);
                getProfile();
                setEditProfileData({
                    name: '',
                    address: '',
                    phone: '',
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
    };

    const handleBankDetails = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await ApiCall('post', updateBankDetailsurl, bankDetails);
            console.log(response);

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setBankDetails(response?.data);
                getProfile();
                setBankDetails({
                    accountNumber: '',
                    bankName: '',
                    ifscCode: '',
                });
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Users
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Profile</span>
                </li>
            </ul>
            <div className="pt-5">
                {/* <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5"> */}
                <div className="flex flex-wrap justify-evenly">
                    <div className="panel mb-5 ">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-warning text-lg dark:text-white-light">Profile</h5>
                            {/* <Link to="/users/user-account-settings" className="ltr:ml-auto rtl:mr-auto btn btn-primary p-2 rounded-full">
                                <IconPencilPaper />
                            </Link> */}
                        </div>
                        <div className="mb-5">
                            <div className="flex flex-col justify-center items-center">
                                <img src="/assets/images/userProfile.jpg" alt="img" className="w-24 h-24 rounded-full object-cover mb-5" />
                                <p className="font-semibold text-primary text-xl">{profielDetails.name}</p>
                                <p className={profielDetails.userStatus === 'approved' ? 'text-green-500' : 'text-warning'}>{profielDetails.userStatus}</p>
                            </div>
                            <div className="mt-5 flex m-auto space-y-4 flex-wrap text-md font-semibold text-white-dark gap-5">
                                <ul className="mt-5 m-auto space-y-4 max-w-[280px]">
                                    <li>
                                        <button className="flex items-center gap-2">
                                            <IconMail className="w-5 h-5 shrink-0" fill />
                                            <span className="text-primary truncate">Email : {profielDetails.email}</span>
                                        </button>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <IconPhoneCall fill />
                                        Phone : {profielDetails.phone}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <IconMapPin className="shrink-0" fill />
                                        Address : {profielDetails.address}
                                    </li>
                                </ul>
                                <ul className="mt-5 m-auto space-y-4">
                                    <li className="flex items-center gap-2">
                                        <IconCashBanknotes className="shrink-0" fill />
                                        walletAmount : {profielDetails.walletAmount}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <IconBox className="shrink-0" />
                                        Franchise Type : {profielDetails.franchise}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <IconPencil className="shrink-0" fill />
                                        Franchise Name : {profielDetails.franchise}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={editProfile} className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black ">
                        <h6 className="text-lg text-warning font-bold mb-5">Edit Details</h6>
                        <div className="flex flex-col sm:flex-row">
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="mr-2">
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        onChange={(e) => setEditProfileData({ ...editProfleData, name: e.target.value })}
                                        id="name"
                                        type="text"
                                        value={editProfleData.name}
                                        placeholder="Enter your name"
                                        className="form-input"
                                    />
                                </div>

                                <div className="mr-2">
                                    <label htmlFor="address">Address</label>
                                    <input
                                        onChange={(e) => setEditProfileData({ ...editProfleData, address: e.target.value })}
                                        id="address"
                                        value={editProfleData.address}
                                        type="text"
                                        placeholder="Address"
                                        className="form-input"
                                    />
                                </div>
                                <div className="mr-2">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        onChange={(e) => setEditProfileData({ ...editProfleData, email: e.target.value })}
                                        id="email"
                                        value={editProfleData.email}
                                        type="email"
                                        placeholder="Email"
                                        className="form-input"
                                    />
                                </div>
                                <div className="mr-2">
                                    <label htmlFor="newPassword">New Password</label>
                                    <input
                                        onChange={(e) => setEditProfileData({ ...editProfleData, password: e.target.value })}
                                        id="newPassword"
                                        type="text"
                                        value={editProfleData.password}
                                        placeholder="Enter new password"
                                        className="form-input"
                                    />
                                </div>
                                <div className="mr-2">
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
                        </div>
                    </form>
                    <div className="panel mb-5 p-5 max-w-[486px] w-full">
                        <div className="flex mb-5 ">
                            <h5 className="font-semibold text-warning text-lg dark:text-white-light">Bank Details</h5>
                        </div>
                        <div className="mb-5">
                            <div className="mt-5 flex m-auto space-y-4 flex-wrap text-md font-semibold text-white-dark gap-5">
                                <ul className="mt-5 m-auto space-y-4 max-w-[280px]">
                                    <li>
                                        <button className="flex items-center gap-2">
                                            <IconMail className="w-5 h-5 shrink-0" fill />
                                            <span className="text-primary truncate">Bank Name : Federal bank </span>
                                        </button>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <IconPhoneCall fill />
                                        Account Number : 7652345678987654
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <IconMapPin className="shrink-0" fill />
                                        IFSC code : FDL876rtyertyui
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleBankDetails} className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black ">
                        <h6 className="text-lg text-warning font-bold mb-5">Update Bank Details</h6>
                        <div className="flex flex-col sm:flex-row">
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="mr-2">
                                    <label htmlFor="bankname">Bank Name</label>
                                    <input
                                        onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                                        id="bankname"
                                        type="text"
                                        value={editProfleData.name}
                                        placeholder="Enter bank name"
                                        className="form-input"
                                    />
                                </div>

                                <div className="mr-2">
                                    <label htmlFor="ACNumber">Account Number</label>
                                    <input
                                        onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                                        id="ACNumber"
                                        value={bankDetails.accountNumber}
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
                                        value={editProfleData.email}
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
            </div>
        </div>
    );
};

export default Profile;
