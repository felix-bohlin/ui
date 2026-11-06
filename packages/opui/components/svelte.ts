export const seedChecked = (isChecked: () => boolean, check: () => void) => {
  let seeded = false
  return (input: HTMLInputElement) => {
    const checked = isChecked()
    if (!seeded) {
      seeded = true
      if (input.checked !== input.defaultChecked) {
        if (input.checked) check()
        return
      }
    }
    input.checked = checked
  }
}
