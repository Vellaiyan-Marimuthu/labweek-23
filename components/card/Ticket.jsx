"use client"
import { useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { Qr } from "../qr/Qr";
import { QrOptions } from "../qr/QrOptions";
import { QR_TYPE } from "../../utils/constants";

const Ticket = (props) => {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [qrType, setQrType] = useState("");

  return (
    <>
      <div className=" p-2 px-3 border-[1.2px] border-violet-700 rounded-md gap-3 flex flex-col">
        {props?.isHeader && (
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">{props?.headerTitle}</h1>
            </div>
            <QrOptions isQrOpen={isQrOpen} qrType={qrType} setIsQrOpen={setIsQrOpen} setQrType={setQrType} />
          </div>
        )}
        <div className="flex justify-between w-full gap-7">
          <div className="flex gap-3 font-bold">
            <img src="/icons/app-logo-single.svg" height={35} width={35} />
            <div>
              <h1 className="text-md">{props?.title}</h1>
              <div className="text-xs text-violet-700 flex items-center gap-2">
                View contract
                <FiExternalLink className="cursor-pointer" onClick={() => {}} />
              </div>
            </div>
          </div>
          <div>
            <p className="font-semibold">0.0001 FIL</p>
          </div>
        </div>
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-1"></div>
          {props?.isFooter && (
            <div className="mt-2">
              <input checked id="checked-checkbox" type="checkbox" value="" className="p-9" />
            </div>
          )}
        </div>
      </div>
      {isQrOpen && (
        <>
          {qrType === QR_TYPE.code && (
            <Qr isOpen={isQrOpen} closeModal={() => setIsQrOpen(false)} title={"QR-CODE"} walletAddress={props?.walletAddress} footer={"Scan to get the details"} qrType={qrType} />
          )}
          {qrType === QR_TYPE.scanner && (
            <Qr isOpen={isQrOpen} closeModal={() => setIsQrOpen(false)} title={"QR-SCANNER"} walletAddress={props?.walletAddress} footer={"Scanner to scan"} qrType={qrType} />
          )}
        </>
      )}
    </>
  );
};

export default Ticket;
