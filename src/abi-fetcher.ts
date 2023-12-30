import { Interface, Fragment, FunctionFragment, EventFragment } from 'ethers';
import { getNetworkConfig, getExplorerModule } from './networks';

/**
 * Cache for fetched ABIs to avoid repeated API calls
 */
const abiCache: Map<string, any[]> = new Map();

/**
 * Fetch contract ABI from block explorer API
 */
export async function fetchABIFromExplorer(
  contractAddress: string,
  chainId: number,
  apiKey?: string
): Promise<any[] | null> {
  const cacheKey = `${chainId}:${contractAddress.toLowerCase()}`;
  
  // Check cache first
  if (abiCache.has(cacheKey)) {
    return abiCache.get(cacheKey)!;
  }

  const networkConfig = getNetworkConfig(chainId);
  if (!networkConfig) {
    return null;
  }

  const module = getExplorerModule(chainId);
  const apiUrl = networkConfig.explorerApiUrl;

  try {
    // Construct API URL based on explorer type
    let url: string;
    
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
      // Snowtrace (Avalanche)
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

    if (data.status === '1' && data.result) {
      let abi: any[];
      
      // Handle different response formats
      if (typeof data.result === 'string') {
        try {
          abi = JSON.parse(data.result);
        } catch {
          return null;
        }
      } else if (Array.isArray(data.result)) {
        abi = data.result;
      } else {
        return null;
      }

      // Validate ABI
      if (Array.isArray(abi) && abi.length > 0) {
        // Cache the ABI
        abiCache.set(cacheKey, abi);
        return abi;
      }
    }

    return null;
  } catch (error) {
    console.warn(`Failed to fetch ABI from explorer: ${error}`);
    return null;
  }
}

/**
 * Create an Interface from ABI
 */
export function createInterfaceFromABI(abi: any[]): Interface {
  try {
    return new Interface(abi);
  } catch (error) {
    throw new Error(`Invalid ABI: ${error}`);
  }
}

/**
 * Get function fragment from ABI by signature
 */
export function getFunctionFragment(
  iface: Interface,
  signature: string
): FunctionFragment | null {
  try {
    // Try to get by selector (4-byte)
    const selector = signature.slice(0, 10);
    const fragment = iface.getFunction(selector);
    return fragment;
  } catch {
    return null;
  }
}

/**
 * Get event fragment from ABI by signature
 */
export function getEventFragment(
  iface: Interface,
  signature: string
): EventFragment | null {
  try {
    // Event signature is the first topic
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


// Fix

