import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`utils.css` hides an element with the `hidden` attribute whatever `display` its component sets, so a hidden `Button` or `TextField` no longer shows. `hidden="until-found"` keeps the browser\'s behavior.',
} satisfies Change
