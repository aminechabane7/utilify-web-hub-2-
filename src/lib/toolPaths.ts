export const toToolSlug = (value: string) =>
  value
    .replace(/\.tsx$/, "")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

export const normalizeToolPath = (path: string) => {
  const segments = path.split("/");
  const lastSegment = segments.at(-1);
  if (!lastSegment || segments.length < 4) return path;
  segments[segments.length - 1] = toToolSlug(lastSegment);
  return segments.join("/");
};
