// TypeScript: Octal to Binary Converter

export function octalToBinary(octal: string): string {
  return octal
    .split(' ')
    .map(num => parseInt(num, 8).toString(2).padStart(8, '0'))
    .join(' ');
}

// Example usage:
// console.log(octalToBinary("110 145 154 154 157"));
