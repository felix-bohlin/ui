export const seedChecked = (
  isChecked: () => boolean,
  check: (input: HTMLInputElement) => void,
) => {
  let seeded = false
  return (input: HTMLInputElement) => {
    const checked = isChecked()
    if (!seeded) {
      seeded = true
      if (input.checked !== input.defaultChecked) {
        if (input.checked || input.type === "checkbox") check(input)
        return
      }
    }
    input.checked = checked
  }
}
