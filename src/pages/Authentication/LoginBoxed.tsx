import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
// import { setPageTitle } from '../../store/themeConfigSlice';

import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import { loginApi } from '../../store/AuthSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { Show_Toast } from '../Components/Toast';

const LoginBoxed = () => {
    const [userDetails, setUserDetails] = useState<any>({});
    const [errormessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const result: any = await dispatch(loginApi(userDetails));
            const token = result.payload?.data?.access_token;

            if (token) {
                sessionStorage.setItem('User', token);
                sessionStorage.setItem('status', result.payload?.data?.status);
                Show_Toast({ message: 'Login success', type: true });
                navigate('/', { replace: true });
            } else if (result?.payload) {
                setErrorMessage(result?.payload);
                Show_Toast({ message: result?.payload, type: false });
            }
            setLoading(false);
        } catch (error: any) {
            console.error('Error occurred during login:', error);
            Show_Toast({ message: 'internal server error', type: false });
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 py-20">
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="w-full flex justify-center mb-10">
                                <img className="w-[150px] text-center" src="/Rebrand-06.png" alt="logo" />
                            </div>
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug  text-primary md:text-4xl">Log in</h1>
                                <p className="text-base mt-2 leading-normal text-white-dark">Enter your email and password to login</p>
                            </div>

                            <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
                                <div>
                                    <label htmlFor="Email">Email</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
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
                                    <label htmlFor="Password">Password</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
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
                                {errormessage && <p className="text-center text-red-700">{errormessage}</p>}

                                <button type="submit" className="btn bg-primary text-white !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    {loading ? 'loading...' : 'Log In'}
                                </button>
                            </form>
                            <div className="relative my-7 text-center md:mb-9"></div>

                            {/* <div className="text-center dark:text-white">
                                Don't have an account ?&nbsp;
                                <Link to="/auth/boxed-signup/65f1843a29cd6db4c32879f3" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    SIGN UP
                                </Link>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginBoxed;

// Function to set the token in localStorage along with the timestamp
// const setTokenWithExpiry = (key: string, token: string) => {
//     const now = new Date();
//     const expiry = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Expiry time in milliseconds (24 hours)
//     localStorage.setItem(key, JSON.stringify({ value: token, expiry: expiry.toISOString() }));
// };

// Function to get the token from localStorage
// export const getTokenWithExpiry = (key: string) => {
//     const itemStr = localStorage.getItem('User');
//     if (!itemStr) {
//         return null;
//     }
//     const item = JSON.parse(itemStr);
//     const expiry = new Date(item.expiry);
//     const now = new Date();
//     if (now.getTime() > expiry.getTime()) {
//         localStorage.removeItem('User');
//         return null;
//     }
//     return item.value;
// };
