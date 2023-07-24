'use client'
import QRCodeStyling from "qr-code-styling";
import {useRef, useState, useEffect} from "react";
import {appLogo} from  "./../../public/icons/app-logo-single.svg"
import { getQr } from "../../service/unlockService";

const QrCode = (props) => {
    const qrRef = useRef(null);
    const [qrData, setQrData] = useState();




    const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        type: "svg",
        data: {
            "keyId": 0,
            "info" : "Labweek23 Basic Pass"
        },
        image: "https://labweek23-rd.vercel.app/assets/images/LWcube.svg" ,
        dotsOptions: {
            color: "#4267b2",
            type: "rounded"
        },
        
        backgroundOptions: {
            color: "#e9ebee",
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 15,
        }
    });

    useEffect(() => {
        qrCode.append(qrRef.current);
        getQrDetails()
    }, [])

    const getQrDetails = async() => {
        setQrData(await getQr(props?.walletAddress));
    }

    return (
        <div ref={qrRef}>
            
        </div>
    )
}


export default QrCode;