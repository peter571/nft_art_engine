# Swag Llama NFT minting dapp 🔥


This repo provides a nice and easy way for linking an existing NFT smart contract to this minting dapp. There are two ways of using this repo, you can go the simple route or the more complex one. It's an improvement from Hashlips minting dapp. [](https://github.com/HashLips/hashlips_nft_minting_dapp)  I have added more functionalities to make it an interesting dapp including: Leaderboard showing top owners of the collection, a gallery to view all the nfts owned by the connected user, a QR code Ticket that is signed and shared to allow other users see your collection.

Hashlips has some exciting content on Youtube 

The simple route is so simple, all you need to do is download the build folder on the release page and change the configuration to fit your needs.

The more complex route allows you to add additional functionality if you are comfortable with coding in react.js. (Follow the below instructions for a walk through).

## Installation 🛠️

If you are cloning the project then run this first, otherwise you can download the source code on the release page and skip this step.

```sh
git clone https://github.com/peter571/swag_llama_minting_dapp.git
```

Make sure you have node.js installed so you can use npm, then run:

```sh
npm install
```

## Usage ℹ️

In order to make use of this dapp, all you need to do is change the configurations to point to your smart contract as well as update the images and theme file.

For the most part all the changes will be in the `public` folder.

To link up your existing smart contract, go to the `public/config/config.json` file and update the following fields to fit your smart contract, network and marketplace details.

Note: this dapp is designed to work with the intended NFT smart contract, that only takes one parameter in the mint function "mintAmount". But you can change that in the Home.js file if you need to use a smart contract that takes 2 params.

```json
{
  "CONTRACT_ADDRESS": "0xb6dcbe5f8909980e19a989f865488fdc1d6dd6bc",
  "SCAN_LINK": "https://rinkeby.etherscan.io/address/0xb6dcbe5f8909980e19a989f865488fdc1d6dd6bc",
  "NETWORK": {
    "NAME": "Rinkeby",
    "SYMBOL": "ETH",
    "ID": "0x4",
    "RPCURL": "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    "BLOCKURLS": "https://rinkey.etherscan.io",
    "DECIMALS": 18
  },
  "NFT_NAME": "swag llama",
  "COLLECTION_NAME": "swag-llama",
  "SYMBOL": "LL",
  "MAX_SUPPLY": 300,
  "GAS_LIMIT": 285000,
  "MARKETPLACE": "Opeansea",
  "MARKETPLACE_LINK": "https://testnets.opensea.io/collection/swag-llama",
  "SHOW_BACKGROUND": true
}

```

Make sure you copy the contract ABI from remix and paste it in the `public/config/abi.json` file.

Now you will need to create and change 2 images and a gif in the `public/config/images` folder, `bg.png`, `example.gif` and `logo.png`.

Next change the theme colors to your liking in the `public/config/theme.css` file.

```css
:root {
  --primary: #ebc908;
  --primary-text: #1a1a1a;
  --secondary: #5ce1e6;
  --secondary-text: #1a1a1a;
  --accent: #505050;
  --accent-text: #ffffff;
}

```

Now you will need to create and change the `public/favicon.ico`, to your brand images.

Remember to update the title and description the `public/index.html` file

```html
 <title>Swag Llama</title>
  <meta name="description" content="Mint your swag llama NFT" />
```

Also remember to update the short_name and name fields in the `public/manifest.json` file

```json
{
  "short_name": "LL",
  "name": "Swag Llama NFT",
}
```

After all the changes you can run.

```sh
npm run start
```

Or create the build if you are ready to deploy.

```sh
npm run build
```

Now you can host the contents of the build folder on a server.

That's it! you're done.
