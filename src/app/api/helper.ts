//for storing reusable logic
// We should have features files that contains api communication logic

export const compare = (a: number, b: number) => {
  if (a > b) return 1;
  if (a < b) return -1;
  else return 0;
};
