'use client'
import QRCodeStyling from "qr-code-styling";
import {useRef, useState, useEffect} from "react";
import {appLogo} from  "./../../public/icons/app-logo-single.svg"
import { getQr } from "../../service/unlockService";

const QrCode = (props) => {
    const qrRef = useRef(null);
    const [qrData, setQrData] = useState();
    useEffect(() => {
        getQrDetails()
    }, [])

    const getQrDetails = async() => {
        setQrData(await getQr(props?.walletAddress));
    }

    useEffect (() => {
        if(qrData) {
            const qrCode = new QRCodeStyling({
                width: 300,
                height: 300,
                type: "svg",
                data: JSON.stringify(qrData),
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
        qrCode.append(qrRef.current);

        }
    }, [qrData])
    return (
        <div ref={qrRef}>
            
        </div>
    )
}


export default QrCode;