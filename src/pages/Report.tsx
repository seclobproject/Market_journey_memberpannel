import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import IconTrashLines from '../components/Icon/IconTrashLines';
import { ApiCall } from '../Services/Api';
import { AllReportUrl, AutoPoolReportUrl, BonusReportUrl, DirectReportUrl, InDirectReportUrl, LevelIncomeReportUrl } from '../utils/EndPoints';
import InfiniteScroll from 'react-infinite-scroll-component';
import { formatDateAndTime } from '../utils/FormateDate';
import { Pagination, Stack } from '@mui/material';

const Report = () => {
    const [activeButton, setActiveButton] = useState('transactions');
    const [reports, setReports] = useState<any>([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [loading, setLoading] = useState(false);
    const [totalReports, setTotalReports] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [params, setParams] = useState({
        page: 1,
        pageSize: 10,
    });
    const startIndex = (params.page - 1) * params.pageSize;
    useEffect(() => {
        if (activeButton === 'transactions') {
            AllReport();
        } else if (activeButton === 'directIncome') {
            DirectReport();
        } else if (activeButton === 'inDirectIncome') {
            InDirectReport();
        } else if (activeButton === 'levelIncome') {
            LevelIncomeReport();
        } else if (activeButton === 'autoPoolCreditHistory') {
            AutoPoolReport();
        } else if (activeButton === 'bonus') {
            BonusReport();
        }
    }, [params]);

    // pagination
    const handlePageChange = (event: any, newPage: number) => {
        setParams((prevParams) => ({
            ...prevParams,
            page: newPage,
        }));
    };

    //-------- All income transaction -------------

    const AllReport = async () => {
        setActiveButton('transactions');
        try {
            setLoading(true);
            const response = await ApiCall('get', AllReportUrl, '', { page: params?.page, pageSize: params?.pageSize });
            if (response instanceof Error) {
                console.error('Error fetching  Direct Icome list:', response.message);
            } else if (response.status === 200) {
                setTotalReports(response?.data?.pagination?.totalDocs);
                setTotalPages(response?.data?.pagination?.totalPages);
                const FormatedReport = response?.data?.transactions.map((item: any) => ({
                    ...item,
                    createdAt: formatDateAndTime(item.createdAt),
                }));
                setReports(FormatedReport);
                setLoading(false);
            } else {
                console.error('Error fetching Direct Icome list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching Direct Icome list:', error);
        } finally {
            setLoading(false);
        }
    };
    //-------- direct income -------------

    const DirectReport = async () => {
        setActiveButton('directIncome');
        try {
            setLoading(true);
            const response = await ApiCall('get', DirectReportUrl, '', { page: params?.page, pageSize: params?.pageSize });

            if (response instanceof Error) {
                console.error('Error fetching  Direct Icome list:', response.message);
            } else if (response.status === 200) {
                setTotalIncome(response?.data?.totalIncome);
                setTotalReports(response?.data?.pagination?.totalDocs);
                setTotalPages(response?.data?.pagination?.totalPages);
                const FormatedReport = response?.data?.directIncome.map((item: any) => ({
                    ...item,
                    createdAt: formatDateAndTime(item.createdAt),
                }));
                setReports(FormatedReport);
                setLoading(false);
            } else {
                console.error('Error fetching Direct Icome list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching Direct Icome list:', error);
        } finally {
            setLoading(false);
        }
    };

    // -------InDirect income --------------
    const InDirectReport = async () => {
        setActiveButton('inDirectIncome');
        try {
            setLoading(true);
            const response = await ApiCall('get', InDirectReportUrl, '', { page: params?.page, pageSize: params?.pageSize });

            if (response instanceof Error) {
                console.error('Error fetching InDirect list:', response.message);
            } else if (response.status === 200) {
                setTotalIncome(response?.data?.totalIncome);
                setTotalReports(response?.data?.pagination?.totalDocs);
                setTotalPages(response?.data?.pagination?.totalPages);
                const FormatedReport = response?.data?.inDirectIncome.map((item: any) => ({
                    ...item,
                    createdAt: formatDateAndTime(item.createdAt),
                }));
                setReports(FormatedReport);
                setLoading(false);
            } else {
                console.error('Error fetching InDirect list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching InDirect list:', error);
        } finally {
            setLoading(false);
        }
    };

    // -------Level Income--------------

    const LevelIncomeReport = async () => {
        setActiveButton('levelIncome');
        try {
            setLoading(true);
            const response = await ApiCall('get', LevelIncomeReportUrl, '', { page: params?.page, pageSize: params?.pageSize });

            if (response instanceof Error) {
                console.error('Error fetching levelIncome list:', response.message);
            } else if (response.status === 200) {
                setTotalIncome(response?.data?.totalIncome);
                setTotalReports(response?.data?.pagination?.totalDocs);
                setTotalPages(response?.data?.pagination?.totalPages);
                const FormatedReport = response?.data?.levelIncome.map((item: any) => ({
                    ...item,
                    createdAt: formatDateAndTime(item.createdAt),
                }));
                setReports(FormatedReport);
                setLoading(false);
            } else {
                console.error('Error fetching levelIncome list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching levelIncome list:', error);
        } finally {
            setLoading(false);
        }
    };
    // -------Auto pool report--------------

    const AutoPoolReport = async () => {
        setActiveButton('autoPoolCreditHistory');
        try {
            setLoading(true);
            const response = await ApiCall('get', AutoPoolReportUrl, '', { page: params?.page, pageSize: params?.pageSize });

            if (response instanceof Error) {
                console.error('Error fetching auto pool list:', response.message);
            } else if (response.status === 200) {
                setTotalIncome(response?.data?.totalIncome);
                setTotalReports(response?.data?.pagination?.totalDocs);
                setTotalPages(response?.data?.pagination?.totalPages);
                const FormatedReport = response?.data?.autoPoolCreditHistory.map((item: any) => ({
                    ...item,
                    createdAt: formatDateAndTime(item.createdAt),
                }));
                setReports(FormatedReport);
                setLoading(false);
                // setPaginationDetails(response?.data?.pagination);
            } else {
                console.error('Error fetching auto pool list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching auto pool list:', error);
        } finally {
            setLoading(false);
        }
    };
    // -------Bonus report--------------

    const BonusReport = async () => {
        setActiveButton('bonus');
        try {
            setLoading(true);
            const response = await ApiCall('get', BonusReportUrl, '', { page: params?.page, pageSize: params?.pageSize });

            if (response instanceof Error) {
                console.error('Error fetching bonus list:', response.message);
            } else if (response.status === 200) {
                setTotalIncome(response?.data?.totalIncome);
                setTotalReports(response?.data?.pagination?.totalDocs);
                setTotalPages(response?.data?.pagination?.totalPages);
                const FormatedReport = response?.data?.creditBonusHistory.map((item: any) => ({
                    ...item,
                    createdAt: formatDateAndTime(item.createdAt),
                }));
                setReports(FormatedReport);
                setLoading(false);
                // setPaginationDetails(response?.data?.pagination);
            } else {
                console.error('Error fetching bonus list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching bonus list:', error);
        } finally {
            setLoading(false);
        }
    };

    // pagination in data
    // const fetchData = () => {
    //     const LevelIncomeReport = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await ApiCall(
    //                 'get',
    //                 activeButton === 'transactions'
    //                     ? AllReportUrl
    //                     : activeButton === 'directIncome'
    //                     ? DirectReportUrl
    //                     : activeButton === 'inDirectIncome'
    //                     ? InDirectReportUrl
    //                     : activeButton === 'levelIncome'
    //                     ? LevelIncomeReportUrl
    //                     : activeButton === 'autoPoolCreditHistory'
    //                     ? AutoPoolReportUrl
    //                     : BonusReportUrl,
    //                 '',
    //                 { page: params?.page, pageSize: params?.pageSize }
    //             );

    //             if (response instanceof Error) {
    //                 console.error('Error fetching allMembers list:', response.message);
    //             } else if (response.status === 200) {
    //                 setTotalIncome(response?.data?.totalIncome);
    //                 setTotalReports(response?.data?.pagination?.totalDocs);
    //                 setTotalPages(response?.data?.pagination?.totalPages);
    //                 const formattedReport = response.data?.[activeButton]?.map((item: any) => ({
    //                     ...item,
    //                     createdAt: formatDateAndTime(item.createdAt),
    //                 }));
    //                 setReports(reports.concat(formattedReport));
    //                 setPageNumber(pageNumber + 1);
    //                 setLoading(false);
    //             } else {
    //                 console.error('Error fetching allMembers list. Unexpected status:', response.status);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching allMembers list:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //         console.log(pageNumber);
    //     };
    //     LevelIncomeReport();
    // };
    return (
        <>
            <div className="flex flex-wrap gap-5 w-full mb-4">
                <div
                    onClick={() => {
                        setParams((prevParams) => ({
                            ...prevParams,
                            page: 1,
                        }));
                        AllReport();
                    }}
                    className={`panel cursor-pointer flex items-center overflow-x-auto whitespace-nowrap p-2 text-base ${
                        activeButton === 'transactions' ? 'bg-primary text-warning' : 'bg-white border-2 border-warning text-primary font-bold'
                    } justify-center max-w-[120px] w-full`}
                >
                    All
                </div>
                <div
                    onClick={() => {
                        setParams((prevParams) => ({
                            ...prevParams,
                            page: 1,
                        }));
                        DirectReport();
                    }}
                    className={`panel cursor-pointer flex items-center overflow-x-auto whitespace-nowrap p-2 text-base ${
                        activeButton === 'directIncome' ? 'bg-primary text-warning' : 'bg-white border-2 border-warning text-primary font-bold'
                    } justify-center max-w-[120px] w-full`}
                >
                    Direct
                </div>
                <div
                    onClick={() => {
                        setParams((prevParams) => ({
                            ...prevParams,
                            page: 1,
                        }));
                        InDirectReport();
                    }}
                    className={`panel cursor-pointer flex items-center overflow-x-auto whitespace-nowrap p-2 text-base ${
                        activeButton === 'inDirectIncome' ? 'bg-primary text-warning' : 'bg-white border-2 border-warning text-primary font-bold'
                    } justify-center max-w-[120px] w-full`}
                >
                    InDirect
                </div>
                <div
                    onClick={() => {
                        setParams((prevParams) => ({
                            ...prevParams,
                            page: 1,
                        }));
                        LevelIncomeReport();
                    }}
                    className={`panel cursor-pointer flex items-center overflow-x-auto whitespace-nowrap p-2 text-base ${
                        activeButton === 'levelIncome' ? 'bg-primary text-warning' : 'bg-white border-2 border-warning text-primary font-bold'
                    } justify-center max-w-[120px] w-full`}
                >
                    LevelIncome
                </div>
                <div
                    onClick={() => {
                        setParams((prevParams) => ({
                            ...prevParams,
                            page: 1,
                        }));
                        AutoPoolReport();
                    }}
                    className={`panel cursor-pointer flex items-center overflow-x-auto whitespace-nowrap p-2 text-base ${
                        activeButton === 'autoPoolCreditHistory' ? 'bg-primary text-warning' : 'bg-white border-2 border-warning text-primary font-bold'
                    } justify-center max-w-[120px] w-full`}
                >
                    Auto pool
                </div>
                <div
                    onClick={() => {
                        setParams((prevParams) => ({
                            ...prevParams,
                            page: 1,
                        }));
                        BonusReport();
                    }}
                    className={`panel cursor-pointer flex items-center overflow-x-auto whitespace-nowrap p-2 text-base ${
                        activeButton === 'bonus' ? 'bg-primary text-warning' : 'bg-white border-2 border-warning text-primary font-bold'
                    } justify-center max-w-[120px] w-full`}
                >
                    Bonus
                </div>
            </div>
            <div className={`panel ${reports.length <= 10 ? 'min-h-[95vh]' : 'h-full'}`}>
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-primary text-lg dark:text-white-light">Report</h5>
                    {activeButton !== 'transactions' && <span className="bg-primary text-white py-2 px-4 font-semibold rounded-lg text-base">Total: {totalIncome}</span>}
                </div>
                <div className="table-responsive mb-5">
                    <table>
                        <thead>
                            <tr>
                                <th>SIno</th>
                                <th>Date</th>
                                {activeButton === 'transactions' && <th>Report Name</th>}
                                {activeButton !== 'autoPoolCreditHistory' && activeButton !== 'bonus' && activeButton !== 'transactions' ? (
                                    <th>Amount From</th>
                                ) : (
                                    activeButton !== 'bonus' && activeButton !== 'transactions' && <th>Designation</th>
                                )}
                                {activeButton === 'levelIncome' && <th> New Member</th>}
                                {/* <th>Name</th> */}
                                {activeButton !== 'levelIncome' && activeButton !== 'autoPoolCreditHistory' && activeButton !== 'bonus' && activeButton !== 'transactions' && <th> Franchise</th>}

                                {activeButton !== 'bonus' && <th> PercentageCredited / Description</th>}
                                {activeButton === 'levelIncome' && <th> Amount</th>}

                                {activeButton === 'bonus' ? <th>Bonus Amount</th> : <th> Amount Credited</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {reports?.length > 0 ? (
                                reports.map((data: any, index: number) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <div className=" font-medium text-base">{startIndex + index + 1}</div>
                                            </td>
                                            <td className="font-medium text-base">{data?.createdAt}</td>
                                            {activeButton === 'transactions' && <td className="whitespace-nowrap font-medium text-base">{data?.reportName}</td>}
                                            {activeButton !== 'bonus' && activeButton !== 'transactions' && (
                                                <td className="whitespace-nowrap font-medium text-base">{data?.name ?? data?.designation}</td>
                                            )}
                                            {activeButton === 'levelIncome' && <td className="font-medium text-base">{data?.newMember}</td>}
                                            {activeButton !== 'bonus' && activeButton !== 'levelIncome' && activeButton !== 'autoPoolCreditHistory' && activeButton !== 'transactions' && (
                                                <td className="font-medium text-base">{data?.franchise}</td>
                                            )}

                                            {activeButton !== 'bonus' && <td className="font-medium text-base">{data?.percentageCredited || data?.description}</td>}
                                            {activeButton === 'levelIncome' && <td className="font-medium text-base">{data?.Amount}</td>}

                                            <td className="text-center text-success font-medium text-base">
                                                {activeButton !== 'bonus' ? data?.amountCredited || data?.bonusAmount : data?.bonusAmount}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: 'center' }}>
                                        <span className="align-middle m-auto mb-10">No Reports</span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="w-full">
                    <Stack spacing={2}>
                        <Pagination count={totalPages} color="primary" onChange={handlePageChange} style={{ marginLeft: 'auto' }} />
                    </Stack>
                </div>
            </div>
        </>
    );
};

export default Report;
