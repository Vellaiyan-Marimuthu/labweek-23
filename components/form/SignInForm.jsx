'use client'
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useState } from "react";
import Ticket from "../card/Ticket";
import { ABI, LOADER_TYPE, LOCK_ADDRESS } from "../../utils/constants";
import Loader from "../loader/Loader";
import { buyPass } from './../../service/unlockService';
import { Cookies } from 'js-cookie';
import { useEffect } from "react";
import { abis } from "@unlock-protocol/contracts"

import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'

const SignInForm = (props) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState();


  let params = [["20000000000000000"], [props?.walletAddress], ["0x0000000000000000000000000000000000000000"], ["0x3a6d2fabdf51af157f3fc79bb50346a615c08bf6"], ["0x"]];

  const { config ,error, isError} = usePrepareContractWrite({
    address: LOCK_ADDRESS,
    abi: ABI,
    functionName: 'purchase',
    value: "20000000000000000",
    args: params,
  })

  const { data, write } = useContractWrite(config)
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const onSuccess = () => {
    try {
      write?.()
    } catch (error) {
      console.log('error is :', error);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      router.push("/pass");
    } 
    console.log("errro is", error);
    console.log("isError is", isError);
  }, [isSuccess, isLoading, error, isError])

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Please enter your email"),
    fullname: Yup.string().required("Please enter your username"),
  });

  return (
    <>
      {/* {loaderType != LOADER_TYPE.pageLoader && <Loader type={LOADER_TYPE.pageLoader} />} */}
      {/* Form */}
      <Formik
        initialValues={{
          email: "",
          fullname: "",
        }}
        validationSchema={SignInSchema}
        onSubmit={async (values) => {
          const data = JSON.stringify({
            "metadata": {
              "public": {
                "email": values.email,
                username: values.username
              },
              "protected": {}
            }
          })
          props?.setLoadingType(LOADER_TYPE.pageLoader);
          buyPass(data, onSuccess, props?.walletAddress, props?.accessToken, props?.setLoadingType);
        }}
      >
        {({ errors, touched }) => (
          <Form className="mt-4 flex flex-col gap-3">
            <Ticket title={props?.title} isFooter={true} walletAddress={props?.walletAddress} />
            {/* email */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold flex gap-1">
                Email <span className="text-red-600">*</span>
              </label>
              <Field name="email" className="border-gray-300 p-2 focus-visible:outline-none border-[1.5px] rounded-md" placeholder="your@email.com" />
              {errors?.email && touched.email ? <div className="text-xs text-red-500  ">{errors.email}</div> : null}
            </div>

            {/* fullName */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold flex gap-1">
                Fullname
                <span className="text-red-600">*</span>
              </label>
              <Field name="fullname" className="border-gray-300 border-[1.5px] rounded-md p-2 focus-visible:outline-none" placeholder="john" />
              {errors?.fullname && touched.fullname ? <div className="text-xs text-red-500  ">{errors.fullname}</div> : null}
            </div>

            {/* Signin button */}
            <div className="flex justify-center  p-2 font-bold">
              <button className="border p-2 px-7 bg-gray-300 rounded-lg hover:shadow-lg hover:scale-105" type="submit">
                Buy
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignInForm;
