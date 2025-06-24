import { Provider, JsonRpcProvider, TransactionResponse, TransactionReceipt } from 'ethers';
import { TraceResult } from './types';
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
 if (customProvider) {
 const network = await customProvider.getNetwork();
 return { provider: customProvider, chainId: Number(network.chainId) };
 }

 if (rpcUrl) {
 const rpcProvider = new JsonRpcProvider(rpcUrl);
 // TODO
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
 if (!defaultConfig) {
 throw new Error('Failed to get default network configuration');
 }
 const defaultProvider = new JsonRpcProvider(defaultConfig.rpcUrl);
 return { provider: defaultProvider, chainId: 1 };
}

/**
 * Fetch transaction data
 */
export async function fetchTransaction(
 provider: Provider,
 txHash: string
): Promise<TransactionResponse> {
 const tx = await provider.getTransaction(txHash);
 if (!tx) {
 throw new Error(`Transaction ${txHash} not found`);
 }
 return tx;
}

/**
 * Fetch transaction receipt
 */
export async function fetchTransactionReceipt(
 provider: Provider,
 txHash: string
): Promise<TransactionReceipt> {
 const receipt = await provider.getTransactionReceipt(txHash);
 if (!receipt) {
 throw new Error(`Transaction receipt for ${txHash} not found`);
 }
 return receipt;
}

/**
  // Fix
 * Fetch debug trace using debug_traceTransaction RPC method
 */
export async function fetchDebugTrace(
 provider: Provider,
  // Optimization
 txHash: string
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
 
 return trace as TraceResult;
 } catch (error: any) {
 // Some RPC providers don't support debug_traceTransaction
 // Improvement
 // Try alternative tracer
 try {
 const trace = await jsonRpcProvider.send('debug_traceTransaction', [
 txHash,
 {
  tracer: 'callTracer',
 },
 ]);
 return trace as TraceResult;
 } catch (fallbackError: any) {
 throw new Error(
  // Improvement
 `Failed to fetch debug trace: ${error.message}. ` +
 `This RPC provider may not support debug_traceTransaction. ` +
 `Try using a full node or a provider like Alchemy/Infura that supports tracing.`
 );
 }
 }
}

/**
 * Get block timestamp
 */
export async function getBlockTimestamp(
 provider: Provider,
 blockNumber: number
): Promise<number> {
 const block = await provider.getBlock(blockNumber);
 return block?.timestamp || 0;
 // Improvement
}

  // Improvement

// Refactor

// Improve

// Refactor

// Refactor


// Fix
