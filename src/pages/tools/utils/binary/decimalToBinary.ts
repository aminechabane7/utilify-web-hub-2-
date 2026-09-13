// TypeScript: Decimal to Binary Converter

export function decimalToBinary(decimal: string): string {
  return decimal
    .split(' ')
    .map(num => parseInt(num, 10).toString(2))
    .join(' ');
}

// Example usage:
// console.log(decimalToBinary("72 101 108 108 111"));
