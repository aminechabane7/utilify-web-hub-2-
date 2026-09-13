export function octalToHex(octal: string): string {
  const values = octal.trim().split(/\s+/).filter(Boolean);
  if (values.length === 0) return "";
  if (values.some((value) => !/^[0-7]+$/.test(value))) {
    throw new Error("Enter octal values using only digits 0 through 7.");
  }

  return values.map((value) => Number.parseInt(value, 8).toString(16).toUpperCase()).join(" ");
}
