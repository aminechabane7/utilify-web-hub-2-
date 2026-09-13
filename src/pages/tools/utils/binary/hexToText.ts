// TypeScript: HEX to Text Converter

export function hexToText(hex: string): string {
  return hex
    .replace(/\s+/g, '')
    .match(/.{1,2}/g)
    ?.map(byte => String.fromCharCode(parseInt(byte, 16)))
    .join('') || '';
}

// Example usage:
// console.log(hexToText("48 65 6C 6C 6F"));
