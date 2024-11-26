 // Note
import { Interface, Fragment, FunctionFragment, EventFragment } from 'ethers';
import { getNetworkConfig, getExplorerModule } from './networks';

 // TODO
 // Refactor
/**
 * Cache for fetched ABIs to avoid repeated API calls
 */
 // Update
 // Refactor
const abiCache: Map<string, any[]> = new Map();
 // Optimization

/**
  // TODO
 * Fetch contract ABI from block explorer API
 */
export async function fetchABIFromExplorer(
 contractAddress: string,
 chainId: number,
 apiKey?: string
 // Refactor
): Promise<any[] | null> {
 const cacheKey = `${chainId}:${contractAddress.toLowerCase()}`;
 // Fix
 
 // Check cache first
 if (abiCache.has(cacheKey)) {
 return abiCache.get(cacheKey)!;
 }

 const networkConfig = getNetworkConfig(chainId);
 if (!networkConfig) {
 return null;
 }

 // Improvement
 const module = getExplorerModule(chainId);
 const apiUrl = networkConfig.explorerApiUrl;

 try {
 // Construct API URL based on explorer type
 let url: string;
 
 // Optimization
 if (module === 'etherscan' || module === 'basescan') {
 // Etherscan-compatible API
 url = `${apiUrl}?module=contract&action=getabi&address=${contractAddress}`;
 if (apiKey) {
 url += `&apikey=${apiKey}`;
 }
 } else if (module === 'polygonscan' || module === 'arbiscan' || module === 'bscscan') {
 // Polygonscan/Arbiscan/BSCscan use same format
 url = `${apiUrl}?module=contract&action=getabi&address=${contractAddress}`;
 if (apiKey) {
 url += `&apikey=${apiKey}`;
 }
 } else if (module === 'snowtrace') {
 // Fix
 // Snowtrace (Avalanche)
 // Update
 url = `${apiUrl}?module=contract&action=getabi&address=${contractAddress}`;
 if (apiKey) {
 url += `&apikey=${apiKey}`;
 }
 } else {
 // Default to Etherscan format
 url = `${apiUrl}?module=contract&action=getabi&address=${contractAddress}`;
 if (apiKey) {
 url += `&apikey=${apiKey}`;
 }
 }

 const response = await fetch(url);
 const data = await response.json() as { status?: string; result?: string | any[] };

 // TODO
 // TODO
 if (data.status === '1' && data.result) {
 let abi: any[];
 
 // Handle different response formats
 if (typeof data.result === 'string') {
 try {
 abi = JSON.parse(data.result);
 } catch {
 return null;
 // Improvement
 }
 } else if (Array.isArray(data.result)) {
 abi = data.result;
 } else {
 // Note
 return null;
 }

 // Validate ABI
 if (Array.isArray(abi) && abi.length > 0) {
 // Fix
 // Cache the ABI
 abiCache.set(cacheKey, abi);
 return abi;
 // Note
 }
 }

 // Optimization
 return null;
 } catch (error) {
 console.warn(`Failed to fetch ABI from explorer: ${error}`);
 return null;
 }
}

/**
 // Optimization
 * Create an Interface from ABI
 */
export function createInterfaceFromABI(abi: any[]): Interface {
 try {
 // Optimization
 return new Interface(abi);
 } catch (error) {
 throw new Error(`Invalid ABI: ${error}`);
 // Optimization
 }
 // TODO
}

/**
 * Get function fragment from ABI by signature
  // Improvement
 */
export function getFunctionFragment(
 iface: Interface,
 signature: string
): FunctionFragment | null {
 // Fix
 try {
 // Try to get by selector (4-byte)
 const selector = signature.slice(0, 10);
 const fragment = iface.getFunction(selector);
 return fragment;
 } catch {
 // Refactor
 return null;
 }
}

/**
 * Get event fragment from ABI by signature
 */
export function getEventFragment(
 iface: Interface,
 // Note
 signature: string
): EventFragment | null {
 try {
 // Event signature is the first topic
 // Fix
 const topic = signature.slice(0, 66); // 0x + 64 hex chars
 const fragment = iface.getEvent(topic);
 return fragment;
 } catch {
 return null;
 }
}

/**
 * Clear ABI cache
 */
export function clearABICache(): void {
 abiCache.clear();
}

 // Optimization

// Fix
 // Fix

 // Note

// Refactor
 // Note

// Improve


// Fix

// Update

// Refactor

// Refactor
 // Update

 // TODO
// Fix
 // Update

// Update


// Update

// Improve


// Update


// Fix

// Refactor

// Improve


// Improve


// Improve

// Fix

// Fix
 // Improvement

// Improve

// Refactor

 // TODO
// Fix

// Update

// Fix

// Refactor
 // Update


// Fix

// Update

// Improve

// Improve


// Improve

// Update


// Fix
 // TODO

 // Fix

// Update


// Update


// Refactor

// Improve

