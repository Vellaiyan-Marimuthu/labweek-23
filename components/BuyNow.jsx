"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { SiweMessage } from "siwe";
import { useAccount, useBalance, useNetwork, useSignMessage } from "wagmi";
import TicketDetails from "./TicketDetails";
import { SIWE, IS_SIGNED_IN, URI, LOADER_TYPE } from "../utils/constants";
import Loader from "./.././components/loader/Loader";

const BuyNow = (props) => {
  const { walletAddress } = props;
  const [isOpen, setIsOpen] = useState(false);
  // const { data, isError, isLoading } = useBalance({ address: props?.address });
  const { data: signData, error, isLoading: isSignLoading, signMessage, variables } = useSignMessage();
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [loadingType, setLoadingType] = useState("");

  useEffect(() => {
    if (signData) {
      const expiaryTime = new Date(new Date().getTime() + 1 * 60 * 1000);
      setIsSignedIn(true);
      Cookies.set(IS_SIGNED_IN, IS_SIGNED_IN, { expires: expiaryTime });
    }
  }, [signData]);

  useEffect(() => {
    fetchNonce();
  }, []);

  // to sign the user
  const [state, setState] = useState();

  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();

  const fetchNonce = async () => {
    try {
      const nonceRes = (await fetch("api/nonce")).json();
      const nonce = await nonceRes;
      setState(await nonce.data);
    } catch (error) {}
  };

  const signUser = async () => {
    setLoadingType(LOADER_TYPE.eventLoader);
    try {
      const chainId = chain?.id;
      // sign user

      const address = walletAddress;
      const message = new SiweMessage({
        address,
        domain: SIWE.DOMAIN, //window.location.host,
        statement: SIWE.SIGN_MESSAGE.concat(address),
        uri: SIWE.URI, //window.location.origin,
        version: "1",
        chainId,
        nonce: "fi1fKjrcaLbAJB29X",
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      // Verify signature
      const verifyRes = await fetch("api/verify", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
        body: JSON.stringify({ message, signature, state }),
      });

      setIsSignedIn(true);
      console.log("Verified Signature", verifyRes);
    } catch (error) {
      console.log("error is ", error);
      fetchNonce();
    } finally {
      setLoadingType("");
    }
  };

  return (
    <>
      {loadingType === LOADER_TYPE.pageLoader && <Loader />}
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
            onClick={signUser}
            // onClick={() => {
            //   // signMessage({ message: SING_MESSAGE });
            // }}
            className="book-now p-2 rounded-lg text-md px-4 bg-gray-300 hover:scale-105 hover:shadow-lg font-bold  select-none"
          >
            {loadingType === LOADER_TYPE.eventLoader ? <Loader type={LOADER_TYPE.eventLoader} /> : <p>SIGIN</p>}
          </button>
        )}
      </div>
      <TicketDetails isOpen={isOpen} walletAddress={props?.walletAddress} closeModal={() => setIsOpen(false)} title={"Labweek 2023"} />
    </>
  );
};

export default BuyNow;
