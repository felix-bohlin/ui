export const toggleInGroup = <T>(group: T[], value: T, on: boolean) =>
  on ? [...group, value] : group.filter((item) => item !== value)
