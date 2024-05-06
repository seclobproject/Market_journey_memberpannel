import React from 'react';
import Barcode from 'react-barcode';
const Invoice = ({ userDetails }: any) => {
    const calculateGSTAmount = (amount: number) => {
        const gstRate = 18;
        const gstAmount = (amount * gstRate) / 100;
        return gstAmount;
    };

    const totalAmount = userDetails?.packageAmount;
    const gstAmount = calculateGSTAmount(totalAmount);
    const totalWithGST = totalAmount + gstAmount;

    return (
        <div className="container p-[50px] border-2">
            <div className="sm:flex justify-between">
                <div className="col-md-4 col-sm-12 brcode">
                    <Barcode value={`4n%${userDetails?.ownSponsorId}+ut%`} width={1} height={50} displayValue={false} />
                </div>
                <div className="flex flex-col gap-2 text-right sm:text-base">
                    <div className="d-flex align-items-center ml-auto">
                        <img src="/Rebrand-06.png" alt="logo" />
                    </div>
                    <p>
                        <b>(+91) 8089530707</b>
                    </p>
                    <p>
                        <b>marketjourney.super@gmail.com</b>
                    </p>
                    <p>
                        <b>1st floor Hibon plaza Mavoor road, Calicut 673004</b>
                    </p>
                </div>
            </div>
            <div className="row">
                <div className=" text-center font-semibold text-3xl py-4">
                    <h2 style={{ color: '#325aa8' }}>INVOICE</h2>
                </div>
            </div>
            <div className="table-container table-responsive rounded-2 mb-4">
                <table className="table border text-nowrap customize-table mb-0 align-middle">
                    <thead className="text-dark ">
                        <tr>
                            <th>
                                <h6 className="text-base font-bold">Package Type</h6>
                            </th>
                            <th>
                                <h6 className="text-base font-bold">Package</h6>
                            </th>
                            <th>
                                <h6 className="text-base font-bold">Amount</h6>
                            </th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-lg">
                                <h4>{userDetails?.packageType}</h4>
                            </td>
                            <td className="text-lg">
                                <h4>{userDetails?.franchise}</h4>
                            </td>
                            <td className="text-lg">
                                <h4>₹{userDetails?.packageAmount}</h4>
                            </td>
                        </tr>
                        <tr>
                            <td className="">
                                <strong>GST:</strong>{' '}
                            </td>
                            {/* <td></td> */}
                            <td className="">
                                <strong>₹ 18%</strong>
                            </td>
                        </tr>

                        <tr>
                            <td className="">
                                <strong>GST Amount:</strong>{' '}
                            </td>
                            {/* <td></td> */}
                            <td className="">
                                <strong>₹ {gstAmount}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td className="">
                                <strong>Package Amount:</strong>{' '}
                            </td>
                            {/* <td></td> */}
                            <td className="">
                                <strong>₹ {userDetails?.packageAmount}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-xl font-bold">
                                <strong>Total:</strong>
                            </td>
                            <td></td>
                            <td className="text-xl font-bold">
                                <strong>₹ {totalWithGST}</strong>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col gap-3 sm:text-base">
                <br />
                <h5>
                    <b>Name: {userDetails?.name}</b>
                </h5>
                <h5>
                    <b>Contact: {userDetails?.phone}</b>
                </h5>
                <h5>
                    <b>Email: {userDetails?.email}</b>
                </h5>
                <h5>
                    <b>User Id: {userDetails?.ownSponserId}</b>
                </h5>
            </div>
        </div>
    );
};

export default Invoice;
