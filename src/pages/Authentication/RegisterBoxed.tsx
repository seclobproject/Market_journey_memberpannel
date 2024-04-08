import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, useAppDispatch, useAppSelector } from '../../store';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import { FormEvent, useEffect, useState } from 'react';
import Dropdown from '../../components/Dropdown';
import IconUser from '../../components/Icon/IconUser';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconPhone from '../../components/Icon/IconPhone';
import IconMapPin from '../../components/Icon/IconMapPin';
import IconCashBanknotes from '../../components/Icon/IconCashBanknotes';
import { ApiCall } from '../../Services/Api';
import { Show_Toast } from '../Components/Toast';
import {
    addReferaUrl,
    districtlistinNotdropdownUrl,
    districtlistindropdownUrl,
    packagesListUrl,
    panchayathlistindropdownUrl,
    statelistPageUrl,
    zonallistinNotdropdownUrl,
    zonallistindropdownUrl,
} from '../../utils/EndPoints';
import { getStatesApi } from '../../store/LocationSlice';
import IconCalendar from '../../components/Icon/IconCalendar';

interface Member {
    name: string;
    email: string;
    password: string;
    address: string;
    dateOfBirth: string;
    phone: string;
    franchise: string;
    packageAmount: string | number;
    packageAmountGst: string | number;
    state: string;
    district: string;
    zonal: string;
    panchayath: string;
    userId: string | undefined;
    franchiseName: string;
}
interface Package {
    packageName: string;
    franchiseName: string;
    packageAmount: number;
}
interface States {
    name: String;
    id: String;
}
const RegisterBoxed = () => {
    const params = useParams();
    const [addMember, setAddMember] = useState<Member>({
        name: '',
        email: '',
        franchise: '',
        password: '',
        address: '',
        dateOfBirth: '',
        phone: '',
        packageAmount: '',
        packageAmountGst: '',
        state: '',
        district: '',
        zonal: '',
        panchayath: '',
        userId: params.id,
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
    const [packageType, setPackageType] = useState('');

    const { stateList } = useAppSelector((state) => state.location);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getStatesApi());
    }, [dispatch]);

    useEffect(() => {
        calculateTotalGstAmount();
    }, [addMember.packageAmount]);

    useEffect(() => {
        getPackagesList();
    }, [packageType]);

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

    //------ show password-----

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    //---------------------
    // const getStateList = async () => {
    //     try {
    //         const response = await ApiCall('get', statelistPageUrl);

    //         if (response instanceof Error) {
    //             console.error('Error fetching state list:', response.message);
    //         } else if (response.status === 200) {
    //             setStateList(response?.data?.states);
    //         } else {
    //             console.error('Error fetching state list. Unexpected status:', response.status);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching state list:', error);
    //     }
    // };
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
            console.log(response);

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
            console.log(response);

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
            console.log(response, 'dhsjk');

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
                const filteredPackageList = await response?.data?.packageData.filter((pkg: any) => {
                    if (packageType === 'Franchise') {
                        return pkg?.franchiseName !== 'Courses' && pkg?.franchiseName !== 'Signals';
                    } else {
                        return pkg?.franchiseName === packageType;
                    }
                });
                console.log(filteredPackageList);
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
            const response = await ApiCall('post', addReferaUrl, addMember);
            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                // setValidated(false);
                setAddMember({
                    name: '',
                    email: '',
                    franchise: '',
                    password: '',
                    address: '',
                    dateOfBirth: '',
                    phone: '',
                    packageAmount: '',
                    packageAmountGst: '',
                    state: '',
                    district: '',
                    zonal: '',
                    panchayath: '',
                    userId: '',
                    franchiseName: '',
                });
                navigate('/auth/boxed-signin');
                Show_Toast({ message: 'Member added successfully', type: true });
            } else {
                Show_Toast({ message: 'Member added failed', type: false });
            }
        } catch (error: any) {
            console.log(error);
            Show_Toast({ message: error?.response?.data?.message, type: false });

            // Show_Toast({message:error, type:false});
        }
    };

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

    //----- set date of birth up to today ---------

    const today = new Date().toISOString().split('T')[0];
    //-----------------

    return (
        <>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20 pt-10">
                        <div className="w-full flex justify-center mb-10">
                            <img className="w-[150px] text-center" src="/public/marketlogo.png" alt="logo" />
                        </div>
                        <div className="mx-auto w-full">
                            {/* <div className="w-full flex mb-10">
                                <img className="w-[150px] text-center" src="/public/marketlogo.png" alt="logo" />
                            </div> */}
                            <div className="mb-10 ">
                                <h1 className="text-3xl font-extrabold uppercase text-center !leading-snug text-primary md:text-4xl">Sign Up</h1>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={addMemberFun}>
                                <div className="flex flex-col lg:flex-row gap-5 lg:ml-4 lg:flex-wrap">
                                    <div className="space-y-5 lg:w-[375px]">
                                        <div>
                                            <label htmlFor="Name">Name</label>
                                            <div className="relative text-white-dark">
                                                <input
                                                    onChange={(e) => setAddMember({ ...addMember, name: e.target.value })}
                                                    id="Name"
                                                    type="text"
                                                    required
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
                                                    required
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
                                                    required
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
                                    <div className="flex flex-col space-y-5 max-w-[375px] w-full">
                                        <div>
                                            <label htmlFor="franchise">Package Type</label>
                                            <div className="relative text-white-dark">
                                                <select
                                                    onChange={(e) => {
                                                        setPackageType(e.target.value);
                                                    }}
                                                    value={packageType}
                                                    className="form-input ps-10 placeholder:text-white-dark"
                                                >
                                                    <option key={1}> select Package type </option>
                                                    <option key={2} value={'Franchise'}>
                                                        {' '}
                                                        Franchise{' '}
                                                    </option>
                                                    <option key={3} value={'Courses'}>
                                                        Courses{' '}
                                                    </option>
                                                    <option key={4} value={'Signals'}>
                                                        Signals
                                                    </option>
                                                </select>
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
                                            packageType === 'Courses' ||
                                            packageType === 'Signals') && (
                                            <>
                                                <div>
                                                    <label htmlFor="Email">State</label>
                                                    <div className="relative text-white-dark">
                                                        <select className="form-input ps-10 placeholder:text-white-dark" required onChange={stateSelectHandler} value={addMember.state}>
                                                            <option key="default" value="">
                                                                Select State
                                                            </option>
                                                            {stateList.map((singleState: any) => (
                                                                <option key={singleState.id} value={singleState.stateName}>
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
                                                            required
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
                                        {(addMember?.franchise === 'Zonal Franchise' || addMember?.franchise === 'Mobile Franchise' || packageType === 'Courses' || packageType === 'Signals') && (
                                            <div>
                                                <label htmlFor="zonal">{addMember?.franchise === 'Zonal Franchise' ? 'Zonal Franchise Name' : 'Zonal'}</label>
                                                <div className="relative text-white-dark">
                                                    <select
                                                        className="form-input ps-10 placeholder:text-white-dark"
                                                        required
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
                                                            Select Zonal{' '}
                                                        </option>
                                                        {zonalList.map((zonal: any) => (
                                                            <option key={zonal.id}>{zonal.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        )}
                                        {(addMember?.franchise === 'Mobile Franchise' || packageType === 'Courses' || packageType === 'Signals') && (
                                            <div>
                                                <label htmlFor="Email">Panchayath</label>
                                                <div className="relative text-white-dark">
                                                    <select
                                                        onChange={(e) => {
                                                            setAddMember({ ...addMember, panchayath: e.target.value });
                                                        }}
                                                        className="form-input ps-10 placeholder:text-white-dark"
                                                        required
                                                    >
                                                        <option key="default">Select panchayath </option>
                                                        {panchayathList.map((panchayath: any) => (
                                                            <option key={panchayath.id}>{panchayath.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="w-full flex justify-center">
                                    <button type="submit" className="btn bg-primary text-white !mt-6 w-1/2 border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                            <div className="relative my-7 text-center md:mb-9">
                                <div className="text-center dark:text-white">
                                    Already have an account ?&nbsp;
                                    <Link to="/auth/boxed-signin" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                        LOG IN
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterBoxed;
