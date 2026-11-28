export const SAMPLE_FILE = "packages/opui/components/Sample/Sample.astro"

const TABS_FILE = "packages/opui/components/Tabs/Sample.astro"

const PROPS = 'import type { Props } from "./types.astro"\n'

const component = (frontmatter, template) =>
  `---\n${frontmatter}---\n\n${template}\n`

const BASE = 'export type Props = {\n  tone?: "info" | "warning"\n}\n'

const astroTypes = (attributes = 'HTMLAttributes<"div">') =>
  `import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & ${attributes}\n`

const EVENTS = `${BASE}\nexport type Events = {\n  close: Event\n}\n`

const WRAPPER = component(
  `${PROPS}\nconst { class: className, tone, ...rest } = Astro.props\n`,
  '<div class:list={["ui-sample", tone && `ui-${tone}`, className]} {...rest}>\n  <slot />\n</div>',
)

const modelApi = (prop, selector) => ({
  component: "Sample",
  model: { description: "", prop, type: "string" },
  options: [],
  parts: [{ description: "", model: true, selector }],
})

export const DIAGNOSTICS = {
  BC101: {
    title: "An import the ports have no counterpart for",
    explain:
      "The frontmatter imports a module the compiler can't map to React, Solid, Svelte and Vue. It maps a sibling component (`./Name.astro`), a component of another folder (`../Folder/Name.astro`), a context module, the shared helpers (`../cx`, `../dev`, `../tag` and the other helper modules), a named import from a sibling `./` module and a named import from another folder's lowercase module. Import from one of those, or move the code into a helper module the ports import too.",
    sample: {
      astro: component(
        `${PROPS}import { marked } from "marked"\n\nconst { text, ...rest } = Astro.props\n`,
        "<div {...rest}>{marked(text)}</div>",
      ),
    },
  },
  BC102: {
    title: "A frontmatter statement the compiler can't translate",
    explain:
      "The frontmatter holds an export other than `title`, a const whose value the compiler can't carry into each port, or a statement that isn't an import, a const, a dev warning or a condition around dev warnings. Write the logic as a const the template reads, or move it into a helper module.",
    sample: {
      astro: component(
        `${PROPS}\nconst { ...rest } = Astro.props\n\nexport const tones = ["info", "warning"]\n`,
        "<div {...rest} />",
      ),
    },
  },
  BC103: {
    title: "Astro.props read outside its destructuring",
    explain:
      "The compiler reads the props from the one `const { ... } = Astro.props` destructuring. A statement that reads `Astro.props` itself has no form in the ports, since each framework receives its props its own way. Destructure what the statement needs and read the names.",
    sample: {
      astro: component(
        `${PROPS}\nconst { ...rest } = Astro.props\n\nif (Astro.props.open) rest.open = true\n`,
        "<details {...rest} />",
      ),
    },
  },
  BC104: {
    title: "A component without a Props import",
    explain:
      "The compiler takes a component's props type from `import type { Props } from \"./types.astro\"` (or a named props type from it). Import the props type from the folder's `types.astro.ts`.",
    sample: {
      astro: component(
        "const { ...rest } = Astro.props\n",
        "<div {...rest} />",
      ),
    },
  },
  BC105: {
    title: "A component that doesn't destructure Astro.props",
    explain:
      "The compiler reads the props, their defaults and the rest spread from one `const { ... } = Astro.props` destructuring. Add it, with a `...rest` for the attributes the component passes on.",
    sample: { astro: component(PROPS, '<div class="ui-sample" />') },
  },
  BC106: {
    title: "An id factory used in a form the compiler can't follow",
    explain:
      'Ids come from `createIds(Astro.locals, "prefix", id)`, called once into a const and read as `ids()` or `ids("part")`, or called inline with one part. A second call, another use of the factory, or a const named like the id base next to it has no form in the ports.',
    sample: {
      astro: component(
        `${PROPS}import { createIds } from "../id"\n\nconst { id, ...rest } = Astro.props\n\nconst ids = createIds(Astro.locals, "sample", id)\nconst hints = createIds(Astro.locals, "hint", id)\n`,
        "<div aria-describedby={hints()} id={ids()} {...rest} />",
      ),
    },
  },
  BC107: {
    title: "Fragment held as a value",
    explain:
      'A const or expression that holds `Fragment` itself only compiles as a condition between one tag and `Fragment` (`const Tag = label ? "span" : Fragment`). Write it as that condition.',
    sample: {
      astro: component(
        `${PROPS}\nconst { ...rest } = Astro.props\n\nconst Wrapper = Fragment\n`,
        "<Wrapper>\n  <div {...rest} />\n</Wrapper>",
      ),
    },
  },
  BC108: {
    title: "An event handler written as a string",
    explain:
      "React can't attach a string to an event, so a handler string has no form in the React port. Give the element the attribute through the markup, or write the behavior in a helper.",
    sample: {
      astro: component(
        `${PROPS}\nconst { ...rest } = Astro.props\n\nconst close = { onclick: "this.closest('dialog').close()" }\n`,
        '<button type="button" {...close} {...rest} />',
      ),
    },
  },
  BC109: {
    title: "A context used in a form the compiler can't follow",
    explain:
      "A component provides at most one context, and reads one with `.get()` assigned to its own const. Provide one context per component, and assign each `get()` to a const before reading it.",
    sample: {
      astro: component(
        `${PROPS}import { tabsContext } from "../Tabs/context.astro"\n\nconst { ...rest } = Astro.props\n\nconst selected = tabsContext.get()?.value\n`,
        "<div data-selected={selected} {...rest} />",
      ),
    },
  },
  BC110: {
    title: "An Astro reference the ports have no form for",
    explain:
      "The ports translate `Astro.slots.has(name)`, `Astro.locals` and the `Astro.props` destructuring. Any other `Astro.` reference, such as `Astro.url` or `Astro.slots.render()` outside the label trim, has none. Read a slot with `Astro.slots.has(name)`, and props from the destructuring.",
    sample: {
      astro: component(
        `${PROPS}\nconst { ...rest } = Astro.props\n\nconst current = Astro.url.pathname\n`,
        '<a aria-current={current === rest.href ? "page" : undefined} {...rest} />',
      ),
    },
  },
  BC111: {
    title: "A <script> with more than side-effect imports",
    explain:
      'A component\'s `<script>` may only import modules for their side effects (`import "../../elements/callout"`), which the ports import the same way. Move the code into the module it imports.',
    sample: {
      astro: component(
        `${PROPS}\nconst { ...rest } = Astro.props\n`,
        '<div {...rest}>\n  <slot />\n</div>\n\n<script>\n  document.querySelector(".ui-sample")?.focus()\n</script>',
      ),
    },
  },
  BC112: {
    title: "A group value read in a form the compiler can't follow",
    explain:
      "An item of a group (a radio or checkbox in a group) reads the group's value as `group?.value`, which the compiler turns into `group?.defaultValue` for the item's default. Read the group's value that way, and only that way.",
    sample: {
      astro: component(
        `${PROPS}import { toggleGroupContext } from "../ToggleGroup/context.astro"\nimport { isSelected } from "../ToggleGroup/selection"\n\nconst { checked, value, ...rest } = Astro.props\n\nconst group = toggleGroupContext.get()\nconst grouped = isSelected(group.value, value)\n`,
        '<input checked={grouped ?? checked} type="checkbox" value={value} {...rest} />',
      ),
    },
  },
  BC201: {
    title: "An attribute the compiler can't translate",
    explain:
      "The compiler translates static attributes, bound expressions, template literals, `class:list` and `class={cx([...])}`. Other directives (`name:value`) and other attribute forms have no form in the ports. Write the attribute as a bound expression, or the class as `class:list`.",
    sample: {
      astro: component(
        `${PROPS}\nconst { class: className, ...rest } = Astro.props\n`,
        "<div class={className} {...rest} />",
      ),
    },
  },
  BC202: {
    title: "A template expression the compiler can't translate",
    explain:
      "A `{...}` in the template compiles when it is a value, `cond && <el>`, `cond ? <a> : <b>` (each branch one element, a value, `null` or `undefined`), or a `.map()`. Split anything else into a const the template reads, or into one of those forms.",
    sample: {
      astro: component(
        `${PROPS}\nconst { items, ...rest } = Astro.props\n`,
        "<ul {...rest}>\n  {items.length > 0 ? items.map((item) => <li>{item}</li>) : <li>No items</li>}\n</ul>",
      ),
    },
  },
  BC203: {
    title: "A .map() callback the compiler can't translate",
    explain:
      "A list compiles from `items.map((item, index) => <el>)`: the item as one name or an object pattern of plain names, an optional index, consts before the return, and one element as the result, which gets the index as its key. Move other statements into a const before the list, and wrap several elements, or a condition between two, in one.",
    sample: {
      astro: component(
        `${PROPS}\nconst { items, ...rest } = Astro.props\n`,
        "<ul {...rest}>\n  {items.map((item) => {\n    if (!item) return null\n    return <li>{item}</li>\n  })}\n</ul>",
      ),
    },
  },
  BC204: {
    title: "A <slot> with attributes other than name",
    explain:
      "A `<slot>` compiles to each framework's slot with its name only. Put fallback content or other behavior around the slot, and test it with `Astro.slots.has(name)`.",
    sample: {
      astro: component(
        `${PROPS}\nconst { ...rest } = Astro.props\n`,
        '<div {...rest}>\n  <slot class="ui-icon" name="icon" />\n</div>',
      ),
    },
  },
  BC205: {
    title: "A Fragment attribute the compiler can't translate",
    explain:
      "`<Fragment>` compiles bare, with `set:html` of a rendered slot, or as a slot. Other attributes on it have no form in the ports. Move the attribute onto an element.",
    sample: {
      astro: component(
        `${PROPS}\nconst { html, ...rest } = Astro.props\n`,
        "<div {...rest}>\n  <Fragment set:html={html} />\n</div>",
      ),
    },
  },
  BC206: {
    title: "A tag the compiler can't translate",
    explain:
      "The template holds a `<script>` or `<style>` outside the component's own script, or a component that isn't imported and isn't a variable tag. Import the component, or move the script and style into the component's script and the package CSS.",
    sample: {
      astro: component(
        `${PROPS}\nconst { ...rest } = Astro.props\n`,
        "<div {...rest}>\n  <Icon />\n</div>",
      ),
    },
  },
  BC207: {
    title: "A set:html the compiler can't translate",
    explain:
      "`set:html` compiles only for a slot rendered in the frontmatter (the label trim). Raw HTML from any other value has no safe form in the ports. Render the content as a slot.",
    sample: {
      astro: component(
        `${PROPS}\nconst { html, ...rest } = Astro.props\n`,
        "<div set:html={html} {...rest} />",
      ),
    },
  },
  BC208: {
    title: "A template node the compiler can't translate",
    explain:
      "The template holds a node type the compiler has no form for, such as a doctype. Remove it, or support the node type in scripts/component-reader.mjs.",
    sample: {
      astro: component(
        `${PROPS}\nconst { ...rest } = Astro.props\n`,
        "<!doctype html>\n<div {...rest} />",
      ),
    },
  },
  BC209: {
    title: "A rest spread the compiler can't place",
    explain:
      "The `...rest` attributes go on each root element, or on one inner element, or on one of two elements picked by the same condition (`cond ? rest : {}` on one and `cond ? {} : rest` on the other). Spread it in one of those forms.",
    sample: {
      astro: component(
        `${PROPS}\nconst { ...rest } = Astro.props\n`,
        "<div>\n  <input {...rest} />\n  <input {...rest} />\n</div>",
      ),
    },
  },
  BC210: {
    title: "A template that isn't one element",
    explain:
      "A component without a rest spread on several roots renders one root element, which the ports return and Vue's attributes fall through to. Wrap the template in one element.",
    sample: {
      astro: component(
        `${PROPS}\nconst { label } = Astro.props\n`,
        '<span class="ui-sample">{label}</span>\n<span class="ui-hint">Optional</span>',
      ),
    },
  },
  BC211: {
    title: "A boolean attribute Astro writes as text",
    explain:
      'Astro writes a value bound to an HTML boolean attribute it doesn\'t list, such as `multiple`, as text, so `multiple={false}` renders `multiple="false"` and the attribute is on. Bind `true`, a string, or a value that is `undefined` when off: `multiple={multiple || undefined}`, or a conditional with an `undefined` or `null` branch.',
    sample: {
      astro: component(
        `${PROPS}\nconst { multiple, ...rest } = Astro.props\n`,
        "<select multiple={multiple} {...rest} />",
      ),
    },
  },
  BC301: {
    title: "A name a port also declares",
    explain:
      "A prop, const or import has the name a port declares for itself: `emit` in Vue, the event locals in React, the names a model kind declares in any port (`declares` in scripts/component-models.mjs), the added props in Svelte, or a value Solid reads once into a local. Rename the prop or const in the Astro file.",
    sample: {
      astro: component(
        `${PROPS}\nconst { class: className, ...rest } = Astro.props\n\nconst emit = "change"\n`,
        '<div class:list={["ui-sample", className]} data-emit={emit} {...rest} />',
      ),
      types: { astro: astroTypes(), base: EVENTS },
    },
  },
  BC302: {
    title: "A const whose $ prefix Svelte reserves",
    explain:
      "Svelte reserves names that start with `$` for its stores and runes. Rename the const in the Astro file.",
    sample: {
      astro: component(
        `${PROPS}\nconst { id, ...rest } = Astro.props\n\nconst $part = (part: string) => \`\${id}-\${part}\`\n`,
        '<div id={$part("root")} {...rest} />',
      ),
    },
  },
  BC401: {
    title: "A model the compiler can't bind",
    explain:
      "The `model` in the component's `api.ts` names a value the ports bind (`v-model`, `bind:`, a controlled prop), and the Astro file renders it in a way the model kind can't follow, so every port refuses it. Write the behavior by hand and list the files in scripts/hand-written-components.json, or extend the model kinds in scripts/component-models.mjs.",
    sample: {
      api: modelApi("checked", "input"),
      astro: component(
        `${PROPS}\nconst { checked, ...rest } = Astro.props\n`,
        '<input data-checked={checked} type="checkbox" {...rest} />',
      ),
    },
  },
  BC402: {
    title: "A model kind without an entry for every framework",
    explain:
      "The model kind the reader names has no function in `MODEL_KINDS`, or its function leaves out a framework, so every port refuses the component instead of one of them binding nothing. Give the kind an entry for React, Solid, Svelte and Vue in scripts/component-models.mjs, `NOTHING` where it adds nothing.",
    guards: "MODEL_KINDS in scripts/component-models.mjs",
  },
  BC403: {
    title: "A provided value that reads a slot",
    explain:
      "Vue doesn't track slots, and Solid resolves slots under the provider, so a provided context value can't follow a slot. Provide a value that reads only props.",
    sample: {
      astro: component(
        `${PROPS}import { tabsContext } from "../Tabs/context.astro"\n\nconst { ...rest } = Astro.props\n\nconst labelled = Astro.slots.has("label")\nconst html = await tabsContext.provide({ labelled }, () =>\n  Astro.slots.render("default"),\n)\n`,
        '<div {...rest}>\n  <slot name="label" />\n  <Fragment set:html={html} />\n</div>',
      ),
    },
  },
  BC404: {
    title: "An event on a component whose root isn't one element",
    explain:
      "The events in the folder's Events type are listened to on the root element. A root that is a component, or several roots, has no element to listen on. Render one root element, the one that fires the event, or drop the Events type from types.ts.",
    sample: {
      astro: component(
        `${PROPS}\nconst { ...rest } = Astro.props\n`,
        '<div {...rest}>\n  <slot />\n</div>\n<button type="button">Close</button>',
      ),
      types: { astro: astroTypes(), base: EVENTS },
    },
  },
  BC405: {
    title: "A provided context value that is new on every render",
    explain:
      "The React port memoizes the provided context value on what it reads. The rest props object itself, or a const that holds a function, an object or an array, is new on every render, so the memo would never hold. Read a member of the rest props (`rest.id`), destructure the attribute, or provide the primitive values the const is built from.",
    sample: {
      astro: component(
        `${PROPS}import { tabsContext } from "../Tabs/context.astro"\n\nconst { ...rest } = Astro.props\n\nconst html = await tabsContext.provide({ rest }, () =>\n  Astro.slots.render("default"),\n)\n`,
        "<div {...rest}>\n  <Fragment set:html={html} />\n</div>",
      ),
    },
  },
  BC406: {
    title: "A value model on the component's own control",
    explain:
      "A component no longer binds the value of its own `<input>`, `<select>` or `<textarea>`: the user writes the control in a `Field` and binds it with their framework's own idiom. Remove the `value` model from the component's `api.ts` and the control from the Astro file. A `checked` model of a checkbox and a `value` model of radios still bind.",
    sample: {
      api: modelApi("value", "input"),
      astro: component(
        `${PROPS}\nconst { class: className, ...rest } = Astro.props\n`,
        '<label class:list={["ui-sample", className]}>\n  <input {...rest} />\n</label>',
      ),
    },
  },
  BC501: {
    title: "A Vue attribute order the compiler can't keep",
    explain:
      "Vue merges `v-bind` objects and bound attributes in their order, so a class list or style that can come out empty next to more than one `v-bind` object, or between two spreads, can't keep the Astro order. Spread one object on the element, or move the class list after the spreads.",
    sample: {
      astro: component(
        `${PROPS}\nconst { open, ...rest } = Astro.props\n\nconst state = { "data-open": open }\n`,
        '<div {...state} class:list={[open && "ui-open"]} {...rest} />',
      ),
    },
  },
  BC502: {
    title: "A merged style on an inner element in Vue",
    explain:
      "Vue's fallthrough `style` lands on the root, so the `mergeStyle` the compiler adds for a style next to the rest spread only works on the root. Spread the rest on the root element, or drop the style.",
    sample: {
      astro: component(
        `${PROPS}import { mergeStyle } from "../style"\n\nconst { gap, style, ...rest } = Astro.props\n`,
        '<div class="ui-sample">\n  <span style={mergeStyle({ "--ui-gap": gap }, style)} {...rest} />\n</div>',
      ),
    },
  },
  BC503: {
    title: "A root attribute that reads the rest props in Vue",
    explain:
      "Vue merges the attributes that fall through after the root's own, so the caller's value wins over a root attribute computed from the rest props. Destructure the prop in the Astro file and compute the attribute from it.",
    sample: {
      astro: component(
        `${PROPS}\nconst { class: className, ...rest } = Astro.props\n`,
        '<div class:list={["ui-sample", className]} {...rest} aria-label={rest.title ?? "Sample"}>\n  <slot />\n</div>',
      ),
    },
  },
  BC504: {
    title: "A caller class Vue can't place",
    explain:
      "In Vue the caller's `class` is an attribute, not a prop. On a root that inherits the attributes, Vue adds it after the root's own classes, so the root's class list ends in `className` as a plain entry, the one the port drops. A component that passes its attributes to an inner element reads the class from `$attrs.class` in the template, so its script can't read it. Make `className` the last entry of the root's class list, or read it in the template.",
    sample: {
      astro: component(
        `${PROPS}\nconst { class: className, ...rest } = Astro.props\n`,
        '<div class:list={[className ? "ui-sample" : "ui-sample-plain"]} {...rest}>\n  <slot />\n</div>',
      ),
    },
  },
  BC601: {
    title: "A types.astro.ts without the Base import",
    explain:
      'The framework type files are built from `types.astro.ts`, which imports the folder\'s `types.ts` as `Base` (`import type * as Base from "./types"`). Add the import.',
    sample: {
      astro: WRAPPER,
      types: {
        astro:
          'import type { HTMLAttributes } from "astro/types"\n\nexport type Props = HTMLAttributes<"div">\n',
        base: BASE,
      },
    },
  },
  BC602: {
    title: "A props type the framework types can't take",
    explain:
      "Each props type in `types.astro.ts` joins `Base.<Name>` with an element's attributes from `astro/types`, and each part needs a form in every framework's types. Write the type as `Base.<Name> & HTMLAttributes<\"tag\">`, or a type the compiler already maps.",
    sample: {
      astro: WRAPPER,
      types: {
        astro: astroTypes('Extra & HTMLAttributes<"div">'),
        base: BASE,
      },
    },
  },
  BC603: {
    title: "An Events type the compiler can't read",
    explain:
      "An Events type in `types.ts` is an object type that lists each event the root element fires in lowercase letters with the type of its event object (`{ dismiss: Event }`). It is named after its props type (Events for Props, <Root><Part>Events for <Root><Part>Props), whose type starts with `Base.<Name> &`.",
    sample: {
      astro: WRAPPER,
      types: {
        astro: astroTypes(),
        base: `${BASE}\nexport type Events = {\n  valueChange: Event\n}\n`,
      },
    },
  },
  BC604: {
    title: "A Slots type the compiler can't read",
    explain:
      "A Slots type in `types.ts` names at least one slot, each slot the component renders, no name that is also a prop (except a `string | S` slot that is both), and lowercase names, since Vue writes slot names in kebab case. Fix the Slots type to match the component's slots.",
    sample: {
      astro: WRAPPER,
      types: {
        astro: astroTypes(),
        base: `${BASE}\nexport type Slots<S> = {\n  endText?: S\n}\n`,
      },
    },
  },
  BC606: {
    title: "Type files of a folder with a hand-written component",
    explain:
      "The framework type files are compiled from every component of the folder, so a folder where one component is written by hand gets hand-written type files too. List the type files in scripts/hand-written-components.json, or make the component compile.",
    sample: {
      astro: component(
        `${PROPS}\nconst { html, ...rest } = Astro.props\n`,
        "<div set:html={html} {...rest} />",
      ),
      types: { astro: astroTypes(), base: BASE },
    },
  },
  BC607: {
    title: "A link component type the compiler can't place",
    explain:
      "A props type whose `as` takes a framework's link component declares a type parameter `Link = never`, since Astro and Svelte take element names only, while React, Solid and Vue pass their link component type. Such an `as` can't sit next to a model. Write `Link = never`, and keep the link component off a component with a model.",
    sample: {
      astro: WRAPPER,
      types: {
        astro: astroTypes('HTMLAttributes<"a">'),
        base: 'export type Props<Link> = {\n  as?: "a" | Link\n}\n',
      },
    },
  },
  BC608: {
    title: "A props type that joins two elements' attributes",
    explain:
      'A component that renders one of two elements types each with its own attributes. Joined with `&`, the attributes of two elements give a `ref` and event handlers typed for both at once, which no ref or handler satisfies in React and Solid. Write a union with one member per element, told apart by a prop, as Button does with `href`: `(Base.Props & { href?: never } & HTMLAttributes<"button">) | (Base.Props & { href: string } & HTMLAttributes<"a">)`.',
    sample: {
      astro: WRAPPER,
      types: {
        astro: astroTypes('HTMLAttributes<"button"> & HTMLAttributes<"a">'),
        base: BASE,
      },
    },
  },
  BC701: {
    title: "An expression the Nunjucks compiler can't write",
    explain:
      "The Nunjucks compiler (`scripts/component-nunjucks.mjs`) translates each expression into Nunjucks syntax, which has no arrow functions, spreads, `typeof`, `new`, regular expressions, assignments, optional calls or globals such as `Intl` and `Math`. Move the logic into a helper in `packages/opui/components/` and call it, or write the expression with the operators the translator takes.",
    sample: {
      astro: component(
        `${PROPS}\nconst { value, ...rest } = Astro.props\n\nconst count = Math.max(Number(value), 1)\n`,
        "<div {...rest}>{count}</div>",
      ),
      file: TABS_FILE,
    },
  },
  BC702: {
    title: "A helper the Nunjucks runtime doesn't register",
    explain:
      "The Nunjucks macros call helpers through the `opui` global, which `packages/opui/nunjucks/macros.ts` fills with the helpers of the shared modules in `packages/opui/components/` that `scripts/component-nunjucks.mjs` finds. Export the helper from one of those modules, or import it from one.",
    sample: {
      astro: component(
        `${PROPS}import { selectionOf } from "../ToggleGroup/selection"\n\nconst { value, ...rest } = Astro.props\n\nconst selected = selectionOf(undefined, false, value)\n`,
        "<div data-selected={selected} {...rest} />",
      ),
      file: TABS_FILE,
    },
  },
  BC703: {
    title: "A context provided around a named slot in Nunjucks",
    explain:
      "A named slot reaches a Nunjucks macro as content captured with `{% set %}`, which renders before the macro runs, so a context the macro provides can't reach it. Only the default slot, the macro's `caller()`, renders inside the macro, and the prototype provides the context around that call alone, so a fallback for the provided default slot is refused too. Provide the context around the default slot, and move its fallback out of the provided slot.",
    sample: {
      astro: component(
        `${PROPS}import { tabsContext } from "./context.astro"\n\nconst { value, ...rest } = Astro.props\n\nconst html = await tabsContext.provide({ value }, () =>\n  Astro.slots.render("panels"),\n)\n`,
        "<div {...rest}>\n  <Fragment set:html={html} />\n</div>",
      ),
      file: TABS_FILE,
    },
  },
  BC704: {
    title: "A named slot passed to an inner component in Nunjucks",
    explain:
      "The Nunjucks compiler writes an inner component as a `{% call %}` of its macro, whose body is the inner component's default slot. A child with a `slot` attribute fills one of its named slots, which a macro reads from `props.slots`, and the compiler doesn't yet capture it there. Pass the content in the default slot, or teach `scripts/component-nunjucks.mjs` to capture it with `{% set %}` into `slots`.",
    sample: {
      astro: component(
        `${PROPS}import Button from "../Button/Button.astro"\n\nconst { ...rest } = Astro.props\n`,
        '<div {...rest}>\n  <Button>\n    <svg aria-hidden="true" slot="icon" />\n    Add tab\n  </Button>\n</div>',
      ),
      file: TABS_FILE,
    },
  },
  BC705: {
    title: "A name Nunjucks or the Nunjucks compiler reserves",
    explain:
      "A Nunjucks macro reads its props from `props`, its default slot from `caller`, the helpers from `opui` and the loop state from `loop`, and the compiler names its own values with a `__` prefix, so a local or prop with one of those names or a Nunjucks keyword (`and`, `else`, `false`, `if`, `in`, `is`, `none`, `not`, `null`, `or`, `true`) can't be written. Rename the local.",
    sample: {
      astro: component(
        `${PROPS}\nconst { value, ...rest } = Astro.props\n\nconst loop = value ?? "none"\n`,
        "<div {...rest}>{loop}</div>",
      ),
      file: TABS_FILE,
    },
  },
  BC706: {
    title: "A props type the Nunjucks prototype can't read",
    explain:
      "The Nunjucks prototype reads the kinds of a component's props from the type its `.astro` file imports from `./types.astro`, through the TypeScript checker (`astroPropsOf` in `scripts/example-react-props.mjs`). It decides with them where a value prints through `| opuiText` and compares with `==`, and `opuiRest` warns with them about unknown props. Export the imported type from the folder's `types.astro.ts`, as a type alias or a re-export.",
    sample: {
      astro: component(
        'import type { SampleProps } from "./types.astro"\n\nconst { value, ...rest } = Astro.props\n',
        "<div {...rest}>{value}</div>",
      ),
      file: TABS_FILE,
    },
  },
}

const sampleText = ({ api, astro, file = SAMPLE_FILE, types }) => {
  const folder = file.slice(0, file.lastIndexOf("/") + 1)
  return [
    `For example, ${file}${api ? `, whose api.ts declares the ${api.model.prop} model` : ""}:`,
    astro,
    ...(types
      ? [
          `with ${folder}types.ts:`,
          types.base,
          `and ${folder}types.astro.ts:`,
          types.astro,
        ]
      : []),
  ]
    .map((part) => part.trimEnd())
    .join("\n\n")
}

export const explain = (code) => {
  const diagnostic = DIAGNOSTICS[code]
  if (!diagnostic) {
    return `${code} is no build-components code. The codes are ${Object.keys(DIAGNOSTICS).join(", ")}.`
  }
  return [
    `${code}: ${diagnostic.title}`,
    diagnostic.explain,
    diagnostic.sample
      ? sampleText(diagnostic.sample)
      : `No source reaches it: it guards ${diagnostic.guards}.`,
  ].join("\n\n")
}

export const diagnosticProblems = (sources, diagnostics = DIAGNOSTICS) => {
  const used = new Set()
  const problems = Object.entries(sources).flatMap(([file, source]) =>
    [...source.matchAll(/\bunsupported\(\s*([^,\s)]+)/g)].flatMap(
      ({ 0: call, 1: argument, index }) => {
        const line = source.slice(0, index + call.length).split("\n").length
        const code = /^"(BC\d{3})"$/.exec(argument)?.[1]
        if (!code) {
          return [
            `${file}:${line} calls unsupported() without a code: pass a code from scripts/component-diagnostics.mjs first`,
          ]
        }
        used.add(code)
        return code in DIAGNOSTICS
          ? []
          : [
              `${file}:${line} uses ${code}, which scripts/component-diagnostics.mjs doesn't list`,
            ]
      },
    ),
  )
  const codes = Object.keys(diagnostics)
  return [
    ...problems,
    ...Object.entries(diagnostics)
      .filter(([, diagnostic]) => !diagnostic.sample === !diagnostic.guards)
      .map(
        ([code]) =>
          `${code} in scripts/component-diagnostics.mjs needs a sample the compiler refuses with it, or, when no source reaches it, the table it guards`,
      ),
    ...(codes.every((code, index) => !index || codes[index - 1] < code)
      ? []
      : ["scripts/component-diagnostics.mjs lists its codes out of order"]),
    ...codes
      .filter((code) => !used.has(code))
      .map(
        (code) =>
          `${code} in scripts/component-diagnostics.mjs is never thrown: remove it`,
      ),
  ]
}
