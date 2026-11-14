import { expect, type Page } from "@playwright/test"

const CONTROLS = [
  ":scope > .ui-button",
  ":scope > .ui-control-group",
  ":scope > .ui-select > .ui-field",
  ":scope > .ui-text-field > .ui-field",
  ":scope > :is(.ui-select, .ui-text-field):not(:has(> .ui-label))",
  ":scope > .ui-toggle-button",
  ":scope > .ui-toggle-group",
].join(", ")

export const measure = (page: Page) =>
  page.locator("[data-size]").evaluateAll((elements, selector) => {
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
      affixes: rows.flatMap(({ controlHeight, example, row, size }) =>
        [
          ...row.querySelectorAll<HTMLElement>(
            ":scope > .ui-textarea > .ui-field > :is(.ui-start, .ui-end)",
          ),
        ].map((part) => {
          const field = part.parentElement!
          const textarea = field.querySelector("textarea")!
          const style = getComputedStyle(textarea)
          const top = textarea.getBoundingClientRect().top
          const padding = parseFloat(style.paddingBlockStart)
          const lineBox = parseFloat(style.lineHeight) + padding * 2
          const center = top + lineBox / 2
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
            affix: `${example} ${size} > ${part.className}`,
            holds: nodes.map((node) => node.nodeName.toLowerCase()),
            contents: boxes.map((box) =>
              box.height > lineBox
                ? box.top - top
                : box.top + box.height / 2 - center,
            ),
            height: part.getBoundingClientRect().bottom - top,
            maxHeight: Math.max(
              parseFloat(controlHeight) -
                parseFloat(getComputedStyle(field).borderBlockStartWidth) * 2,
              ...boxes.map((box) => box.height),
            ),
          }
        }),
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
        const target = parseFloat(probe(row, "--ui-target-min-size", "default"))
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
  }, CONTROLS)

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

export const expectTextareaAffixes = (affixes: Measured["affixes"]) => {
  expect(
    affixes.filter(({ height, maxHeight }) => height > maxHeight + 0.5),
    "textarea affixes should be no taller than a one-line field or what they hold",
  ).toEqual([])
  expect(
    affixes.filter(({ contents }) =>
      contents.some((offset) => Math.abs(offset) > 0.5),
    ),
    "textarea affixes should center on the first line, or start at its top when taller",
  ).toEqual([])
}

export const expectSizedRows = async (page: Page) => {
  const { affixes, chips, rows } = await measure(page)
  expectSharedHeights(rows)
  expectChipHeights(chips)
  expectTextareaAffixes(affixes)
}
