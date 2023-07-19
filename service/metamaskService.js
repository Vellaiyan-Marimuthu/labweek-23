import web3 from "web3";
import { CHAINID } from "../utils/constants";

export const checkNetwork = async () => {
  const chainId = await window?.ethereum?.request({ method: "eth_chainId" });
  if (chainId !== web3?.utils?.toHex(CHAINID)) {
    return false;
  } else {
    return true;
  }
};
