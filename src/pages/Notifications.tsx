import React from 'react'

const Notifications = () => {
  return (
      <div>
          <blockquote className="text-black p-5 ltr:pl-3.5 rtl:pr-3.5 bg-white shadow-md rounded-tr-md rounded-br-md border border-white-light border-l-2 !border-l-primary dark:bg-[#060818] dark:border-[#060818]">
              <div className="flex items-start">
                  <div className="w-14 h-14 ltr:mr-5 rtl:ml-5 flex-none">
                      <img src="/assets/images/profile-34.jpeg" alt="img" className="w-14 h-14 rounded-full object-cover m-auto" />
                  </div>
                  <p className="not-italic text-[#515365] text-sm dark:text-white-light m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
              </div>
              <small className="ltr:text-right rtl:text-left w-full not-italic text-xs text-[#777] block before:w-3 before:h-[1px] before:bg-[#777] before:inline-block before:opacity-50 before:relative before:-top-1 before:ltr:mr-1 rtl:before:ml-1">
                  Someone famous <cite className="italic">Source Title</cite>
              </small>
          </blockquote>
      </div>
  );
}

export default Notifications