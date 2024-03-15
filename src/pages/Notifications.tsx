import React, { useEffect, useState } from 'react';
import { ApiCall } from '../Services/Api';
import { AlertUrl } from '../utils/EndPoints';

const Notifications = () => {
    const [alert, setAlert] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res: any = await ApiCall('get', AlertUrl);
                setAlert(res?.data?.alertData);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="flex flex-col gap-4">
            {alert.map((noti: any) => (
                <blockquote
                    key={noti._id}
                    className="text-black p-5 ltr:pl-3.5 rtl:pr-3.5 bg-white shadow-md rounded-tr-md rounded-br-md border border-white-light border-l-2 !border-l-primary dark:bg-[#060818] dark:border-[#060818]"
                >
                    <div className="flex items-start">
                        <div className="w-14 h-14 ltr:mr-5 rtl:ml-5 flex-none">
                            <img src="/public/web logo-01.png" alt="img" className="w-14 h-14 rounded-full object-none m-auto" />
                        </div>
                        <div className="flex-1">
                            <p className="text-[#515365] text-sm dark:text-white-light">{noti?.description}</p>
                        </div>
                    </div>
                    <small className="ltr:text-right rtl:text-left w-full not-italic text-xs text-[#777] block before:w-3 before:h-[1px] before:bg-[#777] before:inline-block before:opacity-50 before:relative before:-top-1 before:ltr:mr-1 rtl:before:ml-1">
                        <cite className="italic">{noti?.createdAt}</cite>
                    </small>
                </blockquote>
            ))}
        </div>
    );
};


export default Notifications;
