import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Analytics from './Analytics';
import { Dialog, Transition } from '@headlessui/react';
import IconPlayCircle from '../components/Icon/IconPlayCircle';
import IconX from '../components/Icon/IconX';
import IconPlus from '../components/Icon/IconPlus';
import IconCreditCard from '../components/Icon/IconCreditCard';
import { Base_url } from '../Services/Api';

const Index = () => {
    const [modal, setModal] = useState(false);
    const [pendingModal, setPendingModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showSelectDocumentMessage, setShowSelectDocumentMessage] = useState(false);
    const [updateStatus, setUpdatedStatus] = useState<string | null>(null);
    console.log(updateStatus);

    const fetchData = async () => {
        try {
            const userStatus = await localStorage.getItem('status');
            setUpdatedStatus(userStatus);
            if (userStatus === 'pending') {
                setPendingModal(true);
                console.log(pendingModal);
            }
        } catch (error) {
            console.error('Error fetching user status:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const closePendingModal = () => {
        setPendingModal(false);
    };
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
                const screenshot = new FormData();
                screenshot.append('screenshot', selectedFile, selectedFile?.name);
                const response = await axios.post(`${Base_url}/api/user/user-verification`, screenshot, config);
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
                    <div className="bg-yellow-400 p-4 max-w-[150px] text-white font-bold mb-2 rounded-md">
                        <h4>{updateStatus}</h4>
                    </div>
                )}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div className="panel h-full">
                        <div className="flex justify-between dark:text-white-light mb-5">
                            <h5 className="font-semibold text-lg ">Wallet Amount</h5>
                        </div>
                        <div className=" text-[#e95f2b] text-3xl font-bold my-10">
                            <span>$ 45,141 </span>
                        </div>
                    </div>

                    <div
                        className="panel h-full overflow-hidden before:bg-[#1937cc] before:absolute before:-right-44 before:top-0 before:bottom-0 before:m-auto before:rounded-full before:w-96 before:h-96 grid grid-cols-1 content-between"
                        style={{ background: 'linear-gradient(0deg,#00c6fb -227%,#005bea)' }}
                    >
                        <div className="flex items-start justify-between text-white-light mb-16 z-[7]">
                            <h5 className="font-semibold text-lg">Total Balance</h5>

                            <div className="relative text-xl whitespace-nowrap">
                                $ 41,741.42
                                <span className="table text-[#d3d3d3] bg-[#4361ee] rounded p-1 text-xs mt-1 ltr:ml-auto rtl:mr-auto">+ 2453</span>
                            </div>
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
                            <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#4361ee] z-10">
                                Upgrade
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-10 lg:mt-16">
                    {/* <h3 className="mb-6 text-xl font-bold md:text-3xl">Popular Video Tutorial</h3> */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {items.map((item: any, i) => {
                            return (
                                <div
                                    key={i}
                                    className="space-y-5 rounded-md border border-white-light bg-white p-5 shadow-[0px_0px_2px_0px_rgba(145,158,171,0.20),0px_12px_24px_-4px_rgba(145,158,171,0.12)] dark:border-[#1B2E4B] dark:bg-black"
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
                                                <div className="font-bold text-lg">Upload Document First</div>
                                            </div>
                                            <div className="p-5">
                                                <div className="flex flex-col">
                                                    <div>
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
