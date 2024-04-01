import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import IconTrashLines from '../components/Icon/IconTrashLines';
import { ApiCall } from '../Services/Api';
import { AutoPoolReportUrl, BonusReportUrl, DirectReportUrl, InDirectReportUrl, LevelIncomeReportUrl } from '../utils/EndPoints';
import InfiniteScroll from 'react-infinite-scroll-component';

const Report = () => {
    const [activeButton, setActiveButton] = useState('Direct');
    const [reports, setReports] = useState<any>([]);
    const [pageNumber, setPageNumber] = useState(1);
    useEffect(() => {
        DirectReport();
    }, []);

    //-------- direct income -------------

    const DirectReport = async (pageNumber?: number) => {
        setActiveButton('Direct');
        try {
            const response = await ApiCall('get', DirectReportUrl, '', { page: pageNumber, pageSize: 10 });

            if (response instanceof Error) {
                console.error('Error fetching allMembers list:', response.message);
            } else if (response.status === 200) {
                const FormatedReport = response?.data?.directIncome.map((item: any) => ({
                    ...item,
                    createdAt: formatTimestamp(item.createdAt),
                }));
                setReports(FormatedReport);
            } else {
                console.error('Error fetching allMembers list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching allMembers list:', error);
        }
    };

    // -------InDirect income --------------
    const InDirectReport = async (pageNumber?: number) => {
        setActiveButton('InDirect');
        try {
            const response = await ApiCall('get', InDirectReportUrl, '', { page: pageNumber, pageSize: 10 });

            if (response instanceof Error) {
                console.error('Error fetching allMembers list:', response.message);
            } else if (response.status === 200) {
                const FormatedReport = response?.data?.inDirectIncome.map((item: any) => ({
                    ...item,
                    createdAt: formatTimestamp(item.createdAt),
                }));
                setReports(FormatedReport);
            } else {
                console.error('Error fetching allMembers list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching allMembers list:', error);
        }
    };

    // -------Level Income--------------

    const LevelIncomeReport = async () => {
        setPageNumber(1);
        setActiveButton('LevelIncome');
        try {
            const response = await ApiCall('get', LevelIncomeReportUrl, '', { page: pageNumber, pageSize: 10 });

            if (response instanceof Error) {
                console.error('Error fetching allMembers list:', response.message);
            } else if (response.status === 200) {
                const FormatedReport = response?.data?.levelIncome.map((item: any) => ({
                    ...item,
                    createdAt: formatTimestamp(item.createdAt),
                }));
                setReports(FormatedReport);
                // setPaginationDetails(response?.data?.pagination);
            } else {
                console.error('Error fetching allMembers list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching allMembers list:', error);
        }
    };
    // -------Level Income--------------

    const AutoPoolReport = async () => {
        setPageNumber(1);
        setActiveButton('LevelIncome');
        try {
            const response = await ApiCall('get', AutoPoolReportUrl, '', { page: pageNumber, pageSize: 10 });

            if (response instanceof Error) {
                console.error('Error fetching allMembers list:', response.message);
            } else if (response.status === 200) {
                setReports(response?.data?.autopool);
                // setPaginationDetails(response?.data?.pagination);
            } else {
                console.error('Error fetching allMembers list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching allMembers list:', error);
        }
    };
    // -------Level Income--------------

    const BonusReport = async () => {
        setPageNumber(1);
        setActiveButton('LevelIncome');
        try {
            const response = await ApiCall('get', BonusReportUrl, '', { page: pageNumber, pageSize: 10 });

            if (response instanceof Error) {
                console.error('Error fetching allMembers list:', response.message);
            } else if (response.status === 200) {
                setReports(response?.data?.addBonus);
                // setPaginationDetails(response?.data?.pagination);
            } else {
                console.error('Error fetching allMembers list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching allMembers list:', error);
        }
    };

    // pagination in LevelIncome data
    const fetchData = () => {
        const LevelIncomeReport = async () => {
            try {
                const response = await ApiCall('get', activeButton === 'Direct' ? DirectReportUrl : activeButton === 'InDirect' ? InDirectReportUrl : LevelIncomeReportUrl, '', {
                    page: pageNumber + 1,
                    pageSize: 10,
                });

                if (response instanceof Error) {
                    console.error('Error fetching allMembers list:', response.message);
                } else if (response.status === 200) {
                    const FormatedReport = response?.data?.levelIncome.map((item: any) => ({
                        ...item,
                        createdAt: formatTimestamp(item.createdAt),
                    }));
                    setReports(reports.concat(FormatedReport));
                } else {
                    console.error('Error fetching allMembers list. Unexpected status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching allMembers list:', error);
            }
            setPageNumber(pageNumber + 1);
        };
        LevelIncomeReport();
    };
    // formate date
    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.toLocaleString('en-US', {
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
                        activeButton === 'Direct' ? 'bg-primary text-white' : 'bg-white border-2 border-primary text-primary font-bold'
                    } justify-center max-w-[120px] w-full`}
                >
                    Direct
                </div>
                <div
                    onClick={() => InDirectReport(1)}
                    className={`panel cursor-pointer flex items-center overflow-x-auto whitespace-nowrap p-2 text-base ${
                        activeButton === 'InDirect' ? 'bg-primary text-white' : 'bg-white border-2 border-primary text-primary font-bold'
                    } justify-center max-w-[120px] w-full`}
                >
                    InDirect
                </div>
                <div
                    onClick={LevelIncomeReport}
                    className={`panel cursor-pointer flex items-center overflow-x-auto whitespace-nowrap p-2 text-base ${
                        activeButton === 'LevelIncome' ? 'bg-primary text-white' : 'bg-white border-2 border-primary text-primary font-bold'
                    } justify-center max-w-[120px] w-full`}
                >
                    LevelIncome
                </div>
                <div
                    onClick={AutoPoolReport}
                    className={`panel cursor-pointer flex items-center overflow-x-auto whitespace-nowrap p-2 text-base ${
                        activeButton === 'Autopool' ? 'bg-primary text-white' : 'bg-white border-2 border-primary text-primary font-bold'
                    } justify-center max-w-[120px] w-full`}
                >
                    Auto pool
                </div>
                <div
                    onClick={BonusReport}
                    className={`panel cursor-pointer flex items-center overflow-x-auto whitespace-nowrap p-2 text-base ${
                        activeButton === 'bonus' ? 'bg-primary text-white' : 'bg-white border-2 border-primary text-primary font-bold'
                    } justify-center max-w-[120px] w-full`}
                >
                    Bonus
                </div>
            </div>
            <div className={`panel ${reports.length >= 10 ? 'min-h-[95vh]' : 'h-full'}`}>
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-warning text-lg dark:text-white-light">Report</h5>
                </div>
                <div className="table-responsive mb-5">
                    <table>
                        <thead>
                            <tr>
                                <th>SIno</th>
                                <th>Date</th>

                                <th>Name</th>
                                {activeButton !== 'LevelIncome' ? <th> Franchise</th> : <th></th>}

                                <th> PercentageCredited</th>
                                <th> AmountCredited</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((data: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div className="font-medium text-base">{index + 1}</div>
                                        </td>
                                        <td className="font-medium text-base">{data?.createdAt}</td>

                                        <td>
                                            <div className="whitespace-nowrap font-medium text-base">{data?.name}</div>
                                        </td>
                                        <td className="font-medium text-base">{data?.franchise}</td>

                                        <td className="font-medium text-base">{data?.percentageCredited}</td>

                                        <td className="text-center text-success font-medium text-base">{data?.amountCredited}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <InfiniteScroll
                        dataLength={reports?.length}
                        next={fetchData}
                        hasMore={true}
                        children={undefined}
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
                        {/* {items} */}
                    </InfiniteScroll>
                </div>
            </div>
        </>
    );
};

export default Report;
