import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import { fetchData } from "../data/dataActions";
import { getConfigData, getMethodValues, getSmartContractInstance } from "./util";

const { ethereum } = window;

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

const onPageReload = (payload) => {
  return {
    type: "PAGE_RELOAD",
    payload: payload
  }
}

const onPageReloadFail = (payload) => {
  return {
    type: "PAGE_RELOAD_FAIL",
    payload: payload
  }
}

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());

    const CONFIG = await getConfigData();

    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);

      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await ethereum.request({
          method: "net_version",
        });

        if (Number(networkId) === web3.utils.hexToNumber(CONFIG.NETWORK.ID)) {

          const SmartContractObj = await getSmartContractInstance();
        const { currentStatus, cost, totalSupply } = await getMethodValues();

          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3,
              collectionStatus: currentStatus,
              launchDate: dateOfLaunch,
              networkId: networkId,
              cost: cost,
              totalSupply: totalSupply,
            })
          );
          
        } else {
          // Switch network here
          try {
            await ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: CONFIG.NETWORK.ID }],
            });

            window.location.reload();

          } catch (error) {
            if (error.code === 4902) {
              try {
                await ethereum.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: CONFIG.NETWORK.ID,
                      chainName: CONFIG.NETWORK.NAME,
                      rpcUrls: [CONFIG.NETWORK.RPCURL],
                      nativeCurrency: {
                        name: CONFIG.NETWORK.NAME,
                        symbol: CONFIG.NETWORK.SYMBOL,
                        decimals: CONFIG.NETWORK.DECIMALS,
                      },
                      blockExplorerUrls: [CONFIG.NETWORK.BLOCKURLS],
                    },
                  ],
                });
                dispatch(
                  connectSuccess({
                    account: accounts[0],
                    smartContract: SmartContractObj,
                    web3: web3,
                    collectionStatus: currentStatus,
                    networkId: networkId
                  })
                );

              } catch (error) {
                dispatch(connectFailed(`Change network to ${CONFIG.NETWORK.NAME}.`));
              }
            }
          }

        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    //const assets = await getNftTokens(account);
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};

export const checkIfWalletIsConnect = () => async (dispatch) => {

  if (!ethereum) return;
  const accounts = await ethereum.request({ method: "eth_accounts" });
  const networkId = await ethereum.request({
    method: "net_version",
  });
  let web3 = new Web3(ethereum);
  const CONFIG = await getConfigData();

  try {
    if (accounts.length && Number(networkId) === web3.utils.hexToNumber(CONFIG.NETWORK.ID)) {

      const SmartContract = await getSmartContractInstance();
      const { currentStatus, cost, totalSupply } = await getMethodValues();
    
      dispatch(onPageReload({
        account: accounts[0],
        smartContract: SmartContract,
        collectionStatus: currentStatus,
        web3: web3,
        networkId: networkId,
        cost: cost,
        totalSupply: totalSupply
      }));

    } else {
      dispatch(onPageReloadFail({
        networkId: networkId,
        account: accounts[0],
        web3: web3
      }));
    }
  } catch (error) {

    console.log(error);
  }
  dispatch(fetchData(accounts[0]));
};
