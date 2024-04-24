import React, { useEffect, useState } from 'react';
import { ApiCall } from '../Services/Api';
import { packagesListUrl } from '../utils/EndPoints';

const Package = () => {
    const [packagesList, setPackagesList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                setLoading(true);
                const response = await ApiCall('get', packagesListUrl);

                if (response instanceof Error) {
                    console.error('Error fetching state list:', response.message);
                } else if (response.status === 200) {
                    setPackagesList(response?.data?.packageData);
                    setLoading(false);
                    
                } else {
                    console.error('Error fetching state list. Unexpected status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    return (
        <div className="panel">
            <div className="flex items-center justify-between mb-5">
                <h5 className="font-semibold text-primary text-lg dark:text-white-light">Packages</h5>
            </div>
            {loading ? (
                <span className="animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-primary border-r-primary rounded-full w-14 h-14 inline-block align-middle m-auto mb-10"></span>
            ) : packagesList.length > 0 ? (
                packagesList.map((pkg: any) => (
                    <div
                        key={pkg?._id}
                        className="max-w-[600px] flex justify-between min-h-[80px] bg-primary rounded-3xl p-5 mb-2
                
                "
                    >
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-2">
                                <h4 className="text-white  text-base">Package Type</h4>
                                <h6 className="text-warning font-semibold ">{pkg?.packageName} </h6>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-white  text-base">Package Amount</h3>
                            <span className="text-warning text-right font-semiboldy">₹ {pkg?.packageAmount}</span>
                        </div>
                    </div>
                ))
            ) : (
                <span className="align-middle m-auto mb-10">No Packages</span>
            )}
        </div>
    );
};

export default Package;
