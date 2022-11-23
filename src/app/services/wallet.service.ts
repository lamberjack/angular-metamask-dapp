import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';
import { from, mergeMap, Observable } from 'rxjs';
import { AbiItem } from 'web3-utils'
import Web3 from 'web3';
import NAME_CONTRACT_ABI from 'src/artifacts/contracts/NameContract.sol/NameContract.sol.json'

const NAME_CONTRACT_ADDRESS = environment.write_name_contract_address

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  getEthereumProvider(): Observable<any> {
    return from(detectEthereumProvider())
  }

  getEthereumUserAccounts(): Observable<any> {
    return this.getEthereumProvider().pipe(
      mergeMap(ethereum => from(ethereum.request({ method: 'eth_requestAccounts' })
      ))
    )
  }

  sendSetTextTransaction(addressFrom: string, valueToStore: string): Observable<any> {
    return this.getEthereumProvider().pipe(
      mergeMap(ethereum => {
        // Use the web3 object created from the injected wallet of browser to calling 
        // smart contract methods
        const web3 = new Web3(ethereum);
        const NameContract = new web3.eth.Contract(NAME_CONTRACT_ABI as AbiItem[],
          NAME_CONTRACT_ADDRESS);
        // use the metod send(walletAddress) that alters the state of the smart contract setting a new name
        // it creates a new transaction on blockchain and requires a gas fee
        return from(NameContract.methods.setName(valueToStore).send({ from: addressFrom }))
      }))
  }

  sendGetTextTransaction(): Observable<any> {
    return this.getEthereumProvider().pipe(
      mergeMap(ethereum => {
        // Use the web3 object created from the injected wallet of browser to calling 
        // smart contract methods
        const web3 = new Web3(ethereum);
        const NameContract = new web3.eth.Contract(NAME_CONTRACT_ABI as AbiItem[],
          NAME_CONTRACT_ADDRESS);
        // use the metod call() that doesn't alter the state of the smart contract (getName is a pure function)
        // and doesn't need to send a transaction on blockchain 
        return from(NameContract.methods.getName().call().then((result: string) => result))
      }))
  }




}
