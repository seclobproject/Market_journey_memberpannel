import React, { useEffect, useState } from 'react';
import { ApiCall } from '../Services/Api';
import { liveNewsUrl } from '../utils/EndPoints';
import { formatDateAndTime } from '../utils/FormateDate';

const News = () => {
    const [news, setNews] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        showLiveNewes();
    }, []);

    const showLiveNewes = async () => {
        try {
            setLoading(true);
            const response = await ApiCall('get', liveNewsUrl);

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                // Format createdAt timestamps

                const formattedNews = response.data.newsData.map((item: any) => ({
                    ...item,
                    createdAt: formatDateAndTime(item.createdAt),
                }));

                setNews(formattedNews);
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className=" font-bold text-primary text-lg">Latest News</h2>
            {loading ? (
                <span className="animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-primary border-r-primary rounded-full w-14 h-14 inline-block align-middle m-auto mb-10"></span>
            ) : news?.length > 0 ? (
                news.map((n: any, index: number) => (
                    <div key={index} className="w-full flex flex-col h-auto bg-primary text-white p-4 mt-6 gap-3 rounded-md">
                        <h4 className="text-lg font-semibold text-warning">{n?.title}</h4>
                        <span className="text-xs">{n?.createdAt}</span>
                        <p>{n?.news}</p>
                    </div>
                ))
            ) : (
                <span className="align-middle m-auto mb-10">Empty News</span>
            )}
        </div>
    );
};

export default News;
