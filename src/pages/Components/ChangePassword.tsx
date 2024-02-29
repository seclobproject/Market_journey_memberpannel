import React from 'react'
import { Dialog, Transition, Tab } from '@headlessui/react';
import { useState, Fragment } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
interface ChangePasswordProps {
    changeModal: any; // Replace 'any' with the actual type if possible
    modal: any; // Replace 'any' with the actual type if possible
}
const ChangePassword: React.FC<ChangePasswordProps> = ({ changeModal, modal }) => {
    return (
        <div>
            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" open={modal} onClose={changeModal}>
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
                                <Dialog.Panel className="panel border-0 py-1 px-4 rounded-lg overflow-hidden w-full max-w-sm my-8 text-black dark:text-white-dark">
                                    <div className="flex items-center justify-between p-5 font-semibold text-lg dark:text-white">
                                        <h5>Reset Password</h5>

                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="relative mb-4">
                                                
                                                <input type="email" placeholder="Email" className="form-input ltr:pl-10 rtl:pr-10" id="name" />
                                            </div>
                                          
                                            <div className="relative mb-4">
                                                
                                                <input type="password" placeholder="NewPassword" className="form-input ltr:pl-10 rtl:pr-10" id="password" />
                                            </div>
                                            <button type="button" className="btn btn-primary w-full">
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                   
                                    
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default ChangePassword