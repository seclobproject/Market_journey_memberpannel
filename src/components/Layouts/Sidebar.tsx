import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import { IRootState, useAppDispatch, useAppSelector } from '../../store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconMenuNotes from '../Icon/Menu/IconMenuNotes';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMenuUsers from '../Icon/Menu/IconMenuUsers';
import IconMenuPages from '../Icon/Menu/IconMenuPages';
import IconCashBanknotes from '../Icon/IconCashBanknotes';
import IconBox from '../Icon/IconBox';
import IconBell from '../Icon/IconBell';
import IconUser from '../Icon/IconUser';
import IconAward from '../Icon/IconAward';
import { userProfileApi } from '../../store/UserSlice';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const [viewSidebar, setViewSidebar] = useState(false);
    const [userView, setUserView] = useState(false);
    const [franchise, setFranchise] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    // const fetchStatus = () => {
    //     const userStatus = sessionStorage.getItem('status');
    //     const userPackageType =  sessionStorage.getItem('packageType');
    //     if (userStatus === 'readyToApprove') {
    //         setViewSidebar(true);
    //         console.log(viewSidebar)
    //     }
    //      if(userPackageType !== 'Franchise') {
    //         setUserView(true);
    //     }
    // };


    useEffect(() => {
        const userStatus = sessionStorage.getItem('status');
        const userPackageType = sessionStorage.getItem('packageType');
        if (userStatus === 'readyToApprove') {
            setViewSidebar(true);
        }
        if (userPackageType === 'Courses' || userPackageType === 'Signals') {
            setUserView(true);
        }
    }, []);

    return (
        <div className={` ${semidark ? 'dark' : ''}`}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            <img className=" text-2xl w-[140px] ml-[5px] flex-none " src="/Rebrand-06.png" alt="logo" />
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0  mt-5">
                            <li className="nav-item ">
                                <ul className="flex-1 flex-col gap-3">
                                    <li className="nav-item">
                                        <NavLink to="/" className="group">
                                            <div className="flex items-center">
                                                <IconMenuDashboard className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Home')}</span>
                                            </div>
                                        </NavLink>
                                    </li>

                                    <li className={`${viewSidebar || userView ? 'hidden' : 'nav-item'}`}>
                                        <NavLink to="/pages/member" className="group">
                                            <div className="flex items-center">
                                                <IconMenuUsers className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Member')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/pages/package" className="group">
                                            <div className="flex items-center">
                                                <IconBox fill className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Package')}</span>
                                            </div>
                                        </NavLink>
                                    </li>

                                    <li className={`${viewSidebar || userView ? 'hidden' : 'nav-item'}`}>
                                        <NavLink to="/pages/withdrawal" className="group">
                                            <div className="flex items-center">
                                                <IconCashBanknotes className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Withdrawal')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    {/* <li className={`${viewSidebar ? 'hidden' : 'nav-item'}`}>
                                        <NavLink to="/pages/recenttransaction" className="group">
                                            <div className="flex items-center">
                                                <IconShoppingBag className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Recent Transaction')}</span>
                                            </div>
                                        </NavLink>
                                    </li> */}
                                    <li className={`${viewSidebar || userView ? 'hidden' : 'nav-item'}`}>
                                        <NavLink to="/pages/report" className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Income')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    {/* <li className={`${viewSidebar ? 'hidden' : 'nav-item'}`}>
                                        <NavLink to="/pages/awards" className="group">
                                            <div className="flex items-center">
                                                <IconAward className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Awards')}</span>
                                            </div>
                                        </NavLink>
                                    </li> */}
                                    <li className={`${viewSidebar ? 'hidden' : 'nav-item'}`}>
                                        <NavLink to="/pages/subscription" className="group">
                                            <div className="flex items-center">
                                                <IconAward className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Subscriptions')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className={`${viewSidebar ? 'hidden' : 'nav-item'}`}>
                                        <NavLink to="/pages/notifications" className="group">
                                            <div className="flex items-center">
                                                <IconBell className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Notification')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/pages/news" className="group">
                                            <div className="flex items-center">
                                                <IconMenuNotes className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Latest News')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className={`${viewSidebar || userView ? 'hidden' : 'nav-item'}`}>
                                        <NavLink to="/pages/demataccount" className="group">
                                            <div className="flex items-center">
                                                <i className="fa-solid fa-building-columns text-gray-400 group-hover:!text-primary shrink-0"></i>
                                                {/* <Ico fill className="group-hover:!text-primary shrink-0" /> */}
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Demat Account')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/users/profile" className="group">
                                            <div className="flex items-center">
                                                <IconUser fill className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Profile')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
