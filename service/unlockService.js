import { headers } from "next/dist/client/components/headers"
import { LOADER_TYPE, LOCK_ADDRESS, UNLOCK_NETWORK_ID } from "../utils/constants"
import {abis} from "@unlock-protocol/contracts"




 
export const buyPass = async (data, onSuccess, walletAddress, accessToken, setLoaderType) => {

    const url = `https://locksmith.unlock-protocol.com/v2/api/metadata/${UNLOCK_NETWORK_ID}/locks/${LOCK_ADDRESS}/users/${walletAddress}`
    const header = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    })
    const requestOptions = {
        method: "PUT",
        headers: header,
        body: data,
    }
    // console.log("request options is", requestOptions);
    try {
        const result = await fetch(url, requestOptions)
        if (result.status === 200) {
            onSuccess();
        }
    } catch (error) {
        setLoaderType("");
        console.log("Error occurred while buying pass :", error)
    }
}

export const GetTicket = async () => {
    const url = `https://locksmith.unlock-protocol.com/v2/api/metadata/${UNLOCK_NETWORK_ID}/locks/${LOCK_ADDRESS}`;

    try {
        const result = await fetch(url, {});
        const data = await result.json();
        console.log("data is ", await data);
        return await data;

    } catch (error) {
        console.log("Error occurred while getting ticket details: ", error)
    }

}


export const getQr = async (walletAddress) => {

    try {
    const token = window?.localStorage?.getItem("token");
    const keysUrl =  `https://locksmith.unlock-protocol.com/v2/api/${UNLOCK_NETWORK_ID}/locks/${LOCK_ADDRESS}/keys?filterKey=owner`;
    const header = new Headers ({ 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${token}`
          })
  
      const keysResult = await fetch(keysUrl, {
        method: 'GET',
        headers: header,
      })

    const data  = await keysResult.json();

    if (data) {
    const foundObject = await data.find(obj => Object.values(obj).includes(walletAddress.toLowerCase()));
    // const url = `https://locksmith.unlock-protocol.com/v2/api/ticket/${UNLOCK_NETWORK_ID}/${LOCK_ADDRESS}/${foundObject.token}/qr`
    //     const requestOptions = {
    //         method: "GET",
    //         headers: header,
    //     }
    //     const result = await fetch(url, requestOptions)
    //     console.log(result);
    // }

    return foundObject;
    }
    }

    catch (error) {
        console.log("Error occurred in getting qr", error);
    }

}
