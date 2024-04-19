import { inspectTransaction, prettyPrint, toJSON, TransactionReport } from './index';

/**
 * Example test file
 * 
 * To run tests, you'll need to:
 * 1. Install dependencies: npm install
 * 2. Configure Jest: npm install --save-dev jest @types/jest ts-jest
 * 3. Add jest.config.js
 * 4. Run: npm test
 */

describe('eth-trace-inspector', () => {
  // Example test transaction hash (replace with actual test hash)
  // Set TEST_TX_HASH environment variable or use a real hash
  const TEST_TX_HASH = process.env.TEST_TX_HASH || '0x...';
  const isPlaceholderHash = TEST_TX_HASH === '0x...' || TEST_TX_HASH.length < 66;
  
  it('should inspect a transaction', async () => {
    if (isPlaceholderHash) {
      console.log('Skipping test - no valid transaction hash provided. Set TEST_TX_HASH env var to run.');
      return;
    }
    
    const report = await inspectTransaction(TEST_TX_HASH, {
      chainId: 1, // Ethereum mainnet
      fetchABI: true,
      useSignatureDatabase: true,
    });
    
    expect(report).toBeDefined();
    expect(report.txHash).toBe(TEST_TX_HASH);
    expect(report.callStack).toBeDefined();
    expect(report.events).toBeDefined();
  }, 30000); // 30 second timeout for RPC calls
  
  it('should format output as JSON', () => {
    // Create a mock report for testing
    const mockReport: TransactionReport = {
      txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      blockNumber: 12345,
      transactionIndex: 0,
      from: '0x0000000000000000000000000000000000000000',
      to: '0x1111111111111111111111111111111111111111',
      value: BigInt(0),
      gasPrice: BigInt(1000000000),
      gasLimit: BigInt(21000),
      gasUsed: BigInt(21000),
      status: true,
      callStack: [],
      events: [],
      chainId: 1,
    };
    
    const json = toJSON(mockReport);
    expect(json).toContain('txHash');
    expect(json).toContain('0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef');
    expect(json).toContain('"status": true');
  });
  
  it('should handle failed transactions', async () => {
    if (isPlaceholderHash) {
      console.log('Skipping test - no valid transaction hash provided. Set TEST_TX_HASH env var to run.');
      return;
    }
    
    // Test with a known failed transaction
    // const report = await inspectTransaction(FAILED_TX_HASH);
    // expect(report.status).toBe(false);
    // expect(report.revertReason).toBeDefined();
  });
  
  it('should throw error for invalid transaction hash', async () => {
    await expect(
      inspectTransaction('0xinvalid', { chainId: 1 })
    ).rejects.toThrow();
  });
  
  it('should handle missing transaction gracefully', async () => {
    // Use a hash that doesn't exist
    const fakeHash = '0x' + '0'.repeat(64);
    await expect(
      inspectTransaction(fakeHash, { chainId: 1 })
    ).rejects.toThrow();
  });
});

