import ENS, { getEnsAddress } from '@ensdomains/ensjs'


/** Get ENS Name*/
export const resolveEnsName = async (address) => {
  const ens = new ENS({ provider: window.ethereum, ensAddress: getEnsAddress('1') });
  let name = await ens.getName(address)
  const ensName = name.name

  return ensName;
  
}

/**Shorten address */
export const shortenAddress = (address) => {
  return `${address.slice(0, 7)}...${address.slice(address.length - 6)}`;
};
