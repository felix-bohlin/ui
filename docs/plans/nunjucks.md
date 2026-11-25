# Nunjucks: what is built and what remains

Status: a prototype on this branch, and the handoff for the agent who takes on the Nunjucks docs. Nothing ships yet: there is no package export, docs tab or getting-started page. Whether to ship is still open, in the Future plans item of `TODO.md` that starts "Tooling: the Nunjucks prototype compiles all 89 components" (option A recommends shipping it in 6.1). Read that item before starting, since most of the docs work only makes sense once it ships.

## Summary

The component compiler turns every Astro component in `packages/opui/components/` into a native Nunjucks macro: real `{% if %}`, `{% for %}`, `{% set %}` and `{% call %}`, not a wrapper around JavaScript. All 89 compile. `tests/unit/nunjucks-prototype.test.ts` renders each macro against its Astro component on every contract case (`tests/unit/component-cases.ts`) and in about 20 compositions, comparing the markup and the generated ids, so a macro renders exactly what the Astro component renders.

An independent review, briefed as a senior Nunjucks developer, put the first output at 60 to 70 percent of what a person would write by hand. The second round fixed what it raised; what remains is listed under Limits.

## Where it lives

| File                                                                         | What it does                                                                                                    |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `scripts/component-nunjucks.mjs`                                             | The emitter (`toNunjucks`), `nunjucksBuild` (macros, `opui/index.njk` and the metadata), the census and the CLI |
| `scripts/component-nunjucks-expression.mjs`                                  | TypeScript expressions to Nunjucks, by Nunjucks precedence                                                      |
| `scripts/component-nunjucks-facts.mjs`                                       | What the emitter knows: conditions a block makes true, reads, purity                                            |
| `scripts/component-nunjucks-layout.mjs`                                      | Indentation and the free line breaks                                                                            |
| `scripts/nunjucks-runtime.mjs`                                               | The filters and the `opui` global, `configure(env)`                                                             |
| `scripts/example-react-props.mjs`                                            | `astroPropsOf`, the Astro prop types the emitter reads                                                          |
| `tests/unit/nunjucks-prototype.test.ts`, `tests/unit/nunjucks-facts.test.ts` | The checks                                                                                                      |
| `tests/unit/nunjucks-macros/`                                                | Seven macros as snapshots: the best place to see the output                                                     |

The scripts guide (`scripts/AGENTS.md`) has one row per module. To read a macro, run `node scripts/component-nunjucks.mjs --print Field`; `--report` prints the census.

## How the macros are used

This is the model the docs have to explain.

```njk
{% from "opui/Button.njk" import Button %}
{% from "opui/Field.njk" import Field %}

{% call Button({ variant: "filled", href: "/save" }) %}Save{% endcall %}
{{ Button({ variant: "tonal" }) }}

{% set start %}<b>@</b>{% endset %}
{% call Field({ for: "email", label: "Email", slots: { start: start } }) %}
  <input id="email" class="ui-input">
{% endcall %}
```

- Each macro is named after its component and takes one dict with the same props as the Astro component (`class`, `for` and `aria-label` as written in HTML). Nunjucks silently drops keyword arguments a macro doesn't declare, which is why it is one dict and not `Button(variant="filled")`.
- The default slot is the body of `{% call %}`; without content, `{{ Button({...}) }}`. A named slot goes in `slots` under its camelCase name (`end-text` is `slots.endText`), captured with `{% set %}...{% endset %}`, and is printed as HTML.
- Props a macro doesn't take go to its element as attributes, as in every framework.
- `opui/index.njk` re-exports every macro, so a page can namespace them: `{% import "opui/index.njk" as ui %}{{ ui.Button({...}) }}`. A site that wants a prefix renames on import: `{% from "opui/Button.njk" import Button as opuiButton %}`.
- Parent and child components compose as in the other frameworks: `{% call Tabs({ value: "dog" }) %}{% call TabsItem({ value: "cat" }) %}Cat{% endcall %}...{% endcall %}`. The parent passes its values to the children rendered in its body.

### Setting up an environment

```js
import nunjucks from "nunjucks"
import { configure } from "./scripts/nunjucks-runtime.mjs"

const env = new nunjucks.Environment(loader, { autoescape: true })
configure(env, { components })
```

- `configure` throws unless `autoescape` is on and `trimBlocks`, `lstripBlocks` and `throwOnUndefined` are off: the macros depend on those settings.
- `components` is the metadata `nunjucksBuild` returns. The `opuiRest` filter reads it to split a macro's props from its attributes.
- In the prototype the templates live in memory (`createEnvironment(templates, options)`). Shipping means writing them to files and exporting the runtime; see below.

What `configure` registers:

- Filters: `opuiAttributes` (Astro's attribute rules, ported), `opuiClass`, `opuiOmit`, `opuiRest`, `opuiTag`, `opuiText` (prints a value as Astro prints an expression) and `opuiTrim`.
- The `opui` global: the shared component helpers (found from `packages/opui/components/`, not listed by hand), `merge`, `id`, `ids`, `provide` and `context`.

### Ids, context and warnings

- Generated ids come from one counter per environment that is never reset, so they never repeat, even when pages render at the same time. Their numbers depend on render order, so a site that needs stable ids passes `id` or `name`. `configure(env, { id })` takes another generator. A component's id is only made when it is used, as Astro does.
- The parent-to-child context is a stack around the parent's `caller()`. It is safe when renders overlap because Nunjucks renders a macro and its body in one synchronous call. An async filter inside a `{% call %}` body crashes Nunjucks 3.2.4 itself, so this can't break.
- With `NODE_ENV` other than `production`, a key that is neither a prop of the component nor an attribute of its element warns once: `[OPUI Button] Unknown prop "lable": ...`. So does an unknown slot name. This stands in for the type checking the other frameworks get.
- `class` is a string, as in the component types.

## Decisions

- **Native templates over a JavaScript renderer.** The user chose readable, forkable Nunjucks over thin macros calling JavaScript. The cost is a translator that refuses what Nunjucks can't express (BC701 to BC705 in `scripts/component-diagnostics.mjs`). The Rating and Reactions logic moved into helpers (`Rating/rating.ts`, `Reactions/pills.ts`) for that reason.
- **Component names, not prefixes.** A prefix would add a second name for every component to the docs, examples and API tables; the index gives namespacing without one. Easiest to enforce: one test checks every name and the index.
- **The compiler knows, it doesn't guess.**
  - Prop types come from the TypeScript checker (`astroPropsOf`).
  - A guard or `undefined` is dropped only where a fact proves it changes nothing: a condition the block makes true, a value that can't be null, or a result that treats null and undefined alike.
  - Required props are not treated as present, since the contract cases render components with nothing passed and Astro then prints `undefined-start` or drops the attribute.
- **`disabledLink` stays.** A shared `tagOf()` helper for the tag expression of Avatar, Button, Chip, ListItem and Menu was tried and dropped: React's `static-components` lint rule treats a component returned by a helper call during render as one created there, so the compiled React ports failed lint. In Nunjucks (and Astro) the branch is dead, since `as` can only be a tag name there.

## Limits

- A named slot passed to an inner component (BC704) and a context provided around a named slot (BC703) are refused. No component needs either today. A named slot is captured before the macro runs, so a context can't reach it.
- Text expressions print `false` and lists as Nunjucks does, except where the types or the expression show a boolean, list or object; there the macro uses `| opuiText`.
- Some lines stay over 100 characters: a class entry such as `{%- if a and b != 'x' %} ui-x-{{ a }}{% endif %}`, and expressions nested in parentheses. The layout only breaks where whitespace is free.
- The whitespace inside Field's `.ui-top` and `.ui-bottom` spans is the formatting newline `scripts/component-layout.mjs` writes in a flex container, proven not to render; `.ui-start` and `.ui-end` aren't flex, so they stay glued.
- `grouped ?? checked` stays `grouped if grouped != none else checked` rather than `grouped | default(checked)`. They're only equal if `grouped` is never null, which needs the type of a derived local.
- The templates need JavaScript (the filters and the `opui` global), so they won't run in Jinja.
- Nunjucks has had no release since 3.2.4 in April 2023.

## Before the docs: what shipping needs

This isn't docs work, but most docs pages depend on it.

1. A server-only framework category in `src/utils/framework.js`: in `FRAMEWORKS`, but left out of `isHydratedFramework` and the hydrated checks. `tests/unit/framework-coverage.test.ts` lists everything a framework must have and today treats every framework but `html` as a hydrated package framework.
2. `pnpm build-components` writing the macros, `index.njk` and the metadata to `packages/opui/nunjucks/`, with the runtime exported as `./nunjucks` from `packages/opui/package.json`, and probably an Eleventy plugin around `configure`.
3. An Eleventy app in `pnpm test:apps` (`tests/apps`), like the Vite starters.

## The docs work

Each item names the files to start from. `src/docs/components/AGENTS.md` covers component pages and examples, and the root `AGENTS.md` lists the checks.

1. **A getting-started page:** `src/docs/guide/getting-started/Nunjucks.astro`, after `HTML.astro` and `Astro.astro`. Cover installing, the loader path, `configure(env, { components })`, the settings it requires, an Eleventy setup, the first macro call, named slots, and the CSS and element scripts a page loads.
2. **A Nunjucks tab on every component page:**
   - an extension in `EXAMPLE_EXTENSIONS` (`src/utils/framework.js`);
   - a `code-nunjucks` slot in `src/components/AutoExample.astro`;
   - the globs in `src/utils/examples.ts`;
   - a writer in `scripts/build-examples.mjs` that turns each Astro example into `.njk`, with targets in `scripts/example-targets.mjs` and an encoder for literal `{` in `scripts/example-encoders.mjs`;
   - a renderer in `tests/unit/parity.test.ts`.

   The preview can stay the HTML render: `src/components/Example/Example.astro` already falls back to it. The highlighter has no Nunjucks grammar, so show the code as HTML.

3. **API tables:** a Nunjucks entry in `src/component-api/frameworks.ts`. Props keep their Astro names, a named slot is `slots.<camelCase>` (`slotProp`), and the default slot is the `{% call %}` body.
4. **A runtime page** (under `src/docs/guide/`) for the filters, ids and stable ids, context, the development warnings and `index.njk`, drawn from "How the macros are used" above.
5. **Site-wide mentions:**
   - the framework list in `src/docs/Home.astro`;
   - `src/components/Release/Compiler.astro`;
   - the agent skill references (`scripts/build-agent-skill.mjs`);
   - `llms.txt` and the search index (`scripts/generate-search-index.mjs`);
   - an `Added` entry in `packages/opui/CHANGELOG.md`, with its What's new notes in `src/utils/whats-new.ts`.

## Repo rules that catch docs work

- No em dash (U+2014) or middle dot (U+00B7) anywhere; `pnpm check-characters` fails on them.
- Colors only as `oklch()`.
- Lists in ascending order unless the order means something.
- Every What's new note links to the section that documents it, and `pnpm check-dist` fails on a link to a missing id.
- Examples have no placeholder copy (`tests/unit/example-copy.test.ts`), and every prop in an `api.ts` appears in an example on its page (`tests/unit/example-coverage.test.ts`).
- Run `pnpm check` before finishing. The build checks links, anchors, the sitemap and `llms.txt`.

## Open questions

1. Ship in 6.1, keep the prototype, or remove it (the `TODO.md` item).
2. An Eleventy plugin, or only `configure(env)`?
3. Should the docs show the namespaced form (`ui.Button`) or the per-component import as the default?
4. A Nunjucks highlighter grammar for the code tab.
