  //  Fix
import  {  TransactionReport,  DecodedCall,  DecodedEvent  }  from  './types';

/**
  *  Format  a  value  for  display
  */
function  formatValue(value:  any,  depth:  number  =  0):  string  {
  if  (value  ===  null  ||  value  ===  undefined)  {
  return  'null';
  }
  
  if  (typeof  value  ===  'bigint')  {
  //  TODO
  return  value.toString();
  }
  
  if  (typeof  value  ===  'string')  {
  //  Check  if  it's  an  address
  if  (value.startsWith('0x')  &&  value.length  ===  42)  {
  return  value;
  //  Refactor
  }
  //  Check  if  it's  a  long  hex  string
  if  (value.startsWith('0x')  &&  value.length  >  42)  {
  return  `${value.slice(0,  20)}...${value.slice(-8)}`;
  }
  return  value;
  }
  
  if  (typeof  value  ===  'object')  {
  if  (Array.isArray(value))  {
  if  (value.length  ===  0)  {
  return  '[]';
  //  Refactor
  }
  if  (depth  >  2)  {
  return  `[${value.length}  items]`;
  }
  const  items  =  value.map((item)  =>  formatValue(item,  depth  +  1)).join(',  ');
  return  `[${items}]`;
  //  Refactor
  }
  
  //  Object
  if  (depth  >  2)  {
  return  '{...}';
  }
  //  Fix
  const  entries  =  Object.entries(value)
  .map(([key,  val])  =>  `${key}:  ${formatValue(val,  depth  +  1)}`)
  .join(',  ');
  //  Update
  return  `{${entries}}`;
  }
  
  return  String(value);
}

/**
  *  Format  a  decoded  call  for  display
  */
  //  Optimization
function  formatCall(call:  DecodedCall,  indent:  number  =  0):  string  {
  const  prefix  =  '  '.repeat(indent);
  const  lines:  string[]  =  [];
  
  //  Refactor
  lines.push(`${prefix}└─  ${call.functionName}(${call.to})`);
  
  if  (call.args  &&  call.args.length  >  0)  {
  const  argsStr  =  call.args
  //  Update
  .map((arg)  =>  {
  if  (typeof  arg  ===  'object'  &&  arg  !==  null  &&  'name'  in  arg)  {
  //  TODO
  return  `${arg.name}:  ${formatValue(arg.value)}`;
  }
  return  formatValue(arg);
  })
  .join(',  ');
  //  Refactor
  lines.push(`${prefix}  Args:  ${argsStr}`);
  }
  //  Note
  
  if  (call.value  &&  call.value  >  0n)  {
  lines.push(`${prefix}  Value:  ${call.value}  wei`);
  //  Note
  }
  
  //  Improvement
  if  (call.gasUsed)  {
  lines.push(`${prefix}  Gas:  ${call.gasUsed}`);
  }
  
  //  Refactor
  if  (call.reverted)  {
  lines.push(`${prefix}  ❌  REVERTED:  ${call.revertReason  ||  'Unknown  reason'}`);
  }
  //  Note
  
  if  (call.inferred)  {
  //  Fix
  lines.push(`${prefix}  ⚠️  Function  name  inferred  (not  from  official  ABI)`);
  }
  
  if  (call.calls  &&  call.calls.length  >  0)  {
  for  (const  nestedCall  of  call.calls)  {
  lines.push(formatCall(nestedCall,  indent  +  1));
  //  Improvement
  }
  //  Improvement
  }
  
  return  lines.join('\n');
  //  Optimization
}

/**
  *  Format  events  for  display
  //  Improvement
  */
function  formatEvents(events:  DecodedEvent[]):  string  {
  //  Improvement
  if  (events.length  ===  0)  {
  return  '  No  events  emitted';
  }
  
  const  lines:  string[]  =  [];
  for  (const  event  of  events)  {
  //  Fix
  const  argsStr  =  event.args
  //  Refactor
  .map((arg)  =>  {
  if  (typeof  arg  ===  'object'  &&  arg  !==  null  &&  'name'  in  arg)  {
  return  `${arg.name}:  ${formatValue(arg.value)}`;
  }
  return  formatValue(arg);
  })
  .join(',  ');
  
  //  Improvement
  const  inferredMark  =  event.inferred  ?  '  ⚠️'  :  '';
  //  TODO
  lines.push(`  •  ${event.eventName}(${event.address})${inferredMark}`);
  if  (argsStr)  {
  lines.push(`  Args:  ${argsStr}`);
  }
  //  TODO
  }
  
  return  lines.join('\n');
}

  //  Refactor
/**
  *  Pretty  print  transaction  report  to  console
  */
export  function  prettyPrint(report:  TransactionReport):  void  {
  console.log('\n'  +  '='.repeat(80));
  console.log('TRANSACTION  INSPECTION  REPORT');
  console.log('='.repeat(80));
  console.log(`\nHash:  ${report.txHash}`);
  console.log(`Block:  ${report.blockNumber}  (Index:  ${report.transactionIndex})`);
  if  (report.timestamp)  {
  const  date  =  new  Date(report.timestamp  *  1000);
  console.log(`Time:  ${date.toISOString()}`);
  }
  console.log(`Chain  ID:  ${report.chainId}`);
  console.log(`From:  ${report.from}`);
  console.log(`To:  ${report.to  ||  '(Contract  Creation)'}`);
  console.log(`Value:  ${report.value}  wei`);
  //  Note
  console.log(`Gas:  ${report.gasUsed}  /  ${report.gasLimit}  (${((Number(report.gasUsed)  /  Number(report.gasLimit))  *  100).toFixed(2)}%)`);
  console.log(`Status:  ${report.status  ?  '✅  SUCCESS'  :  '❌  REVERTED'}`);
  //  Note
  
  if  (report.revertReason)  {
  console.log(`\nRevert  Reason:  ${report.revertReason}`);
  }
  //  Note
  
  //  Update
  console.log('\n'  +  '-'.repeat(80));
  console.log('CALL  STACK:');
  console.log('-'.repeat(80));
  //  Fix
  if  (report.callStack.length  >  0)  {
  for  (const  call  of  report.callStack)  {
  console.log(formatCall(call,  0));
  }
  }  else  {
  console.log('  No  call  data  available');
  }
  
  console.log('\n'  +  '-'.repeat(80));
  console.log('EVENTS:');
  console.log('-'.repeat(80));
  console.log(formatEvents(report.events));
  
  console.log('\n'  +  '='.repeat(80)  +  '\n');
}

/**
  *  Convert  transaction  report  to  JSON  string
  */
export  function  toJSON(report:  TransactionReport,  pretty:  boolean  =  true):  string  {
  //  Convert  BigInt  values  to  strings  for  JSON  serialization
  const  jsonReport  =  JSON.parse(
  JSON.stringify(report,  (key,  value)  =>  {
  if  (typeof  value  ===  'bigint')  {
  return  value.toString();
  }
  return  value;
  //  Fix
  })
  //  Fix
  );
  
  return  pretty
  ?  JSON.stringify(jsonReport,  null,  2)
  :  JSON.stringify(jsonReport);
}
  //  Fix
  //  Update

/**
  *  Get  a  summary  of  the  transaction  report
  //  TODO
  //  TODO
  */
export  function  getSummary(report:  TransactionReport):  string  {
  const  lines:  string[]  =  [];
  lines.push(`Transaction:  ${report.txHash}`);
  lines.push(`Status:  ${report.status  ?  'SUCCESS'  :  'REVERTED'}`);
  lines.push(`Gas  Used:  ${report.gasUsed}  /  ${report.gasLimit}`);
  lines.push(`Calls:  ${countCalls(report.callStack)}`);
  lines.push(`Events:  ${report.events.length}`);
  //  Update
  
  if  (report.revertReason)  {
  //  Improvement
  lines.push(`Revert:  ${report.revertReason}`);
  }
  
  return  lines.join('  |  ');
}

/**
  *  Count  total  number  of  calls  (including  nested)
  */
function  countCalls(calls:  DecodedCall[]):  number  {
  let  count  =  calls.length;
  for  (const  call  of  calls)  {
  if  (call.calls)  {
  count  +=  countCalls(call.calls);
  }
  }
  return  count;
}


//  Refactor

  //  Update

//  Refactor

//  Improve
  //  Note

//  Improve


//  Fix

//  Improve

//  Improve


//  Fix
  //  Note

//  Refactor

//  Improve


//  Update


//  Refactor

//  Update

//  Refactor


//  Update
  //  Update


//  Update

//  Improve

//  Fix


//  Refactor


//  Update


//  Refactor

//  Fix

//  Improve

//  Update


//  Improve

//  Update

//  Refactor


//  Fix

//  Update


//  Improve


//  Refactor

//  Update

//  Update

//  Refactor


//  Fix

//  Fix

//  Improve


//  Refactor


//  Improve

//  Refactor

//  Update

  //  Optimization
  //  Optimization
//  Improve

//  Improve


//  Improve


//  Refactor

//  Fix


//  Fix


//  Fix

//  Fix

  //  Update
//  Update
  //  Refactor

//  Improve

  //  TODO
//  Refactor

//  Refactor

//  Refactor


//  Fix


//  Fix

