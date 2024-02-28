import React, { Fragment, useState } from 'react';
import Tippy from '@tippyjs/react';
import IconTrashLines from '../components/Icon/IconTrashLines';
import { Dialog, Transition } from '@headlessui/react';
import { CloseButton } from '@mantine/core';
import { CrossIcon } from 'react-select/dist/declarations/src/components/indicators';
const tableData = [
    {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@yahoo.com',
        date: '10/08/2020',
        sale: 120,
        status: 'Complete',
        register: '5 min ago',
        progress: '40%',
        position: 'Developer',
        office: 'London',
    },
    {
        id: 2,
        name: 'Shaun Park',
        email: 'shaunpark@gmail.com',
        date: '11/08/2020',
        sale: 400,
        status: 'Pending',
        register: '11 min ago',
        progress: '23%',
        position: 'Designer',
        office: 'New York',
    },
    {
        id: 3,
        name: 'Alma Clarke',
        email: 'alma@gmail.com',
        date: '12/02/2020',
        sale: 310,
        status: 'In Progress',
        register: '1 hour ago',
        progress: '80%',
        position: 'Accountant',
        office: 'Amazon',
    },
    {
        id: 4,
        name: 'Vincent Carpenter',
        email: 'vincent@gmail.com',
        date: '13/08/2020',
        sale: 100,
        status: 'Canceled',
        register: '1 day ago',
        progress: '60%',
        position: 'Data Scientist',
        office: 'Canada',
    },
];
const Member = () => {
        const [addModal, setAddModal] = useState(false);
    return (
        <div className="panel">
            <div className="flex items-center justify-between mb-5">
                <h5 className="font-semibold text-lg dark:text-white-light">Member</h5>
                <button
                    onClick={() => setAddModal(true)}
                    className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-base bg-primary text-white justify-center max-w-[100px] w-full "
                >
                    Add
                </button>
            </div>
            <div className="table-responsive mb-5">
                <table>
                    <thead>
                        <tr>
                            <th>sponser name</th>
                            <th>Name</th>
                            <th> franchise</th>
                            <th> phone</th>
                            <th> Package Amount</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((data) => {
                            return (
                                <tr key={data.id}>
                                    <td>
                                        <div className="whitespace-nowrap">{data.name}</div>
                                    </td>
                                    <td>{data.date}</td>
                                    <td>{data.sale}</td>

                                    <td className="text-center">
                                        <Tippy content="Delete">
                                            <button type="button">
                                                <IconTrashLines className="m-auto" />
                                            </button>
                                        </Tippy>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <Transition appear show={addModal} as={Fragment}>
                    <Dialog
                        as="div"
                        open={addModal}
                        onClose={() => {
                            setAddModal(false);
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
                                    <Dialog.Panel className="panel border-0 py-1 px-4 rounded-lg overflow-hidden w-full max-w-sm my-8 text-black dark:text-white-dark">
                                        <div className="flex items-center justify-between p-5 font-semibold text-lg dark:text-white">
                                            <h5>Add Member</h5>
                                            <button type="button" onClick={() => setAddModal(false)} className="text-white-dark hover:text-dark text-[28px] p-2">
                                                ×
                                            </button>
                                        </div>
                                        <div className="p-5">
                                            <form>
                                                <div className="relative mb-4">
                                                    <span className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 dark:text-white-dark">
                                                        <svg>...</svg>
                                                    </span>
                                                    <input type="text" placeholder="Name" className="form-input ltr:pl-10 rtl:pr-10" id="name" />
                                                </div>
                                                <div className="relative mb-4">
                                                    <span className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 dark:text-white-dark">
                                                        <svg>...</svg>
                                                    </span>
                                                    <input type="email" placeholder="Email" className="form-input ltr:pl-10 rtl:pr-10" id="email" />
                                                </div>
                                                <div className="relative mb-4">
                                                    <span className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 dark:text-white-dark">
                                                        <svg>...</svg>
                                                    </span>
                                                    <input type="text" placeholder="Phone" className="form-input ltr:pl-10 rtl:pr-10" id="phone" />
                                                </div>
                                                <div className="relative mb-4">
                                                    <span className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 dark:text-white-dark">
                                                        <svg>...</svg>
                                                    </span>
                                                    <input type="password" placeholder="Password" className="form-input ltr:pl-10 rtl:pr-10" id="password" />
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
        </div>
    );
};

export default Member;
