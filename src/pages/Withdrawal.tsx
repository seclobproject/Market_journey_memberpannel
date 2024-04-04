import React, { ChangeEvent, FormEvent, Fragment, ReactEventHandler, useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import IconTrashLines from '../components/Icon/IconTrashLines';
import { Dialog, Transition } from '@headlessui/react';
import IconCreditCard from '../components/Icon/IconCreditCard';
import { ApiCall } from '../Services/Api';
import { withdrawalHistoryUrl, withdrawalRequestUrl } from '../utils/EndPoints';
import { Show_Toast } from './Components/Toast';
import IconUser from '../components/Icon/IconUser';

const Withdrawal = () => {
    const [requestModal, setRequestModal] = useState(false);
    const [withdrawalHistory, setWithdrawalHistory] = useState<any>();
    const [walletAmount,setWalletAmount]=useState();
    const [withdrawalRequest, setWithdrawalRequest] = useState({ withdrawAmount: '' });
    const [tdsAmount, setTdsAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        getWithdrawalHistory();
    }, []);

    //-------------- get withdrawal history------------

    const getWithdrawalHistory = async () => {
        try {
            const response = await ApiCall('get', withdrawalHistoryUrl);

            if (response instanceof Error) {
                console.error('Error fetching allMembers list:', response.message);
            } else if (response.status === 200) {
                setWalletAmount(response?.data?.walletAmount);
                 const FormatedReport = response?.data?.walletWithdrawHistory.map((item: any) => ({
                     ...item,
                     createdAt: formatTimestamp(item.createdAt),
                 }));
                 setWithdrawalHistory(FormatedReport);
            } else {
                console.error('Error fetching allMembers list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching allMembers list:', error);
        }
    };

    //------- take input value and validation -------------

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const amount = e.target.value;
        if (amount === '') {
            setTdsAmount(0);
            setTotalAmount(0);
            setWithdrawalRequest({ withdrawAmount: '' });
        } else if (/^[0-9]+$/.test(amount)) {
            const withdrawAmount = parseFloat(amount);
            const tenPercentAmount = withdrawAmount * 0.1;
            const totalAmountAfterDeduction = withdrawAmount - tenPercentAmount;

            setTdsAmount(tenPercentAmount);
            setTotalAmount(totalAmountAfterDeduction);
            setWithdrawalRequest({ withdrawAmount: amount });
        }
    };

    // ----------withdrawal Request ---------

    const handleRequestWithdrawal = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response: any = await ApiCall('post', withdrawalRequestUrl, withdrawalRequest);
            console.log(response.error);

            if (response.status === 200) {
                setWithdrawalRequest({
                    withdrawAmount: '',
                });
                setRequestModal(false);
                getWithdrawalHistory()
                Show_Toast({ message: 'withdrawal requested', type: true });
            }
        } catch (error: any) {
            console.log(error?.response?.data?.message);
            Show_Toast({ message: error?.response?.data?.message, type: false });
        }
    };

        const formatTimestamp = (timestamp: string) => {
            const date = new Date(timestamp);
            const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            return formattedDate;
        };
    return (
        <>
            <div className="panel">
                <div className="flex justify-between items-center mb-5">
                    <h5 className="font-semibold text-warning text-lg dark:text-white-light">Withdrawal</h5>
                </div>
                <div className="panel lg:h-[100px]  sm:h-auto flex gap-4  items-center justify-around bg-[#00335B] text-white mb-3 max-w-sm">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-[25px] font-semibold">₹ {walletAmount}</h1>
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
                                <th>Requested Amount</th>
                                <th>Date</th>
                                <th>TDS Amount</th>
                                <th> Total Amount</th>
                                <th> Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {withdrawalHistory?.map((data: any) => {
                                return (
                                    <tr key={data?._id}>
                                        <td>
                                            <div className="whitespace-nowrap">₹ {data?.requestedAmount}</div>
                                        </td>
                                        <td>{data?.createdAt}</td>
                                        <td>{data?.TDS}</td>
                                        <td>₹ {data?.releasedAmount}</td>
                                        <td>
                                            <div
                                                className={`whitespace-nowrap w-fit px-2 py-1 text-white rounded-md ${
                                                    data.status === 'Approved' ? 'bg-success' : data.status === 'Pending' ? 'bg-yellow-400' : 'bg-red-600'
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
                                                            <label htmlFor="Amount">Amount</label>
                                                            <div className="relative text-white-dark">
                                                                <input
                                                                    onChange={handleInputChange}
                                                                    id="Name"
                                                                    // value={withdrawalRequest.withdrawAmount}
                                                                    type="number"
                                                                    required
                                                                    placeholder="Enter Amount"
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
                                                            <label htmlFor="TDSAmount">TDS Amount</label>
                                                            <div className="relative text-white-dark">
                                                                {/* <input
                                                                    onChange={(e) => {}}
                                                                    id="Name"
                                                                    type="text"
                                                                    readOnly
                                                                    // placeholder="Enter TDS Amount"
                                                                    className="form-input ps-10 placeholder:text-white-dark"
                                                                /> */}
                                                                <span className=" start-4 top-1/2 -translate-y-1/2">{tdsAmount}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex  w-full flex-col lg:flex-row gap-5 lg:flex-wrap">
                                                    <div className="space-y-5 w-full">
                                                        <div>
                                                            <label htmlFor="TotalAmount">Total Amount</label>
                                                            <div className="relative text-white-dark">
                                                                {/* <input
                                                                    onChange={(e) => {}}
                                                                    id="Name"
                                                                    type="text"
                                                                    readOnly
                                                                    // placeholder="Enter Total Amount"
                                                                    className="form-input ps-10 placeholder:text-white-dark"
                                                                /> */}
                                                                <span className=" start-4 top-1/2 -translate-y-1/2">{totalAmount}</span>
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

export default Withdrawal;
