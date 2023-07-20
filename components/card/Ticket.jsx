"use client"
import { useEffect, useLayoutEffect, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { Qr } from "../qr/Qr";
import { QrOptions } from "../qr/QrOptions";
import { QR_TYPE } from "../../utils/constants";
import { GetTicket } from "../../service/unlockService";

const Ticket = (props) => {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [qrType, setQrType] = useState("");
  const [ticket, setTicket] = useState();

  useEffect(() => {
    getTicketDetails();
  }, [])

  const getTicketDetails = async () => {
    setTicket(await GetTicket())
  }


  return (
    <>
      <div className=" p-2 px-2 border-[1.2px] border-violet-700 rounded-md gap-3 flex flex-col">
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
            {ticket?.image ? (
            <img src={ticket?.image} height={35} width={35} />

            ) : (
              <div role="status" className=" animate-pulse  md:flex items-center">
              <div className="h-[35px] w-[35px] mt-3 flex items-center justify-center  bg-gray-300 rounded dark:bg-gray-700">
                  <svg className="w-[10px] h-[10px] text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                  </svg>
              </div>
              </div>
            )}
            <div>
              {
                ticket?.name ? (
                  <h1 className="text-md">{ticket?.name}</h1>

                ) : (
                  <div role="status" className="max-w-sm animate-pulse mt-2">
                    <div className="h-[20px] bg-gray-200 rounded-full dark:bg-gray-700 w-[80px] "></div>

                  </div>
                )
              }
              <div className="text-xs flex items-center gap-2">
                {ticket?.description ? (
                  <p className="">{ticket?.description}</p>
                ) : (
                  <div role="status" className="max-w-sm animate-pulse mt-2">
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            {ticket?.price && (
            <p className="font-semibold">{ticket?.price / 1e18}FIL</p>
            )}
          </div>
        </div>
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-1"></div>

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
