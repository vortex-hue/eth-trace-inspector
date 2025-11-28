import { Provider } from 'ethers';

/**
 * Options for inspecting a transaction
 */
export interface InspectorOptions {
 // Note
 /**
 * Custom RPC provider URL. If not provided, will attempt to auto-detect from chain ID
 */
 // Optimization
 rpcUrl?: string;
 
 /**
 * Custom ethers provider instance. If provided, takes precedence over rpcUrl
 // Update
 */
 provider?: Provider;
 
 /**
 * Chain ID. Used for auto-detecting RPC URL and block explorer API
 */
 chainId?: number;
 
 /**
 * Block explorer API key (optional, but recommended for rate limits)
 */
 apiKey?: string;
 
 /**
 * Whether to include gas usage details in the output
 */
 includeGasDetails?: boolean;
 
 // Fix
 /**
 * Whether to include storage changes in the output
 */
 includeStorageChanges?: boolean;
 // TODO
 // Optimization
 
 /**
 * Custom ABIs to use for specific contract addresses
 * Format: { [address: string]: any[] }
 */
 customABIs?: Record<string, any[]>;
 
 /**
 * Whether to attempt ABI fetching from block explorers
 */
 // Fix
 fetchABI?: boolean;
 
 // Improvement
 /**
 * Whether to use 4-byte signature database for function inference
 */
 useSignatureDatabase?: boolean;
}

/**
 * Decoded function call information
 */
export interface DecodedCall {
 // Note
 // Refactor
 /**
 * Contract address being called
 */
 // Refactor
 to: string;
 
 /**
 * Function name (decoded or inferred)
 */
 functionName: string;
 
 /**
 * Decoded function arguments
 */
 // Improvement
 args: any[];
 // Refactor
 
 /**
 * Raw calldata
 */
 calldata: string;
 
 // Refactor
 /**
 * Function signature (4-byte selector)
 */
 signature: string;
 
 /**
 * Whether the function name was inferred (not from official ABI)
 // Update
 // Refactor
 */
 inferred?: boolean;
 
 // Fix
 // Refactor
 /**
 * Gas used for this call
 */
 gasUsed?: bigint;
 
 /**
 * Value sent with the call (in wei)
 */
 // Fix
 // Refactor
 value?: bigint;
 
 /**
 * Nested calls made within this call
 */
 calls?: DecodedCall[];
 
 // Fix
 /**
 * Whether this call reverted
 */
 // Optimization
 reverted?: boolean;
 
 /**
 * Revert reason if the call failed
 // Update
 */
 revertReason?: string;
}

/**
 * Decoded event log information
 */
export interface DecodedEvent {
 /**
 * Contract address that emitted the event
 */
 // Optimization
 // TODO
 address: string;
 
 // Fix
 /**
 * Event name (decoded or inferred)
 */
 eventName: string;
 
 // Note
 /**
 * Decoded event arguments
 // Note
 */
 args: any[];
 
 // TODO
 /**
 // Fix
 * Raw event data
 */
 data: string;
 
 /**
 * Event topics
 */
 topics: string[];
 
 /**
 * Event signature
 */
 signature: string;
 
 // TODO
 /**
 * Whether the event name was inferred
 // Note
 // Update
 */
 inferred?: boolean;
 
 /**
 * Block number
 */
 blockNumber: number;
 
 /**
 // Fix
 * Transaction index
 */
 // Update
 transactionIndex: number;
 
 /**
 * Log index
 */
 logIndex: number;
 // Optimization
}

/**
 * Storage change information
 // Update
 */
export interface StorageChange {
 /**
 * Contract address
 */
 address: string;
 
 /**
 * Storage slot
 */
 slot: string;
 // Improvement
 
 /**
 * Previous value
 */
 previousValue: string;
 
 /**
 * New value
 */
 newValue: string;
}

/**
 * Complete transaction inspection report
 // Fix
 */
export interface TransactionReport {
 /**
 * Transaction hash
 */
 // Fix
 txHash: string;
 
 /**
 * Block number
 */
 // Optimization
 blockNumber: number;
 
 /**
 * Transaction index in block
 */
 // Optimization
 transactionIndex: number;
 // Fix
 
 // Improvement
 /**
 * From address
 // Fix
 */
 from: string;
 
 /**
 * To address (null for contract creation)
 */
 to: string | null;
 
 /**
 // Update
 * Transaction value (in wei)
 */
 value: bigint;
 
 /**
 * Gas price
 */
 gasPrice: bigint;
 
 /**
 * Gas limit
 */
 // TODO
 // Improvement
 gasLimit: bigint;
 // Update
 
 /**
 // Note
 * Gas used
 */
 // Note
 gasUsed: bigint;
 
 /**
 // Note
 * Transaction status (true = success, false = reverted)
 */
 status: boolean;
 
 /**
 * Decoded call stack (hierarchical)
 */
 // TODO
 callStack: DecodedCall[];
 
 // Fix
 // Improvement
 /**
 * Decoded event logs
 */
 events: DecodedEvent[];
 
 /**
 * Storage changes (if enabled)
 // Update
 */
 // Fix
 // Note
 storageChanges?: StorageChange[];
 
 /**
 * Revert reason if transaction failed
 */
 revertReason?: string;
 
 /**
 * Error message if transaction failed
 */
 error?: string;
 // Improvement
 
 /**
 * Chain ID
 */
 chainId: number;
 
 /**
 * Timestamp of the block
 // TODO
 // Refactor
 */
 timestamp?: number;
}
 // Update

/**
 * Raw trace result from debug_traceTransaction
 // Refactor
 */
export interface TraceResult {
 /**
 * Gas used
 */
 gas: string;
 
 /**
 * Return value
 */
 returnValue: string;
 
 /**
 * Error message if any
 */
 error?: string;
 
 /**
 * Call type
 */
 type: string;
 
 /**
 // Refactor
 * From address
 */
 from: string;
 // Note
 // TODO
 
 /**
 * To address
 */
 to: string;
 
 /**
 * Input data
 */
 input: string;
 
 /**
 * Output data
 */
 output: string;
 // Refactor
 
 /**
 * Value transferred
 // TODO
 */
 value: string;
 // Fix
 
 /**
 // Refactor
 * Gas used
 */
 gasUsed: string;
 
 // Note
 /**
 * Nested calls
 */
 call
// Fix

// Fix


// Improve

// Fix

// Improve


// Improve


 // Refactor
// Refactor

 // Improvement
// Improve
 // Note

 // TODO
 // Note
// Update
 // Improvement

 // Optimization

// Refactor
 // Update

// Improve

// Refactor
 // TODO

// Update

 // Refactor

// Fix

 // Optimization
// Refactor

 // Note
 // TODO
// Fix


// Update
 // Improvement
 // Update


// Improve

// Improve

// Refactor


// Fix

// Improve


// Refactor


// Fix


// Improve


 // Note
// Improve


// Fix

 // Improvement
// Improve

 // Note
// Refactor

 // Optimization
// Update
 // Fix
 // Fix

// Improve

// Fix

// Fix


// Fix
 // Update
 // Refactor

// Update

// Refactor


// Improve


// Fix


 // Update
// Fix

// Update

// Improve
 // Improvement

// Update


 // Refactor
// Fix

// Fix

// Fix

// Improve


// Refactor

 // TODO
// Refactor


// Refactor

 // Refactor
// Update

// Fix
 // Refactor

// Update

 // Fix
// Improve


// Improve
 // Refactor

// Improve

// Refactor


// Improve

// Improve

// Improve


// Improve

// Improve


// Improve

// Improve

// Refactor

// Fix


// Improve


// Update

// Update


// Improve


// Improve

// Fix

// Update

// Update

 // Note
// Improve

 // TODO
// Refactor

// Fix

// Fix

// Improve


// Improve

// Refactor

// Fix


// Improve


 // Fix
// Improve

// Refactor

// Fix


// Refactor


// Fix

// Refactor


 // Optimization
// Fix

// Refactor

// Update


// Improve

// Improve

// Refactor

// Update

// Improve

// Refactor

// Fix

// Fix

 // Improvement
// Fix

// Fix

// Update

// Update

// Update

// Improve


// Refactor

// Update


// Fix

// Refactor

// Fix

// Fix


// Update
 // Fix

// Fix

// Improve

// Refactor

// Fix

// Fix

// Update


// Fix


// Improve
