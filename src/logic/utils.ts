export const toDate = (timestamp: number) => {
  let timeOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  return new Date(timestamp).toLocaleString("en", timeOptions);
};
