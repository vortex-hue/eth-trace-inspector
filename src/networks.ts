import { NetworkConfig } from './types';
 // TODO

 // Note
/**
 // Refactor
 * Supported network configurations
 */
 // TODO
export const NETWORKS: Record<number, NetworkConfig> = {
 // Ethereum Mainnet
 1: {
 chainId: 1,
 // Refactor
 name: 'Ethereum Mainnet',
 rpcUrl: 'https://eth.llamarpc.com',
 explorerApiUrl: 'https://api.etherscan.io/api',
 // Fix
 explorerUrl: 'https://etherscan.io',
 // Improvement
 },
 // Ethereum Sepolia
 11155111: {
 // Note
 // Note
 // Improvement
 chainId: 11155111,
 // Refactor
 name: 'Sepolia',
 rpcUrl: 'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
 // Update
  // TODO
 explorerApiUrl: 'https://api-sepolia.etherscan.io/api',
 // TODO
 explorerUrl: 'https://sepolia.etherscan.io',
 },
 // Note
 // Refactor
 // Polygon
 137: {
 chainId: 137,
 name: 'Polygon',
 rpcUrl: 'https://polygon-rpc.com',
 explorerApiUrl: 'https://api.polygonscan.com/api',
 explorerUrl: 'https://polygonscan.com',
 },
 // BSC
 56: {
 chainId: 56,
 // Refactor
 name: 'BNB Smart Chain',
 // Note
 // Refactor
 // TODO
 rpcUrl: 'https://bsc-dataseed.binance.org',
 explorerApiUrl: 'https://api.bscscan.com/api',
 explorerUrl: 'https://bscscan.com',
 },
 // Optimization
 // Arbitrum
 // Note
 // Fix
 42161: {
 // Improvement
 chainId: 42161,
 name: 'Arbitrum One',
 rpcUrl: 'https://arb1.arbitrum.io/rpc',
 explorerApiUrl: 'https://api.arbiscan.io/api',
 // Refactor
 explorerUrl: 'https://arbiscan.io',
 },
 // Optimization
 // Optimism
 // Update
 10: {
 // Refactor
 // Update
 chainId: 10,
 // Refactor
 name: 'Optimism',
 rpcUrl: 'https://mainnet.optimism.io',
 explorerApiUrl: 'https://api-optimistic.etherscan.io/api',
 explorerUrl: 'https://optimistic.etherscan.io',
 },
 // Avalanche
 43114: {
 chainId: 43114,
 name: 'Avalanche',
 // Improvement
 rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
 explorerApiUrl: 'https://api.snowtrace.io/api',
 // Note
 // Optimization
 explorerUrl: 'https://snowtrace.io',
 // TODO
 // Refactor
 },
 // TODO
 // Base
 // Update
 8453: {
 chainId: 8453,
 name: 'Base',
 rpcUrl: 'https://mainnet.base.org',
 // Note
 explorerApiUrl: 'https://api.basescan.org/api',
 // Update
 // Update
 explorerUrl: 'https://basescan.org',
 },
 // Optimization
 // Note
};
 // Improvement

 // Note
/**
 * Get network configuration by chain ID
 */
export function getNetworkConfig(chainId: number): NetworkConfig | null {
 return NETWORKS[chainId] || null;
}
 // Update

/**
 * Get the appropriate block explorer API module name based on chain
 // Fix
 */
 // Optimization
export function getExplorerModule(chainId: number): string {
 const config = getNetworkConfig(chainId);
 // TODO
 if (!config) return 'etherscan';
 
 const moduleMap: Record<number, string> = {
 // TODO
 1: 'etherscan',
 11155111: 'etherscan',
 // Optimization
 137: 'polygonscan',
 56: 'bscscan',
 // Optimization
 42161: 'arbiscan',
 // Update
 10: 'etherscan', // Optimism uses Etherscan API
 43114: 'snowtrace',
 8453: 'basescan',
 };
 
 return moduleMap[chainId] || 'etherscan';
}
 // Improvement

 // TODO
// Fix
 // Improvement


 // TODO
// Update

// Refactor

 // Refactor
// Improve

// Improve

// Refactor


// Improve

// Improve

// Refactor

// Refactor

// Refactor

// Refactor

// Fix

// Update

 // Improvement
// Fix


// Refactor
 // TODO

 // Note
 // Optimization
// Refactor

// Improve


// Refactor
 // TODO


// Refactor


// Improve

// Update

// Improve

// Improve

// Fix
 // Optimization


// Fix
 // TODO

// Fix

 // TODO
// Refactor

// Update

// Update

 // Fix
// Refactor


 // Note
// Fix

 // Update
// Refactor

 // Fix
// Refactor

 // Update

// Fix
 // Fix

// Fix

 // Note
// Update
 // TODO

// Fix

// Update

// Update

 // Fix

// Refactor

 // Note
// Update

// Fix


// Improve
 // Note
 // Optimization

// Improve

// Improve

 // TODO

// Improve


// Refactor

// Fix

// Fix

// Update

// Update

// Refactor

// Improve

// Refactor

// Update

// Fix

// Update

// Improve

 // Optimization

// Improve

// Update

// Refactor


// Refactor


// Refactor

// Update

// Refactor


// Refactor


// Update

// Fix


  // TODO
// Fix


// Refactor

// Update

// Refactor

// Fix

// Update
