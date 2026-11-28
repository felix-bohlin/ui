export const toggleInGroup = <T>(group: T[], value: T, on: boolean) =>
  group.includes(value) === on
    ? group
    : on
      ? [...group, value]
      : group.filter((item) => item !== value)
