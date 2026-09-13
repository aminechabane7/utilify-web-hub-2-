// TypeScript: Decimal to Octal Converter

export function decimalToOctal(decimal: string): string {
  return decimal
    .split(' ')
    .map(num => parseInt(num, 10).toString(8))
    .join(' ');
}

// Example usage:
// console.log(decimalToOctal("72 101 108 108 111"));
