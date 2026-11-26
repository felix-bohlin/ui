export const ratingOf = (
  max: number | string,
  value: number | string | undefined,
) => {
  const count = Number(max)
  const current = Number(value)
  return {
    count,
    current,
    max: Number.isFinite(count) ? count : undefined,
    stars: Array.from({ length: count }, (_, index) => index + 1),
    value: Number.isFinite(current) ? current : 0,
  }
}
