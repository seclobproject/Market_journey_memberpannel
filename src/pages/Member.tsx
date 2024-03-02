import React, { FormEvent, Fragment, useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import IconTrashLines from '../components/Icon/IconTrashLines';
import { Dialog, Transition } from '@headlessui/react';
import { CloseButton } from '@mantine/core';
import { CrossIcon } from 'react-select/dist/declarations/src/components/indicators';
import { useDispatch } from 'react-redux';
import { Show_Toast } from './Components/Toast';
import { ApiCall } from '../Services/Api';
import { districtlistinZonalUrl, memberaddUrl, packagesListUrl, panchayathlistindropdownUrl, statelistPageUrl, zonallistindropdownUrl } from '../utils/EndPoints';
import IconUser from '../components/Icon/IconUser';
import IconMail from '../components/Icon/IconMail';
import IconMapPin from '../components/Icon/IconMapPin';
import IconPhone from '../components/Icon/IconPhone';
import IconLockDots from '../components/Icon/IconLockDots';
import IconCashBanknotes from '../components/Icon/IconCashBanknotes';
const tableData = [
    {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@yahoo.com',
        date: '10/08/2020',
        sale: 120,
        status: 'Complete',
        register: '5 min ago',
        progress: '40%',
        position: 'Developer',
        office: 'London',
    },
    {
        id: 2,
        name: 'Shaun Park',
        email: 'shaunpark@gmail.com',
        date: '11/08/2020',
        sale: 400,
        status: 'Pending',
        register: '11 min ago',
        progress: '23%',
        position: 'Designer',
        office: 'New York',
    },
    {
        id: 3,
        name: 'Alma Clarke',
        email: 'alma@gmail.com',
        date: '12/02/2020',
        sale: 310,
        status: 'In Progress',
        register: '1 hour ago',
        progress: '80%',
        position: 'Accountant',
        office: 'Amazon',
    },
    {
        id: 4,
        name: 'Vincent Carpenter',
        email: 'vincent@gmail.com',
        date: '13/08/2020',
        sale: 100,
        status: 'Canceled',
        register: '1 day ago',
        progress: '60%',
        position: 'Data Scientist',
        office: 'Canada',
    },
];
interface Member {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    franchise: string;
    packageAmount: string | number;
    state: string;
    district: string;
    zonal: string;
    panchayath: string;
}
interface Package {
    franchiseName: string;
    packageAmount: number;
}
interface States {
    name: String;
    id: String;
}
 
const Member = () => {
    const [addModal, setAddModal] = useState(false);
    const [addMember, setAddMember] = useState<Member>({
        name: '',
        email: '',
        franchise: '',
        password: '',
        address: '',
        phone: '',
        packageAmount: '',
        state: '',
        district: '',
        zonal: '',
        panchayath: '',
    });
    const [stateList, setStateList] = useState<any>([]);
    const [districtList, setDistrictList] = useState([]);
    const [zonalList, setZonalList] = useState([]);
    const [panchayathList, setPanchayathList] = useState([]);
    const [packageList, setPackageList] = useState<Package[]>([]);
    const [selectedStateId, setSelectedStateId] = useState('');
    const [selectedDistrictId, setSelectedDistrictId] = useState(null);
    const [selectedZonalId, setSelectedZonalId] = useState(null);
    useEffect(() => {
        getPackagesList();
        getStateList();
    }, []);
    useEffect(() => {
        if (selectedStateId) {
            getDistrictList();
        }
        if (selectedDistrictId) {
            getZonallist();
        }
        if (selectedZonalId) {
            getPanchayathList();
        }
    }, [selectedStateId, selectedDistrictId, selectedZonalId]);

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
    //---------Add--member---------
    const addMemberFun = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await ApiCall('post', memberaddUrl, addMember);
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
                    phone: '',
                    packageAmount: '',
                    state: '',
                    district: '',
                    zonal: '',
                    panchayath: '',
                });
                setAddModal(false);
                Show_Toast({ message: 'Member added successfully', type: true });
            } else {
                Show_Toast({ message: 'Member added failed', type: false });
            }
        } catch (error) {
            console.log(error);

            // Show_Toast({message:error, type:false});
        }
    };

    const packageOptions = packageList.map((pack) => ({
        value: pack.franchiseName,
        label: pack.franchiseName,
        packageAmount: pack.packageAmount,
    }));

    // ----------select state and get state id ---------------
    const stateSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const selectedState = stateList.find((state: any) => state.name === selectedValue);

        if (selectedState) {
            setAddMember({
                ...addMember,
                state: selectedState.name,
            });
            setSelectedStateId(selectedState.id);
        }
    };
    //--------------------------------

    return (
        <div className="panel">
            <div className="flex items-center justify-between mb-5">
                <h5 className="font-semibold text-lg dark:text-white-light">Member</h5>
                <button
                    onClick={() => setAddModal(true)}
                    className="panel flex items-center overflow-x-auto whitespace-nowrap p-2 text-base bg-primary text-white justify-center max-w-[100px] w-full "
                >
                    Add
                </button>
            </div>
            <div className="table-responsive mb-5">
                <table>
                    <thead>
                        <tr>
                            <th>sponser name</th>
                            <th>Name</th>
                            <th> franchise</th>
                            <th> phone</th>
                            <th> Package Amount</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((data) => {
                            return (
                                <tr key={data.id}>
                                    <td>
                                        <div className="whitespace-nowrap">{data.name}</div>
                                    </td>
                                    <td>{data.date}</td>
                                    <td>{data.sale}</td>

                                    <td className="text-center">
                                        <Tippy content="Delete">
                                            <button type="button">
                                                <IconTrashLines className="m-auto" />
                                            </button>
                                        </Tippy>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
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
                                                                    type="password"
                                                                    placeholder="Enter Password"
                                                                    className="form-input ps-10 placeholder:text-white-dark"
                                                                />
                                                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                                    <IconLockDots fill={true} />
                                                                </span>
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
                                                        {(addMember?.franchise === 'District Franchise' ||
                                                            addMember?.franchise === 'Zonal Franchise' ||
                                                            addMember?.franchise === 'Mobile Franchise') && (
                                                            <>
                                                                <div>
                                                                    <label htmlFor="Email">State</label>
                                                                    <div className="relative text-white-dark">
                                                                        <select className="form-input ps-10 placeholder:text-white-dark" onChange={stateSelectHandler} value={addMember.state}>
                                                                            <option key="default" value="">
                                                                                Select State
                                                                            </option>
                                                                            {stateList.map((singleState: any, idx: any) => (
                                                                                <option key={idx} value={singleState.name}>
                                                                                    {singleState.name}
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
                                                                                    setAddMember({
                                                                                        ...addMember,
                                                                                        district: selectedDistrict?.name,
                                                                                    });
                                                                                    setSelectedDistrictId(selectedDistrict?.id);
                                                                                }
                                                                            }}
                                                                            value={addMember.district}
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
                                                        {(addMember?.franchise === 'Zonal Franchise' || addMember?.franchise === 'Mobile Franchise') && (
                                                            <div>
                                                                <label htmlFor="zonal">{addMember?.franchise === 'Zonal Franchise' ? 'Zonel Franchise Name' : 'Zonel'}</label>
                                                                <div className="relative text-white-dark">
                                                                    <select
                                                                        className="form-input ps-10 placeholder:text-white-dark"
                                                                        onChange={(e) => {
                                                                            const selectedValue = e.target.value;
                                                                            const selectedZonel = zonalList.find((zonal: any) => zonal.name === selectedValue) as any;

                                                                            if (selectedZonel) {
                                                                                setAddMember({
                                                                                    ...addMember,
                                                                                    zonal: selectedZonel?.name,
                                                                                });
                                                                                setSelectedZonalId(selectedZonel?.id);
                                                                            }
                                                                        }}
                                                                        value={addMember.zonal}
                                                                    >
                                                                        <option key="default" value="">
                                                                            Select Zonel{' '}
                                                                        </option>
                                                                        {zonalList.map((zonal: any) => (
                                                                            <option key={zonal.id}>{zonal.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {addMember?.franchise === 'Mobile Franchise' && (
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
                                                <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                                    Sign Up
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
    );
};

export default Member;
