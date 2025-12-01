/**
 * Basic usage example for eth-trace-inspector
 * 
 * Run with: npx ts-node examples/basic-usage.ts
 * 
 * Make sure to set up your .env file with API keys and RPC URLs
 */

// Load environment variables from .env file
import * as dotenv from 'dotenv';
dotenv.config();

import { inspectTransaction, prettyPrint, toJSON } from '../src/index';

async function main() {
  // Example transaction hash (replace with a real one)
  const txHash = '0x...'; // Replace with actual transaction hash
  
  console.log('Inspecting transaction:', txHash);
  console.log('This may take a few seconds...\n');
  
  try {
    // Inspect the transaction
    const report = await inspectTransaction(txHash, {
      chainId: 1, // Ethereum mainnet
      fetchABI: true,
      useSignatureDatabase: true,
      apiKey: process.env.ETHERSCAN_API_KEY, // Loaded from .env file
      rpcUrl: process.env.ETH_RPC_URL, // Optional: custom RPC URL from .env
    });
    
    // Pretty print to console
    prettyPrint(report);
    
    // Or get JSON output
    // const json = toJSON(report);
    // console.log(json);
    
    // Access specific data
    console.log('\n=== Additional Analysis ===');
    console.log(`Total calls: ${report.callStack.length}`);
    console.log(`Total events: ${report.events.length}`);
    
    if (!report.status) {
      console.log(`\nTransaction reverted: ${report.revertReason}`);
    }
    
    // Find all unique function calls
    const functionNames = new Set<string>();
    const collectFunctions = (calls: typeof report.callStack) => {
      for (const call of calls) {
        functionNames.add(call.functionName);
        if (call.calls) {
          collectFunctions(call.calls);
        }
      }
    };
    collectFunctions(report.callStack);
    console.log(`\nUnique functions called: ${Array.from(functionNames).join(', ')}`);
    
  } catch (error: any) {
    console.error('Error inspecting transaction:', error.message);
    if (error.message.includes('debug_traceTransaction')) {
      console.error('\nNote: Your RPC provider may not support debug_traceTransaction.');
      console.error('Try using a provider like Alchemy or Infura that supports tracing.');
    }
  }
}

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}

