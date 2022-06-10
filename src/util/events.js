import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import { getSmartContractInstance } from "../redux/blockchain/util";
import { resolveEnsName } from ".";

/**Get the all address that hold an NFT in collection */
export const getEvents = async () => {
    await Web3EthContract.setProvider(ethereum);
    let web3 = new Web3(ethereum);

    const myContract = await getSmartContractInstance();
    let addresses = await myContract.getPastEvents('Transfer', {
      filter: {}, 
      fromBlock: 0,
      toBlock: 'latest'
    }, function(error, events){})
    .then(function(events){
      
      const holders = [...new Set(events.map((event) => event.returnValues.to))];
      return holders;
    });

    let allHolders = await Promise.all(addresses.map(async (address) => {
      const piecesOwned = await myContract.methods.balanceOf(address).call();
      const ensName = await resolveEnsName(address);

      return {
        "address": address,
        "ens_name": ensName,
        "pieces_owned": Number(piecesOwned)
      };

    }));

    return allHolders.sort(function(a, b){return b.pieces_owned - a.pieces_owned})
  }
  