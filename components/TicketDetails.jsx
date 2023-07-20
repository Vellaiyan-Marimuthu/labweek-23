import { Dialog, Transition } from "@headlessui/react";
import { GrFormClose } from "react-icons/gr";
import SignInForm from "./form/SignInForm";
import Loader from "./loader/Loader";
import { useState } from "react";
import { LOADER_TYPE } from "../utils/constants";
const TicketDetails = ({ isOpen, closeModal, title, walletAddress, accessToken, setAccessToken }) => {
  const [loadingType, setLoadingType] = useState("");
  return (
    <>
      {loadingType === LOADER_TYPE.pageLoader && <Loader type={LOADER_TYPE.pageLoader} />}
      <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-20" onClose={closeModal}>
          <Transition.Child enter="ease-out duration-300" enterFrom="opacity" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[350px]  relative transform rounded-md bg-white px-4 py-3 text-left shadow-xl transition-all flex flex-col">
                  {/* Close button */}
                  <div className="flex">
                    <div className="flex flex-col gap-3">
                      <h1 className="text-2xl font-bold">{title}</h1>
                    </div>
                    <button type="button" className="border rounded-full  absolute -right-2 -top-2 bg-gray-400 focus:outline-none" onClick={closeModal}>
                      <GrFormClose size={20} />
                    </button>
                  </div>
                  <SignInForm walletAddress={walletAddress} title={title} closeModal={closeModal} setLoadingType={setLoadingType} accessToken={accessToken} setAccessToken={setAccessToken} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default TicketDetails;
