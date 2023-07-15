"use client";

import BuyNow from "@/components/BuyNow";
import ConnectWallet from "@/components/ConnectWallet";
import { CHAINID } from "@/utils/constants";
import { useEffect, useState } from "react";
import { useAccount, useNetwork } from "wagmi";

export default function Home() {
  const { address } = useAccount();
  const [userAddress, setUserAddress] = useState();
  const { chain } = useNetwork();
  useEffect(() => {
    if (chain?.id === CHAINID) {
      setUserAddress(address);
    } else {
      setUserAddress();
    }
  }, [address, chain]);
  return (
    <div className="flex justify-start  flex-col md:flex-row">
      <div className="flex w-100 h-screen justify-center items-center" style={{ background: "linear-gradient(93.58deg, #1F0046 0%, #3A0095 100%)" }}>
        <div
          className=" mt-[70px] rounded-lg px-9 py-7 w-[350px]"
          style={{
            background: "linear-gradient(0deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.07))",
            boxShadow: "0px 0px 40px 3px #09D3FF66",
            border: "1px solid #497CFF",
          }}
        >
          <div className="items-center flex justify-center flex-col">
            {/* <ConnectWallet /> */}
            <div className="mt-3 select-none">
              <img src="/images/app-name-location.png" />
            </div>
            <div>
              <h1 className="text-6xl text-white select-none">LabWeek23</h1>
            </div>
            {userAddress ? (
              <BuyNow walletAddress={address} />
            ) : (
              <div className="mt-4">
                <ConnectWallet />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
