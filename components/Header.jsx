"use client";
import { Web3Button } from "@web3modal/react";
import Image from "next/image";
import ConnectWallet from "./ConnectWallet";

const Header = () => {
  return (
    <div className="h-[70px] w-full flex justify-between items-center px-9 fixed top-0 bg-gray-400">
      <div>
        <Image src="/icons/app-logo.svg" height={130} width={130} alt="app-logo" />
      </div>
      <div>
        <ConnectWallet />
      </div>
    </div>
  );
};

export default Header;
