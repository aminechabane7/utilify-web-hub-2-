// TypeScript: Binary to Octal Converter

export function binaryToOctal(binary: string): string {
  return binary
    .split(' ')
    .map(bin => parseInt(bin, 2).toString(8))
    .join(' ');
}

// Example usage:
// console.log(binaryToOctal("01001000 01100101 01101100 01101100 01101111"));
