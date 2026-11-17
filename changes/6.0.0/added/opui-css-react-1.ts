import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`opui-css/react` exports React 19 components for every Astro and Vue component. Containers take parts, such as `CardHeader` and `DialogFooter`. Other slots are props (`children`, and camelCased names such as `endText`), form controls (`ToggleButton` and `TabsItem` too) take the native `value`/`defaultValue`, `checked`/`defaultChecked` and `onChange` props, a `TabsItem`, a `ToggleButton` and the stars of a `Rating` keep a choice made before the page hydrated and `onValueChange` on the `Tabs`, `ToggleGroup` or `Rating` is called with it, and components that need context, state or effects are marked `"use client"` so the rest also render as React Server Components. It ships compiled ES modules with `.d.ts` types, source maps and declaration maps, so Next.js and server rendering in Vite need no `transpilePackages` or `ssr.noExternal`, and `skipLibCheck` skips its types. `opui-css/components/<Name>/<Part>.react` imports one component or part from the same compiled files, so it shares context with the entry point. `react` and `react-dom` `^19` are optional peer dependencies.',
} satisfies Change
