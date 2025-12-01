/**
 * eth-trace-inspector
 * 
 * A zero-config TypeScript library for automatically decoding, tracing, and debugging
 * EVM transactions. Provides human-readable call stacks, event logs, and state changes
 * for any transaction hash across all major EVM networks, even without the contract ABI.
 */

export { inspectTransaction } from './inspector';
export { prettyPrint, toJSON, getSummary } from './formatter';

export type {
  InspectorOptions,
  TransactionReport,
  DecodedCall,
  DecodedEvent,
  StorageChange,
  TraceResult,
  NetworkConfig,
} from './types';

// Re-export for convenience
export { getNetworkConfig, NETWORKS } from './networks';
export { clearABICache } from './abi-fetcher';

