import React, { FormEvent, Fragment, ReactEventHandler, useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import { Dialog, Transition } from '@headlessui/react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Show_Toast } from './Components/Toast';
import { ApiCall } from '../Services/Api';
import {
    districtlistinNotdropdownUrl,
    districtlistindropdownUrl,
    filterMembersUrl,
    getUsers,
    level2MembersUrl,
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
import IconSearch from '../components/Icon/IconSearch';
import IconXCircle from '../components/Icon/IconXCircle';
import { useAppDispatch, useAppSelector } from '../store';
import { getStatesApi } from '../store/LocationSlice';
import IconDownload from '../components/Icon/IconDownload';
import IconArrowWaveLeftUp from '../components/Icon/IconArrowWaveLeftUp';
import IconArrowForward from '../components/Icon/IconArrowForward';
import IconDroplet from '../components/Icon/IconDroplet';
import { userProfileApi } from '../store/UserSlice';
import useDebounce from '../hooks/useDebounce';

interface Member {
    name: string;
    email: string;
    password: string;
    address: string;
    dateOfBirth: string;
    phone: string;
    franchise: string;
    packageType: string;
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
    const [filterMembers, setFilterMembers] = useState<any>([]);
    // const [pageNumber, setPageNumber] = useState(1);
    const [activeButton, setActiveButton] = useState('level1');
    const [levelUsers, setLevelUsers] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState<string | undefined>();
    // const [previousMemberData, setPreviousMemberData] = useState(null);
    const [addMember, setAddMember] = useState<Member>({
        name: '',
        email: '',
        franchise: '',
        password: '',
        address: '',
        dateOfBirth: '',
        phone: '',
        packageType: '',
        packageAmount: '',
        packageAmountGst: '',
        state: '',
        district: '',
        zonal: '',
        panchayath: '',
        franchiseName: '',
    });

    // const [stateList, setStateList] = useState<any>([]);
    const [districtList, setDistrictList] = useState([]);
    const [zonalList, setZonalList] = useState([]);
    const [panchayathList, setPanchayathList] = useState([]);
    const [packageList, setPackageList] = useState<Package[]>([]);
    const [selectedStateId, setSelectedStateId] = useState('');
    const [selectedDistrictId, setSelectedDistrictId] = useState('');
    const [selectedZonalId, setSelectedZonalId] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [dropDownpackageList, setDropDownPackageList] = useState<Package[]>([]);
    const [filterPackageType, setFilterPackageType] = useState('');
    const [filterData, setFilterData] = useState({
        zonal: '',
        panchayath: '',
        packageName: '',
    });
    const [packageNameFilter, setPackageNameFilter] = useState('');
    const { stateList } = useAppSelector((state) => state.location);
    const { user } = useAppSelector((state) => state.user);
    const [params, setParams] = useState({
        page: 1,
        pageSize: 25,
    });
    const [search, setSearch] = useState('');
    const startIndex = (params.page - 1) * params.pageSize;
    const debouncedSearchValue = useDebounce(search, 1000);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const franchise = sessionStorage.getItem('franchise');
        dispatch(userProfileApi());
        dispatch(getStatesApi());
        if (franchise === 'Mobile Franchise') {
            getMembers();
        }
    }, []);

    useEffect(() => {
        const franchise = sessionStorage.getItem('franchise');
        if (franchise !== 'Mobile Franchise') {
            filterMemberDatas();
        } else if (franchise === 'Mobile Franchise' && activeButton === 'level1') {
            getMembers();
        } else if (activeButton === 'level2') {
            getLevelTwoMembers();
        }
    }, [search]);

    useEffect(() => {
        if (user) {
            setSelectedDistrictId(user.districtFranchise || '');
            setSelectedZonalId(user.zonalFranchise || '');
        }
    }, [user]);

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

    useEffect(() => {
        getPackagesList();
    }, [addMember?.packageType]);

    useEffect(() => {
        const franchise = sessionStorage.getItem('franchise');
        if (levelUsers || (franchise === 'Mobile Franchise' && activeButton === 'level1')) {
            getMembers();
        } else if (activeButton === 'level2') {
            getLevelTwoMembers();
        } else {
            filterMemberDatas();
        }
    }, [filterData, params]);

    //------ show password-----
    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    //---------------------
    const handlePageChange = (event: any, newPage: number) => {
        setParams((prevParams) => ({
            ...prevParams,
            page: newPage,
        }));
    };

    //----Get Level members-----
    const getMembers = async (id?: string) => {
        setActiveButton('level1');
        // setPackageNameFilter('');

        try {
            setLoading(true);
            const response = await ApiCall('post', getUsers, filterData, { id: id, page: params?.page, pageSize: params?.pageSize, searchText: search });

            // const response = await ApiCall('get', getLevelOneUsers,'',{page:pageNumber,pageSize:10} );

            if (response instanceof Error) {
                console.error('Error fetching allMembers list:', response.message);
            } else if (response.status === 200) {
                // setPreviousMemberData(allMembers);
                // setAllMembers(response?.data?.child1);
                setFilterMembers(response?.data?.child1);
                setTotalPages(response?.data?.pagination?.totalPages);
                setLoading(false);
            } else {
                console.error('Error fetching allMembers list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching allMembers list:', error);
        } finally {
            setLoading(false);
        }
    };
    //----Get Leve2 mobile members-----
    const getLevelTwoMembers = async () => {
        setActiveButton('level2');
        setPackageNameFilter('');
        try {
            setLoading(true);
            const response = await ApiCall('get', level2MembersUrl, '', { page: params?.page, pageSize: params?.pageSize, searchText: search });

            // const response = await ApiCall('get', getLevelOneUsers,'',{page:pageNumber,pageSize:10} );

            if (response instanceof Error) {
                console.error('Error fetching allMembers list:', response.message);
            } else if (response.status === 200) {
                // setPreviousMemberData(allMembers);
                setAllMembers(response?.data?.child2);
                setFilterMembers(response?.data?.child2);
                setTotalPages(response?.data?.pagination?.totalPages);
                setLoading(false);
            } else {
                console.error('Error fetching allMembers list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching allMembers list:', error);
        } finally {
            setLoading(false);
        }
    };

    // fiter members with packages

    // const filterWithPackagetype = (type: string) => {
    //     console.log(type, 'type');
    //     setFilterPackageType(type);
    //     if (type === 'All package type') {
    //         setFilterMembers(allMembers);
    //     } else {
    //         // Use type instead of filterPackageType
    //         const filterMembers = allMembers.filter((member: any) => member?.franchise === type);
    //         console.log(filterMembers, 'filterMembers');
    //         setFilterMembers(filterMembers);
    //     }
    // };

    // filter all members

    const filterMemberDatas = async () => {
        try {
            setLoading(true);
            const response = await ApiCall('post', filterMembersUrl, filterData, { page: params?.page, pageSize: params?.pageSize, searchText: search });

            if (response instanceof Error) {
                console.error('Error fetching allMembers list:', response.message);
            } else if (response.status === 200) {
                setAllMembers(response?.data?.filteredUsers);
                setFilterMembers(response?.data?.filteredUsers);
                setTotalPages(response?.data?.pagination?.totalPages);
                setLoading(false);
            } else {
                console.error('Error fetching allMembers list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching allMembers list:', error);
        } finally {
            setLoading(false);
        }
    };

    // -----handle back ---------
    const BackTree = () => {
        if (user?.franchise === 'Mobile Franchise') {
            getMembers();
        } else {
            filterMemberDatas();
        }
        setShowViewTreeColumn(true);
    };

    //------ Remove the tree column from the table  -------
    const handleViewTreeClick = (id?: string) => {
        setUserId(id);
        getMembers(id);
        setShowViewTreeColumn(false);
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
                setDropDownPackageList(response?.data?.packageData);
                const filteredPackageList = await response?.data?.packageData.filter((pkg: any) => {
                    if (addMember?.packageType === 'Franchise') {
                        return pkg?.franchiseName !== 'Courses' && pkg?.franchiseName !== 'Signals';
                    } else {
                        return pkg?.franchiseName === addMember?.packageType;
                    }
                });
                setPackageList(filteredPackageList);
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
            setLoading(true);
            const response: any = await ApiCall('post', memberaddUrl, addMember);

            if (response.status === 200) {
                // setValidated(false);
                setAddMember({
                    name: '',
                    email: '',
                    franchise: '',
                    password: '',
                    address: '',
                    dateOfBirth: '',
                    phone: '',
                    packageType: '',
                    packageAmount: '',
                    packageAmountGst: '',
                    state: '',
                    district: '',
                    zonal: '',
                    panchayath: '',
                    franchiseName: '',
                });
                setLoading(false);
                setAddModal(false);
                Show_Toast({ message: 'Member added successfully', type: true });
            }
        } catch (error: any) {
            console.log(error?.response?.data?.message);
            Show_Toast({ message: error?.response?.data?.message, type: false });
        } finally {
            setLoading(false);
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
            setAddMember({ ...addMember, packageAmountGst: sum });
        }
    };

    // ----------select state and get state id ---------------
    const stateSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const selectedState = stateList?.find((state: any) => state.stateName === selectedValue);

        if (selectedState) {
            setAddMember({
                ...addMember,
                state: selectedState.stateName,
                district: '',
            });
            setSelectedStateId(selectedState.id);
        }
    };
    //--------------------------------

    //----- set date of birth up to today ---------

    const today = new Date().toISOString().split('T')[0];
    //-----------------

    return (
        <>
            <div className="panel">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <h5 className="font-semibold text-primary text-lg dark:text-white-light">Member</h5>
                    <div className="sm:ltr:mr-auto sm:rtl:ml-auto sm:mt-0 mt-6 sm:mb-0 mb-[-16px]">
                        <form className={`${search && '!block'} mt-2 sm:mt-0 inset-x-0 sm:translate-y-0 -translate-y-1/2 sm:mx-0  z-10`}>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                                    placeholder="Search..."
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
                                    value={search}
                                />
                                <button type="submit" className="absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-primary">
                                    <IconSearch className="mx-auto" />
                                </button>
                            </div>
                        </form>
                    </div>

                    <button
                        onClick={() => setAddModal(true)}
                        className="panel flex items-center overflow-x-auto whitespace-nowrap p-2 text-base bg-primary text-warning font-semibold justify-center max-w-[100px] w-full "
                    >
                        Add
                    </button>
                </div>
                {showViewTreeColumn === false && (
                    <button className="bg-primary text-white p-2 rounded-lg mr-2 mb-4" onClick={BackTree}>
                        <IconArrowBackward />
                    </button>
                )}
                {/* fiter options start */}

                <div className="flex flex-wrap gap-2">
                    {/* <select
                        onChange={(e) => filterWithPackagetype(e.target.value)}
                        value={filterPackageType}
                        className="form-input ps-10 placeholder:text-white-dark max-w-[220px] sm:mb-4 border-primary"
                    >
                        <option> Select package type </option>
                        <option value={'All'}>All </option>
                        <option value={'Franchise'}>Franchise </option>
                        <option value={'Courses'}>Courses </option>
                        <option value={'Signals'}>Signals</option>
                    </select> */}
                    {user?.franchise === 'District Franchise' && (
                        <select
                            className="form-input ps-10 placeholder:text-white-dark max-w-[220px] sm:mb-4 border-primary"
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                const selectedzonal = zonalList.find((zon: any) => zon.name === selectedValue) as any;

                                setFilterData({ ...filterData, zonal: selectedzonal === undefined ? '' : selectedzonal.name, panchayath: '' });
                                setSelectedZonalId(selectedzonal === undefined ? '' : selectedzonal?.id);
                                setLevelUsers(false);
                                // }
                                // filterMemberDatas();
                            }}
                            value={filterData?.zonal}
                            placeholder="Select zonal"
                        >
                            {/* <option>Select zonal </option> */}
                            <option value="">All Zonals</option>
                            {zonalList.map((zonal: any) => (
                                <option key={zonal.id} value={zonal?.name}>
                                    {zonal.name}
                                </option>
                            ))}
                        </select>
                    )}
                    {(user?.franchise === 'District Franchise' || user?.franchise === 'Zonal Franchise') && (
                        <select
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                if (selectedValue) {
                                    setFilterData({ ...filterData, panchayath: selectedValue });
                                    filterMemberDatas();
                                    setLevelUsers(false);
                                }
                            }}
                            className="form-input ps-10 placeholder:text-white-dark max-w-[220px] mb-4 border-primary"
                            value={filterData?.panchayath}
                        >
                            <option>Select panchayath </option>
                            {panchayathList.map((panchayath: any) => (
                                <option key={panchayath.id}>{panchayath.name}</option>
                            ))}
                        </select>
                    )}
                    {user?.franchise === 'Mobile Franchise' && (
                        <>
                            <div
                                onClick={() => {
                                    getMembers();
                                    setParams((prevParams) => ({
                                        ...prevParams,
                                        page: 1,
                                    }));
                                }}
                                className={`panel cursor-pointer flex items-center whitespace-nowrap h-[40px] mb-2 text-base ${
                                    activeButton === 'level1' ? 'bg-primary text-warning' : 'bg-white border-2 border-warning text-primary font-bold'
                                } justify-center max-w-[120px] w-full`}
                            >
                                Direct
                            </div>
                            <div
                                onClick={() => {
                                    getLevelTwoMembers();
                                    setParams((prevParams) => ({
                                        ...prevParams,
                                        page: 1,
                                    }));
                                }}
                                className={`panel cursor-pointer flex items-center whitespace-nowrap h-[40px] mb-2 text-base ${
                                    activeButton === 'level2' ? 'bg-primary text-warning' : 'bg-white border-2 border-warning text-primary font-bold'
                                } justify-center max-w-[120px] w-full`}
                            >
                                InDirect
                            </div>
                        </>
                    )}
                    {user?.franchise !== 'Mobile Franchise' && (
                        <button
                            onClick={() => {
                                setFilterData({ zonal: '', panchayath: '', packageName: '' });
                                setPackageNameFilter('');
                                setLevelUsers(false);
                                filterMemberDatas();
                                setSearch('');
                                setParams({
                                    page: 1,
                                    pageSize: 25,
                                });
                            }}
                            className="bg-primary text-white px-3 rounded-lg h-10"
                        >
                            Reset
                        </button>
                    )}
                    {user?.franchise !== 'Mobile Franchise' && (
                        <div
                            onClick={() => {
                                getMembers();
                                setLevelUsers(true);
                            }}
                            className={`ml-auto panel cursor-pointer flex items-center whitespace-nowrap h-[40px] text-base ${
                                levelUsers ? 'bg-primary text-warning' : 'bg-white border-2 border-warning text-primary font-bold'
                            } justify-center max-w-[120px] w-full`}
                        >
                            LevelUsers
                        </div>
                    )}
                    {user?.franchise !== 'Mobile Franchise' && (
                        <select
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                if (selectedValue) {
                                    setFilterData({ ...filterData, packageName: selectedValue === 'All package type' ? '' : selectedValue, zonal: '', panchayath: '' });
                                    setPackageNameFilter(selectedValue);
                                    // filterMemberDatas();
                                    // filterWithPackagetype(selectedValue);
                                }
                            }}
                            className={`form-input ps-10 placeholder:text-white-dark max-w-[220px] mb-4 border-primary ${user?.franchise === 'Mobile Franchise' ? 'ml-auto' : ''}`}
                            value={packageNameFilter}
                        >
                            <option value={'All package type'}>All Package Type</option>
                            {dropDownpackageList.map((pkg: any) => (
                                <option value={pkg?.packageName} key={pkg._id}>
                                    {pkg?.packageName}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {/* filter options end */}
                <div className="table-responsive mb-5">
                    <table>
                        <thead>
                            <tr>
                                <th>SINo</th>
                                <th>Name</th>
                                <th>UserId</th>
                                <th>Email</th>
                                <th>Phone</th>
                                {(user?.franchise !== 'Mobile Franchise' || activeButton !== 'level1') && <th>Sponsor Name</th>}
                                <th> Package</th>
                                <th> franchise Name</th>
                                <th> Package Amount</th>
                                {/* {showViewTreeColumn && */}
                                {user?.franchise !== 'Mobile Franchise' || levelUsers ? (
                                    <>
                                        <th>Status</th> <th>View Tree</th>
                                    </>
                                ) : user?.franchise !== 'Mobile Franchise' ? (
                                    <th>View Tree</th>
                                ) : (
                                    <th>Status</th>
                                )}
                                {/* } */}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: 'center' }}>
                                        <span className="animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-primary border-r-primary rounded-full w-14 h-14 inline-block align-middle m-auto mb-10"></span>
                                    </td>
                                </tr>
                            ) : filterMembers?.length > 0 ? (
                                filterMembers.map((data: any, index: number) => (
                                    <tr key={data?._id}>
                                        <td>{startIndex + index + 1}</td>
                                        <td className="capitalize whitespace-nowrap">{data?.name}</td>
                                        <td>{data?.ownSponserId}</td>
                                        <td>{data?.email}</td>
                                        <td className="whitespace-nowrap">{data?.phone}</td>
                                        {(user?.franchise !== 'Mobile Franchise' || activeButton !== 'level1') && <td className="capitalize whitespace-nowrap">{data?.sponserName}</td>}
                                        <td className="whitespace-nowrap">{data?.franchise}</td>
                                        <td className="whitespace-nowrap">{data?.franchiseName}</td>
                                        <td>{data?.actualPackageAmount || data?.packageAmount || data?.tempPackageAmount}</td>
                                        {/* {showViewTreeColumn && ( */}
                                        {user?.franchise !== 'Mobile Franchise' || levelUsers ? (
                                            <>
                                                <td>
                                                    <span
                                                        className={`text-white px-2 py-2 rounded-md ${
                                                            data?.userStatus === 'approved' ? 'bg-green-500' : data?.userStatus === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                                                        }`}
                                                    >
                                                        {data?.userStatus}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap " onClick={() => handleViewTreeClick(data?._id)}>
                                                    <button className="bg-primary text-center text-warning p-2 rounded-sm">
                                                        <i className="fas fa-sitemap mr-2"></i> View Tree
                                                    </button>
                                                </td>
                                            </>
                                        ) : user?.franchise !== 'Mobile Franchise' ? (
                                            <td className="whitespace-nowrap " onClick={() => handleViewTreeClick(data?._id)}>
                                                <button className="bg-primary text-center text-warning p-2 rounded-sm">
                                                    <i className="fas fa-sitemap mr-2"></i> View Tree
                                                </button>
                                            </td>
                                        ) : (
                                            <td>
                                                <span
                                                    className={`text-white px-2 py-1 rounded-[10px] ${
                                                        data?.userStatus === 'approved' ? 'bg-green-500' : data?.userStatus === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                                                    }`}
                                                >
                                                    {data?.userStatus}
                                                </span>
                                            </td>
                                        )}

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
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: 'center' }}>
                                        <span className="align-middle m-auto mb-10">No Member</span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="w-full">
                    <Stack spacing={2}>
                        <Pagination count={totalPages} color="primary" onChange={handlePageChange} style={{ marginLeft: 'auto' }} />
                    </Stack>
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
                                                            <div>
                                                                <label htmlFor="Email">Date Of Birth</label>
                                                                <div className="relative text-white-dark">
                                                                    {/* <span className="absolute start-4 top-1/4 -translate-y-1/2">
                                                    <IconCalendar fill={true} />
                                                </span> */}
                                                                    <input
                                                                        onChange={(e) => setAddMember({ ...addMember, dateOfBirth: e.target.value })}
                                                                        id="dateOfBirth"
                                                                        type="date"
                                                                        required
                                                                        max={today}
                                                                        className="form-input ps-10 placeholder:text-white-dark"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col space-y-5 max-w-[350px] w-full">
                                                            <div>
                                                                <label htmlFor="franchise">Package Type</label>
                                                                <div className="relative text-white-dark">
                                                                    <select
                                                                        onChange={
                                                                            (e) => setAddMember({ ...addMember, packageType: e.target.value, franchise: '' })

                                                                            // setPackageType(e.target.value)
                                                                        }
                                                                        value={addMember?.packageType}
                                                                        className="form-input ps-10 placeholder:text-white-dark"
                                                                    >
                                                                        <option> select Package type </option>
                                                                        <option value={'Franchise'}> Franchise </option>
                                                                        <option value={'Courses'}>Courses </option>
                                                                        <option value={'Signals'}>Signals</option>
                                                                    </select>
                                                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                                        <IconDownload />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="package">Package Name</label>
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
                                                                                    state: '',
                                                                                    district: '',
                                                                                    franchiseName: '',
                                                                                });
                                                                                setSelectedStateId('');
                                                                                setSelectedDistrictId('');
                                                                                setSelectedZonalId('');
                                                                            }
                                                                        }}
                                                                        value={addMember.franchise}
                                                                        className="form-input ps-10 placeholder:text-white-dark"
                                                                    >
                                                                        <option>Select a Package </option>
                                                                        {packageOptions.map((option) => (
                                                                            <option key={option.value} value={option.value}>
                                                                                {option.label}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                                        <IconDownload />
                                                                    </span>
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
                                                                addMember?.packageType === 'Courses' ||
                                                                addMember?.packageType === 'Signals') && (
                                                                <>
                                                                    <div>
                                                                        <label htmlFor="Email">State</label>
                                                                        <div className="relative text-white-dark">
                                                                            <select className="form-input ps-10 placeholder:text-white-dark" onChange={stateSelectHandler} value={addMember.state}>
                                                                                <option key="default" value="">
                                                                                    Select State
                                                                                </option>
                                                                                {stateList?.map((singleState: any, idx: any) => (
                                                                                    <option key={idx} value={singleState.stateName}>
                                                                                        {singleState.stateName}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                                                <IconDownload />
                                                                            </span>
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
                                                                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                                                <IconDownload />
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                            {(addMember?.franchise === 'Zonal Franchise' ||
                                                                addMember?.franchise === 'Mobile Franchise' ||
                                                                addMember?.packageType === 'Courses' ||
                                                                addMember?.packageType === 'Signals') && (
                                                                <div>
                                                                    <label htmlFor="zonal">{addMember?.franchise === 'Zonal Franchise' ? 'zonal-Franchise-Name' : 'zonal'}</label>
                                                                    <div className="relative text-white-dark">
                                                                        <select
                                                                            className="form-input ps-10 placeholder:text-white-dark"
                                                                            onChange={(e) => {
                                                                                const selectedValue = e.target.value;
                                                                                const selectedzonal = zonalList.find((zonal: any) => zonal.name === selectedValue) as any;

                                                                                if (selectedzonal) {
                                                                                    setAddMember((prevAddMember) => ({
                                                                                        ...prevAddMember,
                                                                                        [prevAddMember?.franchise === 'Zonal Franchise' ? 'franchiseName' : 'zonal']: selectedzonal?.name,
                                                                                    }));
                                                                                    setSelectedZonalId(selectedzonal?.id);
                                                                                }
                                                                            }}
                                                                            value={addMember?.franchise === 'Zonal Franchise' ? addMember.franchiseName : addMember.zonal}
                                                                        >
                                                                            <option>Select zonal </option>
                                                                            {zonalList.map((zonal: any) => (
                                                                                <option key={zonal.id} value={zonal.name}>
                                                                                    {zonal.name}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                                            <IconDownload />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {(addMember?.franchise === 'Mobile Franchise' || addMember?.packageType === 'Courses' || addMember?.packageType === 'Signals') && (
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
                                                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                                            <IconDownload />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <button
                                                        disabled={loading}
                                                        type="submit"
                                                        className="btn bg-primary text-white !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                                                    >
                                                        {loading ? 'loading' : 'Add'}
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
