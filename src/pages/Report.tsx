import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import IconTrashLines from '../components/Icon/IconTrashLines';
import { ApiCall } from '../Services/Api';
import { AutoPoolReportUrl, BonusReportUrl, DirectReportUrl, InDirectReportUrl, LevelIncomeReportUrl } from '../utils/EndPoints';
import InfiniteScroll from 'react-infinite-scroll-component';

const Report = () => {
    const [activeButton, setActiveButton] = useState('directIncome');
    const [reports, setReports] = useState<any>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        DirectReport();
    }, []);

    //-------- direct income -------------

    const DirectReport = async (pageNumber?: number) => {
        setActiveButton('directIncome');
        try {
            setLoading(true);
            const response = await ApiCall('get', DirectReportUrl, '', { page: pageNumber, pageSize: 10 });

            if (response instanceof Error) {
                console.error('Error fetching  Direct Icome list:', response.message);
            } else if (response.status === 200) {
                const FormatedReport = response?.data?.directIncome.map((item: any) => ({
                    ...item,
                    createdAt: formatTimestamp(item.createdAt),
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
    const InDirectReport = async (pageNumber?: number) => {
        setActiveButton('inDirectIncome');
        try {
            setLoading(true);
            const response = await ApiCall('get', InDirectReportUrl, '', { page: pageNumber, pageSize: 10 });

            if (response instanceof Error) {
                console.error('Error fetching InDirect list:', response.message);
            } else if (response.status === 200) {
                const FormatedReport = response?.data?.inDirectIncome.map((item: any) => ({
                    ...item,
                    createdAt: formatTimestamp(item.createdAt),
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

    const LevelIncomeReport = async (pageNumber?: number) => {
        setPageNumber(1);
        setActiveButton('levelIncome');
        try {
            setLoading(true);
            const response = await ApiCall('get', LevelIncomeReportUrl, '', { page: pageNumber, pageSize: 10 });

            if (response instanceof Error) {
                console.error('Error fetching levelIncome list:', response.message);
            } else if (response.status === 200) {
                const FormatedReport = response?.data?.levelIncome.map((item: any) => ({
                    ...item,
                    createdAt: formatTimestamp(item.createdAt),
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

    const AutoPoolReport = async (pageNumber?: number) => {
        setPageNumber(1);
        setActiveButton('autoPoolCreditHistory');
        try {
            setLoading(true);
            const response = await ApiCall('get', AutoPoolReportUrl, '', { page: pageNumber, pageSize: 10 });

            if (response instanceof Error) {
                console.error('Error fetching auto pool list:', response.message);
            } else if (response.status === 200) {
                console.log(response?.data);

                const FormatedReport = response?.data?.autoPoolCreditHistory.map((item: any) => ({
                    ...item,
                    createdAt: formatTimestamp(item.createdAt),
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

    const BonusReport = async (pageNumber?: number) => {
        setPageNumber(1);
        setActiveButton('bonus');
        try {
            setLoading(true);
            const response = await ApiCall('get', BonusReportUrl, '', { page: pageNumber, pageSize: 10 });

            if (response instanceof Error) {
                console.error('Error fetching bonus list:', response.message);
            } else if (response.status === 200) {
                console.log(response);

                const FormatedReport = response?.data?.creditBonusHistory.map((item: any) => ({
                    ...item,
                    createdAt: formatTimestamp(item.createdAt),
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
    const fetchData = () => {
        const LevelIncomeReport = async () => {
            try {
                setLoading(true);
                const response = await ApiCall(
                    'get',
                    activeButton === 'directIncome'
                        ? DirectReportUrl
                        : activeButton === 'inDirectIncome'
                        ? InDirectReportUrl
                        : activeButton === 'levelIncome'
                        ? LevelIncomeReportUrl
                        : activeButton === 'autoPoolCreditHistory'
                        ? AutoPoolReportUrl
                        : BonusReportUrl,
                    '',
                    {
                        page: pageNumber + 1,
                        pageSize: 10,
                    }
                );

                if (response instanceof Error) {
                    console.error('Error fetching allMembers list:', response.message);
                } else if (response.status === 200) {
                    const formattedReport = response.data?.[activeButton]?.map((item: any) => ({
                        ...item,
                        createdAt: formatTimestamp(item.createdAt),
                    }));
                    setReports(reports.concat(formattedReport));
                    setPageNumber(pageNumber + 1);
                    setLoading(false);
                } else {
                    console.error('Error fetching allMembers list. Unexpected status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching allMembers list:', error);
            } finally {
                setLoading(false);
            }
            console.log(pageNumber);
        };
        LevelIncomeReport();
    };

    // formate date
    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}
         ${date.toLocaleString('en-US', {
             hour: 'numeric',
             minute: 'numeric',
             second: 'numeric',
             hour12: true,
         })}`;
        return formattedDate;
    };

    return (
        <>
            <div className="flex flex-wrap gap-5 w-full mb-4">
                <div
                    onClick={() => DirectReport(1)}
                    className={`panel cursor-pointer flex items-center overflow-x-auto whitespace-nowrap p-2 text-base ${
                        activeButton === 'directIncome' ? 'bg-primary text-warning' : 'bg-white border-2 border-warning text-primary font-bold'
                    } justify-center max-w-[120px] w-full`}
                >
                    Direct
                </div>
                <div
                    onClick={() => InDirectReport(1)}
                    className={`panel cursor-pointer flex items-center overflow-x-auto whitespace-nowrap p-2 text-base ${
                        activeButton === 'inDirectIncome' ? 'bg-primary text-warning' : 'bg-white border-2 border-warning text-primary font-bold'
                    } justify-center max-w-[120px] w-full`}
                >
                    InDirect
                </div>
                <div
                    onClick={() => LevelIncomeReport(1)}
                    className={`panel cursor-pointer flex items-center overflow-x-auto whitespace-nowrap p-2 text-base ${
                        activeButton === 'levelIncome' ? 'bg-primary text-warning' : 'bg-white border-2 border-warning text-primary font-bold'
                    } justify-center max-w-[120px] w-full`}
                >
                    LevelIncome
                </div>
                <div
                    onClick={() => AutoPoolReport(1)}
                    className={`panel cursor-pointer flex items-center overflow-x-auto whitespace-nowrap p-2 text-base ${
                        activeButton === 'autoPoolCreditHistory' ? 'bg-primary text-warning' : 'bg-white border-2 border-warning text-primary font-bold'
                    } justify-center max-w-[120px] w-full`}
                >
                    Auto pool
                </div>
                <div
                    onClick={() => BonusReport(1)}
                    className={`panel cursor-pointer flex items-center overflow-x-auto whitespace-nowrap p-2 text-base ${
                        activeButton === 'bonus' ? 'bg-primary text-warning' : 'bg-white border-2 border-warning text-primary font-bold'
                    } justify-center max-w-[120px] w-full`}
                >
                    Bonus
                </div>
            </div>
            <div className={`panel ${reports.length >= 10 ? 'min-h-[95vh]' : 'h-full'}`}>
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-primary text-lg dark:text-white-light">Report</h5>
                </div>
                <div className="table-responsive mb-5">
                    <InfiniteScroll
                        dataLength={reports?.length}
                        next={fetchData}
                        hasMore={true}
                        loader={undefined}
                        //   endMessage={
                        //     <p style={{ textAlign: 'center' }}>
                        //         <b>Yay! You have seen it all</b>
                        //     </p>
                        // }
                        // below props only if you need pull down functionality
                        // refreshFunction={this.refresh}
                        // pullDownToRefresh
                        // pullDownToRefreshThreshold={50}
                        // pullDownToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>}
                        // releaseToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>}
                    >
                        <table>
                            <thead>
                                <tr>
                                    <th>SIno</th>
                                    <th>Date</th>
                                    {activeButton !== 'autoPoolCreditHistory' && activeButton !== 'bonus' ? <th>Amount From</th> : activeButton !== 'bonus' && <th>Designation</th>}
                                    {activeButton === 'levelIncome' && <th> New Member</th>}
                                    {/* <th>Name</th> */}
                                    {activeButton !== 'levelIncome' && activeButton !== 'autoPoolCreditHistory' && activeButton !== 'bonus' && <th> Franchise</th>}

                                    {activeButton !== 'bonus' && <th> PercentageCredited</th>}
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
                                                    <div className=" font-medium text-base">{index + 1}</div>
                                                </td>
                                                <td className="font-medium text-base">{data?.createdAt}</td>
                                                {/* {activeButton === 'autoPoolCreditHistory' && <td className="whitespace-nowrap font-medium text-base">{data?.designation}</td>} */}
                                                {activeButton !== 'bonus' && <td className="whitespace-nowrap font-medium text-base">{data?.name ?? data?.designation}</td>}
                                                {activeButton === 'levelIncome' && <td className="font-medium text-base">{data?.newMember}</td>}
                                                {activeButton !== 'bonus' && activeButton !== 'levelIncome' && activeButton !== 'autoPoolCreditHistory' && (
                                                    <td className="font-medium text-base">{data?.franchise}</td>
                                                )}

                                                {activeButton !== 'bonus' && <td className="font-medium text-base">{data?.percentageCredited}</td>}
                                                {activeButton === 'levelIncome' && <td className="font-medium text-base">{data?.Amount}</td>}

                                                <td className="text-center text-success font-medium text-base">{activeButton !== 'bonus' ? data?.amountCredited : data?.bonusAmount}</td>
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
                    </InfiniteScroll>
                </div>
            </div>
        </>
    );
};

export default Report;
