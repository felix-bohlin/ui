import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`List` renders `role="list"`, unless it\'s passed another `role` such as `listbox`, so Safari keeps announcing a list without bullets as a list with its item count outside a `nav`.',
} satisfies Change
