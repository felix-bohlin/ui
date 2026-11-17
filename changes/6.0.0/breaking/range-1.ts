import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Range` `--_track-fill` is gone: the track fill is a scroll-driven animation in CSS, which fills the track in Chromium and Safari without JavaScript, also in plain HTML. Remove any code that sets it.",
  migrating: ["range"],
} satisfies Change
