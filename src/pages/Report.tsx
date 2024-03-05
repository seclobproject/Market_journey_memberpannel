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
const Report = () => {
    return (
        <>
            <div className="flex flex-wrap gap-5 w-full mb-4">
                <div className="panel cursor-pointer flex items-center overflow-x-auto whitespace-nowrap p-3 text-base bg-primary text-white justify-center max-w-[200px] w-full ">State</div>
                <div className="panel cursor-pointer flex items-center overflow-x-auto whitespace-nowrap p-3 text-base bg-primary text-white justify-center max-w-[200px] w-full">Destrict</div>
                <div className="panel cursor-pointer flex items-center overflow-x-auto whitespace-nowrap p-3 text-base bg-primary text-white justify-center max-w-[200px] w-full">constituency</div>
                <div className="panel cursor-pointer flex items-center overflow-x-auto whitespace-nowrap p-3 text-base bg-primary text-white justify-center max-w-[200px] w-full">panjayathe</div>
            </div>
            <div className="panel">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-warning text-lg dark:text-white-light">Report</h5>
                </div>
                <div className="table-responsive mb-5">
                    <table>
                        <thead>
                            <tr>
                                <th>sponser name</th>
                                <th>Name</th>
                                <th> District</th>
                                <th> franchise</th>
                                <th> Total withdrowal amount</th>
                                <th> Total renewal</th>
                                <th>Referal amount</th>
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

                                        <td className="text-center"></td>
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

export default Report;
