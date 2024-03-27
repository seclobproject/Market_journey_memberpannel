import React, { FormEvent, Fragment, useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import { Dialog, Transition } from '@headlessui/react';
import { Show_Toast } from './Components/Toast';
import { ApiCall } from '../Services/Api';
import {
    districtlistinNotdropdownUrl,
    districtlistindropdownUrl,
    getUsers,
    memberaddUrl,
    packagesListUrl,
    panchayathlistindropdownUrl,
    statelistPageUrl,
    zonallistinNotdropdownUrl,
    zonallistindropdownUrl,
} from '../utils/EndPoints';
import IconUser from '../components/Icon/IconUser';
import IconMail from '../components/Icon/IconMail';
import IconMapPin from '../components/Icon/IconMapPin';
import IconPhone from '../components/Icon/IconPhone';
import IconLockDots from '../components/Icon/IconLockDots';
import IconCashBanknotes from '../components/Icon/IconCashBanknotes';
import InfiniteScroll from 'react-infinite-scroll-component';
import IconArrowBackward from '../components/Icon/IconArrowBackward';

interface Member {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    franchise: string;
    packageAmount: string | number;
    packageAmountGst: string | number;
    state: string;
    district: string;
    zonal: string;
    panchayath: string;
    franchiseName: string;
}
interface Package {
    packageName: string;
    franchiseName: string;
    packageAmount: number;
}

const Member = () => {
    const [addModal, setAddModal] = useState(false);
    const [showViewTreeColumn, setShowViewTreeColumn] = useState(true);
    const [allMembers, setAllMembers] = useState<any>([]);
   const [userId, setUserId] = useState<string | undefined>();
    // const [previousMemberData, setPreviousMemberData] = useState(null);
    const [addMember, setAddMember] = useState<Member>({
        name: '',
        email: '',
        franchise: '',
        password: '',
        address: '',
        phone: '',
        packageAmount: '',
        packageAmountGst:'',
        state: '',
        district: '',
        zonal: '',
        panchayath: '',
        franchiseName: '',
    });

    const [stateList, setStateList] = useState<any>([]);
    const [districtList, setDistrictList] = useState([]);
    const [zonalList, setZonalList] = useState([]);
    const [panchayathList, setPanchayathList] = useState([]);
    const [packageList, setPackageList] = useState<Package[]>([]);
    const [selectedStateId, setSelectedStateId] = useState('');
    const [selectedDistrictId, setSelectedDistrictId] = useState(null);
    const [selectedZonalId, setSelectedZonalId] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalMembers, setTotalMembers] = useState(0);

    useEffect(() => {
        getMembers();
        getPackagesList();
        getStateList();
    }, []);
    useEffect(() => {
        if (selectedStateId) {
            if (addMember?.franchise === 'District Franchise') {
                getNotSelectedDistrictList();
            } else {
                getDistrictList();
            }
        }
        if (selectedDistrictId) {
            if (addMember?.franchise === 'Zonal Franchise') {
                getZonalNotSelectedlist();
            } else {
                getZonallist();
            }
        }
        if (selectedZonalId) {
            getPanchayathList();
        }
    }, [selectedStateId, selectedDistrictId, selectedZonalId]);

    useEffect(() => {
        calculateTotalGstAmount(); 
    }, [addMember.packageAmount]);

    //------ show password-----
    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    //---------------------

    //----Get Level members-----
    const getMembers = async (id?: string) => {
        try {
            const response = await ApiCall('get', getUsers, '', { id: id, page: pageNumber, pageSize: 2 });

            // const response = await ApiCall('get', getLevelOneUsers,'',{page:pageNumber,pageSize:10} );

            if (response instanceof Error) {
                console.error('Error fetching allMembers list:', response.message);
            } else if (response.status === 200) {
                // setPreviousMemberData(allMembers);
                setAllMembers(response?.data?.child1);
            } else {
                console.error('Error fetching allMembers list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching allMembers list:', error);
        }
    };
    // -----handle back ---------
    const BackTree = () => {
        getMembers();
        setShowViewTreeColumn(true);
    };
    //------ Remove the tree column from the table  -------
    const handleViewTreeClick = (id?: string) => {
      setUserId(id);
        getMembers(id);
        setShowViewTreeColumn(false);
    };

    // pagination in member data
    const fetchData=()=>{
        setPageNumber(pageNumber + 1)
        const getLevelMembers = async () => {
            try {
                const response = await ApiCall('get', getUsers, '', { id: userId, page: pageNumber, pageSize: 2 });
                // const response = await ApiCall('get', getLevelOneUsers, '', { page: pageNumber, pageSize: 10 });
                console.log(response);

                if (response instanceof Error) {
                    console.error('Error fetching allMembers list:', response.message);
                } else if (response.status === 200) {
                    setAllMembers(allMembers.concat(response?.data?.child1));
                } else {
                    console.error('Error fetching allMembers list. Unexpected status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching allMembers list:', error);
            }
        };
        getLevelMembers()
    }

    //------------------- get all state------------------

    const getStateList = async () => {
        try {
            const response = await ApiCall('get', statelistPageUrl);

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setStateList(response?.data?.states);
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };

    //-----------list district --------
    const getDistrictList = async () => {
        try {
            const response = await ApiCall('get', `${districtlistindropdownUrl}/${selectedStateId}`);

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setDistrictList(response?.data?.districts);
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };

    //-----------list Not selected district --------
    const getNotSelectedDistrictList = async () => {
        try {
            const response = await ApiCall('get', `${districtlistinNotdropdownUrl}/${selectedStateId}`);

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setDistrictList(response?.data?.districts);
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };
    //-----------list Zonal --------
    const getZonallist = async () => {
        try {
            const response = await ApiCall('get', `${zonallistindropdownUrl}/${selectedDistrictId}`);

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setZonalList(response?.data?.zonals);
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };
    //-----------list Not Selected Zonal --------
    const getZonalNotSelectedlist = async () => {
        try {
            const response = await ApiCall('get', `${zonallistinNotdropdownUrl}/${selectedDistrictId}`);

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setZonalList(response?.data?.zonals);
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };

    //-----------list panchayath --------
    const getPanchayathList = async () => {
        try {
            const response = await ApiCall('get', `${panchayathlistindropdownUrl}/${selectedZonalId}`);

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setPanchayathList(response?.data?.panchayaths);
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };
    //-----------list pacakges --------
    const getPackagesList = async () => {
        try {
            const response = await ApiCall('get', packagesListUrl);

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setPackageList(response?.data?.packageData);
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };

    //---------Add--member---------
    const addMemberFun = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response: any = await ApiCall('post', memberaddUrl, addMember);
            console.log(response.error);

            if (response.status === 200) {
                // setValidated(false);
                setAddMember({
                    name: '',
                    email: '',
                    franchise: '',
                    password: '',
                    address: '',
                    phone: '',
                    packageAmount: '',
                    packageAmountGst:'',
                    state: '',
                    district: '',
                    zonal: '',
                    panchayath: '',
                    franchiseName: '',
                });
                setAddModal(false);
                Show_Toast({ message: 'Member added successfully', type: true });
            }
        } catch (error: any) {
            console.log(error?.response?.data?.message);
            Show_Toast({ message: error?.response?.data?.message, type: false });
        }
    };

    // --------------------------

    const packageOptions = packageList.map((pack) => ({
        value: pack?.packageName,
        label: pack?.packageName || pack?.franchiseName,
        packageAmount: pack.packageAmount,
    }));

    //------ calculate pageAmount Gst ---------

    const calculateTotalGstAmount = () => {
        if (addMember?.packageAmount) {
            const partAmount = Number(addMember?.packageAmount);
            const percentage = partAmount * 0.18;
            const sum = partAmount + percentage;
            console.log(`Sum: ${sum}`);
           setAddMember({ ...addMember, packageAmountGst: sum });
        }
    };

    // ----------select state and get state id ---------------
    const stateSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const selectedState = stateList.find((state: any) => state.stateName === selectedValue);

        if (selectedState) {
            setAddMember({
                ...addMember,
                state: selectedState.stateName,
            });
            setSelectedStateId(selectedState.id);
        }
    };
    //--------------------------------

    return (
        <>
            <div className="flex gap-5 w-full mb-4">
                {/* <div
                    // onClick={getLevelOneMembers}
                    className={`panel cursor-pointer flex items-center overflow-x-auto whitespace-nowrap p-2 text-base ${
                        activeButton === 'level1' ? 'bg-primary text-white' : 'bg-white border-2 border-primary text-primary font-bold'
                    } justify-center max-w-[120px] w-full`}
                >
                    Level 1
                </div>
                <div
                    onClick={getLevelTwoMembers}
                    className={`panel cursor-pointer flex items-center overflow-x-auto whitespace-nowrap p-2 text-base ${
                        activeButton === 'level2' ? 'bg-primary text-white' : 'bg-white border-2 border-primary text-primary font-bold'
                    } justify-center max-w-[120px] w-full`}
                >
                    Level 2
                </div> */}
            </div>
            <div className="panel">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <h5 className="font-semibold text-warning text-lg dark:text-white-light">Member</h5>

                    <button
                        onClick={() => setAddModal(true)}
                        className="panel flex items-center overflow-x-auto whitespace-nowrap p-2 text-base bg-warning text-white justify-center max-w-[100px] w-full "
                    >
                        Add
                    </button>
                </div>
                {showViewTreeColumn === false && (
                    <button className="bg-primary text-white p-2 rounded-lg mr-2" onClick={BackTree}>
                        <IconArrowBackward />
                    </button>
                )}
                <select
                    onChange={(e) => {
                        const selectedValue = e.target.value;
                        // const selectedOption = packageOptions.find((option) => option.value === selectedValue);

                        // if (selectedOption) {
                        //     setAddMember({
                        //         ...addMember,
                        //         franchise: selectedOption.value,
                        //         packageAmount: selectedOption.packageAmount,
                        //     });
                        // }
                    }}
                    value={addMember.franchise}
                    className="form-input ps-10 placeholder:text-white-dark max-w-xs mb-4"
                >
                    <option value="default">Select a franchise type</option>
                    {/* {packageOptions.map((option) => ( */}
                    <option>Zonal Franchise</option>
                    <option>Mobile Franchise</option>
                    {/* ))} */}
                </select>
                <div className="table-responsive mb-5">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Sponsor Name</th>
                                <th> franchise Type</th>
                                <th> franchise Name</th>
                                <th> Package Amount</th>
                                {/* {showViewTreeColumn && */}
                                <th>View Tree</th>
                                {/* } */}
                            </tr>
                        </thead>
                        <tbody>
                            {allMembers?.length > 0 ? (
                                (console.log(allMembers, 'dfsf'),
                                allMembers.map((data: any) => (
                                    <tr key={data?._id}>
                                        <td>{data?.name}</td>
                                        <td>{data?.email}</td>
                                        <td className="whitespace-nowrap">{data?.phone}</td>
                                        <td>{data?.sponserName}</td>
                                        <td>{data?.franchise}</td>
                                        <td>{data?.franchiseName}</td>
                                        <td>{data?.packageAmount}</td>
                                        {/* {showViewTreeColumn && ( */}
                                        <td className="whitespace-nowrap " onClick={() => handleViewTreeClick(data?._id)}>
                                            <button className="bg-primary text-center text-white p-2 rounded-sm">
                                                <i className="fas fa-sitemap mr-2"></i> View Tree
                                            </button>
                                        </td>
                                        {/* )} */}
                                        {/* <td>
                                            <button
                                                className={`whitespace-nowrap text-white p-1.5 rounded-lg ${
                                                    data?.userStatus === 'approved' ? 'bg-green-400' : data?.userStatus === 'Pending' ? 'bg-warning' : 'bg-green-500'
                                                }`}
                                            >
                                                {data?.userStatus}
                                            </button>
                                        </td> */}
                                    </tr>
                                )))
                            ) : (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: 'center' }}>
                                        {allMembers?.length === 0 ? (
                                            <span className="align-middle m-auto mb-10">No Member</span>
                                        ) : (
                                            <span className="animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-primary border-r-primary rounded-full w-14 h-14 inline-block align-middle m-auto mb-10"></span>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <InfiniteScroll
                        dataLength={allMembers?.length}
                        next={fetchData}
                        hasMore={true}
                        loader={<h4></h4>}
                        children={undefined}
                        // endMessage={
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
                        {/* {items}  */}
                    </InfiniteScroll>
                </div>

                <div>
                    <Transition appear show={addModal} as={Fragment}>
                        <Dialog
                            as="div"
                            open={addModal}
                            onClose={() => {
                                setAddModal(false);
                            }}
                        >
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0" />
                            </Transition.Child>
                            <div id="register_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                                <div className="flex items-start justify-center min-h-screen px-4">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="panel border-0 py-1 px-4 rounded-lg overflow-hidden w-full max-w-[800px] my-8 text-black dark:text-white-dark">
                                            <div className="flex items-center justify-between p-5 font-semibold text-lg dark:text-white">
                                                <h5>Add Member</h5>
                                                <button type="button" onClick={() => setAddModal(false)} className="text-white-dark hover:text-dark text-[28px] p-2">
                                                    ×
                                                </button>
                                            </div>
                                            <div className="p-5">
                                                <form className="space-y-5 dark:text-white " onSubmit={addMemberFun}>
                                                    <div className="flex flex-col lg:flex-row gap-5 lg:flex-wrap">
                                                        <div className="space-y-5 lg:w-[350px]">
                                                            <div>
                                                                <label htmlFor="Name">Name</label>
                                                                <div className="relative text-white-dark">
                                                                    <input
                                                                        onChange={(e) => setAddMember({ ...addMember, name: e.target.value })}
                                                                        id="Name"
                                                                        type="text"
                                                                        placeholder="Enter Name"
                                                                        className="form-input ps-10 placeholder:text-white-dark"
                                                                    />
                                                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                                        <IconUser fill={true} />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="Email">Email</label>
                                                                <div className="relative text-white-dark">
                                                                    <input
                                                                        onChange={(e) => setAddMember({ ...addMember, email: e.target.value })}
                                                                        id="Email"
                                                                        type="email"
                                                                        required
                                                                        placeholder="Enter Email"
                                                                        className="form-input ps-10 placeholder:text-white-dark"
                                                                    />
                                                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                                        <IconMail fill={true} />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="Email">Phone</label>
                                                                <div className="relative text-white-dark">
                                                                    <input
                                                                        onChange={(e) => {
                                                                            const enteredValue = e.target.value;
                                                                            // Allow only numeric characters
                                                                            const numericValue = enteredValue.replace(/\D/g, '');

                                                                            // Restrict to a maximum of 10 digits
                                                                            const limitedValue = numericValue.slice(0, 15);

                                                                            setAddMember({
                                                                                ...addMember,
                                                                                phone: limitedValue,
                                                                            });
                                                                        }}
                                                                        id="Phone"
                                                                        required
                                                                        type="number"
                                                                        placeholder="Enter Phone"
                                                                        className="form-input ps-10 placeholder:text-white-dark"
                                                                    />
                                                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                                        <IconPhone fill={true} />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="Email">Address</label>
                                                                <div className="relative text-white-dark">
                                                                    <span className="absolute start-4 top-1/4 -translate-y-1/2">
                                                                        <IconMapPin fill={true} />
                                                                    </span>
                                                                    <textarea
                                                                        onChange={(e) => setAddMember({ ...addMember, address: e.target.value })}
                                                                        id="Address"
                                                                        placeholder="Enter Your Address"
                                                                        className="form-input ps-10 placeholder:text-white-dark"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="Password">Password</label>
                                                                <div className="relative text-white-dark">
                                                                    <input
                                                                        onChange={(e) => setAddMember({ ...addMember, password: e.target.value })}
                                                                        id="Password"
                                                                        type={showPassword ? 'text' : 'password'}
                                                                        placeholder="Enter Password"
                                                                        className="form-input ps-10 placeholder:text-white-dark"
                                                                    />
                                                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                                        <IconLockDots fill={true} />
                                                                    </span>
                                                                    <button type="button" onClick={handleTogglePassword} className="absolute end-4 top-1/2 -translate-y-1/2 cursor-pointer">
                                                                        {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col space-y-5 max-w-[350px] w-full">
                                                            <div>
                                                                <label htmlFor="franchise">Franchise</label>
                                                                <div className="relative text-white-dark">
                                                                    <select
                                                                        onChange={(e) => {
                                                                            const selectedValue = e.target.value;
                                                                            const selectedOption = packageOptions.find((option) => option.value === selectedValue);

                                                                            if (selectedOption) {
                                                                                setAddMember({
                                                                                    ...addMember,
                                                                                    franchise: selectedOption.value,
                                                                                    packageAmount: selectedOption.packageAmount,
                                                                                });
                                                                            }
                                                                        }}
                                                                        value={addMember.franchise}
                                                                        className="form-input ps-10 placeholder:text-white-dark"
                                                                    >
                                                                        <option>Select a franchise type </option>
                                                                        {packageOptions.map((option) => (
                                                                            <option key={option.value} value={option.value}>
                                                                                {option.label}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="packageAmount">PackageAmount</label>
                                                                <div className="relative text-white-dark">
                                                                    <input
                                                                        id="PackageAmount"
                                                                        type="text"
                                                                        value={addMember?.packageAmount}
                                                                        placeholder="packageAmount"
                                                                        readOnly
                                                                        className="form-input ps-10 placeholder:text-white-dark"
                                                                    />
                                                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                                        <IconCashBanknotes fill={true} />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="packageAmountGst">packageAmountGst</label>
                                                                <div className="relative text-white-dark">
                                                                    <input
                                                                        id="packageAmountGst"
                                                                        type="text"
                                                                        value={addMember?.packageAmountGst}
                                                                        placeholder="packageAmountGst"
                                                                        readOnly
                                                                        className="form-input ps-10 placeholder:text-white-dark"
                                                                    />
                                                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                                        <IconCashBanknotes fill={true} />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            {(addMember?.franchise === 'District Franchise' ||
                                                                addMember?.franchise === 'Zonal Franchise' ||
                                                                addMember?.franchise === 'Mobile Franchise' ||
                                                                addMember?.franchise === 'Premium calls' ||
                                                                addMember?.franchise === 'Diamond course' ||
                                                                addMember?.franchise === 'Platinum course' ||
                                                                addMember?.franchise === 'Algo course') && (
                                                                <>
                                                                    <div>
                                                                        <label htmlFor="Email">State</label>
                                                                        <div className="relative text-white-dark">
                                                                            <select className="form-input ps-10 placeholder:text-white-dark" onChange={stateSelectHandler} value={addMember.state}>
                                                                                <option key="default" value="">
                                                                                    Select State
                                                                                </option>
                                                                                {stateList.map((singleState: any, idx: any) => (
                                                                                    <option key={idx} value={singleState.stateName}>
                                                                                        {singleState.stateName}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <label htmlFor="district">{addMember?.franchise === 'District Franchise' ? 'District Franchise Name' : 'District'}</label>
                                                                        <div className="relative text-white-dark">
                                                                            <select
                                                                                className="form-input ps-10 placeholder:text-white-dark"
                                                                                onChange={(e) => {
                                                                                    const selectedValue = e.target.value;
                                                                                    const selectedDistrict = districtList.find((dist: any) => dist.name === selectedValue) as any;
                                                                                    console.log(selectedValue);
                                                                                    console.log(selectedDistrict);

                                                                                    if (selectedDistrict) {
                                                                                        setAddMember((prevAddMember) => ({
                                                                                            ...prevAddMember,
                                                                                            [prevAddMember.franchise === 'District Franchise' ? 'franchiseName' : 'district']: selectedDistrict?.name,
                                                                                        }));
                                                                                        setSelectedDistrictId(selectedDistrict?.id);
                                                                                    }
                                                                                }}
                                                                                value={addMember?.franchise === 'District Franchise' ? addMember.franchiseName : addMember.district}
                                                                            >
                                                                                <option>Select District </option>
                                                                                {districtList.map((dist: any) => (
                                                                                    <option key={dist.id} value={dist.name}>
                                                                                        {dist.name}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                            {(addMember?.franchise === 'Zonal Franchise' ||
                                                                addMember?.franchise === 'Mobile Franchise' ||
                                                                addMember?.franchise === 'Premium calls' ||
                                                                addMember?.franchise === 'Diamond course' ||
                                                                addMember?.franchise === 'Platinum course' ||
                                                                addMember?.franchise === 'Algo course') && (
                                                                <div>
                                                                    <label htmlFor="zonal">{addMember?.franchise === 'Zonal Franchise' ? 'zonal Franchise Name' : 'zonal'}</label>
                                                                    <div className="relative text-white-dark">
                                                                        <select
                                                                            className="form-input ps-10 placeholder:text-white-dark"
                                                                            onChange={(e) => {
                                                                                const selectedValue = e.target.value;
                                                                                const selectedzonal = zonalList.find((zonal: any) => zonal.name === selectedValue) as any;

                                                                                if (selectedzonal) {
                                                                                    setAddMember((prevAddMember) => ({
                                                                                        ...prevAddMember,
                                                                                        [addMember?.franchise === 'Zonal Franchise' ? 'franchiseName' : 'zonal']: selectedzonal?.name,
                                                                                    }));
                                                                                    setSelectedZonalId(selectedzonal?.id);
                                                                                }
                                                                            }}
                                                                            value={addMember?.franchise === 'Zonal Franchise' ? addMember.franchiseName : addMember.zonal}
                                                                        >
                                                                            <option key="default" value="">
                                                                                Select zonal{' '}
                                                                            </option>
                                                                            {zonalList.map((zonal: any) => (
                                                                                <option key={zonal.id}>{zonal.name}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {(addMember?.franchise === 'Mobile Franchise' ||
                                                                addMember?.franchise === 'Premium calls' ||
                                                                addMember?.franchise === 'Diamond course' ||
                                                                addMember?.franchise === 'Platinum course' ||
                                                                addMember?.franchise === 'Algo course') && (
                                                                <div>
                                                                    <label htmlFor="Email">Panchayath</label>
                                                                    <div className="relative text-white-dark">
                                                                        <select
                                                                            onChange={(e) => {
                                                                                setAddMember({ ...addMember, panchayath: e.target.value });
                                                                            }}
                                                                            className="form-input ps-10 placeholder:text-white-dark"
                                                                        >
                                                                            <option>Select panchayath </option>
                                                                            {panchayathList.map((panchayath: any) => (
                                                                                <option key={panchayath.id}>{panchayath.name}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <button type="submit" className="btn bg-primary text-white !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                                        Add
                                                    </button>
                                                </form>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            </div>
        </>
    );
};

export default Member;
