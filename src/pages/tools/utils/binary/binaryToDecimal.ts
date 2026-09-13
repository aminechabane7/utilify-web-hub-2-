// TypeScript: Binary to Decimal Converter

export function binaryToDecimal(binary: string): string {
  return binary
    .split(' ')
    .map(bin => parseInt(bin, 2).toString(10))
    .join(' ');
}

// Example usage:
// console.log(binaryToDecimal("01001000 01100101 01101100 01101100 01101111"));
