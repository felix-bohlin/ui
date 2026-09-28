/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    $id: (prefix: string) => string
    _isInsideForm: boolean
    currentToggleGroupName?: string
    currentToggleGroupType?: "radio" | "checkbox"
    tabsGroupName?: string
    currentTabId?: string
    currentPanelId?: string
  }
}
