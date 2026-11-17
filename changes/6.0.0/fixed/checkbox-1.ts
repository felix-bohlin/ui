import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Checkbox` and `Radio` show a red border when invalid and unchecked (`aria-invalid="true"` or `:user-invalid`), like Switch and TextField. Before, only a checked control turned red.',
} satisfies Change
