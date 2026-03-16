export const parseWeight = (value) => {
  if (!value) return 0;

  const match = value.toLowerCase().match(/(\d+\.?\d*)(kg|g|ml|l)/);

  if (!match) return 0;

  const num = parseFloat(match[1]);
  const unit = match[2];

  switch (unit) {
    case "kg":
      return num * 1000;
    case "g":
      return num;
    case "l":
      return num * 1000;
    case "ml":
      return num;
    default:
      return num;
  }
};