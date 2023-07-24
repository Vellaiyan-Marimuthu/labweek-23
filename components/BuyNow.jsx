"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { SiweMessage } from "siwe";
import { useAccount, useBalance, useNetwork, useSignMessage } from "wagmi";
import TicketDetails from "./TicketDetails";
import { SIWE, IS_SIGNED_IN, URI, LOADER_TYPE } from "../utils/constants";
import Loader from "./.././components/loader/Loader";
import { LocksmithService } from "@unlock-protocol/unlock-js";
import { checkUser } from "../service/unlockService";
import { useRouter } from "next/navigation";

const BuyNow = (props) => {
  const { walletAddress } = props;
  const { address } = useAccount();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  // const { data, isError, isLoading } = useBalance({ address: props?.address });
  const { data: signData, error, isLoading: isSignLoading, signMessage, variables } = useSignMessage();
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [loadingType, setLoadingType] = useState("");

  const [accessToken, setAccessToken] = useState();

  const [isLoader, setIsLoader] = useState(false);

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
    } catch (error) { }
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
        nonce: state,
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

  const sign = async () => {

    try {
      setLoadingType(LOADER_TYPE.eventLoader);
      const service = new LocksmithService();
      const chainId = chain?.id;

      // Creates a SIWE message to be signed
      const siwe = LocksmithService.createSiweMessage({
        address,
        domain: SIWE.DOMAIN, //window.location.host,
        statement: SIWE.SIGN_MESSAGE.concat(address),
        uri: SIWE.URI, //window.location.origin,
        version: "1",
        chainId,
        nonce: state,
      });

      // // Get message text to be signed
      const message = siwe.prepareMessage();

      // // Sign the message
      // const signature = wallet.signMessage(message);
      const signature = await signMessageAsync({
        message
      });

      const loginResponse = await service.login({
        message,
        signature,
      });
      const { accessToken, walletAddress, refreshToken } = loginResponse.data;
      if (accessToken) {
        setIsLoader(true);
        if (await checkUser(accessToken, walletAddress)) {
        window.localStorage.setItem("token", accessToken);
        setIsSignedIn(true);
        setAccessToken(accessToken)
        Cookies.set("access_token", accessToken);
        router.push("/pass");
        } else {
          window.localStorage.setItem("token", accessToken);
          setIsSignedIn(true);
          setAccessToken(accessToken)
          Cookies.set("access_token", accessToken);
          setIsLoader(false);
        }
      }
    } catch (error) {
      console.log("Error occurred while signin : ", error)
    } finally {
      setLoadingType("");
    }
  };


  return (
    <>
    {isLoader && (
    <Loader type={LOADER_TYPE.pageLoader}/>
    )}
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
            onClick={sign}
            // onClick={() => {
            //   // signMessage({ message: SING_MESSAGE });
            // }}
            className="book-now p-2 rounded-lg text-md px-4 bg-gray-300 hover:scale-105 hover:shadow-lg font-bold  select-none"
          >
            {loadingType === LOADER_TYPE.eventLoader ? <Loader type={LOADER_TYPE.eventLoader} /> : <p>SIGIN</p>}
          </button>
        )}
      </div>
      <TicketDetails isOpen={isOpen} walletAddress={props?.walletAddress} closeModal={() => setIsOpen(false)} title={"Labweek 2023"} accessToken={accessToken} setAccessToken={setAccessToken}/>
    </>
  );
};

export default BuyNow;
