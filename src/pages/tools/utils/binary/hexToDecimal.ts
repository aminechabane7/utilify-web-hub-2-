// TypeScript: HEX to Decimal Converter

export function hexToDecimal(hex: string): string {
  return hex
    .replace(/\s+/g, '')
    .match(/.{1,2}/g)
    ?.map(byte => parseInt(byte, 16).toString(10))
    .join(' ') || '';
}

// Example usage:
// console.log(hexToDecimal("48 65 6C 6C 6F"));
