import { readFileSync } from "node:fs"
import { readdir } from "node:fs/promises"
import { join, relative } from "node:path"
import { fileURLToPath } from "node:url"
import { parseArgs } from "node:util"
import ts from "typescript"
import {
  at,
  COMPILER,
  dict,
  KEYWORDS,
  LEVEL,
  nunjucksKey,
  nunjucksName,
  nunjucksString,
  nunjucksStatement,
  nunjucksValue,
  slotPresent,
  slotRead,
} from "./component-nunjucks-expression.mjs"
import { readComponent } from "./component-reader.mjs"
import {
  codesIn,
  identifiersIn,
  itemBinding,
  PRESERVED_TAGS,
  root,
  sourceFileOf,
  unsupported,
} from "./component-shared.mjs"
import { baseTypesOf } from "./component-types.mjs"
import { VOID_ELEMENTS } from "./html-tokens.mjs"
import { HELPERS } from "./nunjucks-runtime.mjs"

const RESERVED = new Set([
  "caller",
  "loop",
  "opui",
  "props",
  "undefined",
  ...KEYWORDS,
])

const BOOLEAN_ATTRIBUTES = new Set([
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "disablepictureinpicture",
  "disableremoteplayback",
  "formnovalidate",
  "inert",
  "itemscope",
  "loop",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "scoped",
  "seamless",
  "selected",
])

const SERIALIZED_ATTRIBUTES = new Set([
  "download",
  "hidden",
  "popover",
  "style",
])

const LINE = 80

const indent = (depth) => "  ".repeat(depth)

const TEMPLATE_START = /\{(?=[{%#])/g

const text = (value) => value.replace(TEMPLATE_START, '{{ "{" }}')

const attributeValue = (value) =>
  text(value.replace(/&/g, "&amp;").replace(/"/g, "&quot;"))

const importedNames = (lines) =>
  lines.flatMap((line) =>
    (/\{([^}]*)\}/.exec(line)?.[1] ?? "")
      .split(",")
      .map((name) =>
        name
          .trim()
          .split(/\s+as\s+/)
          .at(-1),
      )
      .filter(Boolean),
  )

const trimmedTag = (tag, { after = true, before = true } = {}) =>
  `${tag.slice(0, 2)}${before ? "-" : ""}${tag.slice(2, -2)}${after ? "-" : ""}${tag.slice(-2)}`

const isStringType = (node) =>
  node.kind === ts.SyntaxKind.StringKeyword ||
  node.kind === ts.SyntaxKind.UndefinedKeyword ||
  (ts.isLiteralTypeNode(node) &&
    (ts.isStringLiteral(node.literal) ||
      node.literal.kind === ts.SyntaxKind.NullKeyword)) ||
  (ts.isParenthesizedTypeNode(node) && isStringType(node.type)) ||
  (ts.isUnionTypeNode(node) && node.types.every(isStringType))

export const stringPropsOf = (base, name, folder) => {
  if (!base) return new Set()
  const aliases = sourceFileOf(base, "types.ts").statements.filter(
    ts.isTypeAliasDeclaration,
  )
  const strings = new Set()
  const others = new Set()
  const visit = (node) => {
    if (ts.isIntersectionTypeNode(node) || ts.isUnionTypeNode(node)) {
      node.types.forEach(visit)
    } else if (ts.isParenthesizedTypeNode(node)) {
      visit(node.type)
    } else if (ts.isTypeReferenceNode(node)) {
      const alias = aliases.find(
        (item) => item.name.text === node.typeName.getText(),
      )
      if (alias) visit(alias.type)
    } else if (ts.isTypeLiteralNode(node)) {
      for (const member of node.members) {
        if (!ts.isPropertySignature(member) || !member.type) continue
        const key = member.name.getText().replace(/^["']|["']$/g, "")
        ;(isStringType(member.type) ? strings : others).add(key)
      }
    }
  }
  const alias = aliases.find(
    (item) => item.name.text === (name === folder ? "Props" : `${name}Props`),
  )
  if (alias) visit(alias.type)
  return new Set([...strings].filter((key) => !others.has(key)))
}

const layoutList = (open, items, close, depth, pad = "") => {
  if (!items.length) return `${open}${close}`
  const flat = `${open}${pad}${items.join(", ")}${pad}${close}`
  if (!flat.includes("\n") && indent(depth).length + flat.length <= LINE) {
    return flat
  }
  return `${open}\n${items
    .map((item) => `${indent(depth + 1)}${item}`)
    .join(",\n")}\n${indent(depth)}${close}`
}

const block = (open, body, close, depth, sets = []) => {
  const startsBlank = /^\s/.test(body)
  const endsBlank = /\s$/.test(body)
  if (!sets.length && (startsBlank || endsBlank || !body.includes("\n"))) {
    return `${open}${body}${close}`
  }
  const head = sets.length
    ? `${open}${sets
        .map(
          (line, index) =>
            `\n${indent(depth + 1)}${trimmedTag(line, {
              after: !(startsBlank && index === sets.length - 1),
            })}`,
        )
        .join("")}`
    : trimmedTag(open, { before: false })
  return `${head}${startsBlank ? "" : `\n${indent(depth + 1)}`}${body}${
    endsBlank
      ? close
      : `\n${indent(depth)}${trimmedTag(close, { after: false })}`
  }`
}

const lowerFirst = (name) => `${name[0].toLowerCase()}${name.slice(1)}`

const camel = (name) =>
  name.replace(/[-:]+(\w)/g, (_, letter) => letter.toUpperCase())

export const toNunjucks = (component, { strings = new Set() } = {}) => {
  const { file } = component
  const reserve = (name) => {
    if (RESERVED.has(name) || name.startsWith("__")) {
      throw unsupported(
        "BC705",
        file,
        `the name ${name}`,
        "rename the local",
        COMPILER,
      )
    }
    return name
  }
  const defaulted = component.props.filter((prop) => prop.default !== undefined)
  const locals = new Set(
    [
      component.rest,
      ...defaulted.map((prop) => prop.local),
      ...component.reads.map((read) => read.name),
      ...component.trimmedSlots.map((slot) => slot.local),
      ...component.derived.map((value) => value.name),
    ]
      .filter(Boolean)
      .map(reserve),
    COMPILER,
  )
  const taken = new Set([...locals, ...RESERVED])
  const fresh = (...names) => {
    const name =
      names.find((item) => !taken.has(item)) ?? `${names[0]}${taken.size}`
    taken.add(name)
    return name
  }
  const named = new Map()
  const nameFor = (item, ...names) => {
    if (!named.has(item)) named.set(item, fresh(...names))
    return named.get(item)
  }
  const used = new Set()
  const scope = {
    file,
    helpers: new Set(Object.keys(HELPERS)),
    idBases: new Map(component.idBases),
    idPrefixes: new Set(component.idPrefixes),
    imports: new Set(importedNames(component.imports)),
    locals,
    numbers: new Set(),
    props: new Map(
      component.props
        .filter((prop) => prop.default === undefined)
        .map((prop) => [prop.local, prop.prop]),
    ),
    strings: new Set(
      component.props
        .filter((prop) => strings.has(prop.prop))
        .map((prop) => prop.local),
    ),
  }
  const value = (code, inner = scope) => nunjucksValue(code, inner)
  const expression = (code, inner = scope) => value(code, inner).text
  const contextKey = (context) => {
    const folder = context.folder ?? component.folder
    return folder === context.name ? context.name : `${folder}/${context.name}`
  }
  const provided = component.provide
    ? fresh(lowerFirst(component.provide.context.name), "provided")
    : undefined
  const hoisted = []
  const preamble = [
    ...(component.rest
      ? [
          `{% set ${component.rest} = props | opuiOmit([${[
            ...component.props.map((prop) => prop.prop),
            "slots",
          ]
            .map(nunjucksString)
            .join(", ")}]) %}`,
        ]
      : []),
    ...defaulted.map(({ default: initial, local, prop }) => {
      const read = `props${nunjucksName(prop)}`
      return `{% set ${local} = ${read} if ${read} is defined else ${at(value(initial), LEVEL.or)} %}`
    }),
    ...component.reads.map(
      ({ context, name }) =>
        `{% set ${name} = opui.context(${nunjucksString(contextKey(context))}) %}`,
    ),
    ...component.trimmedSlots.map(({ local, slot }) => {
      const read = slotRead(slot)
      return `{% set ${local} = ${read} | opuiTrim if ${read} != none else "" %}`
    }),
    ...component.derived.map(
      ({ code, name }) => `{% set ${name} = ${expression(code)} %}`,
    ),
    ...component.warnings.map((code) => nunjucksStatement(code, scope)),
    ...(component.item
      ? [
          nunjucksStatement(
            `warnGroupedChecked(${JSON.stringify(component.name)}, ${component.item.grouped}, ${component.item.checked ?? "undefined"}, ${JSON.stringify(component.item.group)})`,
            scope,
          ),
        ]
      : []),
    ...(component.provide
      ? [
          `{% set ${provided} = ${dict(
            component.provide.value.map(({ code, key }) => [
              key,
              expression(code),
            ]),
          )} %}`,
        ]
      : []),
  ]
  const isSimple = (translated) =>
    translated.level === LEVEL.primary && !translated.text.includes("(")
  const isLiteral = (code) =>
    /^(?:"[^"\\]*"|'[^'\\]*'|\d+(?:\.\d+)?)$/.test(code.trim())
  const templateOutput = (node, inner, sourceFile, covered) => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      return attributeValue(node.text)
    }
    if (!ts.isTemplateExpression(node)) return undefined
    const spans = node.templateSpans.map((span) =>
      expression(span.expression.getText(sourceFile), inner),
    )
    if (spans.every((span) => covered.includes(span))) {
      return `${attributeValue(node.head.text)}${node.templateSpans
        .map(
          (span, index) =>
            `{{ ${spans[index]} }}${attributeValue(span.literal.text)}`,
        )
        .join("")}`
    }
    return `{{ ${expression(node.getText(sourceFile), inner)} }}`
  }
  const classTokens = (code, inner, multiline) => {
    const sourceFile = sourceFileOf(`(${code})`, "class.ts")
    const list = sourceFile.statements[0]?.expression
    const array =
      list && ts.isParenthesizedExpression(list) ? list.expression : list
    if (!array || !ts.isArrayLiteralExpression(array)) return undefined
    const entries = []
    for (const element of array.elements) {
      if (ts.isStringLiteral(element)) {
        if (element.text) entries.push({ text: element.text })
        continue
      }
      if (ts.isObjectLiteralExpression(element)) {
        for (const property of element.properties) {
          if (
            !ts.isPropertyAssignment(property) ||
            !(
              ts.isStringLiteral(property.name) ||
              ts.isIdentifier(property.name)
            )
          ) {
            return undefined
          }
          entries.push({
            test: value(property.initializer.getText(sourceFile), inner),
            text: property.name.text,
          })
        }
        continue
      }
      if (
        ts.isBinaryExpression(element) &&
        element.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken
      ) {
        const shown = element.right
        const conjuncts = []
        const collect = (node) => {
          if (
            ts.isBinaryExpression(node) &&
            node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken
          ) {
            collect(node.left)
            collect(node.right)
          } else {
            conjuncts.push(expression(node.getText(sourceFile), inner))
          }
        }
        collect(element.left)
        const output = templateOutput(shown, inner, sourceFile, conjuncts)
        if (output !== undefined) {
          entries.push({
            output,
            test: value(element.left.getText(sourceFile), inner),
          })
          continue
        }
      }
      if (ts.isTemplateExpression(element)) {
        const output = templateOutput(element, inner, sourceFile, [])
        if (
          output !== undefined &&
          (element.head.text ||
            element.templateSpans.some((span) => span.literal.text))
        ) {
          entries.push({ output })
          continue
        }
      }
      if (ts.isConditionalExpression(element)) {
        const [whenTrue, whenFalse] = [element.whenTrue, element.whenFalse]
        if (
          ts.isStringLiteral(whenTrue) &&
          ts.isStringLiteral(whenFalse) &&
          whenTrue.text &&
          whenFalse.text
        ) {
          entries.push({
            output: `{{ ${expression(element.getText(sourceFile), inner)} }}`,
          })
          continue
        }
      }
      const shown = value(element.getText(sourceFile), inner)
      if (!isSimple(shown)) return undefined
      entries.push({ output: `{{ ${shown.text} }}`, test: shown })
    }
    if (!entries.length || entries[0].test) {
      if (entries.length !== 1) return undefined
      const [{ output, test, text: name }] = entries
      return [
        `{% if ${test.text} %} class="${output ?? attributeValue(name)}"{% endif %}`,
      ]
    }
    const parts = entries.map(({ output, test, text: name }, index) => {
      const shown = output ?? attributeValue(name)
      if (!test) return `${index ? " " : ""}${shown}`
      return `{%- if ${test.text} %} ${shown}{% endif %}`
    })
    const [first, ...rest] = parts
    return [
      ` class="${first}${rest
        .map((part) =>
          part.startsWith("{%-")
            ? multiline
              ? `\n${multiline}${part}`
              : part.replace("{%-", "{%")
            : part,
        )
        .join("")}"`,
    ]
  }
  const attributeTokens = (node, inner, sets, multiline) => {
    const tokens = []
    for (const item of node.attributes) {
      if (item.kind === "static") {
        tokens.push(` ${item.name}="${attributeValue(item.value)}"`)
        continue
      }
      if (item.kind === "boolean") {
        tokens.push(` ${item.name}`)
        continue
      }
      if (item.kind === "class") {
        const built = classTokens(item.code, inner, multiline)
        if (built) {
          tokens.push(...built)
          continue
        }
        const name = nameFor(item, "classes", "classNames")
        sets.push(
          `{% set ${name} = ${at(value(item.code, inner), LEVEL.filter)} | opuiClass %}`,
        )
        tokens.push(`{% if ${name} %} class="{{ ${name} }}"{% endif %}`)
        continue
      }
      if (item.kind === "spread") {
        const spread = at(value(item.code, inner), LEVEL.filter)
        const written = `{{ ${spread} | opuiAttributes }}`
        if (item.condition === undefined) {
          tokens.push(written)
          continue
        }
        const condition = value(item.condition, inner)
        tokens.push(
          `{% if ${item.negated ? `not ${at(condition, LEVEL.not)}` : condition.text} %}${written}{% endif %}`,
        )
        continue
      }
      if (isLiteral(item.code)) {
        const literal = item.code.trim().replace(/^["']|["']$/g, "")
        tokens.push(` ${item.name}="${attributeValue(literal)}"`)
        continue
      }
      let shown = value(item.code, inner)
      if (SERIALIZED_ATTRIBUTES.has(item.name)) {
        tokens.push(`{{ ${dict([[item.name, shown.text]])} | opuiAttributes }}`)
        continue
      }
      if (!isSimple(shown)) {
        const name = nameFor(item, camel(item.name), `${camel(item.name)}Value`)
        sets.push(`{% set ${name} = ${shown.text} %}`)
        shown = { level: LEVEL.primary, text: name }
      }
      tokens.push(
        BOOLEAN_ATTRIBUTES.has(item.name)
          ? `{% if ${shown.text} %} ${item.name}{% endif %}`
          : `{% if ${shown.text} != none %} ${item.name}="{{ ${shown.text} }}"{% endif %}`,
      )
    }
    return tokens
  }
  const classList = (code, inner, depth) => {
    const sourceFile = sourceFileOf(`(${code})`, "class.ts")
    const list = sourceFile.statements[0]?.expression
    const array =
      list && ts.isParenthesizedExpression(list) ? list.expression : list
    if (
      !array ||
      !ts.isArrayLiteralExpression(array) ||
      array.elements.some((element) => ts.isSpreadElement(element))
    ) {
      return `${at(value(code, inner), LEVEL.filter)} | opuiClass`
    }
    return `${layoutList(
      "[",
      array.elements.map((element) =>
        expression(element.getText(sourceFile), inner),
      ),
      "]",
      depth,
    )} | opuiClass`
  }
  const mergedProps = (node, inner, depth) => {
    const parts = []
    let entries = []
    const flush = () => {
      if (entries.length) parts.push(entries)
      entries = []
    }
    for (const item of node.attributes) {
      if (item.kind === "static") {
        entries.push([item.name, nunjucksString(item.value)])
      } else if (item.kind === "boolean") {
        entries.push([item.name, "true"])
      } else if (item.kind === "class") {
        entries.push(["class", (at) => classList(item.code, inner, at)])
      } else if (item.kind === "expression") {
        entries.push([item.name, expression(item.code, inner)])
      } else {
        flush()
        const spread = expression(item.code, inner)
        const chosen =
          item.condition === undefined
            ? spread
            : item.negated
              ? `{} if ${at(value(item.condition, inner), LEVEL.or)} else ${spread}`
              : `${spread} if ${at(value(item.condition, inner), LEVEL.or)} else {}`
        parts.push(item.defined ? `opui.defined(${chosen})` : chosen)
      }
    }
    flush()
    const written = (part, at) =>
      typeof part === "string"
        ? part
        : layoutList(
            "{",
            part.map(
              ([key, shown]) =>
                `${nunjucksKey(key)}: ${typeof shown === "function" ? shown(at + 1) : shown}`,
            ),
            "}",
            at,
            " ",
          )
    if (parts.length === 0) return "{}"
    if (
      parts.length === 1 &&
      (typeof parts[0] !== "string" || !/ if /.test(parts[0]))
    ) {
      return written(parts[0], depth)
    }
    return layoutList(
      "opui.merge(",
      parts.map((part) => written(part, depth + 1)),
      ")",
      depth,
    )
  }
  const slotNode = (node, ctx) => {
    if (node.name === "default") {
      if (component.provide?.slot === "default") {
        return `{{ opui.provide(${nunjucksString(contextKey(component.provide.context))}, ${provided}, caller) }}`
      }
      return node.fallback.length
        ? `{% if caller is defined %}{{ caller() }}{% else %}${emit(node.fallback, { ...ctx, hoist: false })}{% endif %}`
        : "{{ caller() if caller }}"
    }
    if (component.provide?.slot === node.name) {
      throw unsupported(
        "BC703",
        file,
        `a context provided around the slot ${node.name}`,
        "provide the context around the default slot",
        COMPILER,
      )
    }
    const trimmed = component.trimmedSlots.find(
      (item) => item.slot === node.name,
    )
    if (node.trimmed && trimmed) return `{{ ${trimmed.local} }}`
    const read = slotRead(node.name)
    return node.fallback.length
      ? `{% if ${slotPresent(node.name).text} %}{{ ${read} | safe }}{% else %}${emit(node.fallback, { ...ctx, hoist: false })}{% endif %}`
      : `{{ ${read} | safe }}`
  }
  const loopNode = (node, ctx) => {
    const binding = itemBinding(node.item)
    if (!binding) {
      throw unsupported(
        "BC701",
        file,
        `the loop item ${node.item}`,
        "name the item and read its fields in the loop",
        COMPILER,
      )
    }
    const fields = binding.name
      ? []
      : [...binding.fields.map(({ local }) => local), binding.rest].filter(
          Boolean,
        )
    const names = [
      binding.name,
      ...fields,
      node.index,
      ...node.consts.map(({ name }) => name),
    ]
      .filter(Boolean)
      .map(reserve)
    names.forEach((name) => taken.add(name))
    const item = binding.name ?? nameFor(node, "item", "entry", "row")
    const indexUsed =
      !!node.index &&
      [...codesIn(node.children), ...node.consts.map(({ code }) => code)].some(
        (code) => identifiersIn(code).has(node.index),
      )
    const inner = {
      ...ctx.scope,
      locals: new Set([...ctx.scope.locals, item, ...names]),
      numbers: new Set([
        ...ctx.scope.numbers,
        ...(node.index ? [node.index] : []),
      ]),
    }
    const sets = [
      ...(binding.name
        ? []
        : [
            ...binding.fields.map(
              ({ key, local }) =>
                `{% set ${local} = ${item}${nunjucksName(key)} %}`,
            ),
            ...(binding.rest
              ? [
                  `{% set ${binding.rest} = ${item} | opuiOmit([${binding.fields
                    .map(({ key }) => nunjucksString(key))
                    .join(", ")}]) %}`,
                ]
              : []),
          ]),
      ...(indexUsed ? [`{% set ${node.index} = loop.index0 %}`] : []),
      ...node.consts.map(
        ({ code, name }) => `{% set ${name} = ${expression(code, inner)} %}`,
      ),
    ]
    return block(
      `{% for ${item} in ${expression(node.list, ctx.scope)} %}`,
      emit(
        node.children,
        { ...ctx, depth: ctx.depth + 1, hoist: false, scope: inner },
        true,
      ),
      "{% endfor %}",
      ctx.depth,
      sets,
    )
  }
  const componentNode = (node, ctx) => {
    const named = node.children.find(
      (item) =>
        item.type === "element" &&
        item.attributes.some(
          (attribute) =>
            attribute.kind === "static" && attribute.name === "slot",
        ),
    )
    if (named) {
      throw unsupported(
        "BC704",
        file,
        `a named slot passed to ${node.tag}`,
        "pass the content in the inner component's default slot, or teach the prototype to capture it into props.slots",
        COMPILER,
      )
    }
    used.add(node.tag)
    const props = mergedProps(node, ctx.scope, ctx.depth)
    if (node.children.length === 0) return `{{ ${node.tag}(${props}) }}`
    return `{% call ${node.tag}(${props}) %}${emit(node.children, { ...child(ctx), hoist: false }, true)}{% endcall %}`
  }
  const child = (ctx) => ({ ...ctx, depth: ctx.depth + 1 })
  const elementNode = (node, ctx) => {
    if (node.component) return componentNode(node, ctx)
    const inner = child(ctx)
    const variable = node.variable || node.custom
    const tag = node.variable
      ? `{{ ${at(value(node.tag, ctx.scope), LEVEL.filter)} | opuiTag }}`
      : node.tag
    const sets = []
    const layout = (multiline) => {
      if (variable) {
        const props = mergedProps(node, ctx.scope, ctx.depth)
        const tagName = node.variable
          ? expression(node.tag, ctx.scope)
          : nunjucksString(node.tag)
        return props === "{}"
          ? []
          : [`{{ ${props} | opuiAttributes(${tagName}) }}`]
      }
      return attributeTokens(node, ctx.scope, sets, multiline)
    }
    let tokens = layout(undefined)
    const single = `<${tag}${tokens.join("")}>`
    if (single.length + indent(ctx.depth).length > LINE && tokens.length > 1) {
      sets.length = 0
      tokens = layout(indent(inner.depth + 1))
      tokens = tokens.map((token) => {
        const line = `\n${indent(inner.depth)}`
        if (token.startsWith("{%"))
          return `${line}${trimmedTag(token, { after: false })}`
        if (token.startsWith("{{"))
          return `${line}${trimmedTag(token, { after: false })}`
        return `${line}${token.slice(1)}`
      })
    }
    const before = sets.length
      ? ctx.hoist
        ? (hoisted.push(...sets), "")
        : sets.join("")
      : ""
    const open = `${before}<${tag}${tokens.join("")}`
    if (node.children.length === 0 && !variable) {
      if (VOID_ELEMENTS.has(node.tag)) return `${open}>`
      if (node.foreign) return `${open}/>`
    }
    const children = node.external
      ? ""
      : emit(
          node.children,
          {
            ...inner,
            preserved: ctx.preserved || PRESERVED_TAGS.has(node.tag),
          },
          true,
        )
    return `${open}>${children}</${tag}>`
  }
  const textNode = (node, ctx, last) => {
    if (ctx.preserved) return text(node.value)
    const value = text(node.value).replace(/\n/g, `\n${indent(ctx.depth)}`)
    return last && /\n[ ]*$/.test(value)
      ? value.replace(/\n[ ]*$/, `\n${indent(Math.max(ctx.depth - 1, 0))}`)
      : value
  }
  const emit = (nodes, ctx, closing = false) =>
    nodes
      .map((node, index) => {
        if (node.type === "text") {
          return textNode(node, ctx, closing && index === nodes.length - 1)
        }
        if (node.type === "expression") {
          return `{{ ${expression(node.code, ctx.scope)} }}`
        }
        if (node.type === "slot") return slotNode(node, ctx)
        if (node.type === "if") {
          const inner = { ...ctx, hoist: false }
          const test = expression(node.test, ctx.scope)
          if (node.alternate) {
            return `{% if ${test} %}${emit(node.consequent, inner)}{% else %}${emit(node.alternate, inner)}{% endif %}`
          }
          const consequent = emit(node.consequent, inner)
          return consequent.includes("\n") && consequent.length > LINE
            ? block(
                `{% if ${test} %}`,
                emit(node.consequent, { ...inner, depth: ctx.depth + 1 }, true),
                "{% endif %}",
                ctx.depth,
              )
            : `{% if ${test} %}${consequent}{% endif %}`
        }
        if (node.type === "each") return loopNode(node, ctx)
        return elementNode(node, ctx)
      })
      .join("")
  const body = emit(component.tree, {
    depth: 1,
    hoist: true,
    preserved: false,
    scope,
  })
  const imports = component.components
    .filter((inner) => used.has(inner.local))
    .map(
      (inner) =>
        `{% from "opui/${inner.name}.njk" import ${inner.name}${inner.local === inner.name ? "" : ` as ${inner.local}`} %}\n`,
    )
    .toSorted()
    .join("")
  const lines = [...preamble, ...hoisted]
  const head = `{% macro ${component.name}(props = {}) %}`
  const startsBlank = /^\s/.test(body)
  const endsBlank = /\s$/.test(body)
  const opening = lines.length
    ? `${head}\n${lines
        .map(
          (line, index) =>
            `${indent(1)}${trimmedTag(line, { after: !(startsBlank && index === lines.length - 1) })}`,
        )
        .join("\n")}`
    : startsBlank
      ? head
      : trimmedTag(head, { before: false })
  const separator = startsBlank ? "" : `\n${indent(1)}`
  const closing = endsBlank ? "{% endmacro %}" : "\n{%- endmacro %}"
  return `${imports}${imports ? "\n" : ""}${opening}${separator}${body}${closing}\n`
}

export const compileNunjucks = async (source, file) => {
  const parts = file.split("/")
  const name = parts.at(-1).replace(/\.astro$/, "")
  const folder = parts.at(-2)
  const component = await readComponent(source, file)
  return toNunjucks(
    { ...component, file, folder, name },
    { strings: stringPropsOf(baseTypesOf(file), name, folder) },
  )
}

export const nunjucksTemplates = async (files) =>
  Object.fromEntries(
    await Promise.all(
      files.map(async (file) => [
        `opui/${file
          .split("/")
          .at(-1)
          .replace(/\.astro$/, "")}.njk`,
        await compileNunjucks(readFileSync(join(root, file), "utf8"), file),
      ]),
    ),
  )

const componentsDir = join(root, "packages/opui/components")

export const componentFiles = async () =>
  (await readdir(componentsDir, { recursive: true }))
    .filter((file) => /^[A-Z][^/]*\/[A-Z][^/]*\.astro$/.test(file))
    .map((file) => relative(root, join(componentsDir, file)))
    .toSorted()

export const nunjucksCensus = async () => {
  const compiled = []
  const refused = []
  for (const file of await componentFiles()) {
    try {
      await compileNunjucks(readFileSync(join(root, file), "utf8"), file)
      compiled.push(file)
    } catch (error) {
      if (!error.code) throw error
      refused.push({ code: error.code, file, message: error.message })
    }
  }
  return { compiled, refused }
}

const report = ({ compiled, refused }) => {
  const codes = [...new Set(refused.map(({ code }) => code))].toSorted()
  return [
    `${compiled.length} of ${compiled.length + refused.length} components compile to Nunjucks macros.${refused.length ? " The first construct each refused file can't compile:" : ""}`,
    ...codes.flatMap((code) => {
      const files = refused.filter((item) => item.code === code)
      return [
        "",
        `${code} (${files.length})`,
        ...files.map(
          ({ file, message }) =>
            `  ${file}: ${(/ uses ([\s\S]*?), which /.exec(message)?.[1] ?? message).replace(/\s+/g, " ")}`,
        ),
      ]
    }),
  ].join("\n")
}

const main = async () => {
  const { values } = parseArgs({
    options: { print: { type: "string" }, report: { type: "boolean" } },
  })
  if (values.print) {
    const file = (await componentFiles()).find((item) =>
      item.endsWith(`/${values.print}.astro`),
    )
    if (!file) throw new Error(`No component ${values.print}`)
    process.stdout.write(
      await compileNunjucks(readFileSync(join(root, file), "utf8"), file),
    )
    return
  }
  if (values.report) {
    console.log(report(await nunjucksCensus()))
    return
  }
  console.log(
    "Usage: node scripts/component-nunjucks.mjs --print <Name> | --report",
  )
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main()
