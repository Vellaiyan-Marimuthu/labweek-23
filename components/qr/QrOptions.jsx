import React, { useEffect } from "react";
import { AiOutlineScan } from "react-icons/ai";
import { BsQrCode } from "react-icons/bs";
import { QR_TYPE, SING_MESSAGE } from "../../utils/constants";
import { useSignMessage } from "wagmi";

export const QrOptions = (props) => {
  const { data, error, isLoading, signMessage, variables } = useSignMessage();

  useEffect(() => {
    if (data) {
      props.setQrType(QR_TYPE.code);
      props?.setIsQrOpen(true);
    }
  }, [data]);
  return (
    <div className="flex gap-2 items-center">
      <BsQrCode
        className="cursor-pointer"
        onClick={() => {
          signMessage({ message: SING_MESSAGE });
        }}
      />
      <AiOutlineScan
        className="cursor-pointer"
        size={20}
        onClick={() => {
          props?.setQrType(QR_TYPE.scanner);
          props?.setIsQrOpen(true);
        }}
      />
    </div>
  );
};
