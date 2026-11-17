import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`opui-css` has a command: `npx opui-css skill` copies the agent skill into `.claude/skills/opui`, or into `<path>/opui` with `--dir <path>` for another agent's skills folder. It prints where it wrote and the package version, and refuses to replace an existing copy without `--force`.",
} satisfies Change
