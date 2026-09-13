// TypeScript: Text to Octal Converter

export function textToOctal(text: string): string {
  return text
    .split('')
    .map(char => char.charCodeAt(0).toString(8))
    .join(' ');
}

// Example usage:
// console.log(textToOctal("Hello"));
