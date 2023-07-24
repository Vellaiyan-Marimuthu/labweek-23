import QrScanner from "qr-scanner";
import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import { LOADER_TYPE, LOCK_ADDRESS, UNLOCK_NETWORK_ID } from "../../utils/constants";

export const QRScanner = (props) => {
  const [qrDetails, setQrDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.permissions.query({ name: "camera" }).then((res) => {
      if (res.state == "granted") {
        console.log("permisson granded");
      } else {
        console.log("permission denied");
      }
    });
    const qrScanner = new QrScanner(
      document.getElementById("qr_scanner"),
      (result) => {
        stopScan(result);
      },
      { highlightScanRegion: true }
    );
    qrScanner.start();

    const stopScan = (result) => {
      qrScanner.stop();
      console.log("result is ", (JSON.parse(result.data)).token);

      if((JSON.parse(result.data))?.token) {
        setQrDetails((JSON.parse(result.data)));
        qrScanner.stop();
      } else {
        qrScanner.start();
      }

    };
  }, []);

  const checkin = async () => {
    const token = window?.localStorage?.getItem("token");
    const url = `https://locksmith.unlock-protocol.com/v2/api/ticket/${UNLOCK_NETWORK_ID}/lock/${LOCK_ADDRESS}/key/${qrDetails?.token}/check`;
    const header = new Headers({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    const keysResult = await fetch(url, {
      method: 'PUT',
      headers: header,
    })
    console.log("result is ", keysResult);
  }

  return (
    <>

      <div>
        {qrDetails ? (
          <div className="m-4">
            <h1 className="font-bold text-2xl">Valid QR Found</h1>
            <div className="flex w-full items-center justify-center mt-4 gap-6">
              {isLoading ? (
                <Loader type={LOADER_TYPE.eventLoader} />
              ) : (
                <>
                  <button className="p-2 rounded-lg text-md px-4 bg-gray-300 hover:scale-105 hover:shadow-lg font-bold  select-none"
                    onClick={() => { setIsLoading(true); checkin()}}>Check In</button>
                  <button className="p-2 rounded-lg text-md px-4 bg-gray-300 hover:scale-105 hover:shadow-lg font-bold  select-none">Scan</button>
                </>
              )}
            </div>
          </div>
        ) : (
          <video id="qr_scanner"></video>
        )}
      </div>
    </>
  );
};
