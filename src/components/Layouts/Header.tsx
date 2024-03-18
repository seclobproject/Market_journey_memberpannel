import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IRootState, useAppSelector } from '../../store';
import { toggleRTL, toggleTheme, toggleSidebar } from '../../store/themeConfigSlice';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import Dropdown from '../Dropdown';
import IconMenu from '../Icon/IconMenu';
import IconCalendar from '../Icon/IconCalendar';
import IconEdit from '../Icon/IconEdit';
import IconChatNotification from '../Icon/IconChatNotification';
import IconSearch from '../Icon/IconSearch';
import IconXCircle from '../Icon/IconXCircle';
import IconSun from '../Icon/IconSun';
import IconMoon from '../Icon/IconMoon';
import IconLaptop from '../Icon/IconLaptop';
import IconMailDot from '../Icon/IconMailDot';
import IconArrowLeft from '../Icon/IconArrowLeft';
import IconInfoCircle from '../Icon/IconInfoCircle';
import IconBellBing from '../Icon/IconBellBing';
import IconUser from '../Icon/IconUser';
import IconMail from '../Icon/IconMail';
import IconLockDots from '../Icon/IconLockDots';
import IconLogout from '../Icon/IconLogout';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMenuApps from '../Icon/Menu/IconMenuApps';
import IconMenuComponents from '../Icon/Menu/IconMenuComponents';
import IconMenuElements from '../Icon/Menu/IconMenuElements';
import IconMenuDatatables from '../Icon/Menu/IconMenuDatatables';
import IconMenuForms from '../Icon/Menu/IconMenuForms';
import IconMenuPages from '../Icon/Menu/IconMenuPages';
import IconMenuMore from '../Icon/Menu/IconMenuMore';
import { ApiCall } from '../../Services/Api';
import { AlertUrl, getProfileUrl } from '../../utils/EndPoints';
import { Show_Toast } from '../../pages/Components/Toast';

// interface ProfileDetails {
//     name: string;
//     email: string;
//     userStatus: string;
//     walletAmount: string;
// }

const Header = () => {
    const [logoutModal, setLogoutModal] = useState(false);
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
         const fetchNotifications = async () => {
             try {
                 const res: any = await ApiCall('get', AlertUrl);
                //  const notifications = res?.data?.alertData || [];
                 if (Array.isArray(res?.data?.alertData)) {
                     setAlert(res?.data?.alertData.slice(0, 3));
                 }
                //  setAlert(res?.data?.alertData);
                 console.log(res);

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
    return (
        <>
            <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
                <div className="shadow-sm">
                    <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
                        <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
                            <Link to="/" className="main-logo flex items-center shrink-0">
                                <img className="w-20 ltr:-ml-1 rtl:-mr-1 inline" src="/public/marketlogo.png" alt="logo" />
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
                            {/* <div className="sm:ltr:mr-auto sm:rtl:ml-auto">
                            <form
                                className={`${search && '!block'} sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden`}
                                onSubmit={() => setSearch(false)}
                            >
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                                        placeholder="Search..."
                                    />
                                    <button type="button" className="absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-primary">
                                        <IconSearch className="mx-auto" />
                                    </button>
                                    <button type="button" className="hover:opacity-80 sm:hidden block absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2" onClick={() => setSearch(false)}>
                                        <IconXCircle />
                                    </button>
                                </div>
                            </form>
                            <button
                                type="button"
                                onClick={() => setSearch(!search)}
                                className="search_btn sm:hidden p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                            >
                                <IconSearch className="w-4.5 h-4.5 mx-auto dark:text-[#d0d2d6]" />
                            </button>
                        </div> */}
                            {/* <div>
                            {themeConfig.theme === 'light' ? (
                                <button
                                    className={`${
                                        themeConfig.theme === 'light' &&
                                        'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                                    }`}
                                    onClick={() => {
                                        dispatch(toggleTheme('dark'));
                                    }}
                                >
                                    <IconSun />
                                </button>
                            ) : (
                                ''
                            )}
                            {themeConfig.theme === 'dark' && (
                                <button
                                    className={`${
                                        themeConfig.theme === 'dark' &&
                                        'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                                    }`}
                                    onClick={() => {
                                        dispatch(toggleTheme('system'));
                                    }}
                                >
                                    <IconMoon />
                                </button>
                            )}
                            {themeConfig.theme === 'system' && (
                                <button
                                    className={`${
                                        themeConfig.theme === 'system' &&
                                        'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                                    }`}
                                    onClick={() => {
                                        dispatch(toggleTheme('light'));
                                    }}
                                >
                                    <IconLaptop />
                                </button>
                            )}
                        </div> */}

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
                                                                        <img src="/public/web logo-01.png" alt="img" className="w-14 h-14 rounded-full object-none m-auto" />
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
                                                                    {/* <button
                                                                        type="button"
                                                                        className="ltr:ml-auto rtl:mr-auto text-neutral-300 hover:text-danger opacity-0 group-hover:opacity-100"
                                                                        onClick={() => removeNotification(notification.id)}
                                                                    >
                                                                        <IconXCircle />
                                                                    </button> */}
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
                                        {/* <li>
                                        <Link to="/apps/mailbox" className="dark:hover:text-white">
                                            <IconMail className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                            Inbox
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/auth/boxed-lockscreen" className="dark:hover:text-white">
                                            <IconLockDots className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                            Lock Screen
                                        </Link>
                                    </li> */}
                                        <li className="border-t border-white-light dark:border-white-light/10">
                                            <button onClick={() => setLogoutModal(true)} className="text-danger !py-3">
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
                <div className="absolute z-[999] top-0 left-0 w-full h-screen bg-opacity-30 bg-black grid place-items-center ">
                    <div className="relative z-[999] lg:w-2/6 h-2/5 flex sm:w-3/4 flex-col gap-10 border-2 p-2 rounded-lg items-center justify-center bg-white shadow-lg">
                        <div onClick={() => setLogoutModal(false)} className="p-1.5 absolute border-2 top-5 right-5 rounded-full text-red-500 cursor-pointer">
                            X
                        </div>
                        <h1 className="text-primary text-2xl font-bold">Logout Confirmation</h1>
                        <p className="text-[15px]">Are you sure you want to log out?</p>
                        <div className="flex mt-1 gap-2">
                            <button onClick={() => setLogoutModal(false)} className="px-10 py-2 rounded bg-primary text-white cursor-pointer border-none text-base font-semibold">
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('User');
                                    localStorage.removeItem('status');
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
