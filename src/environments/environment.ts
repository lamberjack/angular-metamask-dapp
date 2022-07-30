// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// contract address in not production env have to be in a ETH testnet (ropsten)

export const environment = {
  production: false,
  network_name: 'ropsten.etherscan.io',
  write_name_contract_address: '0xa3BED649cA2fF980F3131BFaAc99B56056755268',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
