import type { ComponentProps, ReactNode } from "react"
import type { Snippet } from "svelte"
import type { IntrinsicElementAttributes, Slot } from "vue"
import { expectTypeOf, test } from "vitest"
import type * as AvatarReact from "../../packages/opui/components/Avatar/types.react"
import type * as AvatarVue from "../../packages/opui/components/Avatar/types.vue-props"
import type * as BadgeReact from "../../packages/opui/components/Badge/types.react"
import type * as BadgeSvelte from "../../packages/opui/components/Badge/types.svelte"
import type * as BadgeVue from "../../packages/opui/components/Badge/types.vue-props"
import type * as FieldLegendVue from "../../packages/opui/components/FieldLegend/types.vue-props"
import type * as NumberFieldReact from "../../packages/opui/components/NumberField/types.react"
import type * as NumberFieldVue from "../../packages/opui/components/NumberField/types.vue-props"
import type * as RangeReact from "../../packages/opui/components/Range/types.react"
import type * as RangeSvelte from "../../packages/opui/components/Range/types.svelte"
import type * as SwitchReact from "../../packages/opui/components/Switch/types.react"
import type * as SwitchSvelte from "../../packages/opui/components/Switch/types.svelte"
import type * as SwitchVue from "../../packages/opui/components/Switch/types.vue-props"
import type * as TabsReact from "../../packages/opui/components/Tabs/types.react"
import type * as TabsSvelte from "../../packages/opui/components/Tabs/types.svelte"
import type * as TabsVue from "../../packages/opui/components/Tabs/types.vue-props"
import type * as TextareaReact from "../../packages/opui/components/Textarea/types.react"
import type * as TextareaSvelte from "../../packages/opui/components/Textarea/types.svelte"
import type * as TextareaVue from "../../packages/opui/components/Textarea/types.vue-props"
import type * as ToggleButtonVue from "../../packages/opui/components/ToggleButton/types.vue-props"
import type * as ToggleGroupReact from "../../packages/opui/components/ToggleGroup/types.react"
import type * as ToggleGroupSvelte from "../../packages/opui/components/ToggleGroup/types.svelte"
import type * as ToggleGroupVue from "../../packages/opui/components/ToggleGroup/types.vue-props"

type Multiple<T> = Extract<T, { multiple: true }>
type Single<T> = Exclude<T, { multiple: true }>

test("a string-or-slot prop takes the framework's slot type, and Vue keeps the string", () => {
  expectTypeOf<TextareaReact.Props["label"]>().toEqualTypeOf<ReactNode>()
  expectTypeOf<TextareaSvelte.Props["label"]>().toEqualTypeOf<
    string | Snippet | undefined
  >()
  expectTypeOf<TextareaVue.Props["label"]>().toEqualTypeOf<string | undefined>()
  expectTypeOf<TextareaVue.Slots["end-text"]>().toEqualTypeOf<
    Slot | undefined
  >()
  expectTypeOf<TextareaVue.Slots["default"]>().toEqualTypeOf<Slot | undefined>()
})

test("a slot without a string form is only the slot type", () => {
  expectTypeOf<BadgeReact.Props["indicator"]>().toEqualTypeOf<ReactNode>()
  expectTypeOf<BadgeSvelte.Props["indicator"]>().toEqualTypeOf<
    Snippet | undefined
  >()
  expectTypeOf<BadgeVue.Props>().not.toHaveProperty("indicator")
  expectTypeOf<BadgeVue.Slots["indicator"]>().toEqualTypeOf<Slot | undefined>()
})

test("a value model keeps the element's value in React and Svelte and declares it in Vue", () => {
  expectTypeOf<TextareaReact.Props["value"]>().toEqualTypeOf<
    ComponentProps<"textarea">["value"]
  >()
  expectTypeOf<TextareaSvelte.Props>().toHaveProperty("value")
  expectTypeOf<TextareaVue.Props["value"]>().toEqualTypeOf<string | undefined>()
  expectTypeOf<NumberFieldVue.Props["value"]>().toEqualTypeOf<
    number | string | undefined
  >()
})

test("a component without a default slot has no children, and a custom element root keeps the input's attributes", () => {
  expectTypeOf<NumberFieldReact.Props>().not.toHaveProperty("children")
  expectTypeOf<NumberFieldReact.Props>().not.toHaveProperty("type")
  expectTypeOf<NumberFieldReact.Props["step"]>().toEqualTypeOf<
    ComponentProps<"input">["step"]
  >()
  expectTypeOf<NumberFieldVue.Props["name"]>().toEqualTypeOf<
    IntrinsicElementAttributes["input"]["name"]
  >()
})

test("a checked model declares the Svelte bindables, also on the wrapper that forwards it", () => {
  expectTypeOf<SwitchSvelte.Props["checked"]>().toEqualTypeOf<
    boolean | undefined
  >()
  expectTypeOf<SwitchSvelte.Props["group"]>().toEqualTypeOf<
    (string | number)[] | undefined
  >()
  expectTypeOf<SwitchSvelte.SwitchInputProps["group"]>().toEqualTypeOf<
    (string | number)[] | undefined
  >()
  expectTypeOf<SwitchReact.Props["checked"]>().toEqualTypeOf<
    ComponentProps<"input">["checked"]
  >()
  expectTypeOf<SwitchReact.Props>().not.toHaveProperty("group")
  expectTypeOf<SwitchVue.SwitchInputProps["name"]>().toEqualTypeOf<
    IntrinsicElementAttributes["input"]["name"]
  >()
  expectTypeOf<SwitchVue.Slots["icon-checked"]>().toEqualTypeOf<
    Slot | undefined
  >()
})

test("a group takes defaultValue and onValueChange in React, a bound value in Svelte and nothing in Vue", () => {
  expectTypeOf<TabsReact.Props["value"]>().toEqualTypeOf<string | undefined>()
  expectTypeOf<TabsReact.Props["defaultValue"]>().toEqualTypeOf<
    string | undefined
  >()
  expectTypeOf<TabsReact.Props["onValueChange"]>().toEqualTypeOf<
    ((value: string) => void) | undefined
  >()
  expectTypeOf<TabsSvelte.Props["value"]>().toEqualTypeOf<string | undefined>()
  expectTypeOf<TabsVue.Props>().not.toHaveProperty("value")
  expectTypeOf<TabsVue.Props>().not.toHaveProperty("defaultValue")
  expectTypeOf<TabsVue.Props>().not.toHaveProperty("onValueChange")
})

test("a group's array value is tied to multiple in React and Svelte", () => {
  expectTypeOf<Single<ToggleGroupReact.Props>["value"]>().toEqualTypeOf<
    string | undefined
  >()
  expectTypeOf<Multiple<ToggleGroupReact.Props>["value"]>().toEqualTypeOf<
    string[] | undefined
  >()
  expectTypeOf<
    Multiple<ToggleGroupReact.Props>["onValueChange"]
  >().toEqualTypeOf<((value: string[]) => void) | undefined>()
  expectTypeOf<
    Multiple<ToggleGroupReact.Props>["defaultValue"]
  >().toEqualTypeOf<string[] | undefined>()
  expectTypeOf<Single<ToggleGroupSvelte.Props>["value"]>().toEqualTypeOf<
    string | undefined
  >()
  expectTypeOf<Multiple<ToggleGroupSvelte.Props>["value"]>().toEqualTypeOf<
    string[] | undefined
  >()
  expectTypeOf<ToggleGroupVue.Props["multiple"]>().toEqualTypeOf<
    boolean | undefined
  >()
  expectTypeOf<ToggleGroupVue.Props>().not.toHaveProperty("value")
})

test("an Omit of keyof Base.Props leaves the component's own type for a prop the element also has", () => {
  expectTypeOf<RangeReact.Props["value"]>().toEqualTypeOf<
    number | string | undefined
  >()
  expectTypeOf<RangeSvelte.Props["value"]>().toEqualTypeOf<
    number | string | undefined
  >()
})

test("an item keeps the input's props and takes its Vue props from the input", () => {
  expectTypeOf<TabsReact.TabsItemProps["checked"]>().toEqualTypeOf<
    ComponentProps<"input">["checked"]
  >()
  expectTypeOf<TabsReact.TabsItemProps["onChange"]>().toEqualTypeOf<
    ComponentProps<"input">["onChange"]
  >()
  expectTypeOf<TabsReact.TabsItemProps>().not.toHaveProperty("type")
  expectTypeOf<TabsVue.TabsItemProps["checked"]>().toEqualTypeOf<
    boolean | undefined
  >()
  expectTypeOf<TabsVue.TabsItemProps["value"]>().toEqualTypeOf<
    IntrinsicElementAttributes["input"]["value"]
  >()
  expectTypeOf<ToggleButtonVue.Props["value"]>().toEqualTypeOf<
    IntrinsicElementAttributes["input"]["value"]
  >()
})

test("an attribute the base props require stays in React and falls through to the element in Vue", () => {
  expectTypeOf<{
    "aria-label": string
  }>().toExtend<AvatarReact.AvatarGroupProps>()
  expectTypeOf<{}>().not.toExtend<AvatarReact.AvatarGroupProps>()
  expectTypeOf<AvatarVue.AvatarGroupProps>().not.toHaveProperty("aria-label")
  expectTypeOf<AvatarVue.AvatarGroupProps>().not.toHaveProperty(
    "aria-labelledby",
  )
})

test("an attribute a component with several elements reads takes each element's type in Vue", () => {
  expectTypeOf<FieldLegendVue.Props["id"]>().toEqualTypeOf<
    | IntrinsicElementAttributes["legend"]["id"]
    | IntrinsicElementAttributes["p"]["id"]
  >()
})
