/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    $id: (prefix: string) => string
    _isInsideForm: boolean
    currentFieldName?: string
    currentToggleGroupName?: string
    currentToggleGroupType?: "radio" | "checkbox"
    tabsGroupName?: string
    currentTabId?: string
    currentPanelId?: string
  }
}
