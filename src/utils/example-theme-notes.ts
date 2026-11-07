export const EXAMPLE_THEME_NOTES = {
  bootstrap: {
    description:
      "Its <code>oklch(0.578 0.228 260)</code> blue, gray secondary buttons, the danger, warning, info and success colors with the subtle alert palettes, <code>oklch(0.91 0.007 248)</code> borders, 38px controls, regular weight buttons, labels and links, 16px paragraph spacing with 8px under headings, 16px checks and 32px switches, solid blue selected items, the heading scale, 1.5 line height and the wide translucent focus ring. No shadow on dropdowns and modals.",
    original: "Bootstrap 5",
  },
  brutalist: {
    description:
      "Black 2px borders, hard 4px shadows on cards, dialogs and menus and on buttons that press into them on hover, with a state layer instead of a fill swap, filled in the main blue, white fields on the gray-blue page, the main blue also behind tooltips and selected items, black links, 500 weight body text and the 1.75 line height of Tailwind prose in rich text.",
    original: "neobrutalism",
  },
  govuk: {
    description:
      "Black text on white, the brand blue, regular weight links in the darker link blue and purple once visited, the error red and the success green as they are, 2px black field borders, square corners, green default buttons with a 2px bottom edge and gray secondary buttons that darken on hover, 40px checkboxes and radios that draw a black check and dot on white, with the gray hover ring, 19px body, label, hint and control text on 25px lines, the bold heading scale up to 48px, 15px to 20px paragraph spacing, headings spaced from their own size, 5px spacing steps, the 3px yellow focus ring on a black edge, 4px on checkboxes and radios, links and buttons that turn yellow with black text when focused, no shadows, and Arial, its font off GOV.UK. GOV.UK has no dark mode, so the theme swaps its black and white.",
    original: "GOV.UK Design System",
  },
  m3: {
    description:
      "The baseline purple scheme and its tinted surfaces, the error red, pill buttons with 24px padding that show 8% state layers and lift on hover, outlined ones in the outline gray, 12px cards, 28px dialogs, 4px menus and outlined fields, 8px chips, 18px checkboxes, on-surface text with on-surface-variant secondary text, primary tab labels, 52 by 32px switches, Roboto, the type scale, the emphasized easing and the 3px secondary focus ring over a 32% scrim.",
    original: "Material 3",
  },
  shadcn: {
    description:
      "Neutral grays, a near-black primary also behind tooltips, 36px controls with 14px text and 16px padding, 32px small and 40px large buttons, light borders with a faint shadow, the accent tint on hover instead of a fill, a 3px gray focus ring over a gray border, 16px checks with 4px corners, a 32px switch with a white thumb, 8px menus and chips, 10px dialogs and 14px cards with 24px padding, muted secondary text, 500 weight links and the 1.75 line height of Tailwind prose in rich text.",
    original: "shadcn/ui",
  },
}

export const exampleThemeNotes = (name: string) => {
  if (!Object.hasOwn(EXAMPLE_THEME_NOTES, name)) {
    throw new Error(
      `Describe packages/opui/themes/${name}.css in EXAMPLE_THEME_NOTES (src/utils/example-theme-notes.ts)`,
    )
  }
  return EXAMPLE_THEME_NOTES[name as keyof typeof EXAMPLE_THEME_NOTES]
}
