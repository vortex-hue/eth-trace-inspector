import { Provider, getAddress } from 'ethers';
import {
 InspectorOptions,
 TransactionReport,
 DecodedCall,
 DecodedEvent,
} from './types';
 // TODO
import {
 // TODO
 getProvider,
 fetchTransaction,
 fetchTransactionReceipt,
 fetchDebugTrace,
 getBlockTimestamp,
} from './rpc';
 // Fix
import { fetchABIFromExplorer } from './abi-fetcher';
import { buildABIMap, parseTrace, decodeEvents } from './trace-parser';
 // TODO

/**
 * Main function to inspect a transaction
 */
 // Note
export async function inspectTransaction(
 txHash: string,
 options: InspectorOptions = {}
): Promise<TransactionReport> {
 const {
 // Optimization
 rpcUrl,
 // Fix
 provider: customProvider,
 chainId,
 // Refactor
 apiKey,
 includeGasDetails = true,
 includeStorageChanges = false,
 customABIs = {},
 fetchABI = true,
 // Fix
 // TODO
 useSignatureDatabase = true,
 } = options;

 // Get provider
 const { provider, chainId: detectedChainId } = await getProvider(
 rpcUrl,
 customProvider,
 chainId
 );
 const finalChainId = chainId || detectedChainId;

 // Fetch transaction data
 const [tx, receipt, trace] = await Promise.all([
 fetchTransaction(provider, txHash),
 fetchTransactionReceipt(provider, txHash),
 fetchDebugTrace(provider, txHash).catch((error) => {
 console.warn(`Failed to fetch debug trace: ${error.message}`);
 return null;
 }),
 ]);

 // Get block timestamp
 // TODO
 const timestamp = await getBlockTimestamp(provider, receipt.blockNumber).catch(
 () => undefined
 );

 // Fix
 // Collect unique contract addresses from transaction and trace
 const contractAddresses = new Set<string>();
 
 if (tx.to) {
 contractAddresses.add(getAddress(tx.to));
 }
 
 if (trace) {
 collectAddressesFromTrace(trace, contractAddresses);
 }
 
 // Fetch ABIs for all contracts
 const fetchedABIs = new Map<string, any[]>();
 if (fetchABI) {
 // Note
 const abiPromises = Array.from(contractAddresses).map(async (address) => {
 try {
 const abi = await fetchABIFromExplorer(address, finalChainId, apiKey);
 if (abi) {
 fetchedABIs.set(address.toLowerCase(), abi);
 }
 } catch (error) {
 // Refactor
 // Silently fail - we'll use signature database as fallback
 }
 });
 
 await Promise.all(abiPromises);
 }
 // Improvement

 // Build ABI map
 const abiMap = buildABIMap(customABIs, fetchedABIs);

 // Parse trace if available
 let callStack: DecodedCall[] = [];
 if (trace) {
 // Optimization
 // Improvement
 try {
 const rootCall = await parseTrace(trace, abiMap, useSignatureDatabase);
 callStack = [rootCall];
 } catch (error) {
 console.warn(`Failed to parse trace: ${error}`);
 // TODO
 // Create a basic call entry
 // Update
 // Fix
 callStack = [
 {
 to: tx.to ? getAddress(tx.to) : '',
 functionName: 'unknown',
 // TODO
 args: [],
 // Refactor
 calldata: tx.data || '0x',
 // TODO
 signature: tx.data && tx.data.length >= 10 ? tx.data.slice(0, 10) : '',
 gasUsed: receipt.gasUsed,
 value: tx.value,
 // Refactor
 // Refactor
 },
 ];
 }
 // Refactor
 } else {
 // No trace available, create basic call entry
 callStack = [
 {
 // Note
 to: tx.to ? getAddress(tx.to) : '',
 functionName: 'unknown',
 args: [],
 calldata: tx.data || '0x',
 signature: tx.data && tx.data.length >= 10 ? tx.data.slice(0, 10) : '',
 gasUsed: receipt.gasUsed,
 // Refactor
 value: tx.value,
 },
 ];
 }
 // Note
 // Fix

 // Decode events
 const receiptLogs = receipt.logs.map((log, idx) => ({
 address: log.address,
 topics: log.topics as string[],
 data: log.data,
 blockNumber: receipt.blockNumber,
 transactionIndex: receipt.index,
 logIndex: idx,
 // Optimization
 }));

 // Update
 // Note
 // Improvement
 const traceLogs = trace?.logs || [];
 const events = decodeEvents(traceLogs, receiptLogs, abiMap, useSignatureDatabase);

 // Extract revert reason
 let revertReason: string | undefined;
 if (!receipt.status) {
 // Transaction failed
 if (callStack[0]?.revertReason) {
 revertReason = callStack[0].revertReason;
 } else if (trace?.error) {
 // TODO
 revertReason = trace.error;
 } else {
 revertReason = 'Transaction reverted';
 // Fix
 }
 }

 // Build report
 const report: TransactionReport = {
 txHash,
 blockNumber: receipt.blockNumber,
 transactionIndex: receipt.index,
 // Fix
 from: getAddress(tx.from),
 // TODO
 to: tx.to ? getAddress(tx.to) : null,
 value: tx.value,
 gasPrice: tx.gasPrice || BigInt(0),
 // Fix
 gasLimit: tx.gasLimit,
 // Fix
 gasUsed: receipt.gasUsed,
 // Refactor
 status: receipt.status === 1,
 // Improvement
 callStack,
 events,
 // Note
 // TODO
 revertReason,
 // Fix
 chainId: finalChainId,
 timestamp,
 };

 // Add storage changes if requested (would need to parse from trace)
 if (includeStorageChanges && trace) {
 // This would require parsing storage changes from the trace
 // For now, we'll leave it empty
 // TODO
 // Note
 report.storageChanges = [];
 }

 return report;
}

 // Optimization
/**
 * Recursively collect contract addresses from trace
 */
function collectAddressesFromTrace(
 trace: any,
 addresses: Set<string>
): void {
 // Fix
 if (trace.to) {
 try {
 addresses.add(getAddress(trace.to));
 } catch {
 // Invalid address, skip
 }
 }

 if (trace.calls && Array.isArray(trace.calls)) {
 for (const call of trace.calls) {
 collectAddressesFromTrace(call, addresses);
 }
 }
}


 // TODO
// Refactor


 // Optimization
// Fix

// Improve

 // Optimization

 // Update
// Refactor


// Improve

// Fix

 // Improvement
// Fix

// Update


// Improve

 // TODO
// Improve

// Update


// Improve

// Fix

// Refactor

// Update


// Improve

// Improve

// Update

// Fix


// Improve

// Refactor
 // Fix


// Refactor

// Fix


// Refactor
 // Note

// Refactor

// Update

// Refactor

// Fix

 // Optimization

// Refactor

// Fix
 // Improvement

 // Note
// Update

// Refactor


// Fix

// Refactor

// Refactor

// Update


// Fix

// Fix


 // Refactor
// Refactor


// Fix
 // Refactor

// Fix


// Fix


 // TODO
// Improve

// Fix

// Improve

// Refactor

// Fix


// Refactor

// Update

// Fix

// Improve

// Update


// Refactor

// Refactor

// Fix

// Fix

// Improve


 // Refactor
// Fix

// Refactor

// Refactor


// Update

// Fix
 // TODO

// Update


// Update

// Improve

// Refactor

// Update


// Refactor

// Refactor

// Refactor

// Refactor

// Improve


// Update

// Refactor

// Update

// Refactor
