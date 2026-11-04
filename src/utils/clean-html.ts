export const clean = (html: string) =>
  html
    .replace(/[ \t]*data-astro-source-file=(?:"[^"]*"|'[^']*'|[^ >]*)/g, "")
    .replace(/[ \t]*data-astro-source-loc=(?:"[^"]*"|'[^']*'|[^ >]*)/g, "")
    .replace(
      /[ \t]*data-astro-cid-[a-zA-Z0-9-]+(?:=(?:"[^"]*"|'[^']*'|[^ >]*))?/g,
      "",
    )
