// TypeScript: Octal to Decimal Converter

export function octalToDecimal(octal: string): string {
  return octal
    .split(' ')
    .map(num => parseInt(num, 8).toString(10))
    .join(' ');
}

// Example usage:
// console.log(octalToDecimal("110 145 154 154 157"));
