// TypeScript: Text to ASCII Converter

export function textToAscii(text: string): string {
  return text
    .split('')
    .map(char => char.charCodeAt(0).toString(10))
    .join(' ');
}

// Example usage:
// console.log(textToAscii("Hello"));
