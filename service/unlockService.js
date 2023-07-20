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
