import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { ApiCall, Base_url } from '../Services/Api';
import { useAppDispatch, useAppSelector } from '../store';
import { convertedPackagesUrl, getAddOnUrl, renewalHistoryUrl, renewalPackageUrl, renewalUrl } from '../utils/EndPoints';
import { userProfileApi } from '../store/UserSlice';
import { Show_Toast } from './Components/Toast';

const Subscriptions = () => {
    const [subscriptionModal, setSubscriptionModal] = useState(false);
    const [verificationModal, setVerificationModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    // const [transactionNumber, setTransacrionNumber] = useState('');
    const [showSelectDocumentMessage, setShowSelectDocumentMessage] = useState(false);
    const [addOn, setAddOn] = useState([]);
    const [convetPackages, setConvetPackages] = useState([]);
    const [renewalPackage, setRenewalPackage] = useState([]);
    const [renewalHistory, setRenewalHistory] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState({
        action:'',
        package: '',
        amount: '',
    });
    const [loading, setLoading] = useState(false);

    const { user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userProfileApi());
        getRenewalHistory()
        getAddOn();
        if (user?.packageType !== 'Franchise') {
            getConvetPackage();
        }
        getRenewalPackage();
    }, []);

    const handleUpload = async () => {
        if (selectedFile) {
            try {
                setLoading(true); // Set loading to true when form submission begins
                const token: any = sessionStorage.getItem('User');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'content-type': 'multipart/form-data',
                    },
                };
                const formData = new FormData();
                // formData.append('transactionNumber', transactionNumber);
                formData.append('screenshot', selectedFile, selectedFile?.name);
                formData.append('reqPackage', selectedPackage?.package );
                formData.append('amount', selectedPackage?.amount);
                formData.append('action', selectedPackage?.action);

                const response = await axios.post(`${Base_url}${renewalUrl}`, formData, config);
                setSelectedFile(null);
                sessionStorage.setItem('status', response?.data?.updatedUser?.userStatus);
                setSubscriptionModal(false);
                setVerificationModal(false)
                setShowSelectDocumentMessage(false);
                Show_Toast({ message: 'subscription succcess', type: true });
            } catch (error) {
                console.error('Upload failed:', error);
            } finally {
                setLoading(false); // Set loading to false when form submission completes (success or failure)
            }
        } else {
            setShowSelectDocumentMessage(true);
        }
    };
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedFile(file || null);
    };

    // get add one
    const getAddOn = async () => {
        try {
            const response = await ApiCall('get', getAddOnUrl);
            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setAddOn(response?.data?.addOns);
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };

    // get convert packages

    const getRenewalHistory = async () => {
        try {
            const response = await ApiCall('get', renewalHistoryUrl);
            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setRenewalHistory(response?.data?.subscriptionHistory);
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };
    // get convert packages

    const getConvetPackage = async () => {
        try {
            const response = await ApiCall('get', convertedPackagesUrl);

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setConvetPackages(response?.data?.anotherPackages);
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };
    // get convert packages

    const getRenewalPackage = async () => {
        try {
            const response = await ApiCall('get', renewalPackageUrl);
            console.log(response, 'renewalPackageUrl');

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                console.log(response);
                
                setRenewalPackage(response?.data?.renewPackages);
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };
    const handleverificationModal = (pkg: any,action:string) => {
        setVerificationModal(true);
        setSelectedPackage({ ...selectedPackage, package: pkg?.packageName, amount: pkg?.packageAmount, action:action });
    };
    return (
        <>
            <div>
                <div className="panel min-h-[200px] max-w-md sm:h-auto flex  rounded-[14px] justify-between bg-primary text-white relative">
                    <div className="flex flex-col gap-5 z-10">
                        <div className=" dark:text-white-light">
                            <h5 className=" text-md ">
                                <span className="text-4xl font-bold">{user?.daysUntilRenewal}</span> day left
                            </h5>
                        </div>
                        <p className="text-left sm:text-left max-w-[230px]">Your monthly subscription plan has 10 days to renew Subscription is 0 Please upload the screenshot</p>
                        <button onClick={() => setSubscriptionModal(true)} type="button" className="text-primary  bg-warning z-10 font-bold rounded-lg border-warning p-2 mr-auto border ">
                            Subscription Package
                        </button>
                    </div>
                    <img className="absolute right-0 top-0 h-[95%] z-0" src="/assets/images/subscription.png" alt="" />
                </div>

                <div className="mt-4 flex flex-col gap-2 ">
                    <h1 className="text-xl font-semibold mt-5">Renewal History</h1>
                    <div className="w-full h-[1.8px] bg-warning mb-2"></div>
                    {renewalHistory?.map((history: any) => (
                        <div className="w-full flex justify-between min-h-[100px] bg-[#DDE4EB] rounded-3xl p-4">
                            <div className="flex gap-4">
                                {history?.status === 'Approved' ? (
                                    <svg className="w-[40px] h-[68px]" width="23" height="12" viewBox="0 0 23 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M5.49425 1.45386C5.19017 1.45386 4.94368 1.2071 4.94368 0.90271C4.94368 0.598322 5.19017 0.351562 5.49425 0.351562H9.89885C10.507 0.351562 11 0.845076 11 1.45386V5.86303C11 6.16743 10.7535 6.41418 10.4494 6.41418C10.1453 6.41418 9.89885 6.16743 9.89885 5.86303V2.22184L0.93989 11.1901C0.72488 11.4054 0.376272 11.4054 0.161262 11.1901C-0.053754 10.9749 -0.053754 10.6259 0.161262 10.4107L9.10878 1.45386H5.49425Z"
                                            fill="#09FF30"
                                        />
                                        <path
                                            d="M17.1479 10.2405C17.4514 10.2204 17.7136 10.4503 17.7338 10.754C17.754 11.0577 17.5243 11.3203 17.2209 11.3404L12.826 11.6321C12.2192 11.6723 11.6946 11.2125 11.6543 10.6051L11.3623 6.20561C11.3421 5.90188 11.5718 5.63935 11.8752 5.61921C12.1786 5.59907 12.4409 5.82896 12.461 6.13269L12.7022 9.76589L21.0476 0.224009C21.2479 -0.00497913 21.5957 -0.0280638 21.8245 0.172448C22.0533 0.373016 22.0764 0.721182 21.8761 0.950226L13.5413 10.4799L17.1479 10.2405Z"
                                            fill="#09FF30"
                                        />
                                    </svg>
                                ) : history?.status === 'Rejected' ? (
                                    <svg className="w-[40px] h-[68px]" width="23" height="12" viewBox="0 0 23 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M5.49425 1.45386C5.19017 1.45386 4.94368 1.2071 4.94368 0.90271C4.94368 0.598322 5.19017 0.351562 5.49425 0.351562H9.89885C10.507 0.351562 11 0.845076 11 1.45386V5.86303C11 6.16743 10.7535 6.41418 10.4494 6.41418C10.1453 6.41418 9.89885 6.16743 9.89885 5.86303V2.22184L0.93989 11.1901C0.72488 11.4054 0.376272 11.4054 0.161262 11.1901C-0.053754 10.9749 -0.053754 10.6259 0.161262 10.4107L9.10878 1.45386H5.49425Z"
                                            fill="#FF0000"
                                        />
                                        <path
                                            d="M17.1479 10.2405C17.4514 10.2204 17.7136 10.4503 17.7338 10.754C17.754 11.0577 17.5243 11.3203 17.2209 11.3404L12.826 11.6321C12.2192 11.6723 11.6946 11.2125 11.6543 10.6051L11.3623 6.20561C11.3421 5.90188 11.5718 5.63935 11.8752 5.61921C12.1786 5.59907 12.4409 5.82896 12.461 6.13269L12.7022 9.76589L21.0476 0.224009C21.2479 -0.00497913 21.5957 -0.0280638 21.8245 0.172448C22.0533 0.373016 22.0764 0.721182 21.8761 0.950226L13.5413 10.4799L17.1479 10.2405Z"
                                            fill="#FF0000"
                                        />
                                    </svg>
                                ) : (
                                    <svg className="w-[40px] h-[68px]" width="23" height="12" viewBox="0 0 23 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M5.49425 1.45386C5.19017 1.45386 4.94368 1.2071 4.94368 0.90271C4.94368 0.598322 5.19017 0.351562 5.49425 0.351562H9.89885C10.507 0.351562 11 0.845076 11 1.45386V5.86303C11 6.16743 10.7535 6.41418 10.4494 6.41418C10.1453 6.41418 9.89885 6.16743 9.89885 5.86303V2.22184L0.93989 11.1901C0.72488 11.4054 0.376272 11.4054 0.161262 11.1901C-0.053754 10.9749 -0.053754 10.6259 0.161262 10.4107L9.10878 1.45386H5.49425Z"
                                            fill="#FFA500"
                                        />
                                        <path
                                            d="M17.1479 10.2405C17.4514 10.2204 17.7136 10.4503 17.7338 10.754C17.754 11.0577 17.5243 11.3203 17.2209 11.3404L12.826 11.6321C12.2192 11.6723 11.6946 11.2125 11.6543 10.6051L11.3623 6.20561C11.3421 5.90188 11.5718 5.63935 11.8752 5.61921C12.1786 5.59907 12.4409 5.82896 12.461 6.13269L12.7022 9.76589L21.0476 0.224009C21.2479 -0.00497913 21.5957 -0.0280638 21.8245 0.172448C22.0533 0.373016 22.0764 0.721182 21.8761 0.950226L13.5413 10.4799L17.1479 10.2405Z"
                                            fill="#FFA500"
                                        />
                                    </svg>
                                )}

                                <div className="flex flex-col">
                                    <h4 className="text-primary font-semibold text-lg">{history?.name}</h4>
                                    <h6 className="text-primary">{history?.action}</h6>
                                    <span className="text-primary">{history?.createdAt}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-primary font-bold text-lg">₹{history?.amount}</h3>
                                <span
                                    className={`text-white px-2 py-1 rounded-[10px] ${
                                        history?.status === 'Approved' ? 'bg-green-500' : history?.status === 'Rejected' ? 'bg-red-500' : 'bg-yellow-500'
                                    }`}
                                >
                                    {history?.status}
                                </span>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>

            <Transition appear show={subscriptionModal} as={Fragment}>
                <Dialog
                    as="div"
                    open={subscriptionModal}
                    onClose={() => {
                        setSubscriptionModal(false);
                    }}
                >
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
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
                                        <h5 className="text-warning">Renewal Package</h5>
                                        <button type="button" onClick={() => setSubscriptionModal(false)} className="text-white-dark hover:text-dark text-[28px] p-2">
                                            ×
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <div className="flex flex-col">
                                            {user?.renewalStatus && (
                                                <div>
                                                    <h3 className="text-primary font-bold mb-2">Add on</h3>
                                                    {addOn.length > 0 ? (
                                                        addOn.map((add: any) => (
                                                            <div
                                                                onClick={() => handleverificationModal(add, 'addOn')}
                                                                className="w-full flex justify-between min-h-[80px] cursor-pointer bg-primary rounded-3xl p-5 mb-2
                
                "
                                                            >
                                                                <div className="flex gap-4">
                                                                    <div className="flex flex-col gap-2">
                                                                        <h4 className="text-white  text-base">{add?.packageName}</h4>
                                                                        <span className="text-warning font-semiboldy">₹ {add?.packageAmount}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p>you take all signals</p>
                                                    )}
                                                </div>
                                            )}
                                            {!user.renewalStatus && (
                                                <div>
                                                    <h3 className="text-primary font-bold mb-2">Renewal Signals</h3>
                                                    {renewalPackage.map((ren: any) => (
                                                        <div
                                                            onClick={() => handleverificationModal(ren, 'renewal')}
                                                            className="w-full flex justify-between min-h-[80px] bg-primary rounded-3xl p-5 mb-2 cursor-pointer  "
                                                        >
                                                            <div className="flex gap-4">
                                                                <div className="flex flex-col gap-2">
                                                                    <h4 className="text-white  text-base">{ren?.packageName}</h4>
                                                                    <span className="text-warning font-semiboldy">₹ {ren?.packageAmount}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            {user.packageType !== 'Franchise' && (
                                                <div>
                                                    <h3 className="text-primary font-bold mb-2">convert Packages</h3>
                                                    {convetPackages.map((conPkg: any) => (
                                                        <div
                                                            onClick={() => handleverificationModal(conPkg, 'convert')}
                                                            className="w-full flex justify-between min-h-[80px] bg-primary rounded-3xl p-5 mb-2 cursor-pointer
                
                "
                                                        >
                                                            <div className="flex gap-4">
                                                                <div className="flex flex-col gap-2">
                                                                    <h4 className="text-white  text-base">{conPkg?.packageName}</h4>
                                                                    <span className="text-warning font-semiboldy">₹ {conPkg?.packageAmount}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        {/* <div className="flex justify-end items-center mt-4">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    handleUpload();
                                                }}
                                                className="btn btn-primary text-sm ltr:ml-2 rtl:mr-2 p-2"
                                            >
                                                {loading ? 'Saving...' : 'Save'}
                                            </button>
                                        </div> */}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <Transition appear show={verificationModal} as={Fragment}>
                <Dialog
                    as="div"
                    open={verificationModal}
                    onClose={() => {
                        setVerificationModal(false);
                    }}
                >
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
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
                                        <h5 className="text-warning">Renewal Package</h5>
                                        <button type="button" onClick={() => setVerificationModal(false)} className="text-white-dark hover:text-dark text-[28px] p-2">
                                            ×
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <div className="flex flex-col">
                                            <div>
                                                <h3 className="text-primary font-semibold">{selectedPackage?.package}</h3>
                                                <h1 className="text-2xl text-primary font-bold mb-4">₹{selectedPackage?.amount}</h1>
                                                {/* <label htmlFor="transactionId" className="text-[14px] text-primary">
                                                    Your Transaction Id{' '}
                                                </label>
                                                <input
                                                    type="text"
                                                    id="transactionId"
                                                    className="w-full border border-solid border-primary p-2 rounded-md outline-primary"
                                                    onChange={(e) => setTransacrionNumber(e.target.value)}
                                                /> */}
                                                <label htmlFor="transactionId" className="mt-3 text-[14px] text-primary">
                                                    Your payment screenshot
                                                </label>
                                                <label htmlFor="imageUpload2" className="btn btn-outline-primary text-sm p-2 text-primary">
                                                    Select Document
                                                    <input type="file" id="imageUpload2" className="hidden" onChange={handleImageUpload} accept="image/*" />
                                                </label>
                                                {selectedFile && (
                                                    <div className="flex items-center mt-2">
                                                        <p className="text-sm text-danger mt-2 mr-2">File selected: {selectedFile?.name}</p>
                                                        <button type="button" onClick={() => setSelectedFile(null)} className="text-primary hover:danger-gray-300">
                                                            &#10005;
                                                        </button>
                                                    </div>
                                                )}
                                                {showSelectDocumentMessage && (
                                                    <div className="flex items-center mt-2">
                                                        <p className="text-sm text-danger mt-2 mr-2">Select a document</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex justify-end items-center mt-4">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    handleUpload();
                                                }}
                                                className="btn btn-primary text-sm ltr:ml-2 rtl:mr-2 p-2"
                                            >
                                                {loading ? 'Saving...' : 'Save'}
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default Subscriptions;
