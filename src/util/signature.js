import Web3 from "web3";
import { getConfigData } from "../redux/blockchain/util";

export const signTicket = async (address, message) => {
    try {
        if (!window.ethereum)
            throw new Error("No crypto wallet found. Please install it.");

        const web3 = new Web3(Web3.givenProvider);
        const signature = await web3.eth.personal.sign(message, address, process.env.REACT_APP_SECRET);

        return signature;

    } catch (err) {
        console.log(err.message);
    }
};

export const recoverAddress = async (signature) => {
    try {
        if (!window.ethereum)
            throw new Error("No crypto wallet found. Please install it.");

        const web3 = new Web3(Web3.givenProvider);
        const CONFIG = await getConfigData();
        const address = await web3.eth.personal.ecRecover(CONFIG.NFT_NAME, signature);

        return address;

    } catch (err) {
        console.log(err.message);
    }
}
