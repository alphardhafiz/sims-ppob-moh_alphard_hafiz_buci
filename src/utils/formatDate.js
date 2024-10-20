export default function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  };
  const formatter = new Intl.DateTimeFormat("id-ID", options);
  const parts = formatter.formatToParts(date);

  const monthDay = parts
    .filter((part) => ["month", "day"].includes(part.type))
    .map((part) => part.value)
    .join(" ");
  const year = parts.find((part) => part.type === "year").value;
  const time = parts
    .filter((part) => ["hour", "minute"].includes(part.type))
    .map((part) => part.value)
    .join(":");

  return `${monthDay} ${year} • ${time} WIB`;
}
