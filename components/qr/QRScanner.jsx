import QrScanner from "qr-scanner";
import { useEffect } from "react";

export const QRScanner = (props) => {
  useEffect(() => {
    const qrScanner = new QrScanner(
      document.getElementById("qr_scanner"),
      (result) => {
        stopScan(result);
      },
      { highlightScanRegion: true }
    );
    qrScanner.start();

    const stopScan = (result) => {
      console.log("result is ", result);
      qrScanner.stop();
    };
  }, []);

  return (
    <div>
      <video id="qr_scanner"></video>
    </div>
  );
};
