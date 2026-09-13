// TypeScript: Binary to ASCII Converter

export function binaryToAscii(binary: string): string {
  return binary
    .split(' ')
    .map(bin => parseInt(bin, 2).toString(10))
    .join(' ');
}

// Example usage:
// console.log(binaryToAscii("01001000 01100101 01101100 01101100 01101111"));
