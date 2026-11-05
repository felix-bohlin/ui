export const withoutCodeVariants = <Example extends { name: string }>(
  examples: Example[],
) => {
  const names = new Set(examples.map((example) => example.name))
  return examples.filter(
    ({ name }) => !(name.endsWith("Code") && names.has(name.slice(0, -4))),
  )
}
