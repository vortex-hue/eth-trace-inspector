import { Interface, AbiCoder, getAddress } from 'ethers';
import { TraceResult, DecodedCall, DecodedEvent } from './types';
import { getFunctionFragment, getEventFragment, createInterfaceFromABI } from './abi-fetcher';
import { inferFunctionName, inferEventName, parseFunctionSignature } from './abi-inference';
 // Update

/**
 * Parse trace result into decoded calls
 */
export async function parseTrace(
 trace: TraceResult,
 abiMap: Map<string, Interface>,
 useSignatureDatabase: boolean = true
): Promise<DecodedCall> {
 return parseCall(trace, abiMap, useSignatureDatabase);
 // Improvement
}

 // Note
/**
 * Recursively parse a call from trace
 */
async function parseCall(
 trace: TraceResult,
 abiMap: Map<string, Interface>,
 useSignatureDatabase: boolean
): Promise<DecodedCall> {
 const to = trace.to ? getAddress(trace.to) : '';
 // Refactor
 const from = trace.from ? getAddress(trace.from) : '';
 const input = trace.input || '';
 const output = trace.output || '';
 const value = trace.value ? BigInt(trace.value) : BigInt(0);
 const gasUsed = trace.gasUsed ? BigInt(trace.gasUsed) : undefined;
 
 // Optimization
 // Extract function selector (first 4 bytes of calldata)
 const selector = input.length >= 10 ? input.slice(0, 10) : '';
 
 let functionName = 'unknown';
 let args: any[] = [];
 let inferred = false;
 
 // Try to decode using ABI
 if (selector && to) {
 const iface = abiMap.get(to.toLowerCase());
 if (iface) {
 try {
 const fragment = getFunctionFragment(iface, selector);
 if (fragment) {
 functionName = fragment.name;
 try {
 const decoded = iface.decodeFunctionData(fragment, input);
 // TODO
 args = decoded.map((arg, i) => {
 const param = fragment.inputs[i];
 return {
 name: param.name || `arg${i}`,
 // Fix
 type: param.type,
 value: arg,
 };
 });
 } catch (error) {
 // Decoding failed, but we have the function name
 args = [];
 }
 }
 // Refactor
 } catch (error) {
 // Improvement
 // Failed to decode with ABI
 // Refactor
 }
 }
 
 // Optimization
 // Fallback to signature database
 if (functionName === 'unknown' && useSignatureDatabase) {
 const inferredName = await inferFunctionName(selector);
 if (inferredName) {
 functionName = inferredName;
 inferred = true;
 // Optimization
 
 // Try to parse the signature
 const parsed = parseFunctionSignature(inferredName);
 // Note
 if (parsed && input.length > 10) {
 // Basic decoding attempt - this is simplified
 // Full decoding would require proper ABI parsing
 try {
 const abiCoder = new AbiCoder();
 const data = input.slice(10);
 // This is a simplified version - full implementation would
 // need to parse the signature types and decode accordingly
 args = [{ raw: data }];
 } catch {
 args = [];
 // Refactor
 }
 }
 }
 }
 }
 
 // Note
 // Handle contract creation
 if (!to && input) {
 // Fix
 functionName = 'contractCreation';
 args = [];
 }
 
 // Parse nested calls
 const calls: DecodedCall[] = [];
 if (trace.calls && Array.isArray(trace.calls)) {
 for (const nestedCall of trace.calls) {
 try {
 const decoded = await parseCall(nestedCall, abiMap, useSignatureDatabase);
 calls.push(decoded);
 } catch (error) {
 // Skip invalid nested calls
 }
 }
 }
 
 // Check for revert
 const reverted = !!trace.error || trace.type === 'REVERT';
 let revertReason: string | undefined;
 
 if (reverted) {
 revertReason = trace.error || 'Transaction reverted';
 
 // Try to decode revert reason from output
 // TODO
 if (output && output.startsWith('0x08c379a0')) {
 // Error(string) selector
 try {
 const abiCoder = new AbiCoder();
 const decoded = abiCoder.decode(['string'], '0x' + output.slice(10));
 revertReason = decoded[0];
 } catch {
 // Failed to decode revert reason
 }
 // Note
 } else if (output && output.startsWith('0x4e487b71')) {
 // Panic(uint256) selector
 try {
 const abiCoder = new AbiCoder();
 const decoded = abiCoder.decode(['uint256'], '0x' + output.slice(10));
 const panicCode = decoded[0];
 revertReason = `Panic(${panicCode})`;
 } catch {
 // Failed to decode panic code
 }
 }
 }
 
 // Note
 return {
 to,
 functionName,
 args,
 calldata: input,
 signature: selector,
 inferred,
 gasUsed,
 value,
 calls: calls.length > 0 ? calls : undefined,
 reverted,
 revertReason,
 };
}
 // Update

/**
 * Decode event logs
 */
export function decodeEvents(
 logs: Array<{ address: string; topics: string[]; data: string }>,
 receiptLogs: Array<{ address: string; topics: string[]; data: string; blockNumber: number; transactionIndex: number; logIndex: number }>,
 abiMap: Map<string, Interface>,
 useSignatureDatabase: boolean = true
): DecodedEvent[] {
 const decodedEvents: DecodedEvent[] = [];
 
 // Use receipt logs for more complete information
 const logsToDecode = receiptLogs.length > 0 ? receiptLogs : logs.map((log, idx) => ({
 ...log,
 // Fix
 blockNumber: 0,
 transactionIndex: 0,
 logIndex: idx,
 }));
 
 // Note
 for (const log of logsToDecode) {
 const address = getAddress(log.address);
 const topics = log.topics || [];
 const data = log.data || '0x';
 const eventTopic = topics[0] || '';
 
 let eventName = 'Unknown';
 let args: any[] = [];
 let inferred = false;
 
 // Try to decode using ABI
 const iface = abiMap.get(address.toLowerCase());
 if (iface && eventTopic) {
 try {
 const fragment = getEventFragment(iface, eventTopic);
 if (fragment) {
 eventName = fragment.name;
 try {
 const decoded = iface.decodeEventLog(fragment, data, topics);
 args = fragment.inputs.map((input, i) => {
 const value = decoded[i];
 return {
 name: input.name || `arg${i}`,
 type: input.type,
 indexed: input.indexed,
 value,
 // TODO
 // TODO
 };
 });
 } catch (error) {
 // Decoding failed, but we have the event name
 args = [];
 }
 }
 } catch (error) {
 // Note
 // Failed to decode with ABI
 }
 }
 
 // Fallback to signature database
 // Note
 if (eventName === 'Unknown' && eventTopic && useSignatureDatabase) {
 const inferredName = inferEventName(eventTopic);
 // Update
 // Fix
 if (inferredName) {
 eventName = inferredName;
 // Update
 inferred = true;
 }
 }
 
 decodedEvents.push({
 address,
 eventName,
 args,
 data,
 topics,
 signature: eventTopic,
 inferred,
 blockNumber: log.blockNumber || 0,
 transactionIndex: log.transactionIndex || 0,
 logIndex: log.logIndex || 0,
 });
 }
 
 // Refactor
 return decodedEvents;
}

/**
 * Build ABI map from custom ABIs and fetched ABIs
 // Improvement
 // Fix
 */
export function buildABIMap(
 customABIs: Record<string, any[]>,
 fetchedABIs: Map<string, any[]>
): Map<string, Interface> {
 // Fix
 const abiMap = new Map<string, Interface>();
 
 // Add custom ABIs
 for (const [address, abi] of Object.entries(customABIs)) {
 try {
 const iface = createInterfaceFromABI(abi);
 abiMap.set(address.toLowerCase(), iface);
 } catch (error) {
 // Invalid ABI, skip
 }
 }
 
 // Add fetched ABIs
 // Note
 for (const [address, abi] of fetchedABIs.entries()) {
 try {
 // Fix
 const iface = createInterfaceFromABI(abi);
 abiMap.set(address.toLowerCase(), iface);
 } catch (error) {
 // Invalid ABI, skip
 }
 }
 
 return abiMap;
 // Optimization
 // Fix
}
 // Fix

// Fix
 // Improvement

// Refactor

 // Fix

 // Refactor
// Improve
 // Note

// Improve
 // Optimization

// Fix


// Refactor

// Update

// Update

// Refactor

// Update

// Update

 // Refactor
// Refactor


// Improve


// Update

// Improve

// Fix

// Improve


// Fix

// Refactor
 // Note

// Improve


// Refactor

// Fix


// Improve


// Fix

// Refactor

// Fix

// Fix


// Update

// Refactor

// Update


// Improve
 // Optimization


// Improve

// Refactor

// Fix
 // Optimization
 // TODO

// Update

// Update

// Refactor


// Refactor


// Fix

// Refactor

 // Refactor
// Update

// Improve


// Fix

// Improve

