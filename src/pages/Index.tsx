import React, { Fragment, useState } from 'react';
import Analytics from './Analytics';
import { Dialog, Transition } from '@headlessui/react';
import IconPlayCircle from '../components/Icon/IconPlayCircle';
import IconX from '../components/Icon/IconX';
import IconPlus from '../components/Icon/IconPlus';
import IconCreditCard from '../components/Icon/IconCreditCard';

const Index = () => {
    const [modal, setModal] = useState(false);
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
        <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="panel h-full">
                    <div className="flex justify-between dark:text-white-light mb-5">
                        <h5 className="font-semibold text-lg ">Wallet Amount</h5>

                        {/* <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:text-primary"
                                    button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                                >
                                    <ul>
                                        <li>
                                            <button type="button">This Week</button>
                                        </li>
                                        <li>
                                            <button type="button">Last Week</button>
                                        </li>
                                        <li>
                                            <button type="button">This Month</button>
                                        </li>
                                        <li>
                                            <button type="button">Last Month</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div> */}
                    </div>
                    <div className=" text-[#e95f2b] text-3xl font-bold my-10">
                        <span>$ 45,141 </span>
                        {/* <span className="text-black text-sm dark:text-white-light ltr:mr-2 rtl:ml-2">this week</span>
                            <IconTrendingUp className="text-success inline" /> */}
                    </div>
                    {/* <div className="flex items-center justify-between">
                            <div className="w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:shadow-none dark:bg-dark-light/10">
                                <div
                                    className="bg-gradient-to-r from-[#4361ee] to-[#805dca] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto"
                                    style={{ width: '65%' }}
                                ></div>
                            </div>
                            <span className="ltr:ml-5 rtl:mr-5 dark:text-white-light">57%</span>
                        </div> */}
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
    );
};

export default Index;
