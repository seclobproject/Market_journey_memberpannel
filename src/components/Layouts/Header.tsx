import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IRootState, useAppSelector } from '../../store';
import { toggleRTL, toggleSidebar } from '../../store/themeConfigSlice';
import { useTranslation } from 'react-i18next';
import Dropdown from '../Dropdown';
import IconMenu from '../Icon/IconMenu';
import IconInfoCircle from '../Icon/IconInfoCircle';
import IconBellBing from '../Icon/IconBellBing';
import IconUser from '../Icon/IconUser';
import IconLogout from '../Icon/IconLogout';

import { ApiCall } from '../../Services/Api';
import { AlertUrl, getProfileUrl } from '../../utils/EndPoints';

// interface ProfileDetails {
//     name: string;
//     email: string;
//     userStatus: string;
//     walletAmount: string;
// }

const Header = () => {
    const [logoutModal, setLogoutModal] = useState(false);
    const [viewNotifications, setViewNotification] = useState(false);
    // const [profielDetails, setProfileDetails] = useState<ProfileDetails>({
    //     name: '',
    //     email: '',
    //     userStatus: '',
    //     walletAmount: '',
    // });
    const { user } = useAppSelector((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList.add('active');
                    });
                }
            }
        }
    }, [location]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();

    function createMarkup(messages: any) {
        return { __html: messages };
    }

    // const removeNotification = (value: number) => {
    //     setNotifications(notifications.filter((user) => user.id !== value));
    // };

    // const [search, setSearch] = useState(false);

    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState(themeConfig.locale);

    const { t } = useTranslation();

    const handleLogout = () => {};

    // const getProfile = async () => {
    //     try {
    //         const response = await ApiCall('get', getProfileUrl);
    //         console.log(response);

    //         if (response instanceof Error) {
    //             console.error('Error fetching state list:', response.message);
    //         } else if (response.status === 200) {
    //             setProfileDetails(response?.data);
    //         } else {
    //             console.error('Error fetching state list. Unexpected status:', response.status);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching state list:', error);
    //     }
    // };
    // useEffect(() => {
    //     getProfile();
    // }, []);

    const [alert, setAlert] = useState([]);

    //  const seenNotifications = JSON.parse(localStorage.getItem('seenNotifications') || '[]');

    //  const markNotificationAsSeen = (notificationId: any) => {
    //      const updatedSeenNotifications = [...seenNotifications, notificationId];
    //      localStorage.setItem('seenNotifications', JSON.stringify(updatedSeenNotifications));
    //  };

    useEffect(() => {
        let latestNotification;
        const userStatus = sessionStorage.getItem('status');
        if (userStatus === 'readyToApprove') {
            setViewNotification(true);
        }

        const fetchNotifications = async () => {
            try {
                const res: any = await ApiCall('get', AlertUrl);
                //  const notifications = res?.data?.alertData || [];
                if (Array.isArray(res?.data?.alertData)) {
                    setAlert(res?.data?.alertData.slice(0, 3));
                }
                //  setAlert(res?.data?.alertData);

                //  const unseenNotifications: any[] = notifications.filter((notification: any) => !seenNotifications.includes(notification._id));

                //  latestNotification = unseenNotifications[0];
                //  if (latestNotification) {
                //      markNotificationAsSeen(latestNotification._id);
                //      Show_Toast({ message: latestNotification.description, type: true });
                //  }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    const openModal = () => {
        setLogoutModal(true);
        document.body.classList.add('overflow-hidden');
    };
    const closeModal = () => {
        setLogoutModal(false);
        document.body.classList.remove('overflow-hidden');
    };
    return (
        <>
            <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
                <div className="shadow-sm">
                    <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
                        <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
                            <Link to="/" className="main-logo flex items-center shrink-0">
                                <img className="w-20 ltr:-ml-1 rtl:-mr-1 inline" src="/marketlogo.png" alt="logo" />
                            </Link>
                            <button
                                type="button"
                                className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                                onClick={() => {
                                    dispatch(toggleSidebar());
                                }}
                            >
                                <IconMenu className="w-5 h-5 " />
                            </button>
                        </div>

                        <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]  ">
                            {!viewNotifications  && (
                                <div className="dropdown shrink-0 ml-auto">
                                    <Dropdown
                                        offset={[0, 8]}
                                        placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                        btnClassName="relative block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                        button={
                                            <span>
                                                <IconBellBing />
                                                <span className="flex absolute w-3 h-3 ltr:right-0 rtl:left-0 top-0">
                                                    <span className="animate-ping absolute ltr:-left-[3px] rtl:-right-[3px] -top-[3px] inline-flex h-full w-full rounded-full bg-success/50 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full w-[6px] h-[6px] bg-success"></span>
                                                </span>
                                            </span>
                                        }
                                    >
                                        <ul className="!py-0 text-dark dark:text-white-dark w-[300px] sm:w-[350px] divide-y dark:divide-white/10">
                                            <li onClick={(e) => e.stopPropagation()}>
                                                <div className="flex items-center px-4 py-2 justify-between font-semibold">
                                                    <h4 className="text-lg">Notification</h4>
                                                    {/* {alert.length ? <span className="badge bg-primary/80">{notifications.length}New</span> : ''} */}
                                                </div>
                                            </li>
                                            {alert.length > 0 ? (
                                                <>
                                                    {alert.map((notification: any) => {
                                                        return (
                                                            <li key={notification._id} className="dark:text-white-light/90" onClick={(e) => e.stopPropagation()}>
                                                                <div className="group flex items-center px-4 py-2">
                                                                    <div className="grid place-content-center rounded">
                                                                        <div className="w-12 h-12 relative">
                                                                            <img src="/public/web logo-01.svg" alt="img" className="w-14 h-14 rounded-full object-none m-auto" />
                                                                            {/* <span className="bg-success w-2 h-2 rounded-full block absolute right-[6px] bottom-0"></span> */}
                                                                        </div>
                                                                    </div>
                                                                    <div className="ltr:pl-3 rtl:pr-3 flex flex-auto">
                                                                        <div className="ltr:pr-3 rtl:pl-3">
                                                                            <h6
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: notification.description,
                                                                                }}
                                                                            ></h6>
                                                                            <span className="text-xs block font-normal dark:text-gray-500">{notification?.time}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        );
                                                    })}
                                                    <li>
                                                        <div className="p-4">
                                                            <button onClick={() => navigate('/pages/notifications')} className="btn btn-primary block w-full btn-small">
                                                                Read All Notifications
                                                            </button>
                                                        </div>
                                                    </li>
                                                </>
                                            ) : (
                                                <li onClick={(e) => e.stopPropagation()}>
                                                    <button type="button" className="!grid place-content-center hover:!bg-transparent text-lg min-h-[200px]">
                                                        <div className="mx-auto ring-4 ring-primary/30 rounded-full mb-4 text-primary">
                                                            <IconInfoCircle fill={true} className="w-10 h-10" />
                                                        </div>
                                                        No data available.
                                                    </button>
                                                </li>
                                            )}
                                        </ul>
                                    </Dropdown>
                                </div>
                            )}
                            <div className="dropdown shrink-0 flex">
                                <Dropdown
                                    offset={[0, 8]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="relative group block"
                                    button={<img className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100" src="/assets/images/userProfile.jpg" alt="userProfile" />}
                                >
                                    <ul className="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                                        <li>
                                            <div className="flex items-center px-4 py-4">
                                                <img className="rounded-md w-10 h-10 object-cover" src="/assets/images/userProfile.jpg" alt="userProfile" />
                                                <div className="ltr:pl-4 rtl:pr-4 truncate">
                                                    <h4 className="text-base">
                                                        {user.name}
                                                        <span className="text-xs bg-success-light rounded text-success px-1 ltr:ml-2 rtl:ml-2">Pro</span>
                                                    </h4>
                                                    <button type="button" className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white">
                                                        {user.email}
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <Link to="/users/profile" className="dark:hover:text-white">
                                                <IconUser className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                                Profile
                                            </Link>
                                        </li>
                                        <li className="border-t border-white-light dark:border-white-light/10">
                                            <button onClick={openModal} className="text-danger !py-3">
                                                <IconLogout className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />
                                                <p>Sign Out</p>
                                            </button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {logoutModal && (
                <div className="fixed z-[999] top-0 left-0 w-full h-screen bg-opacity-30 bg-black grid place-items-center ">
                    <div className="relative z-[999] lg:w-2/6 h-2/5 flex md:w-3/4 w-[90%]  flex-col gap-10 border-2 p-2 rounded-lg items-center justify-center bg-white shadow-lg">
                        <div onClick={closeModal} className="p-1.5 absolute border-2 top-5 right-5 rounded-full text-red-500 cursor-pointer">
                            X
                        </div>
                        <h1 className="text-primary text-2xl font-bold">Logout Confirmation</h1>
                        <p className="text-[15px]">Are you sure you want to log out?</p>
                        <div className="flex mt-1 gap-2">
                            <button onClick={closeModal} className="px-10 py-2 rounded bg-primary text-white cursor-pointer border-none text-base font-semibold">
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    sessionStorage.removeItem('User');
                                    sessionStorage.removeItem('status');
                                    sessionStorage.removeItem('packageType');
                                    setLogoutModal(false);
                                    navigate('/auth/boxed-signin', { replace: true });
                                }}
                                className="px-10 py-2 rounded bg-red-500 text-white cursor-pointer border-none text-base font-semibold"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-screen bg-opacity-30 bg-black backdrop-blur-lg"></div>
                </div>
            )}
        </>
    );
};

export default Header;
