import React, { useEffect, useState } from 'react';
import { ApiCall } from '../Services/Api';
import { AlertUrl } from '../utils/EndPoints';

const Notifications = () => {
    const [alert, setAlert] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);

                const res: any = await ApiCall('get', AlertUrl);
                const formatedAlert = res.data.signals.map((item: any) => ({
                    ...item,
                    createdAt: formatTimestamp(item.createdAt),
                }));
                setAlert(formatedAlert);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);
    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}`;
        return formattedDate;
    };

    return (
        <div className="flex flex-col gap-4">
            {loading ? (
                <span className="animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-primary border-r-primary rounded-full w-14 h-14 inline-block align-middle m-auto mb-10"></span>
            ) : alert?.length > 0 ? (
                alert.map((noti: any) => (
                    <blockquote
                        key={noti._id}
                        className="text-black p-5 ltr:pl-3.5 rtl:pr-3.5 bg-white shadow-md rounded-tr-md rounded-br-md border border-white-light border-l-2 !border-l-primary dark:bg-[#060818] dark:border-[#060818]"
                        style={{ overflow: 'hidden' }}
                    >
                        <div className="flex items-start">
                            <div className="w-14 h-14 ltr:mr-5 rtl:ml-5 flex-none">
                                <img src="/Rebrand-02.svg" alt="img" className="w-14 h-14 rounded-full object-none m-auto" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg">{noti?.title}</h3>
                                <p className="text-[#515365] text-sm dark:text-white-light" style={{ whiteSpace: 'pre-wrap', overflow: 'hidden' }}>
                                    {noti?.description}
                                </p>
                            </div>
                        </div>
                        <small className="ltr:text-right rtl:text-left w-full not-italic text-xs text-[#777] block before:w-3 before:h-[1px] before:bg-[#777] before:inline-block before:opacity-50 before:relative before:-top-1 before:ltr:mr-1 rtl:before:ml-1">
                            <cite className="italic">{noti?.createdAt}</cite>
                        </small>
                    </blockquote>
                ))
            ) : (
                <span className="align-middle m-auto mb-10">Empty signals</span>
            )}
        </div>
    );
};

export default Notifications;
