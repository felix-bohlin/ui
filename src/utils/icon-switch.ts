import { ICON_ROLES, iconUrl } from "./icon-libraries"

export type IconSwitch = {
  samples: Record<string, string>
  tokens: Record<string, string>
}

export const iconSwitchOf = (set: {
  icons: Record<string, string>
  samples: Record<string, string>
}) => ({
  samples: set.samples,
  tokens: Object.fromEntries(
    ICON_ROLES.map((role) => [`--ui-icon-${role}`, iconUrl(set.icons[role]!)]),
  ),
})

export const applyIconSwitch = ({ samples, tokens }: IconSwitch) => {
  const style = document.createElement("style")
  style.textContent = `:root { ${Object.entries(tokens)
    .map(([name, value]) => `${name}: ${value};`)
    .join(" ")} }`
  document.head.append(style)
  for (const svg of document.querySelectorAll("svg[data-icon]")) {
    const markup = samples[svg.getAttribute("data-icon") ?? ""]
    if (!markup) continue
    const template = document.createElement("template")
    template.innerHTML = markup
    const icon = template.content.firstElementChild
    if (!icon) continue
    for (const name of ["height", "width"]) {
      const value = svg.getAttribute(name)
      if (value === null) icon.removeAttribute(name)
      else icon.setAttribute(name, value)
    }
    for (const { name, value } of svg.attributes) {
      if (name === "class") {
        icon.setAttribute(
          name,
          [icon.getAttribute(name), value].filter(Boolean).join(" "),
        )
      } else if (/^(aria-|data-|role$)/.test(name)) {
        icon.setAttribute(name, value)
      }
    }
    svg.replaceWith(icon)
  }
}
