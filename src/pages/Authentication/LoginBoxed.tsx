import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';

import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import { loginApi } from '../../store/AuthSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { Show_Toast } from '../Components/Toast';

const LoginBoxed = () => {
    const [userDetails, setUserDetails] = useState<any>({});
    const [errormessage,setErrorMessage]=useState('')
      const [showPassword, setShowPassword] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

      const handleTogglePassword = () => {
          setShowPassword((prevShowPassword) => !prevShowPassword);
      };
    
    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await dispatch(loginApi(userDetails));
            const token = result.payload?.data?.access_token;

            console.log(result);
            console.log(token);

            if (token) {
                // Store the token in local storage
                localStorage.setItem('User', token);
                localStorage.setItem('status', result.payload?.data?.status);
                Show_Toast({ message: 'Login success', type: true });
                console.log(result?.payload?.data);
                
                // Navigate to the dashboard
                navigate('/',{ replace: true });
            }
            else{
                setErrorMessage(result?.payload?.response?.data?.message);
                console.log(result?.payload?.response?.data?.message);
                Show_Toast({message:"Invalid Email or Password",type:false})
            //    <Show_Toast message='User not found' type={false} />;
                
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
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
                            <div className="w-full flex justify-center mb-10">
                                <img className="w-[150px] text-center" src="/public/marketlogo.png" alt="logo" />
                            </div>
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
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

                                <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    Sign in
                                </button>
                            </form>
                            <div className="relative my-7 text-center md:mb-9"></div>

                            <div className="text-center dark:text-white">
                                Don't have an account ?&nbsp;
                                <Link to="/auth/boxed-signup/65d2ba84f9c53aaef171eccf" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    SIGN UP
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginBoxed;
