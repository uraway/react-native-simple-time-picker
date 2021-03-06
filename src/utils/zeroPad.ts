export const zeroPad = (num: number) => {
  if (num >= 0 && num <= 9) {
    return `0${num}`;
  }
  return num.toString();
};
