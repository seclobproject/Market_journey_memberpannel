import React from 'react';

const Subscriptions = () => {
    return (
        <div>
            <div className="panel min-h-[200px] max-w-md sm:h-auto flex  rounded-[14px] justify-between bg-[#00335B] text-white relative">
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
                <img className="absolute right-0 top-0 h-[95%] z-0" src="/public/assets/images/subscription.png" alt="" />
            </div>

            <div className="mt-4 flex flex-col gap-2 ">
              <h1 className='text-xl font-semibold mt-5'>Transaction History</h1>
              <div className='w-full h-[1.8px] bg-warning mb-2'></div>
                <div className="w-full flex justify-between min-h-[100px] bg-primary rounded-3xl p-4">
                    <div className="flex gap-4">
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

                        <div className="flex flex-col">
                            <h4 className="text-white text-lg">Name</h4>
                            <h6 className="text-gray-400">first level</h6>
                            <span className="text-gray-400">20-07-2024</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-white font-bold text-lg">₹56788</h3>
                        <span
                            className="text-white bg-green-500 px-2 py-1 rounded-[10px]
              {status === 'accepted' ? 'bg-green-500' : status === 'rejected' ? 'bg-red' : 'bg-yellow'}"
                        >
                            Accepted
                        </span>
                    </div>
                </div>
                <div className="w-full flex justify-between min-h-[100px] bg-primary rounded-3xl p-4">
                    <div className="flex gap-4">
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
                        <div className="flex flex-col">
                            <h4 className="text-white text-lg">Name</h4>
                            <h6 className="text-gray-400">first level</h6>
                            <span className="text-gray-400">20-07-2024</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-white font-bold text-lg">₹56788</h3>
                        <span
                            className="text-white bg-yellow-500 px-2 py-1 rounded-[10px]
              {status === 'accepted' ? 'bg-green-500' : status === 'rejected' ? 'bg-red' : 'bg-yellow'}"
                        >
                            Pending
                        </span>
                    </div>
                </div>
                <div className="w-full flex justify-between min-h-[100px] bg-primary rounded-3xl p-4">
                    <div className="flex gap-4">
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
                        <div className="flex flex-col">
                            <h4 className="text-white text-lg">Name</h4>
                            <h6 className="text-gray-400">first level</h6>
                            <span className="text-gray-400">20-07-2024</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-white font-bold text-lg">₹56788</h3>
                        <span
                            className="text-white bg-red-500 px-2 py-1 rounded-[10px]
              {status === 'accepted' ? 'bg-green-500' : status === 'rejected' ? 'bg-red' : 'bg-yellow'}"
                        >
                            Regected
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscriptions;
