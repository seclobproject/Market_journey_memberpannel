import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { ApiCall } from '../Services/Api';
import { addAndEditDematAccounturl, allDematAccountsurl } from '../utils/EndPoints';
import { Show_Toast } from './Components/Toast';


const DematAccount = () => {
    const [allAccounts, setAllAccount] = useState<any>([]);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    // const [deleteModal, setDeleteModal] = useState(false);
    const [dematDetails, setDematDetails] = useState({
        name: '',
        phone: '',
        demateUserName: '',
        email: '',
        address: '',
    });
    const [AccountId, setAccountId] = useState('');

    useEffect(() => {
        getAllAccountList();
    }, []);

    //----------- get all demat account ----------

    const getAllAccountList = async () => {
        try {
            const response = await ApiCall('get', allDematAccountsurl);

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setAllAccount(response?.data?.demateAccounts);
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };

    //----- add Demat Account -------

    const handleAddDematAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response: any = await ApiCall('post', addAndEditDematAccounturl, dematDetails);
            if (response.status === 200) {
                setAddModal(false);
                 getAllAccountList();
                setDematDetails({
                    name: '',
                    phone: '',
                    demateUserName: '',
                    email: '',
                    address: '',
                });
                Show_Toast({ message: 'Add Demat Account success', type: true });
            }
        } catch (error: any) {
            console.log(error?.response?.data?.message);
            Show_Toast({ message: error?.response?.data?.message, type: false });
        }
    };
    //-------- add Demat Account end ---------

    //----- edit Demat Account -------

    const handleEditDematAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response: any = await ApiCall('post', addAndEditDematAccounturl, dematDetails, { id: AccountId });
            console.log('====================================');
            console.log(response);
            console.log('====================================');
            if (response.status === 200) {
                setEditModal(false);
                getAllAccountList()
                setDematDetails({
                    name: '',
                    phone: '',
                    demateUserName: '',
                    email: '',
                    address: '',
                });
                Show_Toast({ message: 'Edit Demat Account success', type: true });
            }
        } catch (error: any) {
            console.log(error?.response?.data?.message);
            Show_Toast({ message: error?.response?.data?.message, type: false });
        }
    };
    //-------- edit Demat Account end ---------

    const handleEdit = (id: string) => {
        setEditModal(true);
        setAccountId(id);
    };
    // const handleDelete = (id: string) => {
    //     setDeleteModal(true);
    //     setAccountId(id);
    // };
    return (
        <>
            {/* <div className={`panel ${reports.length >= 10 ? 'min-h-[95vh]' : 'h-full'}`}> */}
            <div className={`panel 'h-full'}`}>
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-warning text-lg dark:text-white-light">Demat Account</h5>
                    <button
                        onClick={() => setAddModal(true)}
                        className="panel flex items-center overflow-x-auto whitespace-nowrap p-2 text-base bg-warning text-white justify-center max-w-[100px] w-full "
                    >
                        Add
                    </button>
                </div>
                <div className="table-responsive mb-5">
                    <table>
                        <thead>
                            <tr>
                                <th>SIno</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Demat Username</th>
                                <th> Email</th>
                                <th> Address</th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allAccounts?.length > 0 ? (
                                allAccounts.map((data: any, index: number) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="font-medium text-base">{index + 1}</div>
                                        </td>
                                        <td className="font-medium text-base">{data?.name}</td>

                                        <td>
                                            <div className="whitespace-nowrap font-medium text-base">{data?.phone}</div>
                                        </td>
                                        <td className="font-medium text-base">{data?.demateUserName}</td>

                                        <td className="font-medium text-base">{data?.email}</td>

                                        <td className="text-center font-medium text-base">{data?.address}</td>
                                        <td className="text-center flex gap-5 items-center">
                                            <i onClick={() => handleEdit(data?._id)} className="fa-solid fa-pen text-blue-600 cursor-pointer"></i>
                                            {/* <i onClick={() => handleDelete(data?._id)} className="fa-solid fa-trash text-red-500 cursor-pointer"></i> */}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: 'center' }}>
                                        {allAccounts?.length === 0 ? (
                                            <span className="align-middle m-auto mb-10">No Member</span>
                                        ) : (
                                            <span className="animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-primary border-r-primary rounded-full w-14 h-14 inline-block align-middle m-auto mb-10"></span>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Transition appear show={addModal} as={Fragment}>
                <Dialog
                    as="div"
                    open={addModal}
                    onClose={() => {
                        setAddModal(false);
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
                                        <h5 className="text-warning">Add Demat Account</h5>
                                        <button type="button" onClick={() => setAddModal(false)} className="text-white-dark hover:text-dark text-[28px] p-2">
                                            ×
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <form className="space-y-3 dark:text-white flex flex-col items-center " onSubmit={handleAddDematAccount}>
                                            <div className="flex  w-full flex-col lg:flex-row gap-5 lg:flex-wrap">
                                                <div className="space-y-5 w-full">
                                                    <div>
                                                        <label htmlFor="Name">Name</label>
                                                        <div className="relative text-white-dark">
                                                            <input
                                                                onChange={(e) => {
                                                                    setDematDetails({ ...dematDetails, name: e.target.value });
                                                                }}
                                                                id="Name"
                                                                // value={withdrawalRequest.withdrawAmount}
                                                                type="text"
                                                                required
                                                                placeholder="Enter Name"
                                                                className="form-input ps-5 placeholder:text-white-dark"
                                                            />
                                                            <span className="absolute start-4 top-1/2 -translate-y-1/2">{/* <IconUser fill={true} /> */}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex  w-full flex-col lg:flex-row gap-5 lg:flex-wrap">
                                                <div className="space-y-5  w-full">
                                                    <div>
                                                        <label htmlFor="phone">Phone</label>
                                                        <div className="relative text-white-dark">
                                                            <input
                                                                onChange={(e) => {
                                                                    setDematDetails({ ...dematDetails, phone: e.target.value });
                                                                }}
                                                                id="phone"
                                                                type="text"
                                                                required
                                                                placeholder="Enter Phone number"
                                                                className="form-input ps-5 placeholder:text-white-dark"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex  w-full flex-col lg:flex-row gap-5 lg:flex-wrap">
                                                <div className="space-y-5 w-full">
                                                    <div>
                                                        <label htmlFor="username">Demat Username</label>
                                                        <div className="relative text-white-dark">
                                                            <input
                                                                onChange={(e) => {
                                                                    setDematDetails({ ...dematDetails, demateUserName: e.target.value });
                                                                }}
                                                                id="username"
                                                                required
                                                                type="text"
                                                                placeholder="Enter your Demat username"
                                                                className="form-input ps-5 placeholder:text-white-dark"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex  w-full flex-col lg:flex-row gap-5 lg:flex-wrap">
                                                <div className="space-y-5 w-full">
                                                    <div>
                                                        <label htmlFor="email">Email</label>
                                                        <div className="relative text-white-dark">
                                                            <input
                                                                onChange={(e) => {
                                                                    setDematDetails({ ...dematDetails, email: e.target.value });
                                                                }}
                                                                id="email"
                                                                type="email"
                                                                placeholder="Enter email"
                                                                required
                                                                className="form-input ps-5 placeholder:text-white-dark"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex  w-full flex-col lg:flex-row gap-5 lg:flex-wrap">
                                                <div className="space-y-5 w-full">
                                                    <div>
                                                        <label htmlFor="address">Address</label>
                                                        <div className="relative text-white-dark">
                                                            <input
                                                                onChange={(e) => {
                                                                    setDematDetails({ ...dematDetails, address: e.target.value });
                                                                }}
                                                                id="address"
                                                                required
                                                                type="text"
                                                                placeholder="Enter your address"
                                                                className="form-input ps-5 placeholder:text-white-dark"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="flex w-full
                                                 justify-center gap-4"
                                            >
                                                <button
                                                    onClick={() => setAddModal(false)}
                                                    className="btn bg-primary text-white !mt-6 w-full max-w-[150px] border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                                                >
                                                    cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="btn bg-primary text-white !mt-6 w-full max-w-[150px] border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <Transition appear show={editModal} as={Fragment}>
                <Dialog
                    as="div"
                    open={editModal}
                    onClose={() => {
                        setEditModal(false);
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
                                        <h5 className="text-warning">Edit Demat Account</h5>
                                        <button type="button" onClick={() => setEditModal(false)} className="text-white-dark hover:text-dark text-[28px] p-2">
                                            ×
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <form className="space-y-3 dark:text-white flex flex-col items-center " onSubmit={handleEditDematAccount}>
                                            <div className="flex  w-full flex-col lg:flex-row gap-5 lg:flex-wrap">
                                                <div className="space-y-5 w-full">
                                                    <div>
                                                        <label htmlFor="Name">Name</label>
                                                        <div className="relative text-white-dark">
                                                            <input
                                                                onChange={(e) => {
                                                                    setDematDetails({ ...dematDetails, name: e.target.value });
                                                                }}
                                                                id="Name"
                                                                // value={withdrawalRequest.withdrawAmount}
                                                                type="text"
                                                                placeholder="Enter Name"
                                                                className="form-input ps-5 placeholder:text-white-dark"
                                                            />
                                                            <span className="absolute start-4 top-1/2 -translate-y-1/2">{/* <IconUser fill={true} /> */}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex  w-full flex-col lg:flex-row gap-5 lg:flex-wrap">
                                                <div className="space-y-5  w-full">
                                                    <div>
                                                        <label htmlFor="phone">Phone</label>
                                                        <div className="relative text-white-dark">
                                                            <input
                                                                onChange={(e) => {
                                                                    setDematDetails({ ...dematDetails, phone: e.target.value });
                                                                }}
                                                                id="phone"
                                                                type="text"
                                                                placeholder="Enter Phone number"
                                                                className="form-input ps-5 placeholder:text-white-dark"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex  w-full flex-col lg:flex-row gap-5 lg:flex-wrap">
                                                <div className="space-y-5 w-full">
                                                    <div>
                                                        <label htmlFor="username">Demat Username</label>
                                                        <div className="relative text-white-dark">
                                                            <input
                                                                onChange={(e) => {
                                                                    setDematDetails({ ...dematDetails, demateUserName: e.target.value });
                                                                }}
                                                                id="username"
                                                                type="text"
                                                                placeholder="Enter your Demat username"
                                                                className="form-input ps-5 placeholder:text-white-dark"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex  w-full flex-col lg:flex-row gap-5 lg:flex-wrap">
                                                <div className="space-y-5 w-full">
                                                    <div>
                                                        <label htmlFor="email">Email</label>
                                                        <div className="relative text-white-dark">
                                                            <input
                                                                onChange={(e) => {
                                                                    setDematDetails({ ...dematDetails, email: e.target.value });
                                                                }}
                                                                id="email"
                                                                type="email"
                                                                placeholder="Enter email"
                                                                className="form-input ps-5 placeholder:text-white-dark"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex  w-full flex-col lg:flex-row gap-5 lg:flex-wrap">
                                                <div className="space-y-5 w-full">
                                                    <div>
                                                        <label htmlFor="address">Address</label>
                                                        <div className="relative text-white-dark">
                                                            <input
                                                                onChange={(e) => {
                                                                    setDematDetails({ ...dematDetails, address: e.target.value });
                                                                }}
                                                                id="address"
                                                                type="text"
                                                                placeholder="Enter your address"
                                                                className="form-input ps-5 placeholder:text-white-dark"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="flex w-full
                                                 justify-center gap-4"
                                            >
                                                <button
                                                    onClick={() => setEditModal(false)}
                                                    className="btn bg-warning text-white !mt-6 w-full max-w-[150px] border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                                                >
                                                    cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="btn bg-primary text-white !mt-6 w-full max-w-[150px] border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            {/*   */}
        </>
    );
};

export default DematAccount;
