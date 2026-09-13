// TypeScript: Decimal to Text Converter

export function decimalToText(decimal: string): string {
  return decimal
    .split(' ')
    .map(num => String.fromCharCode(parseInt(num, 10)))
    .join('');
}

// Example usage:
// console.log(decimalToText("72 101 108 108 111"));
