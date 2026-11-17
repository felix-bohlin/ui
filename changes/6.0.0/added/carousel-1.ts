import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Carousel` takes an `aspectRatio` prop that crops media, like `--_media-aspect-ratio`.",
  notes: {
    carousel: {
      ...components(
        `<a href="#images">Images</a> are cropped with the <code>aspectRatio</code> prop.`,
      ),
      html: `<a href="#images">Images</a> are cropped with <code>--_media-aspect-ratio</code>.`,
    },
  },
} satisfies Change
