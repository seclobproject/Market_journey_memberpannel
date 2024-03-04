import React from 'react';
import Tippy from '@tippyjs/react';
import IconTrashLines from '../components/Icon/IconTrashLines';
const tableData = [
    {
        name: 'John Doe',
        office: 'London',
        sale: 120,
    },
    {
        name: 'Shaun Park',
        office: 'New York',
        sale: 400,
    },
    {
        name: 'Alma Clarke',
        office: 'Amazon',
        sale: 310,
    },
    {
        name: 'Vincent Carpenter',
        office: 'Canada',
        sale: 100,
    },
];
const Member = () => {
    return (
        <div className="panel">
            <div className="flex items-center justify-between mb-5">
                <h5 className="font-semibold text-warning text-lg dark:text-white-light">Package</h5>
            </div>
            <div className="table-responsive mb-5">
                <table>
                    <thead>
                        <tr>
                            <th>Package Name </th>
                            <th>Franchise </th>
                            <th> Amount </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((data) => {
                            return (
                                <tr key={data.name}>
                                    <td>
                                        <div className="whitespace-nowrap">{data.name}</div>
                                    </td>
                                    <td>{data.office}</td>
                                    <td>{data.sale}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Member;
