// TypeScript: HEX to Binary Converter

export function hexToBinary(hex: string): string {
  return hex
    .replace(/\s+/g, '')
    .match(/.{1,2}/g)
    ?.map(byte => parseInt(byte, 16).toString(2).padStart(8, '0'))
    .join(' ') || '';
}

// Example usage:
// console.log(hexToBinary("48 65 6C 6C 6F"));
