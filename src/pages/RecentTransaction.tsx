import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import IconCreditCard from '../components/Icon/IconCreditCard';
import { ApiCall } from '../Services/Api';
import { withDrawalRequestUrl } from '../utils/EndPoints';
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
        status: 'Complete',
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
const RecentTransaction = () => {
    const [requestModal, setRequestModal] = useState(false);
    const [withdrawalDetails,setWithdrawalDetails]=useState({})

    const handleRequestWithdrawal = async(e:React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await ApiCall('post', withDrawalRequestUrl, withdrawalDetails);
            console.log(response);

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setWithdrawalDetails({
                    amount: '',
                    tdsAmount: '',
                    totalAmount: '',
                });
                setRequestModal(false)
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };
    return (
        <>
            <div className="panel">
                <div className="flex justify-between items-center mb-5">
                    <h5 className="font-semibold text-warning text-lg dark:text-white-light">Recent Transaction</h5>
                </div>
                <div className="panel lg:h-[100px]  sm:h-auto flex gap-4  items-center justify-around bg-[#00335B] text-white mb-3 max-w-sm">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-[25px] font-semibold">₹400006</h1>
                        <h5 className="font-semibold text-md text-warning">Your Balance</h5>
                    </div>
                    <div className="flex h-full justify-between items-center  dark:text-white-light">
                        <img src="/public/assets/images/wallet.svg" alt="" />
                    </div>
                </div>
                <button onClick={() => setRequestModal(true)} className="panel flex items-center ml-auto mb-3  p-2 text-base bg-primary text-white justify-center max-w-[220px] w-full ">
                    Request withdrawal cash
                </button>
                <div className="table-responsive mb-5">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Level</th>
                                <th>Date</th>
                                <th> Amount</th>
                                <th> Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((data) => {
                                return (
                                    <tr key={data.id}>
                                        <td>
                                            <div className="whitespace-nowrap">{data.name}</div>
                                        </td>

                                        <td>{data.sale}</td>
                                        <td>{data.date}</td>
                                        <td>{data.sale}</td>
                                        <td>
                                            <div
                                                className={`whitespace-nowrap ${
                                                    data.status === 'accept' ? 'text-success' : data.status === 'Pending' ? 'text-warning' : data.status === 'Canceled' ? 'text-danger' : 'text-success'
                                                }`}
                                            >
                                                {data.status}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <Transition appear show={requestModal} as={Fragment}>
                    <Dialog
                        as="div"
                        open={requestModal}
                        onClose={() => {
                            setRequestModal(false);
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
                                    <Dialog.Panel className="panel border-0 py-1 px-4 rounded-lg overflow-hidden w-full max-w-[500px] my-8 text-black dark:text-white-dark">
                                        <div className="flex items-center justify-between p-5 font-semibold text-lg dark:text-white">
                                            <h5 className="text-warning">Request Withdrawal</h5>
                                            <button type="button" onClick={() => setRequestModal(false)} className="text-white-dark hover:text-dark text-[28px] p-2">
                                                ×
                                            </button>
                                        </div>
                                        <div className="p-5">
                                            <form className="space-y-5 dark:text-white flex flex-col items-center " onSubmit={handleRequestWithdrawal}>
                                                <div className="flex  w-full flex-col lg:flex-row gap-5 lg:flex-wrap">
                                                    <div className="space-y-5 w-full">
                                                        <div>
                                                            <label htmlFor="Name">Amount</label>
                                                            <div className="relative text-white-dark">
                                                                <input
                                                                    onChange={(e) => {
                                                                        setWithdrawalDetails({ ...withdrawalDetails, amount: e.target.value });
                                                                    }}
                                                                    id="Name"
                                                                    type="text"
                                                                    placeholder="Enter Name"
                                                                    className="form-input ps-10 placeholder:text-white-dark"
                                                                />
                                                                <span className="absolute start-4 top-1/2 -translate-y-1/2">{/* <IconUser fill={true} /> */}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex  w-full flex-col lg:flex-row gap-5 lg:flex-wrap">
                                                    <div className="space-y-5  w-full">
                                                        <div>
                                                            <label htmlFor="Name">TDS Amount</label>
                                                            <div className="relative text-white-dark">
                                                                <input
                                                                    onChange={(e) => {
                                                                        setWithdrawalDetails({ ...withdrawalDetails, tdsAmount: e.target.value });
                                                                    }}
                                                                    id="Name"
                                                                    type="text"
                                                                    placeholder="Enter Name"
                                                                    className="form-input ps-10 placeholder:text-white-dark"
                                                                />
                                                                <span className="absolute start-4 top-1/2 -translate-y-1/2">{/* <IconUser fill={true} /> */}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex  w-full flex-col lg:flex-row gap-5 lg:flex-wrap">
                                                    <div className="space-y-5 w-full">
                                                        <div>
                                                            <label htmlFor="Name">Total Amount</label>
                                                            <div className="relative text-white-dark">
                                                                <input
                                                                    onChange={(e) => {
                                                                        setWithdrawalDetails({ ...withdrawalDetails, totalAmount: e.target.value });
                                                                    }}
                                                                    id="Name"
                                                                    type="text"
                                                                    placeholder="Enter Name"
                                                                    className="form-input ps-10 placeholder:text-white-dark"
                                                                />
                                                                <span className="absolute start-4 top-1/2 -translate-y-1/2">{/* <IconUser fill={true} /> */}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="flex w-full
                                                 justify-center gap-4"
                                                >
                                                    <button
                                                        onClick={() => setRequestModal(false)}
                                                        className="btn bg-primary text-white !mt-6 w-full max-w-[150px] border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                                                    >
                                                        cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="btn bg-primary text-white !mt-6 w-full max-w-[150px] border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                                                    >
                                                        Submit
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
            </div>
        </>
    );
};

export default RecentTransaction;
