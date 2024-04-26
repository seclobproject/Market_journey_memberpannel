import React from 'react';
import certificateImg from '../../../public/assets/images/CertificateTemplates.png';

const Certificate = ({ userDetails }: any) => {

    return (
        <>
            <div className="relative">
                <img src={certificateImg} alt="Certificate Template" />
                <div className="absolute top-[43%] w-full text-center">
                    <h1 className=" md:text-2xl text-[3vw] font-bold">{userDetails?.name && userDetails?.name.toUpperCase()}</h1>
                </div>
                <p className="absolute w-full top-1/2 text-center px-[15%] md:text-[16px] text-[2vw] leading-tight">
                    This Certificate is proudly presented for the Membership of <span className="md:text-[16px] text-[2vw] font-bold">{userDetails?.franchise}</span> Market Journey. We welcome you
                    warmly into our community and look forward to your active participation and valuable contributions.
                </p>
            </div>
        </>
    );
};

export default Certificate;
