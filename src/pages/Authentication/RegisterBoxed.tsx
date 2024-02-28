import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import Dropdown from '../../components/Dropdown';
import IconUser from '../../components/Icon/IconUser';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconPhone from '../../components/Icon/IconPhone';
import IconMapPin from '../../components/Icon/IconMapPin';
import IconCashBanknotes from '../../components/Icon/IconCashBanknotes';
import { ApiCall } from '../../Services/Api';
import { Show_Toast } from '../Components/Toast';
import { districtlistinZonalUrl, memberaddUrl, packagesListUrl, panchayathlistindropdownUrl, statelistPageUrl, zonallistindropdownUrl } from '../../utils/EndPoints';

const RegisterBoxed = () => {
    const [addMember, setAddMember] = useState({});
    const [stateList, setStateList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [zonalList, setZonalList] = useState([]);
    const [panchayathList, setPanchayathList] = useState([]);
    const [packageList, setPackageList] = useState([]);
    const [packageAmount, setPackageAmount] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showTransPassword, setShowTransPassword] = useState(false);
    const [selectedStateId, setSelectedStateId] = useState(null);
    const [selectedDistrictId, setSelectedDistrictId] = useState(null);
    const [selectedZonalId, setSelectedZonalId] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Register Boxed'));
        getPackagesList()
    });
    const navigate = useNavigate();

    console.log(addMember);


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
    //-----------list district in drop down--------
    const getDistrictList = async () => {
        try {
            const response = await ApiCall('get', `${districtlistinZonalUrl}/${selectedStateId}`);
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
    //-----------list Zonal in drop down--------
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
    //-----------list Zonal in drop down--------
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
    //-----------list pacakges in drop down--------
    const getPackagesList = async () => {
        try {
            const response = await ApiCall('get', packagesListUrl);
            console.log(response);
            
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
    //---------Add--panchayath---------
    const addMemberFun = async () => {
        try {
            const response = await ApiCall('post', memberaddUrl, addMember);
            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                // setValidated(false);
                setAddMember('');
                Show_Toast({ message: 'Member added successfully', type: true });
            } else {
                Show_Toast({ message: 'Member added failed', type: false });
            }
        } catch (error) {
            console.log(error);

            // Show_Toast({message:error, type:false});
        }
    };

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
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign Up</h1>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={addMemberFun}>
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
                                        <input
                                            onChange={(e) => setAddMember({ ...addMember, address: e.target.value })}
                                            id="Address"
                                            type="text"
                                            placeholder="Enter Your Address"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMapPin fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Email">Franchise</label>
                                    <div className="relative text-white-dark">
                                        <select className="form-input ps-10 placeholder:text-white-dark">
                                            <option>Select a franchise type </option>
                                            {packageList.map((packageItem) => (
                                                <option key={packageItem}>{packageItem}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="packageAmount">PackageAmount</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            onChange={(e) => setAddMember({ ...addMember, packageAmount: e.target.value })}
                                            id="PackageAmount"
                                            type="text"
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
                                    <label htmlFor="Password">TransactionPassword</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            onChange={(e) => setAddMember({ ...addMember, transactionPassword: e.target.value })}
                                            id="TransactionPassword"
                                            type="password"
                                            placeholder="Enter TransactionPassword"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Password">Password</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            onChange={(e) => setAddMember({ ...addMember, password: e.target.value })}
                                            id="Password"
                                            type="password"
                                            placeholder="Enter Password"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    Sign Up
                                </button>
                            </form>
                            <div className="relative my-7 text-center md:mb-9">
                                <div className="text-center dark:text-white">
                                    Already have an account ?&nbsp;
                                    <Link to="/auth/boxed-signin" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                        SIGN IN
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
