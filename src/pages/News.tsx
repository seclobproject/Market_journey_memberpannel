import React, { useEffect, useState } from 'react';
import { ApiCall } from '../Services/Api';
import { liveNewsUrl } from '../utils/EndPoints';

const News = () => {
    const [news, setNews] = useState<any>([]);

    useEffect(() => {
        showLiveNewes();
    }, []);

    const showLiveNewes = async () => {
        try {
            const response = await ApiCall('get', liveNewsUrl);
            console.log(response);

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                // Format createdAt timestamps
                const formattedNews = response.data.newsData.map((item: any) => ({
                    ...item,
                    createdAt: formatTimestamp(item.createdAt),
                }));

                setNews(formattedNews);
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };

    // Function to format timestamp
    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}`;
        return formattedDate;
    };

    return (
        <div>
            <h2 className=" font-bold text-primary text-lg">Latest News</h2>
            {news.map((n: any, index: number) => (
                <div key={index} className="w-full flex flex-col h-auto bg-primary text-white p-4 mt-6 gap-3">
                    <h4 className="text-lg font-semibold text-warning">sample Title</h4>
                    <span className="text-xs">{n.createdAt}</span>
                    <p>{n.news}</p>
                </div>
            ))}
        </div>
    );
};

export default News;
