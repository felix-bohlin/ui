import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Drawer` `--_block-size` sets the height of a top or bottom drawer up to the full viewport, instead of stopping at 80%. Its default, `min(80dvb, 650px)`, keeps that cap.",
} satisfies Change
