const initialState = {
  loading: false,
  account: null,
  jazicoin: Math.round(Math.random() * 10000000),
  smartContract: null,
  web3: null,
  errorMsg: "",
  collectionStatus: null,
  networkId: null,
  cost: 0,
  totalSupply: 0,
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        smartContract: action.payload.smartContract,
        web3: action.payload.web3,
        collectionStatus: action.payload.collectionStatus,
        networkId: action.payload.networkId,
        cost: action.payload.cost,
        totalSupply: action.payload.totalSupply,
      };
    case "CONNECTION_FAILED":
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload,
      };
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        account: action.payload.account,
      };

    case "UPDATE_GALLERY":
      return {
        ...state,
        nfts: [...action.payload.nfts],
      };
    case "PAGE_RELOAD":
      return {
        ...state,
        account: action.payload.account,
        smartContract: action.payload.smartContract,
        web3: action.payload.web3,
        collectionStatus: action.payload.collectionStatus,
        networkId: action.payload.networkId,
        cost: action.payload.cost,
        totalSupply: action.payload.totalSupply,
      }  
    
    case "PAGE_RELOAD_FAIL":
    return {
      ...state,
      account: action.payload.account,
      networkId: action.payload.networkId,
      web3: action.payload.web3,
    }

    default:
      return state;
  }
};

export default blockchainReducer;
