export function truncateTwoDecimals(num: number) {
  return Math.trunc(num * 100 + 1e-8) / 100;
}

export function transformToKm(num: number) {
  return truncateTwoDecimals(num / 1000);
}
