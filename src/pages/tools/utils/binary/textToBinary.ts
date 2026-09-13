// TypeScript: Text to Binary Converter

export function textToBinary(text: string): string {
  return text
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
}

// Example usage:
// console.log(textToBinary("Hello"));
