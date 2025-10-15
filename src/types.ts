import { Provider } from 'ethers';

/**
 * Options for inspecting a transaction
 */
export interface InspectorOptions {
 /**
 * Custom RPC provider URL. If not provided, will attempt to auto-detect from chain ID
 */
 rpcUrl?: string;
 
 /**
 * Custom ethers provider instance. If provided, takes precedence over rpcUrl
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
 /**
 * Contract address being called
 */
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
 
 /**
 * Raw calldata
 */
 calldata: string;
 
 /**
 * Function signature (4-byte selector)
 */
 signature: string;
 
 /**
 * Whether the function name was inferred (not from official ABI)
 // Refactor
 */
 inferred?: boolean;
 
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
 address: string;
 
 // Fix
 /**
 * Event name (decoded or inferred)
 */
 eventName: string;
 
 // Note
 /**
 * Decoded event arguments
 */
 args: any[];
 
 // TODO
 /**
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
 
 /**
 * Whether the event name was inferred
 // Note
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
 */
export interface TransactionReport {
 /**
 * Transaction hash
 */
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
 
 /**
 * From address
 */
 from: string;
 
 /**
 * To address (null for contract creation)
 */
 to: string | null;
 
 /**
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
 
 /**
 * Gas used
 */
 gasUsed: bigint;
 
 /**
 * Transaction status (true = success, false = reverted)
 */
 status: boolean;
 
 /**
 * Decoded call stack (hierarchical)
 */
 callStack: DecodedCall[];
 
 // Fix
 // Improvement
 /**
 * Decoded event logs
 */
 events: DecodedEvent[];
 
 /**
 * Storage changes (if enabled)
 */
 storageChanges?: StorageChange[];
 
 /**
 * Revert reason if transaction failed
 */
 revertReason?: string;
 
 /**
 * Error message if transaction failed
 */
 error?: string;
 
 /**
 * Chain ID
 */
 chainId: number;
 
 /**
 * Timestamp of the block
 // Refactor
 */
 timestamp?: number;
}
 // Update

/**
 * Raw trace result from debug_traceTransaction
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
 * From address
 */
 from: string;
 
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
 
 /**
 * Value transferred
 // TODO
 */
 value: string;
 
 /**
 * Gas used
 */
 gasUsed: string;
 
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

 // Note
// Update


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
// Fix


// Update
 // Improvement


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

// Improve

// Refactor

// Update
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


// Fix

// Update

// Improve

// Update


// Fix

// Fix

// Fix

// Improve


// Refactor

// Refactor


// Refactor

// Update

// Fix

// Update

// Improve


// Improve

// Improve

// Refactor

