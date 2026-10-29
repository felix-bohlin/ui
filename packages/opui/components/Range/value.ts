export const resetValue = (input: HTMLInputElement) => {
  const probe = document.createElement("input")
  for (const name of ["type", "min", "max", "step", "value"]) {
    const value = input.getAttribute(name)
    if (value !== null) probe.setAttribute(name, value)
  }
  return probe.valueAsNumber
}

export const defaultValue = ({
  max,
  min,
  step,
}: {
  max?: number | string | null
  min?: number | string | null
  step?: number | string | null
}) => {
  const minValue = Number(min ?? 0)
  const maxValue = Math.max(minValue, Number(max ?? 100))
  const stepValue = step === "any" ? 0 : Number(step ?? 1)
  const middle = minValue + (maxValue - minValue) / 2
  if (!stepValue) return middle
  const stepped =
    minValue + Math.round((middle - minValue) / stepValue) * stepValue
  return stepped > maxValue ? stepped - stepValue : stepped
}
