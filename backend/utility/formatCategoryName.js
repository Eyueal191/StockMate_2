export function formatCategoryName(str) {
  if (!str) return "";

  // Trim and collapse multiple spaces
  const cleaned = str.trim().replace(/\s+/g, " ");

  // Capitalize first letter
  const capitalized = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

  // Insert space before any capital letter except the first
  return capitalized.replace(/([A-Z])/g, (match, p1, offset) =>
    offset === 0 ? p1 : " " + p1
  );
}
