/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    $id: (prefix: string) => string
  }
}

declare namespace astroHTML.JSX {
  interface AnchorHTMLAttributes {
    interestfor?: string
  }

  interface ButtonHTMLAttributes {
    interestfor?: string
  }
}
