# Angular Metamask Dapp

This project is an example of a Decentralized Application developed in Angular 13.

The main purpose of the project is to show how you can interact with a Smart Contract on Ethereum blockchain using Metamask browser wallet.


## Metamask

The application requires Metamask browser extension to work properly. Without this one you can't interact with Smart Conctract.

- https://metamask.io/


## Smart Contract - informations

The contract source code is avaiable on Git:

- https://github.com/lamberjack/name-contract

The smart contract used for this application is deployed on the testnet chain Ropsten:

- https://ropsten.etherscan.io/address/0xa3bed649ca2ff980f3131bfaac99b56056755268

For smart contract compilation and deploy I used Remix web IDE:
 
- https://remix.ethereum.org/


## Smart Contract - local configuration

You can find the smart contract configuration inside  `src/environments/environment.ts` file.

The contract ABI is `src/artifacts/contracts/NameContract.sol/NameContract.sol.json` file.

