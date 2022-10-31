# Angular Metamask Dapp

This project is an example of a Decentralized Application developed in Angular 13.

The main purpose of the project is to show how you can interact with a Smart Contract on Ethereum blockchain using Metamask browser wallet.

To execute locally the application with the smart contract configuration on Sepolia testnet:

```npm run start:dev```

To build the application with the smart contract configuration on Sepolia testnet:

```npm run build:dev```


## Metamask

The application requires Metamask browser extension to work properly. Without this one you can't interact with Smart Conctract.

- https://metamask.io/


## Smart Contract - informations

The contract source code is avaiable on Git:

- https://github.com/lamberjack/name-contract

The smart contract used for this application is deployed on the testnet chain Sepolia:

- https://sepolia.etherscan.io/address/0x430a31391244b93e4E657b608c70C13529d05eba

For smart contract compilation and deploy I used Remix web IDE:
 
- https://remix.ethereum.org/


## Smart Contract - local configuration

You can find the development smart contract configuration inside  `src/environments/environment.dev.ts` file.

The contract ABI is `src/artifacts/contracts/NameContract.sol/NameContract.sol.json` file.


