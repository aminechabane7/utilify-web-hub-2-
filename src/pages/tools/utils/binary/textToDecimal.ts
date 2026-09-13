// TypeScript: Text to Decimal Converter

export function textToDecimal(text: string): string {
  return text
    .split('')
    .map(char => char.charCodeAt(0).toString(10))
    .join(' ');
}

// Example usage:
// console.log(textToDecimal("Hello"));
