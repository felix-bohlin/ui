import { expect, type Locator, type Page } from "@playwright/test"

const CONTROLS = [
  ":scope > .ui-button",
  ":scope > .ui-control-group",
  ":scope > .ui-select > .ui-field",
  ":scope > .ui-text-field > .ui-field",
  ":scope > :is(.ui-select, .ui-text-field):not(:has(> .ui-label))",
  ":scope > .ui-toggle-button",
  ":scope > .ui-toggle-group",
].join(", ")

/** Runs in the page: where a field's `.ui-start` or `.ui-end` puts what it holds. */
const affix = (part: HTMLElement, name: string) => {
  const field = part.parentElement!
  const control = field.querySelector<HTMLElement>(
    ":scope > :is(input, textarea)",
  )!
  const style = getComputedStyle(control)
  const top = control.getBoundingClientRect().top
  const lineBox =
    parseFloat(style.lineHeight) + parseFloat(style.paddingBlockStart) * 2
  const center = top + lineBox / 2
  const border = parseFloat(getComputedStyle(field).borderBlockStartWidth)
  const fieldBox = field.getBoundingClientRect()
  const inner = { bottom: fieldBox.bottom - border, top: fieldBox.top + border }
  const inset = parseFloat(getComputedStyle(part).paddingBlockStart)
  const probe = document.createElement("div")
  probe.style.blockSize = "var(--_size)"
  probe.style.position = "absolute"
  field.parentElement!.append(probe)
  const size = probe.getBoundingClientRect().height
  probe.remove()
  const textarea = control.localName === "textarea"
  const nodes = [...part.childNodes].filter(
    (node) => node instanceof Element || node.textContent!.trim(),
  )
  const boxes = nodes.map((node) => {
    if (node instanceof Element) return node.getBoundingClientRect()
    const line = document.createElement("span")
    line.style.display = "inline-block"
    node.replaceWith(line)
    line.append(node)
    const box = line.getBoundingClientRect()
    line.replaceWith(node)
    return box
  })
  return {
    affix: `${name} > ${field.parentElement!.classList[0]} ${part.className}`,
    contents: boxes.map((box, index) =>
      textarea &&
      nodes[index] instanceof Element &&
      box.height > lineBox - inset * 2 + 0.5
        ? box.top - inner.top - inset
        : box.top + box.height / 2 - center,
    ),
    gaps: boxes.map((box) =>
      Math.min(box.top - inner.top, inner.bottom - box.bottom),
    ),
    height: part.getBoundingClientRect().height,
    holds: nodes.map((node) => node.nodeName.toLowerCase()),
    inset,
    maxHeight: Math.max(
      size - border * 2,
      lineBox,
      ...boxes.map((box) => box.height + inset * 2),
    ),
  }
}

const AFFIX = `(${affix})`

/** Where each `.ui-start` and `.ui-end` the locator matches puts what it holds. */
export const measureAffixes = (parts: Locator) =>
  parts.evaluateAll((elements, source) => {
    const measureAffix = new Function(`return ${source}`)() as typeof affix
    return elements.map((part) =>
      measureAffix(
        part as HTMLElement,
        part.closest("[data-example]")!.getAttribute("data-example")!,
      ),
    )
  }, AFFIX)

export const measure = (page: Page) =>
  page.locator("[data-size]").evaluateAll(
    (elements, { selector, source }) => {
      const measureAffix = new Function(`return ${source}`)() as typeof affix
      const SIZES = ["x-small", "small", "default", "large"]
      const probe = (row: Element, token: string, size: string) => {
        const element = document.createElement("div")
        element.style.blockSize = `var(${size === "default" ? token : `${token}-${size}`})`
        element.style.position = "absolute"
        row.append(element)
        const height = `${element.getBoundingClientRect().height}px`
        element.remove()
        return height
      }
      const rows = elements.map((row) => {
        const size = row.getAttribute("data-size")!
        return {
          controlHeight: probe(row, "--ui-control-size", size),
          example: row.closest("[data-example]")!.getAttribute("data-example"),
          row,
          size,
        }
      })
      return {
        affixes: rows.flatMap(({ example, row, size }) =>
          [
            ...row.querySelectorAll<HTMLElement>(
              ":scope > :is(.ui-text-field, .ui-textarea) > .ui-field > :is(.ui-start, .ui-end)",
            ),
          ].map((part) => measureAffix(part, `${example} ${size}`)),
        ),
        chips: rows.flatMap(({ controlHeight, example, row, size }) =>
          [...row.querySelectorAll<HTMLElement>(":scope > .ui-chip")].map(
            (chip) => {
              const chipSize =
                SIZES.find((name) => chip.classList.contains(`ui-${name}`)) ??
                "default"
              return {
                chip: `${example} ${size} > ${chip.className} "${chip.textContent!.trim()}"`,
                controlHeight,
                expected: probe(row, "--ui-chip-size", chipSize),
                height: `${chip.getBoundingClientRect().height}px`,
                matchesControl:
                  SIZES.indexOf(chipSize) === SIZES.indexOf(size) + 1,
                size,
              }
            },
          ),
        ),
        rows: rows.map(({ controlHeight, example, row, size }) => {
          const target = parseFloat(
            probe(row, "--ui-target-min-size", "default"),
          )
          return {
            controls: [...row.querySelectorAll<HTMLElement>(selector)].map(
              (control) => {
                const field = control.matches(".ui-field")
                  ? control
                  : control.querySelector(":scope > .ui-field")
                const button = field?.querySelector(
                  ":scope > :is(.ui-start, .ui-end) > .ui-button",
                )
                const border = field
                  ? parseFloat(getComputedStyle(field).borderBlockStartWidth)
                  : 0
                return {
                  button: Boolean(button),
                  control: `${control.parentElement!.className} > ${control.className}`,
                  expected: button
                    ? `${Math.max(parseFloat(controlHeight), target + border * 2)}px`
                    : controlHeight,
                  height: `${control.getBoundingClientRect().height}px`,
                }
              },
            ),
            expected: controlHeight,
            row: `${example} ${size}`,
            size,
          }
        }),
      }
    },
    { selector: CONTROLS, source: AFFIX },
  )

type Measured = Awaited<ReturnType<typeof measure>>

export const expectSharedHeights = (rows: Measured["rows"]) => {
  expect(rows.length).toBeGreaterThan(0)
  for (const { controls, expected, row } of rows) {
    expect(controls.length, row).toBeGreaterThan(0)
    expect(
      controls.filter((control) => control.height !== control.expected),
      `${row} should be ${expected}, or the target size and borders for a field with a button`,
    ).toEqual([])
  }
}

export const expectChipHeights = (chips: Measured["chips"]) => {
  expect(
    chips.filter(({ expected, height }) => height !== expected),
    "chips should match their chip size token",
  ).toEqual([])
  expect(
    chips.filter(
      ({ controlHeight, height, matchesControl }) =>
        matchesControl && height !== controlHeight,
    ),
    "chips one size step up should match the row's control size",
  ).toEqual([])
}

export const expectAffixes = (affixes: Measured["affixes"]) => {
  expect(
    affixes.filter(({ height, maxHeight }) => height > maxHeight + 0.5),
    "affixes should be no taller than the field, the line or what they hold and their inset",
  ).toEqual([])
  expect(
    affixes.filter(({ contents }) =>
      contents.some((offset) => Math.abs(offset) > 0.5),
    ),
    "affixes should center on the control's line, or in a textarea start their inset below the top when taller",
  ).toEqual([])
  expect(
    affixes.filter(({ gaps, inset }) => gaps.some((gap) => gap < inset - 0.5)),
    "affixes should keep their inset from the field's border",
  ).toEqual([])
}

export const expectSizedRows = async (page: Page) => {
  const { affixes, chips, rows } = await measure(page)
  expectSharedHeights(rows)
  expectChipHeights(chips)
  expectAffixes(affixes)
  expectAffixes(
    await measureAffixes(
      page.locator("[data-tall-affixes] .ui-field > :is(.ui-start, .ui-end)"),
    ),
  )
}
