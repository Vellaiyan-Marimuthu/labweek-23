"use client";
import { useEffect, useState } from "react";

import { useAccount } from "wagmi";
import Ticket from "../../components/card/Ticket";
import Loader from "../../components/loader/Loader";
import { LOADER_TYPE } from "../../utils/constants";

const page = () => {
  const { address } = useAccount();
  const [walletAddress, setWalletAddress] = useState();

  useEffect(() => {
    setWalletAddress(address);
  }, []);

  return (
    <>
    {!walletAddress && <Loader type={LOADER_TYPE.pageLoader}/>}
      <div className=" flex justify-center h-screen items-center" style={{ background: "linear-gradient(93.58deg, #1F0046 0%, #3A0095 100%)" }}>
        <div className=" rounded-lg bg-white w-[350px]">
         {walletAddress && <Ticket title="LabWeek-2023" isHeader={true} walletAddress={walletAddress} headerTitle={"Your Pass"} />}
        </div>
      </div>
    </>
  );
};

export default page;
