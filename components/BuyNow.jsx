"use client";

import { useEffect, useState } from "react";
import { useBalance, useSignMessage } from "wagmi";
import TicketDetails from "./TicketDetails";
import Cookies from "js-cookie";
import { IS_SIGNED_IN, SING_MESSAGE } from "@/utils/constants";

const BuyNow = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isError, isLoading } = useBalance({ address: props?.address });
  const { data: signData, error, isLoading: isSignLoading, signMessage, variables } = useSignMessage();
  const [isSignedIn, setIsSignedIn] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (signData) {
      const expiaryTime = new Date(new Date().getTime() + 1 * 60 * 1000);
      setIsSignedIn(true);
      Cookies.set(IS_SIGNED_IN, IS_SIGNED_IN, { expires: expiaryTime });
    }
  }, [signData]);

  return (
    <>
      <div className="mt-3">
        {Cookies.get(IS_SIGNED_IN) === IS_SIGNED_IN || isSignedIn ? (
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="book-now p-2 px-4 text-md rounded-lg font-bold hover:scale-105  bg-gray-300  hover:shadow-lg select-none"
          >
            BUY IN CRYPTO
          </button>
        ) : (
          <button
            onClick={() => {
              signMessage({ message: SING_MESSAGE });
            }}
            className="book-now p-2 rounded-lg text-md px-4 bg-gray-300 font-bold hover:scale-105 hover:shadow-lg select-none"
          >
            SIGIN
          </button>
        )}
      </div>
      <TicketDetails isOpen={isOpen} walletAddress={props?.walletAddress} closeModal={closeModal} title={"Labweek 2023"} />
    </>
  );
};

export default BuyNow;
