export function getFormattedDate(initialDate) {
  return (
    initialDate.getDate() +
    "/" +
    (initialDate.getMonth() + 1) +
    "/" +
    initialDate.getFullYear()
  );
}
