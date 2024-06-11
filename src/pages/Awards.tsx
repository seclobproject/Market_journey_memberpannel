import React, { useEffect, useState } from 'react';
import { ApiCall, Base_url } from '../Services/Api';
import { AwardsUrl } from '../utils/EndPoints';

const Awards = () => {
    const [awards, setAwards] = useState<any>([]);

    useEffect(() => {
        showAwards();
    }, []);
    const showAwards = async () => {
        try {
            const response = await ApiCall('get', AwardsUrl);
            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setAwards(response?.data?.awardData);
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };

    return (
        <div>
            <div className="flex gap-4 flex-wrap">
                {awards.map((award: any) => {
                    return (
                        <div key={award._id} className="min-h-full max-w-[220px] gap-2 w-full p-5 bg-white  flex flex-col items-center shadow-md rounded-[12px]">
                            <div className="w-20 h-20">
                                <img className="w-full rounded-full h-20 shadow-md" src={`${Base_url}/uploads/${award?.memberImage}`} alt="profile" />
                            </div>
                            <span className="text-[16px] font-[600]">{award?.memberName}</span>
                            <span>{award?.achivedDetails}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Awards;
