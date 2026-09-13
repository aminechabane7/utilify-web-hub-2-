// TypeScript: Binary to Text Converter

export function binaryToText(binary: string): string {
  return binary
    .split(' ')
    .map(bin => String.fromCharCode(parseInt(bin, 2)))
    .join('');
}

// Example usage:
// console.log(binaryToText("01001000 01100101 01101100 01101100 01101111"));
