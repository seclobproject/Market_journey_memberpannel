import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Analytics from './Analytics';
import { Dialog, Transition } from '@headlessui/react';
import IconPlayCircle from '../components/Icon/IconPlayCircle';
import IconX from '../components/Icon/IconX';
import IconPlus from '../components/Icon/IconPlus';
import IconCreditCard from '../components/Icon/IconCreditCard';
import { ApiCall, Base_url } from '../Services/Api';
import { getImagesUrl, getProfileUrl, getVideoUrl } from '../utils/EndPoints';
import Carousel from './Components/Carousel';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper';
import IconCaretDown from '../components/Icon/IconCaretDown';
import { Link } from 'react-router-dom';
import IconMenuUsers from '../components/Icon/Menu/IconMenuUsers';
import IconCashBanknotes from '../components/Icon/IconCashBanknotes';

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
    const [slideImages, setslideImage] = useState<any>([]);
    const [slideVideos, setSlideVideos] = useState<any>([]);
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
    //--------- get sliding images-------
    const getImages = async () => {
        try {
            const response = await ApiCall('get', getImagesUrl);
            console.log(response);

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setslideImage(response?.data?.homeImageData);
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };
    // --------------------------
    const getVideos = async () => {
        try {
            const response = await ApiCall('get', getVideoUrl);
            console.log(response);

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                console.log(response?.data?.homeVideoData, 'video');

                setSlideVideos(response?.data?.homeVideoData);
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };

    useEffect(() => {
        getProfile();
        getImages();
        getVideos();
    }, []);

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

                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
                    {/* <div className="panel ">
                        <div className="flex justify-between dark:text-white-light mb-5">
                            <h5 className="font-semibold text-primary text-lg ">Wallet Amount</h5>
                        </div>
                        <div className=" text-warning text-3xl font-bold my-10">
                            <span>₹ {profielDetails.walletAmount} </span>
                        </div>
                    </div> */}

                    <div className="panel lg:h-[120px]  sm:h-auto flex gap-4  items-center justify-center bg-[#00335B] text-white">
                        <div className="flex h-full justify-between items-center  dark:text-white-light">
                            <IconMenuUsers className="w-10 h-10 text-warning" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-[25px] font-semibold">40</h1>
                            <h5 className="font-semibold text-md text-warning">Total members</h5>
                        </div>
                    </div>
                    <div className="panel lg:h-[120px]  sm:h-auto flex gap-4  items-center justify-center bg-[#00335B] text-white">
                        <div className="flex h-full justify-between items-center  dark:text-white-light">
                            <IconCreditCard className="w-10 h-10 text-warning" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-[25px] font-semibold">₹400006</h1>
                            <h5 className="font-semibold text-md text-warning">WalletAmount</h5>
                        </div>
                    </div>
                    <div className="panel lg:h-[120px] sm:h-auto flex gap-4  items-center justify-center bg-[#00335B] text-white">
                        <div className="flex h-full justify-between items-center  dark:text-white-light">
                            <IconCashBanknotes className="w-10 h-10 text-warning" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-[25px] font-semibold">₹5240</h1>
                            <h5 className="font-semibold text-md text-warning">DirectIncome</h5>
                        </div>
                    </div>
                    <div className="panel lg:h-[120px] sm:h-auto flex gap-4  items-center justify-center bg-[#00335B] text-white">
                        <div className="flex h-full justify-between items-center  dark:text-white-light">
                            <IconCashBanknotes className="w-10 h-10 text-warning" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-[25px] font-semibold">₹740</h1>
                            <h5 className="font-semibold text-md text-warning">InDirectIncome</h5>
                        </div>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div
                        className="panel overflow-hidden before:bg-primary before:absolute before:-right-44 before:top-0 before:bottom-0 before:m-auto before:rounded-full before:w-96 before:h-96 grid grid-cols-1 content-between "
                        style={{ background: 'linear-gradient(0deg, #00c6fb -227%, #132239)' }}
                    >
                        <div className="flex items-start justify-between text-white-light mb-16 z-[7]">
                            <h5 className="font-semibold text-lg">Total Balance</h5>
                            <img src="/public/assets/images/rupee.png" alt="rupee" />
                        </div>
                        <div className="flex items-center justify-between z-10">
                            <div className="flex items-center justify-between">
                                <div className="relative text-2xl text-white whitespace-nowrap">₹ {profielDetails.walletAmount}</div>

                                {/* <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#1937cc] place-content-center ltr:mr-2 rtl:ml-2">
                                    <IconPlus />
                                </button>
                                <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#1937cc] grid place-content-center">
                                    <IconCreditCard />
                                </button> */}
                            </div>
                            {/* <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#1937cc] z-10">
                                Upgrade
                            </button> */}
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
                        <button type="button" className="text-warning hover:text-white hover:bg-warning z-10 font-bold rounded border-warning p-2 ml-auto border ">
                            Subscribe
                        </button>
                    </div>
                </div>

                <div className="mt-10 lg:mt-16 text-[#00335B] font-bold text-lg">
                    <h2 className="mb-6 font-bold">FLASH FEED</h2>

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
                                {slideVideos.length>0 ? (slideVideos.map((item: any) => {
                                    console.log(`http://192.168.29.152:8000/uploads/${item.videoThambnail}`);

                                    return (
                                        <SwiperSlide key={item._id}>
                                            <img src={`http://192.168.29.152:8000/uploads/${item.videoThambnail}`} className="w-full h-[250px] rounded-lg" alt="itemImg" />
                                            <Link to={`${item.videoLink}`} target="_blank">
                                                <button
                                                    type="button"
                                                    className="absolute left-1/2 top-1/3 grid h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/3 place-content-center rounded-full text-white duration-300 group-hover:scale-110"
                                                >
                                                    <IconPlayCircle className="h-[62px] w-[62px] text-warning" fill={true} />
                                                </button>
                                            </Link>
                                            <p>{item.videoTitle}</p>
                                        </SwiperSlide>
                                    );
                                })):(<p>No videos</p>)}
                                {/* {items.map((item:any) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <img src={`/public/assets/images/carousel2.jpeg`} className="w-full rounded-lg" alt="itemImg" />
                                            <button
                                                type="button"
                                                className="absolute left-1/2 top-1/2 grid h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/2 place-content-center rounded-full text-white duration-300 group-hover:scale-110"
                                                onClick={() => setModal(true)}
                                            >
                                                <IconPlayCircle className="h-[62px] w-[62px] text-warning" fill={true} />
                                            </button>
                                            <p>Journey of inspiration and discovery how Market journey </p>
                                        </SwiperSlide>
                                    );
                                })} */}
                            </Swiper>
                        </div>
                        <button className="swiper-button-prev-ex2 grid place-content-center ltr:left-2 rtl:right-2 p-1 transition text-white border border-primary  hover:border-primary hover:bg-primary rounded-full absolute z-[999] top-[44%] -translate-y-1/2">
                            <IconCaretDown className="w-5 h-5 rtl:-rotate-90 rotate-90" />
                        </button>
                        <button className="swiper-button-next-ex2 grid place-content-center ltr:right-2 rtl:left-2 p-1 transition text-white border border-primary  hover:border-primary hover:bg-primary rounded-full absolute z-[999] top-[44%] -translate-y-1/2">
                            <IconCaretDown className="w-5 h-5 rtl:rotate-90 -rotate-90" />
                        </button>
                    </div>
                    <div className="swiper mt-10" id="slider1">
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
                                {slideImages.map((item: any) => {
                                    return (
                                        <SwiperSlide key={item._id}>
                                            <img src={`http://192.168.29.152:8000/uploads/${item?.homeImage}`} className="w-full h-[200px] rounded-lg" alt="itemImg" />
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
