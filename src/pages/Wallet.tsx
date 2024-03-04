import React from 'react';
import Tippy from '@tippyjs/react';
import IconTrashLines from '../components/Icon/IconTrashLines';
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
const Wallet = () => {
    return (
        <>
            <div className="flex gap-5 w-full mb-4">
                <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-base bg-primary text-white justify-center max-w-[200px] w-full ">Level 1</div>
                <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-base bg-primary text-white justify-center max-w-[200px] w-full">Level 2</div>
                <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-base bg-primary text-white justify-center max-w-[200px] w-full">Level 3</div>
            </div>
            <div className="panel">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-warning text-lg dark:text-white-light">Wallet</h5>
                </div>
                <div className="table-responsive mb-5">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Level</th>
                                <th> Amount</th>
                                <th> Date</th>
                                <th> Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((data) => {
                                return (
                                    <tr key={data.id}>
                                        <td>
                                            <div className="whitespace-nowrap">{data.name}</div>
                                        </td>
                                        <td>{data.id}</td>
                                        <td>{data.date}</td>
                                        <td>{data.sale}</td>
                                        <td>
                                            <div
                                                className={`whitespace-nowrap ${
                                                    data.status === 'completed'
                                                        ? 'text-success'
                                                        : data.status === 'Pending'
                                                        ? 'text-secondary'
                                                        : data.status === 'In Progress'
                                                        ? 'text-info'
                                                        : data.status === 'Canceled'
                                                        ? 'text-danger'
                                                        : 'text-success'
                                                }`}
                                            >
                                                {data.status}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Wallet;
