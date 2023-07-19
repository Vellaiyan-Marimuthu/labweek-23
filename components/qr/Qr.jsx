import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { GrFormClose } from "react-icons/gr";
import QRCode from "react-qr-code";
import { QR_TYPE } from "../../utils/constants";
import { QRScanner } from "./../../components/qr/QRScanner";

export const Qr = ({ isOpen, closeModal, title, walletAddress, qrType, footer }) => {
  return (
    <>
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
                  <div className="flex justify-center">
                    <div className="flex flex-col gap-3 justify-center">
                      <h1 className="text-2xl font-bold">{title}</h1>
                    </div>
                    <button type="button" className="border rounded-full  absolute -right-2 -top-2 bg-gray-400 focus:outline-none" onClick={closeModal}>
                      <GrFormClose size={20} />
                    </button>
                  </div>
                  <div className="flex gap-3 justify-center mt-4 flex-col items-center ">
                    <div className="p-2 border-2 rounded-lg">
                      {qrType === QR_TYPE.code ? (
                        <QRCode fgColor="#4238C7" value={`{address: ${walletAddress}, cost: "0.0001FIL", name: "LabWeek-23"}`} size={256} className="h-[200px] w-[200px] " level="Q" />
                      ) : (
                        <QRScanner />
                      )}
                    </div>
                    <h1 className="font-semibold">{footer}</h1>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
