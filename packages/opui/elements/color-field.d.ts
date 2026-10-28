export type Oklch = { C: number; H: number; L: number; alpha: number }

export type ColorSpace =
  | "a98-rgb"
  | "display-p3"
  | "hex"
  | "hsl"
  | "hwb"
  | "lab"
  | "lch"
  | "oklab"
  | "oklch"
  | "prophoto-rgb"
  | "rec2020"
  | "rgb"
  | "srgb-linear"
  | "xyz"
  | "xyz-d50"
  | "xyz-d65"

export type Coords = [number, number, number]

export declare const COLOR_SPACES: ColorSpace[]

export declare const INVALID_TEXT: string

export declare function formatColor(
  space: ColorSpace,
  coords: Coords,
  alpha?: number,
): string

export declare function fromSpace(space: ColorSpace, coords: Coords): Coords

export declare function gamutMap(
  space:
    | "a98-rgb"
    | "display-p3"
    | "prophoto-rgb"
    | "rec2020"
    | "srgb"
    | "srgb-linear",
  oklch: Coords,
): Coords

export declare function formatOklch(
  color: { C: number; H: number; L: number },
  alpha?: number,
): string

export declare function oklchGamut(
  L: number,
  C: number,
  H: number,
): "p3" | "srgb" | "wide"

export declare function oklchToLinearSrgb(
  L: number,
  C: number,
  H: number,
): [number, number, number]

export declare function parseColor(
  text: string,
): { alpha: number; coords: Coords; space: ColorSpace } | null

export declare function parseOklch(value: string): Oklch | null

export declare function readColor(text: string): Oklch | null

export declare function toSpace(
  space: ColorSpace,
  oklch: Coords,
  previous?: Coords,
): Coords

export declare class ColorField extends HTMLElement {
  copy(source?: HTMLElement): Promise<boolean>
  pick(): Promise<string | null>
  readonly input: HTMLInputElement | null
  value: string
}
