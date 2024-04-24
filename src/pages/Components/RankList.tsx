import React from 'react'


const RankList = ({pool,members,amount}:{ pool: string; members: number; amount: number }) => {
  return (
      <div className="min-h-full  gap-4 w-full p-4 bg-primary  flex items-center shadow-md rounded-[12px]">
          <span className="text-white font-semibold whitespace-nowrap mr-2">Pool {pool}</span>
          <div className="flex flex-col gap-2">
              <span className="text-white font-medium">member</span>
              <span className="bg-warning text-center p-2 rounded-lg min-w-[60px] font-semibold">{members+1}</span>
          </div>
          <div className="flex flex-col gap-2">
              <span className="text-white font-medium"> amount</span>
              <span className="bg-warning text-center p-2 rounded-lg min-w-[60px] font-semibold">{amount}</span>
          </div>
      </div>
  );
}

export default RankList