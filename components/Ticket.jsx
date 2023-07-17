import React from "react";
import { BiTimeFive } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";

const Ticket = (props) => {
  return (
    <div className=" p-2 px-3 border-[1.2px] border-violet-700 rounded-md gap-3 flex flex-col">
      <div className="flex justify-between w-full">
        <div className="flex gap-3 font-bold">
          <img src="/icons/app-logo-single.svg" height={35} width={35} />
          <div>
            <h1 className="text-md">{props?.title}</h1>
            <div className="text-xs text-violet-700 flex items-center gap-2">
              View contract (Polygon)
              <FiExternalLink className="cursor-pointer" />
            </div>
          </div>
        </div>
        <div>
          <p className="font-semibold">0.0001 FIL</p>
        </div>
      </div>
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-1">
          <BiTimeFive className="mt-1" />
          <p>
            <span className="text-gray-400">Duration:</span> Forever
          </p>
        </div>
        <div className="mt-2">
          <input readOnly id="checked-checkbox" type="checkbox" value="" className="p-9" />
        </div>
      </div>
    </div>
  );
};

export default Ticket;
