import React, { useEffect, useState } from 'react';
import { ApiCall } from '../Services/Api';
import { packagesListUrl } from '../utils/EndPoints';

const Package = () => {
    // const [packagesList, setPackagesList] = useState([]);
    const [franchises, setFranchises] = useState([]);
    const [signals, setsignals] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

  useEffect(() => {
      const fetchPackages = async () => {
          try {
              setLoading(true);
              const response = await ApiCall('get', packagesListUrl);

              if (response instanceof Error) {
                  console.error('Error fetching state list:', response.message);
              } else if (response.status === 200) {
                  const packageData = response?.data?.packageData;
                  filterPackages(packageData);
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

  const filterPackages = (packageData:any) => {
      const filteredPackages = packageData.reduce((acc:any, pkg:any) => {
          if (!acc[pkg.franchiseName]) {
              acc[pkg.franchiseName] = [];
          }
          acc[pkg.franchiseName].push(pkg);
          return acc;
      }, {});

      setFranchises(filteredPackages['Franchise'] || []);
      setsignals(filteredPackages['Signals'] || []);
      setCourses(filteredPackages['Courses'] || []);
  };


    return (
        <div className="panel">
            <div className="flex items-center justify-between mb-5">
                <h5 className="font-semibold text-primary text-lg dark:text-white-light">Packages</h5>
            </div>
            <div className="flex flex-wrap gap-4 w-full">
                <div className='w-full md:w-fit '>
                    {loading ? (
                        <span className="animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-primary border-r-primary rounded-full w-14 h-14 inline-block align-middle m-auto mb-10"></span>
                    ) : (
                        <div className='w-full'>
                            <h6 className="text-lg font-semibold text-primary">Franchise</h6>
                            {franchises?.length > 0 ? (
                                franchises?.map((pkg: any) => (
                                    <div key={pkg?._id} className="max-w-[600px] md:w-[500px] w-full flex justify-between min-h-[80px] bg-primary rounded-3xl p-5 mb-2">
                                        <div className="flex gap-4">
                                            <div className="flex flex-col gap-2">
                                                <h4 className="text-white text-base">Package Type</h4>
                                                <h6 className="text-warning font-semibold">{pkg?.packageName}</h6>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-white text-base">Package Amount</h3>
                                            <span className="text-warning text-right font-semibold">₹ {pkg?.packageAmount}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <span className="align-middle m-auto mb-10">No Packages</span>
                            )}
                        </div>
                    )}

                    {loading ? (
                        <span className="animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-primary border-r-primary rounded-full w-14 h-14 inline-block align-middle m-auto mb-10"></span>
                    ) : (
                        <div className='w-full'>
                            <h6 className="text-lg font-semibold text-primary">Courses</h6>
                            {courses?.length > 0 ? (
                                courses?.map((pkg: any) => (
                                    <div key={pkg?._id} className="max-w-[600px] md:w-[500px] w-full flex justify-between min-h-[80px] bg-primary rounded-3xl p-5 mb-2">
                                        <div className="flex gap-4">
                                            <div className="flex flex-col gap-2">
                                                <h4 className="text-white text-base">Package Type</h4>
                                                <h6 className="text-warning font-semibold">{pkg?.packageName}</h6>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-white text-base">Package Amount</h3>
                                            <span className="text-warning text-right font-semibold">₹ {pkg?.packageAmount}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <span className="align-middle m-auto mb-10">No Packages</span>
                            )}
                        </div>
                    )}
                </div>
                {loading ? (
                    <span className="animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-primary border-r-primary rounded-full w-14 h-14 inline-block align-middle m-auto mb-10"></span>
                ) : (
                    <div className='w-full md:w-[50%]'>
                        <h6 className="text-lg font-semibold text-primary">Signals</h6>

                        {signals?.length > 0 ? (
                            signals?.map((pkg: any) => (
                                <div key={pkg?._id} className="max-w-[600px] md:w-[500px] w-full flex justify-between min-h-[80px] bg-primary rounded-3xl p-5 mb-2">
                                    <div className="flex gap-4">
                                        <div className="flex flex-col gap-2">
                                            <h4 className="text-white text-base">Package Type</h4>
                                            <h6 className="text-warning font-semibold">{pkg?.packageName}</h6>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-white text-base">Package Amount</h3>
                                        <span className="text-warning text-right font-semibold">₹ {pkg?.packageAmount}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <span className="align-middle m-auto mb-10">No Packages</span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Package;