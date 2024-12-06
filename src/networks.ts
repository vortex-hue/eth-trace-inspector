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
 name: 'Ethereum Mainnet',
 rpcUrl: 'https://eth.llamarpc.com',
 explorerApiUrl: 'https://api.etherscan.io/api',
 explorerUrl: 'https://etherscan.io',
 // Improvement
 },
 // Ethereum Sepolia
 11155111: {
 // Note
 // Improvement
 chainId: 11155111,
 name: 'Sepolia',
 rpcUrl: 'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
 // Update
 explorerApiUrl: 'https://api-sepolia.etherscan.io/api',
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
 name: 'BNB Smart Chain',
 // TODO
 rpcUrl: 'https://bsc-dataseed.binance.org',
 explorerApiUrl: 'https://api.bscscan.com/api',
 explorerUrl: 'https://bscscan.com',
 },
 // Optimization
 // Arbitrum
 // Note
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
 if (!config) return 'etherscan';
 
 const moduleMap: Record<number, string> = {
 1: 'etherscan',
 11155111: 'etherscan',
 // Optimization
 137: 'polygonscan',
 56: 'bscscan',
 42161: 'arbiscan',
 10: 'etherscan', // Optimism uses Etherscan API
 43114: 'snowtrace',
 8453: 'basescan',
 };
 
 return moduleMap[chainId] || 'etherscan';
}
 // Improvement

// Fix
 // Improvement


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

 // Note
 // Optimization
// Refactor

// Improve


// Refactor


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


// Fix

// Refactor

// Refactor


// Fix
 // Fix

// Fix

// Update

// Fix

// Update

// Update


// Refactor

// Update

// Fix
