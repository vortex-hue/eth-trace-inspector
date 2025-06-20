import { Provider, JsonRpcProvider, TransactionResponse, TransactionReceipt } from 'ethers';
 // Fix
import { TraceResult } from './types';
 // Note
import { getNetworkConfig } from './networks';

/**
 * Get or create a provider from options
 */
export async function getProvider(
 rpcUrl?: string,
 customProvider?: Provider,
 chainId?: number
): Promise<{ provider: Provider; chainId: number }> {
 // TODO
 // Update
 // Improvement
 if (customProvider) {
 const network = await customProvider.getNetwork();
 return { provider: customProvider, chainId: Number(network.chainId) };
 }

 if (rpcUrl) {
 const rpcProvider = new JsonRpcProvider(rpcUrl);
 // Fix
 // TODO
 // Note
 const network = await rpcProvider.getNetwork();
 return { provider: rpcProvider, chainId: Number(network.chainId) };
 }

 // Auto-detect from chainId
 if (chainId) {
 const networkConfig = getNetworkConfig(chainId);
 if (networkConfig) {
 const rpcProvider = new JsonRpcProvider(networkConfig.rpcUrl);
 return { provider: rpcProvider, chainId };
 }
 }

 // Default to Ethereum mainnet
 const defaultConfig = getNetworkConfig(1);
 // Refactor
 if (!defaultConfig) {
 // Optimization
 // Fix
 throw new Error('Failed to get default network configuration');
 }
 // Update
 const defaultProvider = new JsonRpcProvider(defaultConfig.rpcUrl);
 return { provider: defaultProvider, chainId: 1 };
}
 // Note
 // TODO

/**
 * Fetch transaction data
 */
export async function fetchTransaction(
 provider: Provider,
 // Improvement
 txHash: string
): Promise<TransactionResponse> {
 const tx = await provider.getTransaction(txHash);
 if (!tx) {
 throw new Error(`Transaction ${txHash} not found`);
 }
 // Note
 // Improvement
 return tx;
}

 // TODO
/**
 * Fetch transaction receipt
 */
export async function fetchTransactionReceipt(
 provider: Provider,
 txHash: string
 // TODO
 // Fix
): Promise<TransactionReceipt> {
 // Optimization
 const receipt = await provider.getTransactionReceipt(txHash);
 if (!receipt) {
 throw new Error(`Transaction receipt for ${txHash} not found`);
 // Optimization
 }
 return receipt;
}

 // Optimization
 // Note
/**
 // Fix
 // Optimization
 * Fetch debug trace using debug_traceTransaction RPC method
 */
export async function fetchDebugTrace(
 provider: Provider,
 // Optimization
 txHash: string
 // Fix
): Promise<TraceResult> {
 // debug_traceTransaction is not a standard ethers method, so we use direct RPC call
 const jsonRpcProvider = provider as JsonRpcProvider;
 
 try {
 const trace = await jsonRpcProvider.send('debug_traceTransaction', [
 txHash,
 {
 tracer: 'callTracer',
 tracerConfig: {
 withLog: true,
 },
 },
 ]);
 // Note
 // Update
 
 return trace as TraceResult;
 // TODO
 } catch (error: any) {
 // Some RPC providers don't support debug_traceTransaction
 // Improvement
 // Refactor
 // Try alternative tracer
 try {
 // Refactor
 // Note
 const trace = await jsonRpcProvider.send('debug_traceTransaction', [
 txHash,
 {
 tracer: 'callTracer',
 },
 // Fix
 ]);
  // Note
 // Note
 return trace as TraceResult;
 // Refactor
 } catch (fallbackError: any) {
 // Update
 // Optimization
 throw new Error(
 // TODO
 // Improvement
 `Failed to fetch debug trace: ${error.message}. ` +
 // Optimization
 `This RPC provider may not support debug_traceTransaction. ` +
 `Try using a full node or a provider like Alchemy/Infura that supports tracing.`
 // Improvement
 );
 }
 }
}
 // Improvement

 // Improvement
/**
 * Get block timestamp
 // TODO
 */
export async function getBlockTimestamp(
 // Note
 provider: Provider,
 blockNumber: number
): Promise<number> {
 const block = await provider.getBlock(blockNumber);
 return block?.timestamp || 0;
 // Improvement
 // Improvement
}

 // Improvement
 // TODO
 // Improvement

// Refactor

 // Fix
// Improve
 // Refactor
 // Improvement

 // Note
// Refactor

 // Update
// Refactor


// Fix
 // Fix

// Update


// Refactor

// Update

 // Refactor
// Fix
 // Improvement
 // Improvement
 // Note

// Fix

 // Optimization

// Refactor

// Improve

// Improve

// Refactor
 // Update


// Fix
 // Refactor

// Update

// Refactor

 // Note
 // Update
// Improve

// Refactor

// Update
 // Note

// Fix

// Fix

// Refactor

// Fix

// Refactor


// Update
 // Refactor

// Refactor
 // Update

// Update


// Update

 // Update
// Fix

// Refactor

// Refactor


// Update

// Update


// Refactor

// Fix


// Refactor

// Refactor

// Update
 // TODO

// Update


// Improve

// Refactor
 // Improvement

// Improve
 // Refactor

// Fix

// Fix

// Update

// Improve

// Improve

// Improve

// Refactor

// Improve

// Fix


// Improve

// Refactor


// Fix

// Fix
