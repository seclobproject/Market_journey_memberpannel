import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';
import IconPlayCircle from '../components/Icon/IconPlayCircle';

import IconCreditCard from '../components/Icon/IconCreditCard';
import { ApiCall, Base_url } from '../Services/Api';
import { AwardsUrl, getImagesUrl, getVideoUrl, liveNewsUrl, viewAutoPoolUrl } from '../utils/EndPoints';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper';
import IconCaretDown from '../components/Icon/IconCaretDown';
import { Link, useNavigate } from 'react-router-dom';
import IconCashBanknotes from '../components/Icon/IconCashBanknotes';
import Marquee from 'react-fast-marquee';
import { useAppDispatch, useAppSelector } from '../store';
import { userProfileApi } from '../store/UserSlice';
import RankList from './Components/RankList';

// interface ProfileDetails {
//     id: string;
//     name: string;
//     email: string;
//     userStatus: string;
//     walletAmount: string;
//     tempPackageAmount: string;
// }

const Index = () => {
    const [modal, setModal] = useState(false);
    const [pendingModal, setPendingModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [transactionNumber, setTransacrionNumber] = useState('');
    const [showSelectDocumentMessage, setShowSelectDocumentMessage] = useState(false);
    const [updateStatus, setUpdatedStatus] = useState<string | null>(null);
    const [slideImages, setslideImage] = useState<any>([]);
    const [slideVideos, setSlideVideos] = useState<any>([]);
    const [awards, setAwards] = useState<any>([]);
    const [news, setNews] = useState<any>([]);
    const [autoPool, setAutoPool] = useState<any>([]);
    // const [profielDetails, setProfileDetails] = useState<ProfileDetails>({
    //     name: '',
    //     email: '',
    //     userStatus: '',
    //     walletAmount: '',
    //     tempPackageAmount: '',
    //     id: '',
    // });
    const [loading, setLoading] = useState(false);
    const { user } = useAppSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(userProfileApi());
        getImages();
        getVideos();
        showAwards();
        showLiveNewes();
        getAutopPool();
    }, []);
    useEffect(() => {
        // const token: any = getTokenWithExpiry('User');
        const token = sessionStorage.getItem('User');
        const status = sessionStorage.getItem('status');
        if (!token) {
            navigate('/auth/boxed-signin');
        }
        if (status === 'pending') {
            setPendingModal(true);
        }
    });

    // const getProfile = async () => {
    //     try {
    //         const response = await ApiCall('get', getProfileUrl);
    //         console.log(response);

    //         if (response instanceof Error) {
    //             console.error('Error fetching state list:', response.message);
    //         } else if (response.status === 200) {
    //             setProfileDetails(response?.data);
    //             localStorage.setItem('status', response?.data?.userStatus);
    //             if (response?.data?.userStatus === 'pending') {
    //                 setPendingModal(true);
    //             }
    //         } else {
    //             console.error('Error fetching state list. Unexpected status:', response.status);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching state list:', error);
    //     }
    // };
    //--------- get sliding images-------
    const getImages = async () => {
        try {
            const response = await ApiCall('get', getImagesUrl);

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

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setSlideVideos(response?.data?.homeVideoData);
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };

    //---- Awards----
    const showAwards = async () => {
        try {
            const response = await ApiCall('get', AwardsUrl);

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setAwards(response?.data?.awardData);
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };

    //----- get autopool values--------
    const getAutopPool = async () => {
        try {
            const response = await ApiCall('get', viewAutoPoolUrl);

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setAutoPool(response?.data?.pool);
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };
    //get news api call
    const showLiveNewes = async () => {
        try {
            const response = await ApiCall('get', liveNewsUrl);

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setNews(response?.data?.newsData);
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };

    const handleRefresh = () => {
        window.location.reload();
    };
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedFile(file || null);
    };
    // ---

    // ----upload pending  det
    const handleUpload = async () => {
        if (selectedFile) {
            try {
                setLoading(true);

                const token: any = sessionStorage.getItem('User');
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
                sessionStorage.setItem('status', response?.data?.updatedUser?.userStatus);
                setPendingModal(false);
                handleRefresh();
                setShowSelectDocumentMessage(false);
            } catch (error) {
                console.error('Upload failed:', error);
            } finally {
                setLoading(false); // Set loading to false when form submission completes (success or failure)
            }
        } else {
            setShowSelectDocumentMessage(true);
        }
    };

    // share referal link
    const shareTitle = 'Check out this awesome link!';
    const shareUrl = `http://192.168.29.152:6003/auth/boxed-signup/${user?.id}`; // Replace with the actual URL you want to share

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: shareTitle,
                    text: 'Check out this awesome link!',
                    url: shareUrl,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            // Fallback for browsers that do not support the Web Share API
            console.warn('Web Share API is not supported in this browser.');
            // You can provide alternative sharing methods here (e.g., copy to clipboard)
        }
    };
    useEffect(() => {
        document.documentElement.style.setProperty('--news-count', news.length);
    }, [news.length]);

    return (
        <>
            <div>
                {(updateStatus === 'readyToApprove' || updateStatus === 'pending') && (
                    <div className="bg-yellow-400 p-2 text-center max-w-[150px] text-white font-bold mb-2 rounded-md">
                        <h4>wait for Admin Confirmation {updateStatus}</h4>
                    </div>
                )}
                {news.length !== 0 && (
                    <>
                        <h2 className="mb-6 font-bold text-primary text-lg">LATEST NEWS</h2>
                        <div className="relative block overflow-hidden bg-[#DDE4EB] py-2 mb-6 w-full cursor-pointer">
                            <Marquee className=" text-primary text-[16px] font-semibold w-full h-full">
                                {news.map((n: any) => (
                                    <span key={n?._id} className="inline min-w-full h-full text-center whitespace-nowrap ">
                                        {n?.news}&nbsp;&nbsp;&nbsp;
                                    </span>
                                ))}
                            </Marquee>
                        </div>
                    </>
                )}

                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
                    <div className="panel lg:h-[120px] sm:h-auto flex gap-4  items-center justify-center bg-[#00335B] text-white">
                        <div className="flex h-full justify-between items-center  dark:text-white-light">
                            <IconCashBanknotes className="w-10 h-10 text-warning" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-[25px] font-semibold">₹{user?.directIncome}</h1>
                            <h5 className="font-semibold text-md text-warning">DirectIncome</h5>
                        </div>
                    </div>
                    <div className="panel lg:h-[120px] sm:h-auto flex gap-4  items-center justify-center bg-[#00335B] text-white">
                        <div className="flex h-full justify-between items-center  dark:text-white-light">
                            <IconCashBanknotes className="w-10 h-10 text-warning" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-[25px] font-semibold">₹{user?.inDirectIncome}</h1>
                            <h5 className="font-semibold text-md text-warning">InDirectIncome</h5>
                        </div>
                    </div>

                    <div className="panel lg:h-[120px]  sm:h-auto flex gap-4  items-center justify-center bg-[#00335B] text-white">
                        <div className="flex h-full justify-between items-center  dark:text-white-light">
                            <IconCreditCard className="w-10 h-10 text-warning" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-[25px] font-semibold">₹{user?.totalLevelIncome}</h1>
                            <h5 className="font-semibold text-md text-warning">LevelIncome</h5>
                        </div>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div
                        className="panel overflow-hidden before:bg-primary before:absolute before:-right-44 before:top-0 before:bottom-0 before:m-auto before:rounded-full before:w-96 before:h-96 grid grid-cols-1 content-between "
                        style={{ background: 'linear-gradient(0deg, #00c6fb -227%, #132239)' }}
                    >
                        <div className="flex relative items-start justify-between text-white-light mb-16 z-[7]">
                            <h5 className="font-semibold  text-lg">Total Balance</h5>
                            <img className="absolute right-2 top-2 sm:w-[80px] w-auto" src="/public/assets/images/total_wallet.svg" alt="rupee" />
                        </div>
                        <div className="flex items-center justify-between z-10">
                            <div className="flex items-center justify-between">
                                <div className="relative text-2xl font-semibold text-white whitespace-nowrap">₹ {user?.walletAmount}</div>
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
                                <button onClick={handleShare} type="button" className="font-bold rounded p-2 text-white bg-warning ml-auto sm:ml-0">
                                    Refer Now
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="panel min-h-[200px] max-w-md sm:h-auto flex  justify-between bg-[#00335B] text-white relative">
                        <div className="flex flex-col gap-5 z-10">
                            <div className=" dark:text-white-light">
                                <h5 className=" text-md ">
                                    <span className="text-4xl font-bold">10</span> day left
                                </h5>
                            </div>
                            <p className="text-left sm:text-left max-w-[230px]">Your monthly subscription plan has 10 days to renew Subscription is 0 Please upload the screenshot</p>
                            <button type="button" className="text-white hover:text-white bg-warning z-10 font-bold rounded border-warning p-2 mr-auto border ">
                                Subscription Package
                            </button>
                        </div>
                        <img className="absolute right-5 top-[25%] h-[50%]  z-0" src="/public/assets/images/subscription.svg" alt="" />
                    </div>
                </div>

                {/*------Start Awards and rewards--------- */}
                <div className="mt-10 lg:mt-16 text-primary ">
                    <div className="flex justify-between">
                        <h2 className="mb-6 font-bold text-lg">Awards and Rewards</h2>
                        <span
                            onClick={() => {
                                navigate('/pages/awards');
                            }}
                            className="mb-6 font-bold text-md cursor-pointer"
                        >
                            show more....
                        </span>
                    </div>
                    {awards.length !== 0 ? (
                        <>
                            <div className="flex overflow-x-auto scrollbar-hidden gap-4 py-2">
                                {awards.map((award: any) => {
                                    return (
                                        <div key={award._id} className="min-h-full min-w-[220px] max-w-[220px] gap-2 w-full p-5 bg-white  flex flex-col items-center shadow-md rounded-[12px]">
                                            <div className="w-20 h-20 ">
                                                <img className="w-full rounded-full h-20 shadow-md" src={`${Base_url}/uploads/${award?.memberImage}`} alt="profile" />
                                            </div>
                                            <span className="text-[16px] font-[600]">{award?.memberName}</span>
                                            <span>{award?.achivedDetails}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="min-h-full min-w-[220px] max-w-[220px] gap-2 w-full p-5 bg-gray-200  flex flex-col items-center shadow-md rounded-[12px]">
                                <div className="w-20 h-20 "></div>
                                <span className="text-[16px] font-[600]"></span>
                                <span></span>
                            </div>
                        </>
                    )}
                </div>
                {/*-----End Awards and rewards ---------*/}

                {/* pool Rank list */}

                <div className="mt-10 lg:mt-16 text-primary ">
                    <div className="flex justify-between">
                        <h2 className="mb-6 font-bold text-lg">Leader Boards</h2>
                    </div>
                    <>
                        <div className="flex overflow-x-auto scrollbar-hidden gap-4 py-2">
                            {autoPool?.map((pool: any, index: number) => (
                                <RankList key={index} pool={String.fromCharCode(65 + index)} members={pool?.count} amount={pool?.amount} />
                            ))}
                        </div>
                    </>
                </div>
                {/* pool Rank list end */}

                {/*----Start Flash Feed------  */}
                <div className="mt-10 lg:mt-16 text-primary ">
                    {slideVideos.length > 0 && <h2 className="mb-6 font-bold text-lg">FLASH FEED</h2>}

                    <div className="swiper mt-10" id="slider2">
                        {
                            slideVideos.length > 0 && (
                                <>
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
                                                    slidesPerView: slideImages.length >= 3 ? 3 : slideImages.length == 2 ? 2 : 1,
                                                    spaceBetween: 30,
                                                },
                                                768: {
                                                    slidesPerView: slideImages.length == 2 ? 2 : 1,
                                                    spaceBetween: 40,
                                                },
                                                320: {
                                                    slidesPerView: 1,
                                                    spaceBetween: 20,
                                                },
                                            }}
                                        >
                                            {slideVideos.map((item: any) => {
                                                // console.log(${Base_url}/uploads/${item.videoThambnail});

                                                return (
                                                    <SwiperSlide key={item._id}>
                                                        <img src={`${Base_url}/uploads/${item.videoThambnail}`} className="w-full h-[200px] object-cover rounded-lg" alt="itemImg" />
                                                        <Link to={`${item.videoLink}`} target="_blank">
                                                            <button
                                                                type="button"
                                                                className="absolute left-1/2 top-1/3 grid h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/3 place-content-center rounded-full text-white duration-300 group-hover:scale-110"
                                                            >
                                                                <IconPlayCircle className="h-[62px] w-[62px] " fill={true} />
                                                            </button>
                                                        </Link>
                                                        <p className="font-semibold text-[14px]">{item.videoTitle}</p>
                                                    </SwiperSlide>
                                                );
                                            })}

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
                                    <button className="swiper-button-prev-ex2 grid place-content-center ltr:left-2 rtl:right-2 p-1 transition text-white border border-primary  hover:border-primary bg-primary rounded-full absolute z-[999] top-[44%] -translate-y-1/2">
                                        <IconCaretDown className="w-5 h-5 rtl:-rotate-90 rotate-90" />
                                    </button>
                                    <button className="swiper-button-next-ex2 grid place-content-center ltr:right-2 rtl:left-2 p-1 transition text-white border border-primary  hover:border-primary bg-primary rounded-full absolute z-[999] top-[44%] -translate-y-1/2">
                                        <IconCaretDown className="w-5 h-5 rtl:rotate-90 -rotate-90" />
                                    </button>
                                </>
                            )
                            // ) : (
                            //     <div className="max-w-[350px] h-[200px] rounded-lg bg-gray-200" />
                            // )
                        }
                    </div>
                    <div className="swiper mt-20" id="slider1">
                        {
                            slideImages.length > 0 && (
                                <>
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
                                                    slidesPerView: slideImages.length >= 3 ? 3 : slideImages.length == 2 ? 2 : 1,
                                                    spaceBetween: 30,
                                                },
                                                768: {
                                                    slidesPerView: slideImages.length == 2 ? 2 : 1,
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
                                                        <img src={`${Base_url}/uploads/${item?.homeImage}`} className="w-full object-cover h-[200px] rounded-lg" alt="itemImg" />
                                                    </SwiperSlide>
                                                );
                                            })}
                                        </Swiper>
                                    </div>
                                    <button className="swiper-button-prev-ex1 grid place-content-center ltr:left-2 rtl:right-2 p-1 transition text-white border border-primary  hover:border-primary bg-primary rounded-full absolute z-[999] top-[44%] -translate-y-1/2">
                                        <IconCaretDown className="w-5 h-5 rtl:-rotate-90 rotate-90" />
                                    </button>
                                    <button className="swiper-button-next-ex1 grid place-content-center ltr:right-2 rtl:left-2 p-1 transition text-white border border-primary  hover:border-primary bg-primary rounded-full absolute z-[999] top-[44%] -translate-y-1/2">
                                        <IconCaretDown className="w-5 h-5 rtl:rotate-90 -rotate-90" />
                                    </button>
                                </>
                            )
                            // ) : (
                            //     <div className="max-w-[350px] h-[200px] rounded-lg bg-gray-200" />
                            // )
                        }
                    </div>

                    {/* <Transition appear show={modal} as={Fragment}>
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
                    </Transition> */}
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
                                                <div className="font-bold text-primary text-lg">Verify your Account</div>
                                            </div>
                                            <div className="p-5">
                                                <div className="flex flex-col">
                                                    <div>
                                                        <h3 className="text-primary font-semibold">Package Amount</h3>
                                                        <h1 className="text-2xl text-primary font-bold mb-4">₹{user?.tempPackageAmount}</h1>
                                                        <label htmlFor="transactionId" className="text-[14px] text-primary">
                                                            Your Transaction Id{' '}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="transactionId"
                                                            className="w-full border border-solid border-primary p-2 rounded-md outline-primary"
                                                            onChange={(e) => setTransacrionNumber(e.target.value)}
                                                        />
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
                </div>
            )}
        </>
    );
};

export default Index;
