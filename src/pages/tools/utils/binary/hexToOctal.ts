// TypeScript: HEX to Octal Converter

export function hexToOctal(hex: string): string {
  return hex
    .replace(/\s+/g, '')
    .match(/.{1,2}/g)
    ?.map(byte => parseInt(byte, 16).toString(8))
    .join(' ') || '';
}

// Example usage:
// console.log(hexToOctal("48 65 6C 6C 6F"));
