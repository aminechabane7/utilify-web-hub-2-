// TypeScript: Text to HEX Converter

export function textToHex(text: string): string {
  return text
    .split('')
    .map(char => char.charCodeAt(0).toString(16).toUpperCase())
    .join(' ');
}

// Example usage:
// console.log(textToHex("Hello"));
