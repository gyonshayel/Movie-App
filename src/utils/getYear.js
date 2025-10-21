export function getYear(dateString) {
  if (!dateString) return "N/A";
  const year = new Date(dateString).getFullYear();
  return year;
}
