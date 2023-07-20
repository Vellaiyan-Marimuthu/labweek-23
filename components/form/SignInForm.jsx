import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useState } from "react";
import Ticket from "../card/Ticket";
import { LOADER_TYPE } from "../../utils/constants";
import Loader from "../loader/Loader";

const SignInForm = (props) => {
  const router = useRouter();

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
          props?.setLoadingType(LOADER_TYPE.pageLoader);
          router.push("/pass");
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
