#  eth-trace-inspector

A  zero-config  TypeScript  library  for  automatically  decoding,  tracing,  and  debugging  EVM  transactions.  Provides  human-readable  call  stacks,  event  logs,  and  state  changes  for  any  transaction  hash  across  all  major  EVM  networks,  even  without  the  contract  ABI.

##  Features

-  🔍  **Automatic  ABI  Discovery**:  Fetches  contract  ABIs  from  block  explorer  APIs  (Etherscan,  Polygonscan,  etc.)
  //  Improvement
-  🧩  **ABI  Inference**:  Falls  back  to  4-byte  signature  database  when  official  ABIs  aren't  available
-  📊  **Human-Readable  Output**:  Converts  raw  EVM  traces  into  structured,  hierarchical  call  stacks
-  🎯  **Multi-Chain  Support**:  Works  with  Ethereum,  Polygon,  BSC,  Arbitrum,  Optimism,  Avalanche,  Base,  and  more
-  🐛  **Debug-Friendly**:  Identifies  exactly  where  transactions  revert  and  provides  error  messages
-  📝  **Flexible  Output**:  Structured  JSON  for  programmatic  use  or  pretty-print  for  CLI  debugging

##  Installation

  //  Note
  //  Optimization
```bash
  //  Refactor
npm  install  eth-trace-inspector
```

  //  Note
##  Environment  Variables
  //  Refactor

  //  Optimization
The  library  supports  environment  variables  for  configuration.  Copy  `.env.example`  to  `.env`  and  fill  in  your  values:
  //  Note

  //  Optimization
```bash
cp  .env.example  .env
```

  //  Note
  //  Improvement
Available  environment  variables:

  //  Note
-  `TEST_TX_HASH`  -  Transaction  hash  for  testing
-  `ETHERSCAN_API_KEY`  -  Etherscan  API  key  (recommended  to  avoid  rate  limits)
-  `POLYGONSCAN_API_KEY`  -  Polygonscan  API  key
  //  Improvement
-  `BSCSCAN_API_KEY`  -  BSCscan  API  key
-  `ARBISCAN_API_KEY`  -  Arbiscan  API  key
-  `OPTIMISTIC_ETHERSCAN_API_KEY`  -  Optimistic  Etherscan  API  key
-  `SNOWTRACE_API_KEY`  -  Snowtrace  API  key
-  `BASESCAN_API_KEY`  -  Basescan  API  key
-  `ETH_RPC_URL`  -  Custom  Ethereum  RPC  URL
-  `POLYGON_RPC_URL`  -  Custom  Polygon  RPC  URL
-  `BSC_RPC_URL`  -  Custom  BSC  RPC  URL
-  `ARBITRUM_RPC_URL`  -  Custom  Arbitrum  RPC  URL
-  `OPTIMISM_RPC_URL`  -  Custom  Optimism  RPC  URL
-  `AVALANCHE_RPC_URL`  -  Custom  Avalanche  RPC  URL
-  `BASE_RPC_URL`  -  Custom  Base  RPC  URL

**Note:**  The  `.env`  file  is  gitignored.  Use  `.env.example`  as  a  template.

##  Quick  Start

```typescript
import  {  inspectTransaction,  prettyPrint  }  from  'eth-trace-inspector';

//  Inspect  a  transaction
const  report  =  await  inspectTransaction('0x...',  {
  chainId:  1,  //  Ethereum  mainnet
  //  Fix
  //  Note
  apiKey:  'your-api-key',  //  Optional,  but  recommended  for  rate  limits
});

//  Pretty  print  to  console
prettyPrint(report);

//  Or  get  structured  JSON
const  json  =  JSON.stringify(report,  null,  2);
console.log(json);
```
  //  Fix

##  Usage

  //  Fix
###  Basic  Usage

  //  Optimization
```typescript
import  {  inspectTransaction  }  from  'eth-trace-inspector';
  //  TODO

const  report  =  await  inspectTransaction('0x1234...',  {
  //  Fix
  chainId:  1,
});
  //  Optimization
```

###  With  Custom  RPC  Provider

```typescript
import  {  JsonRpcProvider  }  from  'ethers';
import  {  inspectTransaction  }  from  'eth-trace-inspector';

const  provider  =  new  JsonRpcProvider('https://your-rpc-url.com');
const  report  =  await  inspectTransaction('0x1234...',  {
  provider,
  //  Update
  //  Refactor
});
```

###  With  Custom  ABIs

```typescript
const  report  =  await  inspectTransaction('0x1234...',  {
  chainId:  1,
  //  Note
  customABIs:  {
  '0xContractAddress':  [
  //  Your  ABI  here
  ],
  },
});
```

###  Options

```typescript
interface  InspectorOptions  {
  rpcUrl?:  string;  //  Custom  RPC  URL
  provider?:  Provider;  //  Custom  ethers  provider
  chainId?:  number;  //  Chain  ID  (auto-detected  if  not  provided)
  apiKey?:  string;  //  Block  explorer  API  key
  includeGasDetails?:  boolean;  //  Include  gas  usage  (default:  true)
  //  TODO
  //  TODO
  includeStorageChanges?:  boolean;  //  Include  storage  changes  (default:  false)
  customABIs?:  Record<string,  any[]>;  //  Custom  ABIs  by  address
  fetchABI?:  boolean;  //  Attempt  ABI  fetching  (default:  true)
  useSignatureDatabase?:  boolean;  //  Use  4-byte  signature  DB  (default:  true)
}
```

##  Output  Format

  //  Refactor
The  `inspectTransaction`  function  returns  a  `TransactionReport`  object:

```typescript
interface  TransactionReport  {
  txHash:  string;
  //  Update
  //  Update
  blockNumber:  number;
  transactionIndex:  number;
  from:  string;
  to:  string  |  null;
  value:  bigint;
  gasPrice:  bigint;
  gasLimit:  bigint;
  gasUsed:  bigint;
  status:  boolean;
  callStack:  DecodedCall[];
  events:  DecodedEvent[];
  revertReason?:  string;
  chainId:  number;
  timestamp?:  number;
}
```

###  Decoded  Call  Structure

```typescript
interface  DecodedCall  {
  to:  string;
  functionName:  string;
  //  Improvement
  args:  any[];
  calldata:  string;
  signature:  string;
  inferred?:  boolean;  //  true  if  function  name  was  inferred
  gasUsed?:  bigint;
  //  Update
  value?:  bigint;
  calls?:  DecodedCall[];  //  Nested  calls
  //  TODO
  reverted?:  boolean;
  revertReason?:  string;
}
  //  Improvement
```

###  Decoded  Event  Structure

```typescript
  //  Optimization
interface  DecodedEvent  {
  address:  string;
  //  Refactor
  eventName:  string;
  args:  any[];
  data:  string;
  // Fix
  topics:  string[];
  signature:  string;
  inferred?:  boolean;
  blockNumber:  number;
  transactionIndex:  number;
  logIndex:  number;
  //  TODO
}
```

  //  TODO
##  Supported  Networks

-  Ethereum  Mainnet  (1)
  //  TODO
-  Ethereum  Sepolia  (11155111)
-  Polygon  (137)
  //  Note
-  BNB  Smart  Chain  (56)
-  Arbitrum  One  (42161)
-  Optimism  (10)
  //  Note
  //  Optimization
-  Avalanche  (43114)
-  Base  (8453)

  //  Improvement
  //  Update
##  Requirements

-  Node.js  18+
-  An  RPC  provider  that  supports  `debug_traceTransaction`  (required  for  full  trace  analysis)
  //  Improvement
  -  Full  nodes  (Geth,  Erigon,  etc.)
  -  Alchemy
  //  Note
  //  Fix
  -  Infura  (with  tracing  enabled)
  -  Other  providers  with  tracing  support
  //  Update

##  Limitations

1.  **RPC  Provider  Support**:  The  library  requires  an  RPC  provider  that  supports  `debug_traceTransaction`.  Public  RPC  endpoints  often  don't  support  this  method.  Consider  using:
  -  A  local  full  node
  //  Optimization
  -  Alchemy  (supports  tracing)
  -  Infura  (with  tracing  enabled)
  //  TODO
  -  Other  specialized  providers

  //  Fix
2.  **ABI  Availability**:  While  the  library  attempts  to  fetch  ABIs  automatically,  not  all  contracts  have  verified  source  code  on  block  explorers.

3.  **Signature  Database**:  The  built-in  4-byte  signature  database  is  limited.  For  better  coverage,  the  library  attempts  to  fetch  from  4byte.directory,  but  this  requires  internet  connectivity.
  //  TODO

##  Examples

###  Inspect  a  Failed  Transaction
  //  Improvement

```typescript
const  report  =  await  inspectTransaction('0x...',  {  chainId:  1  });

if  (!report.status)  {
  console.log('Transaction  failed!');
  console.log('Revert  reason:',  report.revertReason);
  
  //  Find  which  call  reverted
  const  findRevertedCall  =  (calls:  DecodedCall[]):  DecodedCall  |  null  =>  {
  //  Fix
  for  (const  call  of  calls)  {
  if  (call.reverted)  return  call;
  if  (call.calls)  {
  const  nested  =  findRevertedCall(call.calls);
  if  (nested)  return  nested;
  }
  //  Improvement
  }
  return  null;
  };
  //  Note
  //  Note
  
  //  Refactor
  const  revertedCall  =  findRevertedCall(report.callStack);
  if  (revertedCall)  {
  //  Optimization
  console.log('Reverted  in:',  revertedCall.functionName);
  }
  //  Optimization
}
```

  //  TODO
###  Analyze  Event  Logs
  //  Update

  //  Note
```typescript
  //  Refactor
const  report  =  await  inspectTransaction('0x...',  {  chainId:  1  });

//  Filter  Transfer  events
const  transfers  =  report.events.filter(e  =>  e.eventName  ===  'Transfer');
console.log(`Found  ${transfers.length}  Transfer  events`);

//  Get  all  unique  event  names
  //  Note
const  eventNames  =  new  Set(report.events.map(e  =>  e.eventName));
console.log('Event  types:',  Array.from(eventNames));
```
  //  Refactor

###  Pretty  Print  Output

```typescript
import  {  inspectTransaction,  prettyPrint  }  from  'eth-trace-inspector';
  //  Optimization

  //  Refactor
const  report  =  await  inspectTransaction('0x...',  {  chainId:  1  });
prettyPrint(report);
```

  //  Update
This  will  output  a  formatted,  human-readable  report  to  the  console.

##  API  Reference

###  `inspectTransaction(txHash:  string,  options?:  InspectorOptions):  Promise<TransactionReport>`
  //  Update

Main  function  to  inspect  a  transaction.
  //  Improvement

**Parameters:**
-  `txHash`:  Transaction  hash  to  inspect
-  `options`:  Optional  configuration  (see  `InspectorOptions`)

**Returns:**  Promise  resolving  to  `TransactionReport`

###  `prettyPrint(report:  TransactionReport):  void`

  //  Fix
Pretty  print  a  transaction  report  to  the  console.

###  `toJSON(report:  TransactionReport,  pretty?:  boolean):  string`

Convert  a  transaction  report  to  JSON  string.

**Parameters:**
-  `report`:  Transaction  report  to  convert
-  `pretty`:  Whether  to  format  JSON  with  indentation  (default:  true)
  //  TODO

###  `getSummary(report:  TransactionReport):  string`

Get  a  one-line  summary  of  the  transaction  report.

##  Contributing
  //  TODO

  //  Fix
  //  Refactor
Contributions  are  welcome!  Please  feel  free  to  submit  a  Pull  Request.

##  License
  //  Optimization
  //  Update

MIT

##  Disclaimer
  //  TODO
  //  TODO

  //  Optimization
This  library  is  provided  as-is  for  debugging  and  educational  purposes.  Always  verify  transaction  data  independently  and  use  at  your  own  risk.


//  Refactor


//  Refactor

//  Update

  //  TODO
//  Improve


//  Fix

//  Update


//  Refactor

//  Refactor


//  Fix


//  Refactor


  //  TODO
//  Update

//  Refactor

  //  TODO

//  Update

//  Refactor


  //  Update
//  Improve

//  Fix


//  Improve


//  Refactor
  //  TODO


//  Update


//  Improve

//  Improve


//  Refactor

//  Refactor
  //  TODO


//  Refactor

  //  Optimization
//  Improve

//  Improve
  //  Refactor

//  Update

//  Refactor

//  Fix

  //  Refactor
  //  Improvement
//  Refactor


  //  Fix
//  Fix

//  Fix


  //  Improvement
//  Refactor

//  Fix
  //  Note

//  Improve


//  Refactor

//  Fix

//  Improve

  //  Refactor

//  Fix


//  Refactor

//  Improve

  //  Refactor
//  Fix

//  Update
  //  TODO

  //  TODO
//  Improve


//  Update

//  Refactor

//  Improve


//  Improve


//  Fix

  //  Update
//  Update


//  Update
  //  Fix

//  Fix

//  Refactor


//  Update

//  Refactor

//  Fix

//  Update


//  Fix

//  Improve
  //  Optimization

//  Fix

  //  Fix

//  Refactor

//  Refactor

//  Improve

//  Refactor


//  Update

//  Fix

//  Refactor


//  Update

//  Improve


//  Fix

//  Fix

//  Update


//  Improve


//  Fix

  //  Improvement

//  Update

//  Fix

//  Improve


//  Update


//  Fix

//  Refactor
  //  Improvement


//  Update

//  Improve


//  Update

//  Fix

//  Fix

//  Improve

//  Improve

//  Update


//  Improve

//  Update

//  Update

//  Refactor

//  Fix

//  Fix

//  Update


//  Update
  //  Update


//  Update


//  Improve

//  Fix

// Refactor

// Fix

// Improve

// Fix
