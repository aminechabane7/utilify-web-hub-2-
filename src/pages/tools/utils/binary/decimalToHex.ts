// TypeScript: Decimal to HEX Converter

export function decimalToHex(decimal: string): string {
  return decimal
    .split(' ')
    .map(num => parseInt(num, 10).toString(16).toUpperCase())
    .join(' ');
}

// Example usage:
// console.log(decimalToHex("72 101 108 108 111"));
