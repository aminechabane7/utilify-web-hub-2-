export function asciiToBinary(ascii: string): string {
  const values = ascii.trim().split(/\s+/).filter(Boolean);
  if (values.length === 0) return "";
  if (values.some((value) => !/^\d+$/.test(value) || Number(value) > 127)) {
    throw new Error("Enter ASCII decimal codes from 0 to 127, separated by spaces.");
  }

  return values.map((value) => Number.parseInt(value, 10).toString(2).padStart(8, "0")).join(" ");
}
