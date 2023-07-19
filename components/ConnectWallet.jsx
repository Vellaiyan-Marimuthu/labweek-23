" use client";

import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import web3 from "web3";
import { checkNetwork } from "../service/metamaskService";
import { CHAINID } from "../utils/constants";

const ConnectWallet = () => {
  const [isNetworkConnected, setIsNetworkConnected] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    window.ethereum?.on("chainChanged", async () => {
      const chainId = await window?.ethereum?.request({ method: "eth_chainId" });
      if (chainId !== web3?.utils?.toHex(CHAINID)) {
        setIsNetworkConnected(false);
      } else {
        setIsNetworkConnected(true);
      }
    });
    checkCurrentNetwork();
  }, []);

  const checkCurrentNetwork = async () => {
    setIsNetworkConnected(await checkNetwork());
  };

  return (
    <>
      {isNetworkConnected ? (
        <Web3Button />
      ) : (
        <div>
          <Web3NetworkSwitch />
        </div>
      )}
    </>
  );
};

export default ConnectWallet;
