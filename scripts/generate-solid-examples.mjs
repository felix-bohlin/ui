/**
 * Generates Solid JSX example files for all components.
 * Run with: node scripts/generate-solid-examples.mjs
 */

import { mkdirSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const exDir = join(root, "src", "component-examples")

function write(dir, name, content) {
  const fullDir = join(exDir, dir)
  mkdirSync(fullDir, { recursive: true })
  writeFileSync(join(fullDir, `${name}.tsx`), content.trim() + "\n")
  console.log(`  ✓ ${dir}/${name}.tsx`)
}

// Common SVG icons used across examples
const InfoIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M16 13a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0v-9a1 1 0 0 1 1-1m0-2a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12s12-5.373 12-12S22.627 4 16 4"/></svg>`
const WarningIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M17.25 22a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M16 9a1 1 0 0 0-1 1v8a1 1 0 1 0 2 0v-8a1 1 0 0 0-1-1m-3.064-5.191c1.332-2.41 4.796-2.41 6.128 0l10.493 18.999C30.846 25.14 29.158 28 26.494 28H5.507c-2.665 0-4.352-2.86-3.064-5.192zm4.377.967a1.5 1.5 0 0 0-2.626 0L4.194 23.775A1.5 1.5 0 0 0 5.507 26h20.987a1.5 1.5 0 0 0 1.313-2.225z"/></svg>`
const CriticalIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="currentColor" d="M24 13c.69 0 1.25.56 1.25 1.25v12.5a1.25 1.25 0 1 1-2.5 0v-12.5c0-.69.56-1.25 1.25-1.25m0 21a2 2 0 1 0 0-4a2 2 0 0 0 0 4M4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24M24 6.5C14.335 6.5 6.5 14.335 6.5 24S14.335 41.5 24 41.5S41.5 33.665 41.5 24S33.665 6.5 24 6.5"/></svg>`
const MailIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"/></svg>`
const PlusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75"/></svg>`
const ChevronDownIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"/></svg>`
const CheckIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"/></svg>`
const StarIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"/></svg>`
const UserIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4S7.2 4.5 7.2 7.2S9.3 12 12 12m0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8"/></svg>`
const BusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.25 3A3.75 3.75 0 0 1 20 6.75v9a3.75 3.75 0 0 1-2.89 3.651l2.462 1.172a.75.75 0 0 1-.55 1.392l-.095-.038L13.83 19.5h-3.661l-5.097 2.427a.75.75 0 1 1-.645-1.354L6.89 19.4A3.75 3.75 0 0 1 4 15.75v-9A3.75 3.75 0 0 1 7.75 3zM8 15a1 1 0 1 0 0 2a1 1 0 0 0 0-2m8 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m.25-10.5h-8.5A2.25 2.25 0 0 0 5.5 6.75v5.75h13V6.75a2.25 2.25 0 0 0-2.25-2.25m-3 1.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5z"/></svg>`
const ExternalLinkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M7.75 5.5A2.25 2.25 0 0 0 5.5 7.75v16.5a2.25 2.25 0 0 0 2.25 2.25h16.5a2.25 2.25 0 0 0 2.25-2.25v-5a1.25 1.25 0 1 1 2.5 0v5A4.75 4.75 0 0 1 24.25 29H7.75A4.75 4.75 0 0 1 3 24.25V7.75A4.75 4.75 0 0 1 7.75 3h5a1.25 1.25 0 1 1 0 2.5zM18 4.25c0-.69.56-1.25 1.25-1.25h8.5c.69 0 1.25.56 1.25 1.25v8.5a1.25 1.25 0 1 1-2.5 0V7.268l-6.366 6.366a1.25 1.25 0 1 1-1.768-1.768L24.732 5.5H19.25c-.69 0-1.25-.56-1.25-1.25"/></svg>`
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis neque ante id justo."

console.log("Generating Solid component examples...\n")

// ─── ACCORDION ──────────────────────────────────────────────────────────────
write("accordion", "Basics", `
/* @jsxImportSource solid-js */
import { Accordion } from "opui-css/solid"

export default function Example() {
  return (
    <Accordion summary="Accordion">
      <p>${lorem}</p>
    </Accordion>
  )
}`)

write("accordion", "Variants", `
/* @jsxImportSource solid-js */
import { Accordion } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Accordion summary="Text"><p>${lorem.slice(0, 80)}</p></Accordion>
      <Accordion variant="elevated" summary="Elevated"><p>${lorem.slice(0, 80)}</p></Accordion>
      <Accordion variant="outlined" summary="Outlined"><p>${lorem.slice(0, 80)}</p></Accordion>
      <Accordion variant="tonal" summary="Tonal"><p>${lorem.slice(0, 80)}</p></Accordion>
    </>
  )
}`)

write("accordion", "Actions", `
/* @jsxImportSource solid-js */
import { Accordion, Button } from "opui-css/solid"

export default function Example() {
  return (
    <Accordion open variant="elevated" summary="Accordion with actions"
      actions={<><Button>Cancel</Button><Button>Agree</Button></>}>
      <p>${lorem.slice(0, 100)}</p>
    </Accordion>
  )
}`)

write("accordion", "Group", `
/* @jsxImportSource solid-js */
import { Accordion, Card } from "opui-css/solid"

export default function Example() {
  return (
    <Card variant="outlined" role="group">
      <Accordion summary="Accordion title"><p>${lorem.slice(0, 80)}</p></Accordion>
      <Accordion summary="Accordion title"><p>${lorem.slice(0, 80)}</p></Accordion>
      <Accordion summary="Accordion title"><p>${lorem.slice(0, 80)}</p></Accordion>
    </Card>
  )
}`)

write("accordion", "GroupSingle", `
/* @jsxImportSource solid-js */
import { Accordion, Card } from "opui-css/solid"

export default function Example() {
  return (
    <Card variant="outlined" role="group">
      <Accordion name="example-group" summary="Accordion title"><p>${lorem.slice(0, 80)}</p></Accordion>
      <Accordion name="example-group" summary="Accordion title"><p>${lorem.slice(0, 80)}</p></Accordion>
      <Accordion name="example-group" summary="Accordion title"><p>${lorem.slice(0, 80)}</p></Accordion>
    </Card>
  )
}`)

write("accordion", "CustomMarker", `
/* @jsxImportSource solid-js */
import { Accordion } from "opui-css/solid"

export default function Example() {
  return (
    <Accordion variant="outlined" summary="Custom marker"
      marker={${ChevronDownIcon}}>
      <p>${lorem}</p>
    </Accordion>
  )
}`)

// ─── ANCHOR ─────────────────────────────────────────────────────────────────
write("anchor", "AlwaysVisible", `
/* @jsxImportSource solid-js */
import { Anchor } from "opui-css/solid"

export default function Example() {
  return (
    <Anchor anchored={<span style="background: var(--surface-2); padding: var(--size-2) var(--size-3); border-radius: var(--radius-2); box-shadow: var(--shadow-3);">Floating content</span>}>
      <button>Hover me</button>
    </Anchor>
  )
}`)

write("anchor", "Hover", `
/* @jsxImportSource solid-js */
import { Anchor } from "opui-css/solid"

export default function Example() {
  return (
    <Anchor trigger="hover" id="anchor-hover"
      anchored={<span><div class="card elevated">Tooltip content</div></span>}>
      <button interestfor="anchor-hover" commandfor="anchor-hover" command="toggle-popover">Hover me</button>
    </Anchor>
  )
}`)

// ─── AVATAR ─────────────────────────────────────────────────────────────────
write("avatar", "Variants", `
/* @jsxImportSource solid-js */
import { Avatar } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Avatar variant="squared">SQ</Avatar>
      <Avatar variant="rounded" src="https://images.unsplash.com/photo-1616286608358-0e1b143f7d2f?q=80&w=200&auto=format&fit=crop" alt="Avatar" />
      <Avatar variant="squircle" src="https://plus.unsplash.com/premium_photo-1770631651199-d92007477b6f?q=80&w=200&auto=format&fit=crop" alt="Avatar" />
    </>
  )
}`)

write("avatar", "Letter", `
/* @jsxImportSource solid-js */
import { Avatar } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Avatar>AB</Avatar>
      <Avatar variant="rounded">CD</Avatar>
      <Avatar variant="squircle">EF</Avatar>
    </>
  )
}`)

write("avatar", "Icon", `
/* @jsxImportSource solid-js */
import { Avatar } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Avatar>${UserIcon}</Avatar>
      <Avatar variant="rounded">${UserIcon}</Avatar>
      <Avatar variant="squircle">${UserIcon}</Avatar>
    </>
  )
}`)

write("avatar", "Image", `
/* @jsxImportSource solid-js */
import { Avatar } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Avatar src="https://images.unsplash.com/photo-1616286608358-0e1b143f7d2f?q=80&w=200&auto=format&fit=crop" alt="Avatar" />
      <Avatar variant="rounded" src="https://images.unsplash.com/photo-1616286608358-0e1b143f7d2f?q=80&w=200&auto=format&fit=crop" alt="Avatar" />
      <Avatar variant="squircle" src="https://images.unsplash.com/photo-1616286608358-0e1b143f7d2f?q=80&w=200&auto=format&fit=crop" alt="Avatar" />
    </>
  )
}`)

write("avatar", "Grouped", `
/* @jsxImportSource solid-js */
import { Avatar } from "opui-css/solid"

export default function Example() {
  return (
    <div class="avatar-group">
      <Avatar src="https://images.unsplash.com/photo-1616286608358-0e1b143f7d2f?q=80&w=200&auto=format&fit=crop" alt="User 1" />
      <Avatar src="https://plus.unsplash.com/premium_photo-1770631651199-d92007477b6f?q=80&w=200&auto=format&fit=crop" alt="User 2" />
      <Avatar>AB</Avatar>
    </div>
  )
}`)

// ─── BADGE ──────────────────────────────────────────────────────────────────
write("badge", "Variants", `
/* @jsxImportSource solid-js */
import { Badge } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Badge label="5">${MailIcon}</Badge>
      <Badge dot>${MailIcon}</Badge>
    </>
  )
}`)

write("badge", "Color", `
/* @jsxImportSource solid-js */
import { Badge } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Badge color="critical" label="5">${MailIcon}</Badge>
      <Badge color="info" label="5">${MailIcon}</Badge>
      <Badge color="success" label="5">${MailIcon}</Badge>
      <Badge color="warning" label="5">${MailIcon}</Badge>
      <Badge color="neutral" label="5">${MailIcon}</Badge>
    </>
  )
}`)

write("badge", "Visibility", `
/* @jsxImportSource solid-js */
import { Badge } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Badge label="5" invisible>${MailIcon}</Badge>
      <Badge dot invisible>${MailIcon}</Badge>
    </>
  )
}`)

// ─── BUTTON ─────────────────────────────────────────────────────────────────
write("button", "Text", `
/* @jsxImportSource solid-js */
import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Button>Text</Button>
      <Button disabled>Disabled</Button>
      <Button href="#text">Link</Button>
    </>
  )
}`)

write("button", "Variants", `
/* @jsxImportSource solid-js */
import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <div class="example-row">
        <Button>Text</Button>
        <Button disabled>Disabled</Button>
        <Button href="#">Link</Button>
      </div>
      <div class="example-row">
        <Button variant="outlined">Outlined</Button>
        <Button variant="outlined" disabled>Disabled</Button>
        <Button variant="outlined" href="#">Link</Button>
      </div>
      <div class="example-row">
        <Button variant="tonal">Tonal</Button>
        <Button variant="tonal" disabled>Disabled</Button>
        <Button variant="tonal" href="#">Link</Button>
      </div>
      <div class="example-row">
        <Button variant="filled">Filled</Button>
        <Button variant="filled" disabled>Disabled</Button>
        <Button variant="filled" href="#">Link</Button>
      </div>
    </>
  )
}`)

write("button", "Sizes", `
/* @jsxImportSource solid-js */
import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <div class="example-row">
        <Button size="small">Small</Button>
        <Button>Default</Button>
        <Button size="large">Large</Button>
      </div>
      <div class="example-row">
        <Button variant="filled" size="small">Small</Button>
        <Button variant="filled">Default</Button>
        <Button variant="filled" size="large">Large</Button>
      </div>
    </>
  )
}`)

write("button", "Colors", `
/* @jsxImportSource solid-js */
import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <div class="example-row">
        <Button variant="filled" color="primary">Primary</Button>
        <Button variant="tonal" color="primary">Primary</Button>
        <Button variant="outlined" color="primary">Primary</Button>
      </div>
      <div class="example-row">
        <Button variant="filled" color="critical">Critical</Button>
        <Button variant="tonal" color="critical">Critical</Button>
        <Button variant="outlined" color="critical">Critical</Button>
      </div>
    </>
  )
}`)

write("button", "Disabled", `
/* @jsxImportSource solid-js */
import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Button disabled>Text</Button>
      <Button variant="outlined" disabled>Outlined</Button>
      <Button variant="tonal" disabled>Tonal</Button>
      <Button variant="filled" disabled>Filled</Button>
    </>
  )
}`)

write("button", "Outlined", `
/* @jsxImportSource solid-js */
import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Button variant="outlined">Button</Button>
      <Button variant="outlined" disabled>Disabled</Button>
      <Button variant="outlined" href="#">Link</Button>
    </>
  )
}`)

write("button", "Filled", `
/* @jsxImportSource solid-js */
import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Button variant="filled">Button</Button>
      <Button variant="filled" disabled>Disabled</Button>
      <Button variant="filled" href="#">Link</Button>
    </>
  )
}`)

write("button", "Tonal", `
/* @jsxImportSource solid-js */
import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Button variant="tonal">Button</Button>
      <Button variant="tonal" disabled>Disabled</Button>
      <Button variant="tonal" href="#">Link</Button>
    </>
  )
}`)

write("button", "IconAndLabel", `
/* @jsxImportSource solid-js */
import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Button variant="outlined">
        ${PlusIcon}
        Add item
      </Button>
      <Button variant="tonal">
        ${PlusIcon}
        Add item
      </Button>
      <Button variant="filled">
        ${PlusIcon}
        Add item
      </Button>
    </>
  )
}`)

write("button", "Keyboard", `
/* @jsxImportSource solid-js */
import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <Button variant="outlined">
      Save <kbd>Ctrl</kbd><kbd>S</kbd>
    </Button>
  )
}`)

// ─── BUTTON GROUP ────────────────────────────────────────────────────────────
write("button-group", "Variants", `
/* @jsxImportSource solid-js */
import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <div role="group" class="button-group">
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </div>
      <div role="group" class="button-group">
        <Button variant="outlined">Left</Button>
        <Button variant="outlined">Middle</Button>
        <Button variant="outlined">Right</Button>
      </div>
      <div role="group" class="button-group">
        <Button variant="tonal">Left</Button>
        <Button variant="tonal">Middle</Button>
        <Button variant="tonal">Right</Button>
      </div>
    </>
  )
}`)

write("button-group", "Colors", `
/* @jsxImportSource solid-js */
import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <div role="group" class="button-group">
        <Button variant="filled" color="primary">Left</Button>
        <Button variant="filled" color="primary">Middle</Button>
        <Button variant="filled" color="primary">Right</Button>
      </div>
      <div role="group" class="button-group">
        <Button variant="tonal" color="critical">Left</Button>
        <Button variant="tonal" color="critical">Middle</Button>
        <Button variant="tonal" color="critical">Right</Button>
      </div>
    </>
  )
}`)

write("button-group", "Disabled", `
/* @jsxImportSource solid-js */
import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <div role="group" class="button-group">
      <Button variant="outlined">Left</Button>
      <Button variant="outlined" disabled>Middle</Button>
      <Button variant="outlined">Right</Button>
    </div>
  )
}`)

write("button-group", "Size", `
/* @jsxImportSource solid-js */
import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <div role="group" class="button-group">
        <Button size="small" variant="outlined">Left</Button>
        <Button size="small" variant="outlined">Middle</Button>
        <Button size="small" variant="outlined">Right</Button>
      </div>
      <div role="group" class="button-group">
        <Button size="large" variant="outlined">Left</Button>
        <Button size="large" variant="outlined">Middle</Button>
        <Button size="large" variant="outlined">Right</Button>
      </div>
    </>
  )
}`)

write("button-group", "Vertical", `
/* @jsxImportSource solid-js */
import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <div role="group" class="button-group ui-vertical">
      <Button variant="outlined">Top</Button>
      <Button variant="outlined">Middle</Button>
      <Button variant="outlined">Bottom</Button>
    </div>
  )
}`)

write("button-group", "WithIcons", `
/* @jsxImportSource solid-js */
import { Button } from "opui-css/solid"

export default function Example() {
  return (
    <div role="group" class="button-group">
      <Button variant="outlined">${PlusIcon} Add</Button>
      <Button variant="outlined">${StarIcon} Favorite</Button>
    </div>
  )
}`)

// ─── CALLOUT ────────────────────────────────────────────────────────────────
write("callout", "Variants", `
/* @jsxImportSource solid-js */
import { Callout } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Callout title="Note"><p>This is a tonal Callout.</p></Callout>
      <Callout variant="outlined" title="Another Callout"><p>This is an outlined Callout.</p></Callout>
    </>
  )
}`)

write("callout", "Icon", `
/* @jsxImportSource solid-js */
import { Callout } from "opui-css/solid"

export default function Example() {
  return (
    <Callout icon={${InfoIcon}}>
      This is a tonal Callout with an icon.
    </Callout>
  )
}`)

write("callout", "Severities", `
/* @jsxImportSource solid-js */
import { Callout } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Callout severity="neutral">Neutral Callout</Callout>
      <Callout severity="info" icon={${InfoIcon}}>Info Callout</Callout>
      <Callout severity="warning" icon={${WarningIcon}}>Warning Callout</Callout>
      <Callout severity="critical" icon={${CriticalIcon}}>Critical Callout</Callout>
      <Callout variant="outlined" severity="info" icon={${InfoIcon}}>Outlined Info</Callout>
      <Callout variant="outlined" severity="warning" icon={${WarningIcon}}>Outlined Warning</Callout>
    </>
  )
}`)

// ─── CARD ───────────────────────────────────────────────────────────────────
write("card", "Variants", `
/* @jsxImportSource solid-js */
import { Card } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Card><p>Text (default)</p></Card>
      <Card variant="elevated"><p>Elevated</p></Card>
      <Card variant="outlined"><p>Outlined</p></Card>
      <Card variant="tonal"><p>Tonal</p></Card>
    </>
  )
}`)

write("card", "Header", `
/* @jsxImportSource solid-js */
import { Card } from "opui-css/solid"

export default function Example() {
  return (
    <Card variant="outlined" header={<><h3>Card title</h3><p>Subtitle</p></>}>
      <p>${lorem.slice(0, 100)}</p>
    </Card>
  )
}`)

write("card", "Actions", `
/* @jsxImportSource solid-js */
import { Button, Card } from "opui-css/solid"

export default function Example() {
  return (
    <Card variant="outlined"
      header={<h3>Card title</h3>}
      actions={<><Button>Cancel</Button><Button variant="filled" color="primary">Save</Button></>}>
      <p>${lorem.slice(0, 100)}</p>
    </Card>
  )
}`)

write("card", "Alignment", `
/* @jsxImportSource solid-js */
import { Button, Card } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Card variant="outlined"
        actions={<Button variant="filled" color="primary">Action</Button>}>
        <p>Default (end) alignment</p>
      </Card>
      <Card variant="outlined" actionsAlign="start"
        actions={<Button variant="filled" color="primary">Action</Button>}>
        <p>Start alignment</p>
      </Card>
    </>
  )
}`)

// ─── CHECKBOX ───────────────────────────────────────────────────────────────
write("checkbox", "Variants", `
/* @jsxImportSource solid-js */
import { Checkbox } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Checkbox checked name="checkbox" hideLabel>Checked</Checkbox>
      <Checkbox name="checkbox" hideLabel>Unchecked</Checkbox>
      <Checkbox indeterminate name="checkbox" hideLabel>Indeterminate</Checkbox>
      <Checkbox disabled name="checkbox" hideLabel>Disabled</Checkbox>
      <Checkbox checked disabled name="checkbox" hideLabel>Checked and disabled</Checkbox>
    </>
  )
}`)

write("checkbox", "Sizes", `
/* @jsxImportSource solid-js */
import { Checkbox } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <div class="example-row">
        <Checkbox hideLabel size="small" checked name="checkbox">Label</Checkbox>
        <Checkbox hideLabel checked name="checkbox">Label</Checkbox>
        <Checkbox hideLabel size="large" checked name="checkbox">Label</Checkbox>
      </div>
      <div class="example-row">
        <Checkbox size="small" checked name="checkbox">Small</Checkbox>
        <Checkbox checked name="checkbox">Default</Checkbox>
        <Checkbox size="large" checked name="checkbox">Large</Checkbox>
      </div>
    </>
  )
}`)

write("checkbox", "LabelPosition", `
/* @jsxImportSource solid-js */
import { Checkbox } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Checkbox labelPosition="start" name="checkbox">Label start</Checkbox>
      <Checkbox name="checkbox">Label end (default)</Checkbox>
    </>
  )
}`)

write("checkbox", "VisibleLabel", `
/* @jsxImportSource solid-js */
import { Checkbox } from "opui-css/solid"

export default function Example() {
  return <Checkbox name="checkbox">Visible label</Checkbox>
}`)

write("checkbox", "SupportingText", `
/* @jsxImportSource solid-js */
import { Checkbox } from "opui-css/solid"

export default function Example() {
  return <Checkbox name="checkbox" supportingText="Supporting text below the label">Label</Checkbox>
}`)

write("checkbox", "Validation", `
/* @jsxImportSource solid-js */
import { Checkbox } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Checkbox name="checkbox" invalid>Invalid</Checkbox>
      <Checkbox name="checkbox" valid>Valid</Checkbox>
    </>
  )
}`)

write("checkbox", "Indeterminate", `
/* @jsxImportSource solid-js */
import { Checkbox } from "opui-css/solid"

export default function Example() {
  return <Checkbox indeterminate name="checkbox">Indeterminate</Checkbox>
}`)

write("checkbox", "Spread", `
/* @jsxImportSource solid-js */
import { Checkbox, CheckboxInput } from "opui-css/solid"

export default function Example() {
  return (
    <Checkbox name="spread">
      <CheckboxInput />
      Custom label content
    </Checkbox>
  )
}`)

write("checkbox", "FieldGroup", `
/* @jsxImportSource solid-js */
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup name="checkbox-group">
          <Checkbox checked>Checkbox 1</Checkbox>
          <Checkbox>Checkbox 2</Checkbox>
          <Checkbox>Checkbox 3</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

write("checkbox", "FieldGroupDirection", `
/* @jsxImportSource solid-js */
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Horizontal</FieldLegend>
        <FieldGroup direction="horizontal" name="checkbox-h">
          <Checkbox>Option 1</Checkbox>
          <Checkbox>Option 2</Checkbox>
          <Checkbox>Option 3</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

write("checkbox", "FieldGroupDisabled", `
/* @jsxImportSource solid-js */
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet disabled>
        <FieldLegend>Disabled legend</FieldLegend>
        <FieldGroup name="checkbox-disabled">
          <Checkbox>Option 1</Checkbox>
          <Checkbox>Option 2</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

write("checkbox", "FieldGroupRequired", `
/* @jsxImportSource solid-js */
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend required>Required legend</FieldLegend>
        <FieldGroup name="checkbox-required">
          <Checkbox>Option 1</Checkbox>
          <Checkbox>Option 2</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

write("checkbox", "FieldGroupFieldDescription", `
/* @jsxImportSource solid-js */
import { Checkbox, FieldDescription, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <FieldDescription>Supporting description for the group.</FieldDescription>
        <FieldGroup name="checkbox-desc">
          <Checkbox>Option 1</Checkbox>
          <Checkbox>Option 2</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

write("checkbox", "FieldGroupValidation", `
/* @jsxImportSource solid-js */
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet invalid>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup name="checkbox-invalid">
          <Checkbox>Option 1</Checkbox>
          <Checkbox>Option 2</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

// ─── CHIP ───────────────────────────────────────────────────────────────────
write("chip", "Variants", `
/* @jsxImportSource solid-js */
import { Chip } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Chip variant="tonal" label="Tonal" />
      <Chip variant="outlined" label="Outlined" />
    </>
  )
}`)

write("chip", "Sizes", `
/* @jsxImportSource solid-js */
import { Chip } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Chip size="small" label="Small" />
      <Chip label="Default" />
    </>
  )
}`)

write("chip", "Button", `
/* @jsxImportSource solid-js */
import { Chip } from "opui-css/solid"

export default function Example() {
  return (
    <div class="example-row">
      <Chip as="button" variant="tonal" label="Tonal button" />
      <Chip as="button" variant="outlined" label="Outlined button" />
    </div>
  )
}`)

write("chip", "Icon", `
/* @jsxImportSource solid-js */
import { Chip } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Chip variant="tonal" start={${BusIcon}}><span class="text">Tonal</span></Chip>
      <Chip variant="outlined"><span class="text">Outlined</span>{${BusIcon}}</Chip>
    </>
  )
}`)

write("chip", "Link", `
/* @jsxImportSource solid-js */
import { Chip } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Chip as="a" href="#" variant="tonal" label="Tonal link" />
      <Chip as="a" href="#" variant="outlined"><span class="text">Outlined link</span>{${ExternalLinkIcon}}</Chip>
    </>
  )
}`)

// ─── DESCRIPTION LIST ───────────────────────────────────────────────────────
write("description-list", "Default", `
/* @jsxImportSource solid-js */
import { DescriptionList } from "opui-css/solid"

export default function Example() {
  return (
    <DescriptionList>
      <dt>Term one</dt>
      <dd>Description one</dd>
      <dt>Term two</dt>
      <dd>Description two</dd>
      <dt>Term three</dt>
      <dd>Description three</dd>
    </DescriptionList>
  )
}`)

write("description-list", "Bordered", `
/* @jsxImportSource solid-js */
import { DescriptionList } from "opui-css/solid"

export default function Example() {
  return (
    <DescriptionList variant="bordered">
      <dt>Term one</dt>
      <dd>Description one</dd>
      <dt>Term two</dt>
      <dd>Description two</dd>
    </DescriptionList>
  )
}`)

// ─── DIALOG ─────────────────────────────────────────────────────────────────
write("dialog", "Usage", `
/* @jsxImportSource solid-js */
import { Button, Dialog } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Button commandfor="solid-example-dialog" command="show-modal" variant="outlined">Open dialog</Button>
      <Dialog
        id="solid-example-dialog"
        role="alertdialog"
        aria-labelledby="solid-dialog-heading"
        aria-modal="true"
        header={<h2 id="solid-dialog-heading" class="h4">Are you sure?</h2>}
        content={<p>${lorem.slice(0, 100)}</p>}
        actions={<>
          <Button commandfor="solid-example-dialog" command="close" type="button">Cancel</Button>
          <Button commandfor="solid-example-dialog" command="close" type="button" variant="filled">Save</Button>
        </>}
      />
    </>
  )
}`)

write("dialog", "CloseBehaviors", `
/* @jsxImportSource solid-js */
import { Button, Dialog } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Button commandfor="solid-dialog-closedby-any" command="show-modal" variant="outlined">closedby=any</Button>
      <Dialog id="solid-dialog-closedby-any"
        header={<h2 class="h4">closedby=any</h2>}
        content={<p>Click anywhere outside or press Escape to close.</p>}
        actions={<Button commandfor="solid-dialog-closedby-any" command="close" type="button" variant="filled">Close</Button>}
      />
    </>
  )
}`)

// ─── DIVIDER ────────────────────────────────────────────────────────────────
write("divider", "Default", `
/* @jsxImportSource solid-js */
import { Divider } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <p>Above divider</p>
      <Divider />
      <p>Below divider</p>
    </>
  )
}`)

write("divider", "Variants", `
/* @jsxImportSource solid-js */
import { Divider } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Divider />
      <Divider variant="inset" />
      <Divider variant="middle" />
    </>
  )
}`)

// ─── DRAWER ─────────────────────────────────────────────────────────────────
write("drawer", "Usage", `
/* @jsxImportSource solid-js */
import { Button, Drawer, DrawerFooter, DrawerHeader } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <div class="drawer-examples">
        <Button class="left" commandfor="solid-drawer-inline-start" command="show-modal">Inline Start</Button>
        <Button class="right" commandfor="solid-drawer-inline-end" command="show-modal">Inline End</Button>
      </div>
      <Drawer id="solid-drawer-inline-start" side="inline-start"
        header={<DrawerHeader heading="Inline Start" />}
        content={<p>${lorem}</p>}
        footer={<DrawerFooter><Button size="small" commandfor="solid-drawer-inline-start" command="close">Close</Button></DrawerFooter>}
      />
      <Drawer id="solid-drawer-inline-end" side="inline-end"
        header={<DrawerHeader heading="Inline End" />}
        content={<p>${lorem}</p>}
        footer={<DrawerFooter><Button size="small" commandfor="solid-drawer-inline-end" command="close">Close</Button></DrawerFooter>}
      />
    </>
  )
}`)

// ─── FORM ────────────────────────────────────────────────────────────────────
write("form", "Usage", `
/* @jsxImportSource solid-js */
import { Button, Form, TextField } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <TextField label="Name" placeholder="Your name" />
      <TextField label="Email" type="email" placeholder="your@email.com" />
      <Button variant="filled" color="primary" type="submit">Submit</Button>
    </Form>
  )
}`)

write("form", "FieldGroup", `
/* @jsxImportSource solid-js */
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Options</FieldLegend>
        <FieldGroup name="form-field-group">
          <Checkbox>Option A</Checkbox>
          <Checkbox>Option B</Checkbox>
          <Checkbox>Option C</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

write("form", "FieldGroupRow", `
/* @jsxImportSource solid-js */
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Options</FieldLegend>
        <FieldGroup direction="horizontal" name="form-field-group-row">
          <Checkbox>Option A</Checkbox>
          <Checkbox>Option B</Checkbox>
          <Checkbox>Option C</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

write("form", "FieldLegend", `
/* @jsxImportSource solid-js */
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Legend text</FieldLegend>
        <FieldGroup name="form-legend">
          <Checkbox>Option A</Checkbox>
          <Checkbox>Option B</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

write("form", "FieldDescription", `
/* @jsxImportSource solid-js */
import { Checkbox, FieldDescription, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <FieldDescription>Description of the field group.</FieldDescription>
        <FieldGroup name="form-desc">
          <Checkbox>Option A</Checkbox>
          <Checkbox>Option B</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

write("form", "FieldsetDisabled", `
/* @jsxImportSource solid-js */
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet disabled>
        <FieldLegend>Disabled fieldset</FieldLegend>
        <FieldGroup name="form-disabled">
          <Checkbox>Option A</Checkbox>
          <Checkbox>Option B</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

write("form", "FieldsetRequired", `
/* @jsxImportSource solid-js */
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend required>Required fieldset</FieldLegend>
        <FieldGroup name="form-required">
          <Checkbox>Option A</Checkbox>
          <Checkbox>Option B</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

write("form", "FieldsetStacked", `
/* @jsxImportSource solid-js */
import { Form, TextField } from "opui-css/solid"

export default function Example() {
  return (
    <Form stacked>
      <TextField label="First name" placeholder="First" />
      <TextField label="Last name" placeholder="Last" />
    </Form>
  )
}`)

write("form", "Divider", `
/* @jsxImportSource solid-js */
import { Divider, Form, TextField } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <TextField label="Email" type="email" />
      <Divider />
      <TextField label="Password" type="password" />
    </Form>
  )
}`)

// ─── ICON BUTTON ────────────────────────────────────────────────────────────
write("icon-button", "Default", `
/* @jsxImportSource solid-js */
import { IconButton } from "opui-css/solid"

export default function Example() {
  return (
    <IconButton label="Add">${PlusIcon}</IconButton>
  )
}`)

write("icon-button", "Variants", `
/* @jsxImportSource solid-js */
import { IconButton } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <IconButton label="Add">${PlusIcon}</IconButton>
      <IconButton label="Add" variant="outlined">${PlusIcon}</IconButton>
      <IconButton label="Add" variant="tonal">${PlusIcon}</IconButton>
      <IconButton label="Add" variant="filled">${PlusIcon}</IconButton>
    </>
  )
}`)

write("icon-button", "Sizes", `
/* @jsxImportSource solid-js */
import { IconButton } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <IconButton label="Add" size="small">${PlusIcon}</IconButton>
      <IconButton label="Add">${PlusIcon}</IconButton>
      <IconButton label="Add" size="large">${PlusIcon}</IconButton>
    </>
  )
}`)

write("icon-button", "Colors", `
/* @jsxImportSource solid-js */
import { IconButton } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <IconButton label="Add" variant="filled" color="primary">${PlusIcon}</IconButton>
      <IconButton label="Add" variant="tonal" color="critical">${PlusIcon}</IconButton>
    </>
  )
}`)

write("icon-button", "Disabled", `
/* @jsxImportSource solid-js */
import { IconButton } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <IconButton label="Add" disabled>${PlusIcon}</IconButton>
      <IconButton label="Add" variant="outlined" disabled>${PlusIcon}</IconButton>
      <IconButton label="Add" variant="tonal" disabled>${PlusIcon}</IconButton>
      <IconButton label="Add" variant="filled" disabled>${PlusIcon}</IconButton>
    </>
  )
}`)

// ─── LIST ───────────────────────────────────────────────────────────────────
write("list", "Default", `
/* @jsxImportSource solid-js */
import { List } from "opui-css/solid"

export default function Example() {
  return (
    <List>
      <li>Item one</li>
      <li>Item two</li>
      <li>Item three</li>
    </List>
  )
}`)

write("list", "Variants", `
/* @jsxImportSource solid-js */
import { List } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <List>
        <li>Default item</li>
        <li>Default item</li>
      </List>
      <List variant="bordered">
        <li>Bordered item</li>
        <li>Bordered item</li>
      </List>
    </>
  )
}`)

write("list", "Dense", `
/* @jsxImportSource solid-js */
import { List } from "opui-css/solid"

export default function Example() {
  return (
    <List dense>
      <li>Dense item one</li>
      <li>Dense item two</li>
      <li>Dense item three</li>
    </List>
  )
}`)

write("list", "Divided", `
/* @jsxImportSource solid-js */
import { List } from "opui-css/solid"

export default function Example() {
  return (
    <List divided>
      <li>Item one</li>
      <li>Item two</li>
      <li>Item three</li>
    </List>
  )
}`)

write("list", "Bordered", `
/* @jsxImportSource solid-js */
import { List } from "opui-css/solid"

export default function Example() {
  return (
    <List variant="bordered">
      <li>Item one</li>
      <li>Item two</li>
      <li>Item three</li>
    </List>
  )
}`)

write("list", "Text", `
/* @jsxImportSource solid-js */
import { List, ListItem } from "opui-css/solid"

export default function Example() {
  return (
    <List>
      <ListItem headline="Headline" supportingText="Supporting text" />
      <ListItem headline="Headline" supportingText="Supporting text" />
      <ListItem headline="Headline" supportingText="Supporting text" />
    </List>
  )
}`)

write("list", "Clickable", `
/* @jsxImportSource solid-js */
import { List, ListItem } from "opui-css/solid"

export default function Example() {
  return (
    <List>
      <ListItem type="button" headline="Clickable item" />
      <ListItem type="button" headline="Clickable item" />
      <ListItem type="button" headline="Clickable item" />
    </List>
  )
}`)

write("list", "Selected", `
/* @jsxImportSource solid-js */
import { List, ListItem } from "opui-css/solid"

export default function Example() {
  return (
    <List>
      <ListItem type="button" selected headline="Selected item" />
      <ListItem type="button" headline="Unselected item" />
      <ListItem type="button" headline="Unselected item" />
    </List>
  )
}`)

write("list", "Inset", `
/* @jsxImportSource solid-js */
import { List, ListItem } from "opui-css/solid"

export default function Example() {
  return (
    <List>
      <ListItem inset headline="Inset item" />
      <ListItem inset headline="Inset item" />
      <ListItem headline="Normal item" />
    </List>
  )
}`)

write("list", "Gutterless", `
/* @jsxImportSource solid-js */
import { List } from "opui-css/solid"

export default function Example() {
  return (
    <List gutterless>
      <li>Item one</li>
      <li>Item two</li>
      <li>Item three</li>
    </List>
  )
}`)

write("list", "StartIcon", `
/* @jsxImportSource solid-js */
import { List, ListItem } from "opui-css/solid"

export default function Example() {
  return (
    <List>
      <ListItem headline="With icon" start={${UserIcon}} />
      <ListItem headline="With icon" start={${UserIcon}} />
      <ListItem headline="With icon" start={${UserIcon}} />
    </List>
  )
}`)

write("list", "StartAvatar", `
/* @jsxImportSource solid-js */
import { Avatar, List, ListItem } from "opui-css/solid"

export default function Example() {
  return (
    <List>
      <ListItem headline="John Doe" start={<Avatar>JD</Avatar>} />
      <ListItem headline="Jane Smith" start={<Avatar>JS</Avatar>} />
      <ListItem headline="Bob Wilson" start={<Avatar>BW</Avatar>} />
    </List>
  )
}`)

write("list", "SingleBorder", `
/* @jsxImportSource solid-js */
import { List } from "opui-css/solid"

export default function Example() {
  return (
    <List variant="single-border">
      <li>Item one</li>
      <li>Item two</li>
      <li>Item three</li>
    </List>
  )
}`)

// ─── PROGRESS ───────────────────────────────────────────────────────────────
write("progress", "Determinate", `
/* @jsxImportSource solid-js */
import { Progress } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Progress value={25} max={100} label="Loading..." />
      <Progress value={50} max={100} label="Loading..." />
      <Progress value={75} max={100} label="Loading..." />
    </>
  )
}`)

write("progress", "Indeterminate", `
/* @jsxImportSource solid-js */
import { Progress } from "opui-css/solid"

export default function Example() {
  return <Progress label="Loading..." />
}`)

write("progress", "Surfaces", `
/* @jsxImportSource solid-js */
import { Progress } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Progress value={50} max={100} label="Default" />
      <div style="background: var(--surface-2); padding: var(--size-3);">
        <Progress value={50} max={100} label="On surface" />
      </div>
    </>
  )
}`)

// ─── RADIO ──────────────────────────────────────────────────────────────────
write("radio", "FieldGroup", `
/* @jsxImportSource solid-js */
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Choose an option</FieldLegend>
        <FieldGroup name="radio-group">
          <Radio value="a">Option A</Radio>
          <Radio value="b">Option B</Radio>
          <Radio value="c">Option C</Radio>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

write("radio", "FieldGroupDirection", `
/* @jsxImportSource solid-js */
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Horizontal</FieldLegend>
        <FieldGroup direction="horizontal" name="radio-h">
          <Radio value="a">Option A</Radio>
          <Radio value="b">Option B</Radio>
          <Radio value="c">Option C</Radio>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

write("radio", "FieldGroupDisabled", `
/* @jsxImportSource solid-js */
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet disabled>
        <FieldLegend>Disabled</FieldLegend>
        <FieldGroup name="radio-disabled">
          <Radio value="a">Option A</Radio>
          <Radio value="b">Option B</Radio>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

write("radio", "FieldGroupRequired", `
/* @jsxImportSource solid-js */
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend required>Required</FieldLegend>
        <FieldGroup name="radio-required">
          <Radio value="a">Option A</Radio>
          <Radio value="b">Option B</Radio>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

write("radio", "FieldGroupFieldDescription", `
/* @jsxImportSource solid-js */
import { FieldDescription, FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Options</FieldLegend>
        <FieldDescription>Pick the best option for you.</FieldDescription>
        <FieldGroup name="radio-desc">
          <Radio value="a">Option A</Radio>
          <Radio value="b">Option B</Radio>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

write("radio", "FieldGroupValidation", `
/* @jsxImportSource solid-js */
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet invalid>
        <FieldLegend>Invalid</FieldLegend>
        <FieldGroup name="radio-invalid">
          <Radio value="a">Option A</Radio>
          <Radio value="b">Option B</Radio>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

// ─── RANGE ───────────────────────────────────────────────────────────────────
write("range", "Default", `
/* @jsxImportSource solid-js */
import { Range } from "opui-css/solid"

export default function Example() {
  return <Range label="Volume" />
}`)

write("range", "Disabled", `
/* @jsxImportSource solid-js */
import { Range } from "opui-css/solid"

export default function Example() {
  return <Range label="Volume" disabled />
}`)

write("range", "Validation", `
/* @jsxImportSource solid-js */
import { Range } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Range label="Invalid" invalid />
      <Range label="Valid" valid />
    </>
  )
}`)

write("range", "Value", `
/* @jsxImportSource solid-js */
import { Range } from "opui-css/solid"

export default function Example() {
  return <Range label="Volume" value={50} min={0} max={100} />
}`)

// ─── SELECT ─────────────────────────────────────────────────────────────────
write("select", "Variants", `
/* @jsxImportSource solid-js */
import { Select } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Select label="Label">
        <option value="">-</option>
        <option>Outlined (default)</option>
        <option>Option Two</option>
      </Select>
      <Select label="Label" variant="filled">
        <option value="">-</option>
        <option>Filled</option>
        <option>Option Two</option>
      </Select>
    </>
  )
}`)

write("select", "Sizes", `
/* @jsxImportSource solid-js */
import { Select } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Select label="Small" size="small">
        <option>Option</option>
      </Select>
      <Select label="Default">
        <option>Option</option>
      </Select>
      <Select label="Large" size="large">
        <option>Option</option>
      </Select>
    </>
  )
}`)

write("select", "Dense", `
/* @jsxImportSource solid-js */
import { Select } from "opui-css/solid"

export default function Example() {
  return (
    <Select label="Dense" dense>
      <option>Option one</option>
      <option>Option two</option>
    </Select>
  )
}`)

write("select", "Validation", `
/* @jsxImportSource solid-js */
import { Select } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Select label="Invalid" invalid>
        <option>Option</option>
      </Select>
      <Select label="Valid" valid>
        <option>Option</option>
      </Select>
    </>
  )
}`)

write("select", "SupportingText", `
/* @jsxImportSource solid-js */
import { Select } from "opui-css/solid"

export default function Example() {
  return (
    <Select label="Label" supportingText="Choose your preferred option.">
      <option>Option one</option>
      <option>Option two</option>
    </Select>
  )
}`)

write("select", "Orientation", `
/* @jsxImportSource solid-js */
import { Select } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Select label="Vertical (default)">
        <option>Option</option>
      </Select>
      <Select label="Horizontal" orientation="horizontal">
        <option>Option</option>
      </Select>
    </>
  )
}`)

write("select", "Grouped", `
/* @jsxImportSource solid-js */
import { Select } from "opui-css/solid"

export default function Example() {
  return (
    <Select label="Category">
      <optgroup label="Group A">
        <option>Option 1</option>
        <option>Option 2</option>
      </optgroup>
      <optgroup label="Group B">
        <option>Option 3</option>
        <option>Option 4</option>
      </optgroup>
    </Select>
  )
}`)

write("select", "Classic", `
/* @jsxImportSource solid-js */
import { ClassicSelect } from "opui-css/solid"

export default function Example() {
  return (
    <ClassicSelect label="Label">
      <option>Option one</option>
      <option>Option two</option>
      <option>Option three</option>
    </ClassicSelect>
  )
}`)

// ─── SWITCH ─────────────────────────────────────────────────────────────────
write("switch", "Variants", `
/* @jsxImportSource solid-js */
import { Switch } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Switch name="switch" checked hideLabel>Checked</Switch>
      <Switch name="switch" hideLabel>Unchecked</Switch>
      <Switch name="switch" disabled hideLabel>Disabled</Switch>
      <Switch name="switch" checked disabled hideLabel>Checked and disabled</Switch>
    </>
  )
}`)

write("switch", "Sizes", `
/* @jsxImportSource solid-js */
import { Switch } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Switch size="small" checked name="switch">Small</Switch>
      <Switch checked name="switch">Default</Switch>
      <Switch size="large" checked name="switch">Large</Switch>
    </>
  )
}`)

write("switch", "LabelPosition", `
/* @jsxImportSource solid-js */
import { Switch } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Switch labelPosition="start" name="switch">Label start</Switch>
      <Switch name="switch">Label end (default)</Switch>
    </>
  )
}`)

write("switch", "VisibleLabel", `
/* @jsxImportSource solid-js */
import { Switch } from "opui-css/solid"

export default function Example() {
  return <Switch name="switch">Visible label</Switch>
}`)

write("switch", "SupportingText", `
/* @jsxImportSource solid-js */
import { Switch } from "opui-css/solid"

export default function Example() {
  return <Switch name="switch" supportingText="Additional info">Dark mode</Switch>
}`)

write("switch", "Validation", `
/* @jsxImportSource solid-js */
import { Switch } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Switch name="switch" invalid>Invalid</Switch>
      <Switch name="switch" valid>Valid</Switch>
    </>
  )
}`)

write("switch", "Icons", `
/* @jsxImportSource solid-js */
import { Switch } from "opui-css/solid"

export default function Example() {
  return <Switch name="switch" withIcons checked>With icons</Switch>
}`)

write("switch", "Spread", `
/* @jsxImportSource solid-js */
import { Switch, SwitchInput } from "opui-css/solid"

export default function Example() {
  return (
    <Switch name="spread">
      <SwitchInput />
      Custom label
    </Switch>
  )
}`)

write("switch", "FieldGroup", `
/* @jsxImportSource solid-js */
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Preferences</FieldLegend>
        <FieldGroup name="switch-group">
          <Switch>Dark mode</Switch>
          <Switch>Notifications</Switch>
          <Switch>Auto-save</Switch>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

write("switch", "FieldGroupDirection", `
/* @jsxImportSource solid-js */
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Horizontal</FieldLegend>
        <FieldGroup direction="horizontal" name="switch-h">
          <Switch>Option A</Switch>
          <Switch>Option B</Switch>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

write("switch", "FieldGroupDisabled", `
/* @jsxImportSource solid-js */
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet disabled>
        <FieldLegend>Disabled</FieldLegend>
        <FieldGroup name="switch-disabled">
          <Switch>Option A</Switch>
          <Switch>Option B</Switch>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

write("switch", "FieldGroupRequired", `
/* @jsxImportSource solid-js */
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend required>Required</FieldLegend>
        <FieldGroup name="switch-required">
          <Switch>Option A</Switch>
          <Switch>Option B</Switch>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

write("switch", "FieldGroupFieldDescription", `
/* @jsxImportSource solid-js */
import { FieldDescription, FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Preferences</FieldLegend>
        <FieldDescription>Configure your preferences.</FieldDescription>
        <FieldGroup name="switch-desc">
          <Switch>Dark mode</Switch>
          <Switch>Notifications</Switch>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

write("switch", "FieldGroupValidation", `
/* @jsxImportSource solid-js */
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet invalid>
        <FieldLegend>Invalid</FieldLegend>
        <FieldGroup name="switch-invalid">
          <Switch>Option A</Switch>
          <Switch>Option B</Switch>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}`)

// ─── TABLE ───────────────────────────────────────────────────────────────────
write("table", "Default", `
/* @jsxImportSource solid-js */
import { Table } from "opui-css/solid"

export default function Example() {
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Role</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Alice</Table.Cell>
          <Table.Cell>Developer</Table.Cell>
          <Table.Cell>Active</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Bob</Table.Cell>
          <Table.Cell>Designer</Table.Cell>
          <Table.Cell>Inactive</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Carol</Table.Cell>
          <Table.Cell>Manager</Table.Cell>
          <Table.Cell>Active</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}`)

write("table", "Dense", `
/* @jsxImportSource solid-js */
import { Table } from "opui-css/solid"

export default function Example() {
  return (
    <Table dense>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row><Table.Cell>Row 1</Table.Cell><Table.Cell>Value 1</Table.Cell></Table.Row>
        <Table.Row><Table.Cell>Row 2</Table.Cell><Table.Cell>Value 2</Table.Cell></Table.Row>
        <Table.Row><Table.Cell>Row 3</Table.Cell><Table.Cell>Value 3</Table.Cell></Table.Row>
      </Table.Body>
    </Table>
  )
}`)

write("table", "Spacious", `
/* @jsxImportSource solid-js */
import { Table } from "opui-css/solid"

export default function Example() {
  return (
    <Table spacious>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row><Table.Cell>Row 1</Table.Cell><Table.Cell>Value 1</Table.Cell></Table.Row>
        <Table.Row><Table.Cell>Row 2</Table.Cell><Table.Cell>Value 2</Table.Cell></Table.Row>
      </Table.Body>
    </Table>
  )
}`)

// ─── TABS ───────────────────────────────────────────────────────────────────
write("tabs", "Basics", `
/* @jsxImportSource solid-js */
import { Tabs, TabsItem, TabsPanel, TabsTab } from "opui-css/solid"

export default function Example() {
  return (
    <Tabs class="underlined">
      <TabsItem open>
        <TabsTab>Profile</TabsTab>
        <TabsPanel>Profile settings and information.</TabsPanel>
      </TabsItem>
      <TabsItem>
        <TabsTab>Settings</TabsTab>
        <TabsPanel>General account settings.</TabsPanel>
      </TabsItem>
      <TabsItem>
        <TabsTab>Notifications</TabsTab>
        <TabsPanel>Manage your notifications.</TabsPanel>
      </TabsItem>
    </Tabs>
  )
}`)

// ─── TEXT FIELD ─────────────────────────────────────────────────────────────
write("text-field", "Variants", `
/* @jsxImportSource solid-js */
import { TextField } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <TextField label="Outlined" placeholder="Placeholder" />
      <TextField label="Filled" placeholder="Placeholder" filled />
    </>
  )
}`)

write("text-field", "Sizes", `
/* @jsxImportSource solid-js */
import { TextField } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <TextField label="Small" size="small" placeholder="Placeholder" />
      <TextField label="Default" placeholder="Placeholder" />
      <TextField label="Large" size="large" placeholder="Placeholder" />
    </>
  )
}`)

write("text-field", "Orientation", `
/* @jsxImportSource solid-js */
import { TextField } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <TextField label="Vertical" placeholder="Placeholder" />
      <TextField label="Horizontal" orientation="horizontal" placeholder="Placeholder" />
    </>
  )
}`)

write("text-field", "SupportingText", `
/* @jsxImportSource solid-js */
import { TextField } from "opui-css/solid"

export default function Example() {
  return (
    <TextField label="Email" type="email" placeholder="your@email.com" supportingText="We'll never share your email." />
  )
}`)

write("text-field", "Validation", `
/* @jsxImportSource solid-js */
import { TextField } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <TextField label="Invalid" invalid validationMessage="This field is required" />
      <TextField label="Valid" valid />
    </>
  )
}`)

write("text-field", "InputTypes", `
/* @jsxImportSource solid-js */
import { TextField } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <TextField label="Text" type="text" placeholder="Text input" />
      <TextField label="Email" type="email" placeholder="email@example.com" />
      <TextField label="Password" type="password" placeholder="Password" />
      <TextField label="Number" type="number" placeholder="0" />
    </>
  )
}`)

write("text-field", "NoLabel", `
/* @jsxImportSource solid-js */
import { TextField } from "opui-css/solid"

export default function Example() {
  return (
    <TextField aria-label="Search" placeholder="Search..." />
  )
}`)

write("text-field", "Headers", `
/* @jsxImportSource solid-js */
import { TextField } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <TextField label="With header" header="Section title" placeholder="Placeholder" />
    </>
  )
}`)

write("text-field", "Affix", `
/* @jsxImportSource solid-js */
import { TextField } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <TextField label="With prefix" prefix="$" placeholder="0.00" />
      <TextField label="With suffix" suffix="kg" placeholder="Weight" />
    </>
  )
}`)

write("text-field", "AutoFit", `
/* @jsxImportSource solid-js */
import { TextField } from "opui-css/solid"

export default function Example() {
  return (
    <TextField label="Auto-fit" autoFit placeholder="Grows to content" />
  )
}`)

write("text-field", "File", `
/* @jsxImportSource solid-js */
import { TextField } from "opui-css/solid"

export default function Example() {
  return (
    <TextField label="File upload" type="file" />
  )
}`)

write("text-field", "Numeric", `
/* @jsxImportSource solid-js */
import { TextField } from "opui-css/solid"

export default function Example() {
  return (
    <TextField label="Quantity" type="number" min={0} max={100} step={1} value={1} />
  )
}`)

// ─── TEXTAREA ───────────────────────────────────────────────────────────────
write("textarea", "Variants", `
/* @jsxImportSource solid-js */
import { Textarea } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Textarea label="Default" placeholder="Placeholder" />
      <Textarea label="Filled" placeholder="Placeholder" filled />
    </>
  )
}`)

write("textarea", "Sizes", `
/* @jsxImportSource solid-js */
import { Textarea } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Textarea label="Small" size="small" placeholder="Placeholder" />
      <Textarea label="Default" placeholder="Placeholder" />
      <Textarea label="Large" size="large" placeholder="Placeholder" />
    </>
  )
}`)

write("textarea", "Orientation", `
/* @jsxImportSource solid-js */
import { Textarea } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Textarea label="Vertical" placeholder="Placeholder" />
      <Textarea label="Horizontal" orientation="horizontal" placeholder="Placeholder" />
    </>
  )
}`)

write("textarea", "SupportingText", `
/* @jsxImportSource solid-js */
import { Textarea } from "opui-css/solid"

export default function Example() {
  return (
    <Textarea label="Message" supportingText="Maximum 500 characters." placeholder="Your message..." />
  )
}`)

write("textarea", "Validation", `
/* @jsxImportSource solid-js */
import { Textarea } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Textarea label="Invalid" invalid validationMessage="This field is required" />
      <Textarea label="Valid" valid />
    </>
  )
}`)

write("textarea", "AutoFit", `
/* @jsxImportSource solid-js */
import { Textarea } from "opui-css/solid"

export default function Example() {
  return (
    <Textarea label="Auto-fit" autoFit placeholder="Grows as you type..." />
  )
}`)

write("textarea", "Headers", `
/* @jsxImportSource solid-js */
import { Textarea } from "opui-css/solid"

export default function Example() {
  return (
    <Textarea label="Description" header="Product details" placeholder="Describe your product..." />
  )
}`)

write("textarea", "Affix", `
/* @jsxImportSource solid-js */
import { Textarea } from "opui-css/solid"

export default function Example() {
  return (
    <Textarea label="With suffix" suffix="chars" placeholder="Type here..." />
  )
}`)

// ─── TOAST ──────────────────────────────────────────────────────────────────
write("toast", "HTML", `
/* @jsxImportSource solid-js */
import { Toast } from "opui-css/solid"

export default function Example() {
  return (
    <Toast>
      <p>This is a toast notification.</p>
    </Toast>
  )
}`)

write("toast", "TitleDescription", `
/* @jsxImportSource solid-js */
import { Toast } from "opui-css/solid"

export default function Example() {
  return (
    <Toast title="Success" description="Your changes have been saved." />
  )
}`)

write("toast", "Severity", `
/* @jsxImportSource solid-js */
import { Toast } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Toast severity="info" title="Info" description="Informational message." />
      <Toast severity="warning" title="Warning" description="Warning message." />
      <Toast severity="critical" title="Error" description="Error message." />
      <Toast severity="success" title="Success" description="Success message." />
    </>
  )
}`)

write("toast", "Duration", `
/* @jsxImportSource solid-js */
import { Toast } from "opui-css/solid"

export default function Example() {
  return (
    <Toast title="Auto-dismiss" description="This toast will auto-dismiss." duration={5000} />
  )
}`)

// ─── TOGGLE ─────────────────────────────────────────────────────────────────
write("toggle", "Default", `
/* @jsxImportSource solid-js */
import { ToggleButton } from "opui-css/solid"

export default function Example() {
  return (
    <ToggleButton value="notifications">Notifications</ToggleButton>
  )
}`)

write("toggle", "Standalone", `
/* @jsxImportSource solid-js */
import { ToggleButton } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <ToggleButton value="bold" aria-label="Bold"><strong>B</strong></ToggleButton>
      <ToggleButton value="italic" aria-label="Italic" checked><i>I</i></ToggleButton>
      <ToggleButton value="underline" aria-label="Underline"><u>U</u></ToggleButton>
    </>
  )
}`)

write("toggle", "MultiSelect", `
/* @jsxImportSource solid-js */
import { ToggleButton, ToggleGroup } from "opui-css/solid"

export default function Example() {
  return (
    <ToggleGroup name="text-style">
      <ToggleButton value="bold" aria-label="Bold"><strong>B</strong></ToggleButton>
      <ToggleButton value="italic" aria-label="Italic"><i>I</i></ToggleButton>
      <ToggleButton value="underline" aria-label="Underline"><u>U</u></ToggleButton>
    </ToggleGroup>
  )
}`)

write("toggle", "Interactive", `
/* @jsxImportSource solid-js */
import { ToggleButton, ToggleGroup } from "opui-css/solid"

export default function Example() {
  return (
    <ToggleGroup selection="single" name="transport">
      <ToggleButton value="walking" checked>${UserIcon} Walking</ToggleButton>
      <ToggleButton value="cycling">${BusIcon} Cycling</ToggleButton>
      <ToggleButton value="commuting">${BusIcon} Commuting</ToggleButton>
    </ToggleGroup>
  )
}`)

write("toggle", "Sizes", `
/* @jsxImportSource solid-js */
import { ToggleButton, ToggleGroup } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <ToggleGroup name="size-small">
        <ToggleButton size="small" value="a">Small A</ToggleButton>
        <ToggleButton size="small" value="b">Small B</ToggleButton>
      </ToggleGroup>
      <ToggleGroup name="size-large">
        <ToggleButton size="large" value="a">Large A</ToggleButton>
        <ToggleButton size="large" value="b">Large B</ToggleButton>
      </ToggleGroup>
    </>
  )
}`)

write("toggle", "Vertical", `
/* @jsxImportSource solid-js */
import { ToggleButton, ToggleGroup } from "opui-css/solid"

export default function Example() {
  return (
    <ToggleGroup name="vertical" direction="vertical">
      <ToggleButton value="top">Top</ToggleButton>
      <ToggleButton value="middle">Middle</ToggleButton>
      <ToggleButton value="bottom">Bottom</ToggleButton>
    </ToggleGroup>
  )
}`)

write("toggle", "Alignment", `
/* @jsxImportSource solid-js */
import { ToggleButton, ToggleGroup } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <ToggleGroup name="align-start" align="start">
        <ToggleButton value="a">Start A</ToggleButton>
        <ToggleButton value="b">Start B</ToggleButton>
      </ToggleGroup>
      <ToggleGroup name="align-end" align="end">
        <ToggleButton value="a">End A</ToggleButton>
        <ToggleButton value="b">End B</ToggleButton>
      </ToggleGroup>
    </>
  )
}`)

// ─── TOOLTIP ─────────────────────────────────────────────────────────────────
write("tooltip", "Basics", `
/* @jsxImportSource solid-js */
import { Button, Tooltip } from "opui-css/solid"

export default function Example() {
  return (
    <Tooltip label="Save your changes" id="solid-tooltip-basic">
      <Button interestfor="solid-tooltip-basic" commandfor="solid-tooltip-basic" command="toggle-popover" variant="outlined">Save</Button>
    </Tooltip>
  )
}`)

write("tooltip", "Arrow", `
/* @jsxImportSource solid-js */
import { Button, Tooltip } from "opui-css/solid"

export default function Example() {
  return (
    <Tooltip label="With arrow" arrow id="solid-tooltip-arrow">
      <Button interestfor="solid-tooltip-arrow" commandfor="solid-tooltip-arrow" command="toggle-popover" variant="outlined">Hover me</Button>
    </Tooltip>
  )
}`)

write("tooltip", "Alignment", `
/* @jsxImportSource solid-js */
import { Button, Tooltip } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Tooltip label="Top center" alignment="center end" id="solid-tooltip-top">
        <Button interestfor="solid-tooltip-top" commandfor="solid-tooltip-top" command="toggle-popover" variant="outlined">Top</Button>
      </Tooltip>
      <Tooltip label="Bottom center" alignment="center start" id="solid-tooltip-bottom">
        <Button interestfor="solid-tooltip-bottom" commandfor="solid-tooltip-bottom" command="toggle-popover" variant="outlined">Bottom</Button>
      </Tooltip>
    </>
  )
}`)

write("tooltip", "RichContent", `
/* @jsxImportSource solid-js */
import { Button, Tooltip } from "opui-css/solid"

export default function Example() {
  return (
    <Tooltip
      label="Rich tooltip"
      content={<p style="max-width: 20ch; font-size: var(--font-size-0);">Detailed description with <strong>rich</strong> content.</p>}
      id="solid-tooltip-rich">
      <Button interestfor="solid-tooltip-rich" commandfor="solid-tooltip-rich" command="toggle-popover" variant="outlined">Rich tooltip</Button>
    </Tooltip>
  )
}`)

console.log("\nDone! All Solid example files generated.")
