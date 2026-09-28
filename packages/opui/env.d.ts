/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    $id: (prefix: string) => string
    _isInsideForm: boolean
  }
}
