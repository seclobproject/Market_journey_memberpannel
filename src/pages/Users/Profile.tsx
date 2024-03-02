import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import Dropdown from '../../components/Dropdown';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import IconPencilPaper from '../../components/Icon/IconPencilPaper';
import IconCoffee from '../../components/Icon/IconCoffee';
import IconCalendar from '../../components/Icon/IconCalendar';
import IconMapPin from '../../components/Icon/IconMapPin';
import IconMail from '../../components/Icon/IconMail';
import IconPhone from '../../components/Icon/IconPhone';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconDribbble from '../../components/Icon/IconDribbble';
import IconGithub from '../../components/Icon/IconGithub';
import IconShoppingBag from '../../components/Icon/IconShoppingBag';
import IconTag from '../../components/Icon/IconTag';
import IconCreditCard from '../../components/Icon/IconCreditCard';
import IconClock from '../../components/Icon/IconClock';
import IconHorizontalDots from '../../components/Icon/IconHorizontalDots';
import { ApiCall } from '../../Services/Api';
import { editProfileUrl, getProfileUrl } from '../../utils/EndPoints';
import IconCashBanknotes from '../../components/Icon/IconCashBanknotes';
import IconBox from '../../components/Icon/IconBox';
import IconPencil from '../../components/Icon/IconPencil';
interface ProfileDetails {
    name: string;
    address: string;
    phone: string;
    email: string;
    franchise: string;
    franchiseN: string;
    userStatus: string;
    walletAmount: string;
}

const Profile = () => {
    const [profielDetails, setProfileDetails] = useState<ProfileDetails>({
        name: '',
        address: '',
        phone: '',
        email: '',
        franchise: '',
        franchiseN: '',
        userStatus: '',
        walletAmount: '',
    });
    const [editProfleData, setEditProfileData] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        password: '',
    });
    const [confirmPassword, setConfirmPasswod] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Profile'));
        getProfile();
    }, []);
    useEffect(() => {
        if (confirmPassword === editProfleData.password) {
            setErrorMessage(false);
        } else {
            setErrorMessage(true);
        }
    }, [confirmPassword]);

    //----------Get user profile -----------

    const getProfile = async () => {
        try {
            const response = await ApiCall('get', getProfileUrl);
            console.log(response);

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setProfileDetails(response?.data);
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };
    //--------------------------------

    // ---------- Edit profile --------------
    const editProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editProfleData.password === confirmPassword) {
        } else {
            setErrorMessage(true);
        }
        try {
            const response = await ApiCall('post', editProfileUrl, editProfleData);
            console.log(response);

            if (response instanceof Error) {
                console.error('Error fetching state list:', response.message);
            } else if (response.status === 200) {
                setProfileDetails(response?.data);
                getProfile();
                setEditProfileData({
                    name: '',
                    address: '',
                    phone: '',
                    email: '',
                    password: '',
                });
                setConfirmPasswod('');
            } else {
                console.error('Error fetching state list. Unexpected status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching state list:', error);
        }
    };

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Users
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Profile</span>
                </li>
            </ul>
            <div className="pt-5">
                {/* <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5"> */}
                <div className="flex flex-wrap justify-evenly">
                    <div className="panel mb-5 ">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-warning text-lg dark:text-white-light">Profile</h5>
                            {/* <Link to="/users/user-account-settings" className="ltr:ml-auto rtl:mr-auto btn btn-primary p-2 rounded-full">
                                <IconPencilPaper />
                            </Link> */}
                        </div>
                        <div className="mb-5">
                            <div className="flex flex-col justify-center items-center">
                                <img src="/assets/images/userProfile.jpg" alt="img" className="w-24 h-24 rounded-full object-cover mb-5" />
                                <p className="font-semibold text-primary text-xl">{profielDetails.name}</p>
                                <p className={profielDetails.userStatus === 'approved' ? 'text-green-500' : 'text-warning'}>{profielDetails.userStatus}</p>
                            </div>
                            <div className="mt-5 flex m-auto space-y-4 flex-wrap text-md font-semibold text-white-dark gap-5">
                                <ul className="mt-5 m-auto space-y-4 max-w-[280px]">
                                    {/* <li className="flex items-center gap-2">
                                        <IconCoffee className="shrink-0" />
                                        Status : {profielDetails.userStatus}
                                    </li> */}
                                    <li>
                                        <button className="flex items-center gap-2">
                                            <IconMail className="w-5 h-5 shrink-0" />
                                            <span className="text-primary truncate">Email : {profielDetails.email}</span>
                                        </button>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <IconPhone />
                                        Phone : {profielDetails.phone}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <IconMapPin className="shrink-0" />
                                        Address : {profielDetails.address}
                                    </li>

                                    {/* <li className="flex items-center gap-2">
                                        <IconPhone />
                                        <span className="whitespace-nowrap" dir="ltr">
                                            {profielDetails.phone}
                                        </span>
                                    </li> */}
                                </ul>
                                <ul className="mt-5 m-auto space-y-4">
                                    <li className="flex items-center gap-2">
                                        <IconCashBanknotes className="shrink-0" />
                                        walletAmount : {profielDetails.walletAmount}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <IconBox className="shrink-0" />
                                        Franchise Type : {profielDetails.franchise}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <IconPencil className="shrink-0" />
                                        Franchise Name : {profielDetails.franchise}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={editProfile} className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black ">
                        <h6 className="text-lg text-warning font-bold mb-5">Edit Details</h6>
                        <div className="flex flex-col sm:flex-row">
                            {/* <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                    <img src="/assets//images/profile-34.jpeg" alt="img" className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto" />
                                </div> */}
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="mr-2">
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        onChange={(e) => setEditProfileData({ ...editProfleData, name: e.target.value })}
                                        id="name"
                                        type="text"
                                        value={editProfleData.name}
                                        placeholder="Enter your name"
                                        className="form-input"
                                    />
                                </div>

                                <div className="mr-2">
                                    <label htmlFor="address">Address</label>
                                    <input
                                        onChange={(e) => setEditProfileData({ ...editProfleData, address: e.target.value })}
                                        id="address"
                                        value={editProfleData.address}
                                        type="text"
                                        placeholder="Address"
                                        className="form-input"
                                    />
                                </div>
                                {/* <div className="mr-2">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        onChange={(e) => setEditProfileData({ ...editProfleData, phone: e.target.value })}
                                        id="phone"
                                        type="text"
                                        value={editProfleData.phone}
                                        placeholder="Enter your Phone"
                                        className="form-input"
                                    />
                                </div> */}
                                <div className="mr-2">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        onChange={(e) => setEditProfileData({ ...editProfleData, email: e.target.value })}
                                        id="email"
                                        value={editProfleData.email}
                                        type="email"
                                        placeholder="Email"
                                        className="form-input"
                                    />
                                </div>
                                <div className="mr-2">
                                    <label htmlFor="newPassword">New Password</label>
                                    <input
                                        onChange={(e) => setEditProfileData({ ...editProfleData, password: e.target.value })}
                                        id="newPassword"
                                        type="text"
                                        value={editProfleData.password}
                                        placeholder="Enter new password"
                                        className="form-input"
                                    />
                                </div>
                                <div className="mr-2">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        onChange={(e) => setConfirmPasswod(e.target.value)}
                                        id="confirmPassword"
                                        type="text"
                                        value={confirmPassword}
                                        placeholder="Enter confirm Password"
                                        className="form-input"
                                    />
                                </div>
                                {errorMessage && <p className="text-red-600">Passwords do not match.</p>}
                                <div className="sm:col-span-2 mt-3">
                                    <button type="submit" className="btn btn-primary border-none">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                {/* <div className="panel lg:col-span-2 xl:col-span-3">
                        <div className="mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Task</h5>
                        </div>
                        <div className="mb-5">
                            <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                <table className="whitespace-nowrap">
                                    <thead>
                                        <tr>
                                            <th>Projects</th>
                                            <th>Progress</th>
                                            <th>Task Done</th>
                                            <th className="text-center">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="dark:text-white-dark">
                                        <tr>
                                            <td>Figma Design</td>
                                            <td>
                                                <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                    <div className="bg-danger rounded-full w-[29.56%]"></div>
                                                </div>
                                            </td>
                                            <td className="text-danger">29.56%</td>
                                            <td className="text-center">2 mins ago</td>
                                        </tr>
                                        <tr>
                                            <td>Vue Migration</td>
                                            <td>
                                                <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                    <div className="bg-info rounded-full w-1/2"></div>
                                                </div>
                                            </td>
                                            <td className="text-success">50%</td>
                                            <td className="text-center">4 hrs ago</td>
                                        </tr>
                                        <tr>
                                            <td>Flutter App</td>
                                            <td>
                                                <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                    <div className="bg-warning rounded-full  w-[39%]"></div>
                                                </div>
                                            </td>
                                            <td className="text-danger">39%</td>
                                            <td className="text-center">a min ago</td>
                                        </tr>
                                        <tr>
                                            <td>API Integration</td>
                                            <td>
                                                <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                    <div className="bg-success rounded-full  w-[78.03%]"></div>
                                                </div>
                                            </td>
                                            <td className="text-success">78.03%</td>
                                            <td className="text-center">2 weeks ago</td>
                                        </tr>

                                        <tr>
                                            <td>Blog Update</td>
                                            <td>
                                                <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                    <div className="bg-secondary  rounded-full  w-full"></div>
                                                </div>
                                            </td>
                                            <td className="text-success">100%</td>
                                            <td className="text-center">18 hrs ago</td>
                                        </tr>
                                        <tr>
                                            <td>Landing Page</td>
                                            <td>
                                                <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                    <div className="bg-danger rounded-full  w-[19.15%]"></div>
                                                </div>
                                            </td>
                                            <td className="text-danger">19.15%</td>
                                            <td className="text-center">5 days ago</td>
                                        </tr>
                                        <tr>
                                            <td>Shopify Dev</td>
                                            <td>
                                                <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                    <div className="bg-primary rounded-full w-[60.55%]"></div>
                                                </div>
                                            </td>
                                            <td className="text-success">60.55%</td>
                                            <td className="text-center">8 days ago</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div> */}
                {/* </div> */}
            </div>
        </div>
    );
};

export default Profile;
