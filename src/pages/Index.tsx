import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Analytics from './Analytics';
import { Dialog, Transition } from '@headlessui/react';
import IconPlayCircle from '../components/Icon/IconPlayCircle';
import IconX from '../components/Icon/IconX';
import IconPlus from '../components/Icon/IconPlus';
import IconCreditCard from '../components/Icon/IconCreditCard';
import { ApiCall, Base_url } from '../Services/Api';
import { getProfileUrl } from '../utils/EndPoints';
import Carousel from './Components/Carousel';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper';
import IconCaretDown from '../components/Icon/IconCaretDown';

interface ProfileDetails {
    name: string;
    email: string;
    userStatus: string;
    walletAmount: string;
}

const Index = () => {
    const [modal, setModal] = useState(false);
    const [pendingModal, setPendingModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [transactionNumber, setTransacrionNumber] = useState('');
    const [showSelectDocumentMessage, setShowSelectDocumentMessage] = useState(false);
    const [updateStatus, setUpdatedStatus] = useState<string | null>(null);
    const [profielDetails, setProfileDetails] = useState<ProfileDetails>({
        name: '',
        email: '',
        userStatus: '',
        walletAmount: '',
    });
    console.log(updateStatus);

    const getProfile = async () => {
        try {
            const response = await ApiCall('get', getProfileUrl);
            console.log(response);

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setProfileDetails(response?.data);
                localStorage.setItem('status', response?.data?.userStatus);
                if (response?.data?.userStatus === 'pending') {
                    setPendingModal(true);
                }
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };

    // const fetchData = async () => {
    //     try {
    //         const userStatus = await localStorage.getItem('status');
    //         setUpdatedStatus(userStatus);
    //         if (userStatus === 'pending') {
    //             setPendingModal(true);
    //             console.log(pendingModal);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching user status:', error);
    //     }
    // };
    useEffect(() => {
        getProfile();
    }, []);

    // const closePendingModal = () => {
    //     setPendingModal(false);
    // };
    const handleRefresh = () => {
        window.location.reload();
    };
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedFile(file || null);
    };
    console.log(selectedFile);
    // ---

    const handleUpload = async () => {
        if (selectedFile) {
            try {
                const token: any = localStorage.getItem('User');
                // const parsedData = JSON.parse(token);
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'content-type': 'multipart/form-data',
                    },
                };
                const formData = new FormData();
                formData.append('transactionNumber', transactionNumber);
                formData.append('screenshot', selectedFile, selectedFile?.name);
                const response = await axios.post(`${Base_url}/api/user/user-verification`, formData, config);
                console.log(response);
                setSelectedFile(null);
                // setHideUpload({
                //     status: 'Pending',
                // });
                localStorage.setItem('status', response?.data?.updatedUser?.userStatus);

                setPendingModal(false);
                handleRefresh();
                setShowSelectDocumentMessage(false);
            } catch (error) {
                console.error('Upload failed:', error);
            }
        } else {
            setShowSelectDocumentMessage(true);
        }
    };
    const items = [
        {
            src: '/assets/images/knowledge/image-5.jpg',
            title: 'Excessive sugar is harmful',
        },
        {
            src: '/assets/images/knowledge/image-6.jpg',
            title: 'Creative Photography',
        },
        {
            src: '/assets/images/knowledge/image-7.jpg',
            title: 'Plan your next trip',
        },
        {
            src: '/assets/images/knowledge/image-8.jpg',
            title: 'My latest Vlog',
        },
    ];
    return (
        <>
            <div>
                {(updateStatus === 'readyToApprove' || updateStatus === 'pending') && (
                    <div className="bg-yellow-400 p-2 text-center max-w-[150px] text-white font-bold mb-2 rounded-md">
                        <h4>{updateStatus}</h4>
                    </div>
                )}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {/* <div className="panel ">
                        <div className="flex justify-between dark:text-white-light mb-5">
                            <h5 className="font-semibold text-primary text-lg ">Wallet Amount</h5>
                        </div>
                        <div className=" text-warning text-3xl font-bold my-10">
                            <span>₹ {profielDetails.walletAmount} </span>
                        </div>
                    </div> */}

                    <div
                        className="panel overflow-hidden before:bg-primary before:absolute before:-right-44 before:top-0 before:bottom-0 before:m-auto before:rounded-full before:w-96 before:h-96 grid grid-cols-1 content-between"
                        style={{ background: 'linear-gradient(0deg, #00c6fb -227%, #132239)' }}
                    >
                        <div className="flex items-start justify-between text-white-light mb-16 z-[7]">
                            <h5 className="font-semibold text-lg">Total Balance</h5>

                            <div className="relative text-xl whitespace-nowrap">₹ {profielDetails.walletAmount}</div>
                        </div>
                        <div className="flex items-center justify-between z-10">
                            <div className="flex items-center justify-between">
                                <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#1937cc] place-content-center ltr:mr-2 rtl:ml-2">
                                    <IconPlus />
                                </button>
                                <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#1937cc] grid place-content-center">
                                    <IconCreditCard />
                                </button>
                            </div>
                            <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#1937cc] z-10">
                                Upgrade
                            </button>
                        </div>
                    </div>
                    <div className="panel sm:h-auto flex flex-col justify-between bg-[#00335B] text-white">
                        <div className="flex justify-between dark:text-white-light mb-5">
                            <h5 className="font-semibold text-lg ">Refer Now</h5>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-7">
                            <img className="w-[117px] h-[72px]" src="/public/assets/images/referal_img.png" alt="" />
                            <div className="flex flex-col gap-5">
                                <p className="text-center sm:text-left">Sharing is rewarding! Refer your friends and earn a lifetime income</p>
                                <button type="button" className="font-bold rounded p-2 text-white bg-warning ml-auto sm:ml-0">
                                    Refer Now
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="panel min-h-[200px] sm:h-auto flex flex-col justify-between bg-[#00335B] text-white">
                        <div className="flex justify-between dark:text-white-light mb-5">
                            <h5 className="font-semibold text-lg ">10 day left</h5>
                        </div>
                        <p className="text-center sm:text-left">Your monthly subscription plan has 10 days to renew Subscription is 0 Please upload the screenshot</p>
                        <button type="button" className=" text-white hover:bg-warning z-10 font-bold rounded p-2 ml-auto border hover:border-none">
                            Subscribe
                        </button>
                    </div>
                </div>

                <div className="mt-10 lg:mt-16 text-[#00335B] font-bold text-lg">
                    <h2 className="mb-6 font-bold">FLASH FEED</h2>
                    <div className="swiper" id="slider1">
                        <div className="swiper-wrapper">
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                navigation={{
                                    nextEl: '.swiper-button-next-ex1',
                                    prevEl: '.swiper-button-prev-ex1',
                                }}
                                // pagination={{
                                //     clickable: true,
                                // }}
                                autoplay={{ delay: 3000 }}
                                loop={true}
                                breakpoints={{
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 30,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 40,
                                    },
                                    320: {
                                        slidesPerView: 1,
                                        spaceBetween: 20,
                                    },
                                }}
                            >
                                {items.map((item, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <img src={`/public/assets/images/carousel1.jpeg`} className="w-full rounded-lg" alt="itemImg" />
                                        </SwiperSlide>
                                    );
                                })}
                                {items.map((item, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <img src={`/public/assets/images/carousel2.jpeg`} className="w-full rounded-lg" alt="itemImg" />
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                        <button className="swiper-button-prev-ex1 grid place-content-center ltr:left-2 rtl:right-2 p-1 transition text-white border border-primary  hover:border-primary hover:bg-primary rounded-full absolute z-[999] top-[44%] -translate-y-1/2">
                            <IconCaretDown className="w-5 h-5 rtl:-rotate-90 rotate-90" />
                        </button>
                        <button className="swiper-button-next-ex1 grid place-content-center ltr:right-2 rtl:left-2 p-1 transition text-white border border-primary  hover:border-primary hover:bg-primary rounded-full absolute z-[999] top-[44%] -translate-y-1/2">
                            <IconCaretDown className="w-5 h-5 rtl:rotate-90 -rotate-90" />
                        </button>
                    </div>
                    <div className="swiper mt-10" id="slider2">
                        <div className="swiper-wrapper">
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                navigation={{
                                    nextEl: '.swiper-button-next-ex2',
                                    prevEl: '.swiper-button-prev-ex2',
                                }}
                                // pagination={{
                                //     clickable: true,
                                // }}
                                autoplay={{ delay: 4000 }}
                                loop={true}
                                breakpoints={{
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 30,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 40,
                                    },
                                    320: {
                                        slidesPerView: 1,
                                        spaceBetween: 20,
                                    },
                                }}
                            >
                                {items.map((item, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <img src={`/public/assets/images/carousel1.jpeg`} className="w-full rounded-lg" alt="itemImg" />
                                            <button
                                                type="button"
                                                className="absolute left-1/2 top-1/2 grid h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/2 place-content-center rounded-full text-white duration-300 group-hover:scale-110"
                                                onClick={() => setModal(true)}
                                            >
                                                <IconPlayCircle className="h-[62px] w-[62px]" fill={true} />
                                            </button>
                                            <p>Journey of inspiration and discovery how Market journey </p>
                                        </SwiperSlide>
                                    );
                                })}
                                {items.map((item, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <img src={`/public/assets/images/carousel2.jpeg`} className="w-full rounded-lg" alt="itemImg" />
                                            <button
                                                type="button"
                                                className="absolute left-1/2 top-1/2 grid h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/2 place-content-center rounded-full text-white duration-300 group-hover:scale-110"
                                                onClick={() => setModal(true)}
                                            >
                                                <IconPlayCircle className="h-[62px] w-[62px]" fill={true} />
                                            </button>
                                            <p>Journey of inspiration and discovery how Market journey </p>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                        <button className="swiper-button-prev-ex2 grid place-content-center ltr:left-2 rtl:right-2 p-1 transition text-white border border-primary  hover:border-primary hover:bg-primary rounded-full absolute z-[999] top-[44%] -translate-y-1/2">
                            <IconCaretDown className="w-5 h-5 rtl:-rotate-90 rotate-90" />
                        </button>
                        <button className="swiper-button-next-ex2 grid place-content-center ltr:right-2 rtl:left-2 p-1 transition text-white border border-primary  hover:border-primary hover:bg-primary rounded-full absolute z-[999] top-[44%] -translate-y-1/2">
                            <IconCaretDown className="w-5 h-5 rtl:rotate-90 -rotate-90" />
                        </button>
                    </div>
                    {/* <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {items.map((item: any, i) => {
                            return (
                                <div
                                    key={i}
                                    className="space-y-5 rounded-md border border-white-light bg-white shadow-[0px_0px_2px_0px_rgba(145,158,171,0.20),0px_12px_24px_-4px_rgba(145,158,171,0.12)] dark:border-[#1B2E4B] dark:bg-black"
                                >
                                    <div className="relative h-[340px] overflow-hidden rounded-md group">
                                        <img src={item.src} alt=" tutorial" className="h-full w-full object-cover cursor-pointer" onClick={() => setModal(true)} />
                                        <button
                                            type="button"
                                            className="absolute left-1/2 top-1/2 grid h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/2 place-content-center rounded-full text-white duration-300 group-hover:scale-110"
                                            onClick={() => setModal(true)}
                                        >
                                            <IconPlayCircle className="h-[62px] w-[62px]" fill={true} />
                                        </button>
                                        <div className="absolute bottom-0 left-0 w-full bg-white/30 px-5 py-[22px] text-center text-xl text-white backdrop-blur-[5px]">Excessive sugar is harmful</div>
                                    </div>
                                </div>
                            );
                        })}
                        ;
                    </div> */}
                    <Transition appear show={modal} as={Fragment}>
                        <Dialog as="div" open={modal} onClose={() => setModal(false)}>
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
                            <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                                <div className="flex min-h-screen items-start justify-center px-4">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="my-8 w-full max-w-3xl overflow-hidden">
                                            <div className="text-right">
                                                <button onClick={() => setModal(false)} type="button" className="text-white-dark hover:text-dark">
                                                    <IconX />
                                                </button>
                                            </div>
                                            <iframe title="youtube-video" src="https://www.youtube.com/embed/WjtXCmpfouE?si=OWnPx_4mhS99PE5p" className="h-[250px] w-full md:h-[550px]"></iframe>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            </div>
            {pendingModal && (
                <div className="mb-5">
                    <Transition appear show={pendingModal} as={Fragment}>
                        <Dialog as="div" open={pendingModal} onClose={() => setPendingModal(true)}>
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
                            <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
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
                                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                            <div className="flex bg-[#FBFBFB] dark:bg-[#121C2C] items-center justify-between px-5 py-3">
                                                <div className="font-bold text-lg">Verify your Account</div>
                                            </div>
                                            <div className="p-5">
                                                <div className="flex flex-col">
                                                    <div>
                                                        <label htmlFor="transactionId" className="text-[14px]">
                                                            Your Transaction Id{' '}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="transactionId"
                                                            className="w-full border border-solid border-primary p-2 rounded-md outline-primary"
                                                            onChange={(e) => setTransacrionNumber(e.target.value)}
                                                        />
                                                        <label htmlFor="transactionId" className="mt-3 text-[14px]">
                                                            Your payment screenshot
                                                        </label>
                                                        <label htmlFor="imageUpload2" className="btn btn-outline-primary text-sm p-2">
                                                            Select Document
                                                            <input type="file" id="imageUpload2" className="hidden" onChange={handleImageUpload} accept="image/*" />
                                                        </label>
                                                        {selectedFile && (
                                                            <div className="flex items-center mt-2">
                                                                <p className="text-sm text-danger mt-2 mr-2">File selected: {selectedFile?.name}</p>
                                                                <button type="button" onClick={() => setSelectedFile(null)} className="text-danger hover:danger-gray-300">
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
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            )}
        </>
    );
};

export default Index;
