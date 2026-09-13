// TypeScript: Octal to Text Converter

export function octalToText(octal: string): string {
  return octal
    .split(' ')
    .map(num => String.fromCharCode(parseInt(num, 8)))
    .join('');
}

// Example usage:
// console.log(octalToText("110 145 154 154 157"));
