import Web3EthContract from "web3-eth-contract";

const { ethereum } = window;

export const getConfigData = async () => {
    const configResponse = await fetch("/config/config.json", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    const CONFIG = await configResponse.json();
    return CONFIG;
}

export const getABI = async () => {
    const abiResponse = await fetch("/config/abi.json", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    const abi = await abiResponse.json();

    return abi;
}

export const getSmartContractInstance = async () => {
    const CONFIG = await getConfigData();
    const abi = await getABI();

    Web3EthContract.setProvider(ethereum);

    const SmartContractObj = new Web3EthContract(
        abi,
        CONFIG.CONTRACT_ADDRESS
    );
    return SmartContractObj;
}

export const getMethodValues = async () => {
    const SmartContract = await getSmartContractInstance();
    const currentStatus = await SmartContract.methods.paused().call();
    const totalSupply = await SmartContract.methods.totalSupply().call();
    const cost = await SmartContract.methods.cost().call();

    return { currentStatus, totalSupply, cost };
}
