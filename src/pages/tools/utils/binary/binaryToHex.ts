// TypeScript: Binary to HEX Converter

export function binaryToHex(binary: string): string {
  return binary
    .split(' ')
    .map(bin => parseInt(bin, 2).toString(16).padStart(2, '0').toUpperCase())
    .join(' ');
}

// Example usage:
// console.log(binaryToHex("01001000 01100101 01101100 01101100 01101111"));
