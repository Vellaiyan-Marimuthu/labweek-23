import QrScanner from "qr-scanner";
import { useEffect, useState } from "react";

export const QRScanner = (props) => {
  const [qrDetails, setQrDetails] = useState();

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
      if (address) console.log("result is ", JSON.parse(result).address);
      qrScanner.stop();
    };
  }, []);

  return (
    <div>
      <video id="qr_scanner"></video>
    </div>
  );
};
