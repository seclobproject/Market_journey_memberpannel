import React, { useEffect, useState } from 'react';
import { ApiCall } from '../Services/Api';
import { packagesListUrl } from '../utils/EndPoints';


const Package = () => {
const [packagesList,setPackagesList]=useState([])

   useEffect(() => {
       const fetchPackages = async () => {
           try {
               const res: any = await ApiCall('get', packagesListUrl);
               console.log(res);
               
               setPackagesList(res?.data?.packageData);
           } catch (error) {
               console.error('Error fetching notifications:', error);
           }
       };

       fetchPackages();
   }, []);
    
    return (
        <div className="panel">
            <div className="flex items-center justify-between mb-5">
                <h5 className="font-semibold text-warning text-lg dark:text-white-light">Package</h5>
            </div>
            {packagesList.map((pkg: any) => (
                <div className="max-w-[600px] flex justify-between min-h-[80px] bg-primary rounded-3xl p-5 mb-2
                
                ">
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2">
                            <h4 className="text-white font-semibold text-base">Franchise</h4>
                            <h6 className="text-white text-[14px]">{pkg?.packageName} </h6>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-white font-semibold text-base">Package</h3>
                        <span className="text-white text-sm">₹ {pkg?.packageAmount}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Package;
