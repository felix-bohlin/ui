import type {
  ComponentProps as SolidComponentProps,
  JSX as SolidJSX,
} from "@solidjs/web"
import type { ComponentProps, ReactNode } from "react"
import type { Snippet } from "svelte"
import type { IntrinsicElementAttributes, Slot } from "vue"
import { expectTypeOf, test } from "vitest"
import type * as AvatarReact from "../../packages/opui/components/Avatar/types.react"
import type * as AvatarVue from "../../packages/opui/components/Avatar/types.vue-props"
import type * as BadgeReact from "../../packages/opui/components/Badge/types.react"
import type * as BadgeSvelte from "../../packages/opui/components/Badge/types.svelte"
import type * as BadgeVue from "../../packages/opui/components/Badge/types.vue-props"
import type * as CalloutAstro from "../../packages/opui/components/Callout/types.astro"
import type * as CalloutReact from "../../packages/opui/components/Callout/types.react"
import type * as CalloutSolid from "../../packages/opui/components/Callout/types.solid"
import type * as CalloutSvelte from "../../packages/opui/components/Callout/types.svelte"
import type * as CalloutVue from "../../packages/opui/components/Callout/types.vue-props"
import type * as CarouselAstro from "../../packages/opui/components/Carousel/types.astro"
import type * as CarouselReact from "../../packages/opui/components/Carousel/types.react"
import type * as CarouselSolid from "../../packages/opui/components/Carousel/types.solid"
import type * as CarouselSvelte from "../../packages/opui/components/Carousel/types.svelte"
import type * as DialogAstro from "../../packages/opui/components/Dialog/types.astro"
import type * as DialogReact from "../../packages/opui/components/Dialog/types.react"
import type * as DialogSolid from "../../packages/opui/components/Dialog/types.solid"
import type * as DialogSvelte from "../../packages/opui/components/Dialog/types.svelte"
import type * as DialogVue from "../../packages/opui/components/Dialog/types.vue-props"
import type * as DrawerAstro from "../../packages/opui/components/Drawer/types.astro"
import type * as DrawerReact from "../../packages/opui/components/Drawer/types.react"
import type * as DrawerSolid from "../../packages/opui/components/Drawer/types.solid"
import type * as DrawerSvelte from "../../packages/opui/components/Drawer/types.svelte"
import type * as DrawerVue from "../../packages/opui/components/Drawer/types.vue-props"
import type * as FieldLegendVue from "../../packages/opui/components/FieldLegend/types.vue-props"
import type * as MenuReact from "../../packages/opui/components/Menu/types.react"
import type * as MenuSvelte from "../../packages/opui/components/Menu/types.svelte"
import type * as MenuVue from "../../packages/opui/components/Menu/types.vue-props"
import type * as NumberFieldReact from "../../packages/opui/components/NumberField/types.react"
import type * as NumberFieldVue from "../../packages/opui/components/NumberField/types.vue-props"
import type * as OneTimeCodeAstro from "../../packages/opui/components/OneTimeCode/types.astro"
import type * as OneTimeCodeReact from "../../packages/opui/components/OneTimeCode/types.react"
import type * as OneTimeCodeSolid from "../../packages/opui/components/OneTimeCode/types.solid"
import type * as OneTimeCodeSvelte from "../../packages/opui/components/OneTimeCode/types.svelte"
import type * as OneTimeCodeVue from "../../packages/opui/components/OneTimeCode/types.vue-props"
import type * as RangeReact from "../../packages/opui/components/Range/types.react"
import type * as RangeSvelte from "../../packages/opui/components/Range/types.svelte"
import type * as RatingReact from "../../packages/opui/components/Rating/types.react"
import type * as RatingSolid from "../../packages/opui/components/Rating/types.solid"
import type * as RatingSvelte from "../../packages/opui/components/Rating/types.svelte"
import type * as RatingVue from "../../packages/opui/components/Rating/types.vue-props"
import type * as SelectSolid from "../../packages/opui/components/Select/types.solid"
import type { SortDetail } from "../../packages/opui/components/SortableTable/types"
import type * as SortableTableSolid from "../../packages/opui/components/SortableTable/types.solid"
import type * as SortableTableSvelte from "../../packages/opui/components/SortableTable/types.svelte"
import type * as SwitchReact from "../../packages/opui/components/Switch/types.react"
import type * as SwitchSvelte from "../../packages/opui/components/Switch/types.svelte"
import type * as SwitchVue from "../../packages/opui/components/Switch/types.vue-props"
import type * as TabsReact from "../../packages/opui/components/Tabs/types.react"
import type * as TabsSolid from "../../packages/opui/components/Tabs/types.solid"
import type * as TabsSvelte from "../../packages/opui/components/Tabs/types.svelte"
import type * as TabsVue from "../../packages/opui/components/Tabs/types.vue-props"
import type * as TextareaReact from "../../packages/opui/components/Textarea/types.react"
import type * as TextareaSvelte from "../../packages/opui/components/Textarea/types.svelte"
import type * as TextareaVue from "../../packages/opui/components/Textarea/types.vue-props"
import type * as TextFieldAstro from "../../packages/opui/components/TextField/types.astro"
import type * as TextFieldReact from "../../packages/opui/components/TextField/types.react"
import type * as TextFieldSolid from "../../packages/opui/components/TextField/types.solid"
import type * as TextFieldSvelte from "../../packages/opui/components/TextField/types.svelte"
import type * as TextFieldVue from "../../packages/opui/components/TextField/types.vue-props"
import type * as ToggleButtonVue from "../../packages/opui/components/ToggleButton/types.vue-props"
import type * as ToggleGroupReact from "../../packages/opui/components/ToggleGroup/types.react"
import type * as ToggleGroupSolid from "../../packages/opui/components/ToggleGroup/types.solid"
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

test("a radio group takes defaultValue and onValueChange in React like a group, a bound value in Svelte and nothing in Vue", () => {
  expectTypeOf<RatingReact.Props["value"]>().toEqualTypeOf<
    number | string | undefined
  >()
  expectTypeOf<RatingReact.Props["defaultValue"]>().toEqualTypeOf<
    number | string | undefined
  >()
  expectTypeOf<RatingReact.Props["onValueChange"]>().toEqualTypeOf<
    ((value: number | string) => void) | undefined
  >()
  expectTypeOf<RatingSvelte.Props["value"]>().toEqualTypeOf<
    number | string | undefined
  >()
  expectTypeOf<RatingVue.Props>().not.toHaveProperty("defaultValue")
  expectTypeOf<RatingVue.Props>().not.toHaveProperty("onValueChange")
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

test("props built from an Omit of Base.Props still take the slots", () => {
  expectTypeOf<MenuReact.Props["iconChecked"]>().toEqualTypeOf<
    ReactNode | undefined
  >()
  expectTypeOf<MenuSvelte.Props["iconChecked"]>().toEqualTypeOf<
    Snippet | undefined
  >()
  expectTypeOf<MenuVue.Slots["icon-checked"]>().toEqualTypeOf<
    Slot | undefined
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

test("an event is on<Event> in React, on<event> in Svelte and an emit in Vue, with the element's event object", () => {
  expectTypeOf<CalloutReact.Props["onDismiss"]>().toEqualTypeOf<
    ((event: Event) => void) | undefined
  >()
  expectTypeOf<CalloutSvelte.Props["ondismiss"]>().toEqualTypeOf<
    ((event: Event) => void) | undefined
  >()
  expectTypeOf<CalloutVue.Props>().not.toHaveProperty("onDismiss")
  expectTypeOf<CalloutVue.Emits["dismiss"]>().toEqualTypeOf<[event: Event]>()
  expectTypeOf<SortableTableSvelte.Props["onsort"]>().toEqualTypeOf<
    ((event: CustomEvent<SortDetail>) => void) | undefined
  >()
})

test("Solid types a slot as JSX.Element, keeps the element's value, and takes defaultValue and onValueChange on a group and a radio group like React", () => {
  expectTypeOf<TextFieldSolid.Props["endText"]>().toEqualTypeOf<
    SolidJSX.Element | undefined
  >()
  expectTypeOf<TextFieldSolid.Props["value"]>().toEqualTypeOf<
    SolidComponentProps<"input">["value"]
  >()
  expectTypeOf<TextFieldSolid.Props["defaultValue"]>().toEqualTypeOf<
    SolidComponentProps<"input">["defaultValue"]
  >()
  expectTypeOf<TabsSolid.Props["defaultValue"]>().toEqualTypeOf<
    string | undefined
  >()
  expectTypeOf<Single<ToggleGroupSolid.Props>["onValueChange"]>().toEqualTypeOf<
    ((value: string) => void) | undefined
  >()
  expectTypeOf<Multiple<ToggleGroupSolid.Props>["value"]>().toEqualTypeOf<
    string[] | undefined
  >()
  expectTypeOf<
    Multiple<ToggleGroupSolid.Props>["defaultValue"]
  >().toEqualTypeOf<string[] | undefined>()
  expectTypeOf<RatingSolid.Props["defaultValue"]>().toEqualTypeOf<
    number | string | undefined
  >()
  expectTypeOf<RatingSolid.Props["onValueChange"]>().toEqualTypeOf<
    ((value: number | string) => void) | undefined
  >()
})

test("Solid gives a select its own defaultValue, an item the input's props, and an event on<Event> with the element's event object", () => {
  expectTypeOf<SelectSolid.Props["defaultValue"]>().toEqualTypeOf<
    string | number | (string | number)[] | undefined
  >()
  expectTypeOf<TabsSolid.TabsItemProps["defaultChecked"]>().toEqualTypeOf<
    SolidComponentProps<"input">["defaultChecked"]
  >()
  expectTypeOf<TabsSolid.TabsItemProps["onChange"]>().toEqualTypeOf<
    SolidComponentProps<"input">["onChange"]
  >()
  expectTypeOf<TabsSolid.TabsItemProps>().not.toHaveProperty("type")
  expectTypeOf<CalloutSolid.Props["onDismiss"]>().toEqualTypeOf<
    ((event: Event) => void) | undefined
  >()
  expectTypeOf<SortableTableSolid.Props["onSort"]>().toEqualTypeOf<
    ((event: CustomEvent<SortDetail>) => void) | undefined
  >()
})

type CloseButton<Header> = Header extends { closeButton: boolean }
  ? Header
  : never

test("the label, target and icon of a generated control need the boolean that adds it, whatever its value", () => {
  type EveryDrawerHeader = DrawerAstro.DrawerHeaderProps &
    DrawerReact.DrawerHeaderProps &
    DrawerSolid.DrawerHeaderProps &
    DrawerSvelte.DrawerHeaderProps &
    DrawerVue.DrawerHeaderProps
  type AnyDrawerHeader =
    | DrawerAstro.DrawerHeaderProps
    | DrawerReact.DrawerHeaderProps
    | DrawerSolid.DrawerHeaderProps
    | DrawerSvelte.DrawerHeaderProps
    | DrawerVue.DrawerHeaderProps
  type EveryDialogHeader = DialogAstro.DialogHeaderProps &
    DialogReact.DialogHeaderProps &
    DialogSolid.DialogHeaderProps &
    DialogSvelte.DialogHeaderProps &
    DialogVue.DialogHeaderProps
  type AnyDialogHeader =
    | DialogAstro.DialogHeaderProps
    | DialogReact.DialogHeaderProps
    | DialogSolid.DialogHeaderProps
    | DialogSvelte.DialogHeaderProps
    | DialogVue.DialogHeaderProps
  type EveryCallout = CalloutAstro.Props &
    CalloutReact.Props &
    CalloutSolid.Props &
    CalloutSvelte.Props &
    CalloutVue.Props
  type AnyCallout =
    | CalloutAstro.Props
    | CalloutReact.Props
    | CalloutSolid.Props
    | CalloutSvelte.Props
    | CalloutVue.Props
  type EveryTextField = TextFieldAstro.Props &
    TextFieldReact.Props &
    TextFieldSolid.Props &
    TextFieldSvelte.Props &
    TextFieldVue.Props
  type AnyTextField =
    | TextFieldAstro.Props
    | TextFieldReact.Props
    | TextFieldSolid.Props
    | TextFieldSvelte.Props
    | TextFieldVue.Props
  type EveryCarousel = CarouselAstro.Props &
    CarouselReact.Props &
    CarouselSolid.Props &
    CarouselSvelte.Props
  type AnyCarousel =
    | CarouselAstro.Props
    | CarouselReact.Props
    | CarouselSolid.Props
    | CarouselSvelte.Props

  expectTypeOf<{ closeLabel: string }>().not.toExtend<AnyDrawerHeader>()
  expectTypeOf<{ commandfor: string }>().not.toExtend<AnyDrawerHeader>()
  expectTypeOf<{
    closeButton: true
    closeLabel: string
    commandfor: string
  }>().toExtend<EveryDrawerHeader>()
  expectTypeOf<{
    closeButton: boolean
    closeLabel: string
    commandfor: string
  }>().toExtend<EveryDrawerHeader>()
  expectTypeOf<{ closeButton: boolean }>().toExtend<EveryDrawerHeader>()
  expectTypeOf<{}>().toExtend<EveryDrawerHeader>()

  expectTypeOf<{ closeLabel: string }>().not.toExtend<AnyDialogHeader>()
  expectTypeOf<{ commandfor: string }>().not.toExtend<AnyDialogHeader>()
  expectTypeOf<{
    closeButton: true
    closeLabel: string
    commandfor: string
  }>().toExtend<EveryDialogHeader>()
  expectTypeOf<{
    closeButton: boolean
    closeLabel: string
    commandfor: string
  }>().toExtend<EveryDialogHeader>()
  expectTypeOf<{ closeButton: boolean }>().toExtend<EveryDialogHeader>()
  expectTypeOf<{}>().toExtend<EveryDialogHeader>()

  expectTypeOf<{ closeLabel: string }>().not.toExtend<AnyCallout>()
  expectTypeOf<{
    closeButton: true
    closeLabel: string
  }>().toExtend<EveryCallout>()
  expectTypeOf<{
    closeButton: boolean
    closeLabel: string
  }>().toExtend<EveryCallout>()
  expectTypeOf<{ closeButton: boolean }>().toExtend<EveryCallout>()
  expectTypeOf<{}>().toExtend<EveryCallout>()

  expectTypeOf<{ passwordToggleLabel: string }>().not.toExtend<AnyTextField>()
  expectTypeOf<{
    passwordToggle: true
    passwordToggleLabel: string
  }>().toExtend<EveryTextField>()
  expectTypeOf<{
    passwordToggle: boolean
    passwordToggleLabel: string
  }>().toExtend<EveryTextField>()
  expectTypeOf<{ passwordToggle: boolean }>().toExtend<EveryTextField>()
  expectTypeOf<{}>().toExtend<EveryTextField>()

  expectTypeOf<{
    "aria-label": string
    markerLabel: string
  }>().not.toExtend<AnyCarousel>()
  expectTypeOf<{
    "aria-label": string
    markerLabel: string
    markers: true
  }>().toExtend<EveryCarousel>()
  expectTypeOf<{
    "aria-label": string
    markerLabel: string
    markers: boolean
  }>().toExtend<EveryCarousel>()
  expectTypeOf<{
    "aria-label": string
    markers: boolean
  }>().toExtend<EveryCarousel>()
  expectTypeOf<{ "aria-label": string }>().toExtend<EveryCarousel>()
})

test("a close icon needs closeButton where the icon is a prop, and stays a slot in Vue", () => {
  expectTypeOf<{
    closeIcon: ReactNode
  }>().not.toExtend<DrawerReact.DrawerHeaderProps>()
  expectTypeOf<{
    closeIcon: ReactNode
  }>().not.toExtend<DialogReact.DialogHeaderProps>()
  expectTypeOf<{ closeIcon: ReactNode }>().not.toExtend<CalloutReact.Props>()
  expectTypeOf<{
    closeIcon: SolidJSX.Element
  }>().not.toExtend<DrawerSolid.DrawerHeaderProps>()
  expectTypeOf<{
    closeIcon: SolidJSX.Element
  }>().not.toExtend<DialogSolid.DialogHeaderProps>()
  expectTypeOf<{
    closeIcon: SolidJSX.Element
  }>().not.toExtend<CalloutSolid.Props>()
  expectTypeOf<{
    closeIcon: Snippet
  }>().not.toExtend<DrawerSvelte.DrawerHeaderProps>()
  expectTypeOf<{
    closeIcon: Snippet
  }>().not.toExtend<DialogSvelte.DialogHeaderProps>()
  expectTypeOf<{ closeIcon: Snippet }>().not.toExtend<CalloutSvelte.Props>()
  expectTypeOf<
    CloseButton<DrawerReact.DrawerHeaderProps>["closeIcon"]
  >().toEqualTypeOf<ReactNode>()
  expectTypeOf<
    CloseButton<DialogSolid.DialogHeaderProps>["closeIcon"]
  >().toEqualTypeOf<SolidJSX.Element | undefined>()
  expectTypeOf<CloseButton<CalloutSvelte.Props>["closeIcon"]>().toEqualTypeOf<
    Snippet | undefined
  >()
  expectTypeOf<{
    closeButton: boolean
    closeIcon: ReactNode
  }>().toExtend<DrawerReact.DrawerHeaderProps>()
  expectTypeOf<{
    closeButton: boolean
    closeIcon: Snippet
  }>().toExtend<CalloutSvelte.Props>()
  expectTypeOf<DrawerVue.DrawerHeaderProps>().not.toHaveProperty("closeIcon")
  expectTypeOf<DrawerVue.DrawerHeaderSlots["close-icon"]>().toEqualTypeOf<
    Slot | undefined
  >()
})

test("an attribute the base props narrow keeps the narrow type, under the element's name in React", () => {
  type Autocomplete = "off" | "one-time-code" | undefined
  expectTypeOf<
    OneTimeCodeAstro.Props["autocomplete"]
  >().toEqualTypeOf<Autocomplete>()
  expectTypeOf<
    OneTimeCodeReact.Props["autoComplete"]
  >().toEqualTypeOf<Autocomplete>()
  expectTypeOf<OneTimeCodeReact.Props>().not.toHaveProperty("autocomplete")
  expectTypeOf<
    OneTimeCodeSolid.Props["autocomplete"]
  >().toEqualTypeOf<Autocomplete>()
  expectTypeOf<
    OneTimeCodeSvelte.Props["autocomplete"]
  >().toEqualTypeOf<Autocomplete>()
  expectTypeOf<
    OneTimeCodeVue.Props["autocomplete"]
  >().toEqualTypeOf<Autocomplete>()
})
