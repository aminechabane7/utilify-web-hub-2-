// TypeScript: ASCII to Text Converter

export function asciiToText(ascii: string): string {
  return ascii
    .split(' ')
    .map(code => String.fromCharCode(parseInt(code, 10)))
    .join('');
}

// Example usage:
// console.log(asciiToText("72 101 108 108 111"));
