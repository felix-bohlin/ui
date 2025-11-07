declare module "baseline-status/baseline-status" {
  export const BaselineStatus: CustomElementConstructor
}

declare module "*.css?url" {
  const href: string
  export default href
}
