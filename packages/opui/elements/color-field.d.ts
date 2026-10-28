export type Oklch = { C: number; H: number; L: number; alpha: number }

export declare const INVALID_TEXT: string

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

export declare function parseOklch(value: string): Oklch | null

export declare function readColor(text: string): Oklch | null

export declare class ColorField extends HTMLElement {
  copy(source?: HTMLElement): Promise<boolean>
  pick(): Promise<string | null>
  readonly input: HTMLInputElement | null
  value: string
}
