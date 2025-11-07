<script lang="ts" setup>
import type { ButtonTranslations } from "../../../../types/local-search"
import { createSearchTranslate } from "../support/translation"

// Button-Translations
const defaultTranslations: { button: ButtonTranslations } = {
  button: {
    buttonText: "Search",
    buttonAriaLabel: "Search",
  },
}

const translate = createSearchTranslate(defaultTranslations)
</script>

<template>
  <button
    type="button"
    class="DocSearch DocSearch-Button"
    :aria-label="translate('button.buttonAriaLabel')"
  >
    <span class="DocSearch-Button-Container">
      <span class="vp-icon DocSearch-Search-Icon"></span>
      <span class="DocSearch-Button-Placeholder">{{
        translate("button.buttonText")
      }}</span>
    </span>
    <span class="DocSearch-Button-Keys">
      <kbd class="DocSearch-Button-Key"></kbd>
      <kbd class="DocSearch-Button-Key">K</kbd>
    </span>
  </button>
</template>

<style>
[class*="DocSearch"] {
  --docsearch-primary-color: var(--primary);
  --docsearch-highlight-color: var(--docsearch-primary-color);
  --docsearch-text-color: var(--text-color-2);
  --docsearch-muted-color: var(--text-color-2-78);
  --docsearch-searchbox-shadow: none;
  --docsearch-searchbox-background: transparent;
  --docsearch-searchbox-focus-background: transparent;
  --docsearch-key-gradient: transparent;
  --docsearch-key-shadow: none;
  --docsearch-modal-background: var(--vp-c-bg-soft);
  --docsearch-footer-background: var(--vp-c-bg);
}

.dark [class*="DocSearch"] {
  --docsearch-modal-shadow: none;
  --docsearch-footer-shadow: none;
  --docsearch-logo-color: var(--text-color-2-78);
  --docsearch-hit-background: var(--vp-c-default-soft);
  --docsearch-hit-color: var(--text-color-2-78);
  --docsearch-hit-shadow: none;
}

.DocSearch-Button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  width: 48px;
  height: 55px;
  background: transparent;
  transition: border-color 0.25s;
}

.DocSearch-Button:hover {
  background: transparent;
}

.DocSearch-Button:focus {
  outline: 1px dotted;
  outline: 5px auto -webkit-focus-ring-color;
}

.DocSearch-Button-Key--pressed {
  transform: none;
  box-shadow: none;
}

.DocSearch-Button:focus:not(:focus-visible) {
  outline: none !important;
}

@media (min-width: 768px) {
  .DocSearch-Button {
    justify-content: flex-start;
    border: 1px solid transparent;
    border-radius: var(--surface-border-radius, 0.25rem);
    padding: 0 10px 0 12px;
    width: 100%;
    height: 40px;
    background-color: var(--vp-c-bg-alt);
  }

  .DocSearch-Button:hover {
    border-color: var(--primary);
    background: var(--vp-c-bg-alt);
  }
}

.DocSearch-Button .DocSearch-Button-Container {
  display: flex;
  align-items: center;
}

.DocSearch-Button .DocSearch-Search-Icon {
  position: relative;
  width: 16px;
  height: 16px;
  color: var(--text-color-2);
  fill: currentColor;
  transition: color 0.5s;
}

.DocSearch-Button:hover .DocSearch-Search-Icon {
  color: var(--text-color-2);
}

@media (min-width: 768px) {
  .DocSearch-Button .DocSearch-Search-Icon {
    top: 1px;
    margin-inline-end: 8px;
    width: 14px;
    height: 14px;
    color: var(--text-color-2-78);
  }
}

.DocSearch-Button .DocSearch-Button-Placeholder {
  display: none;
  margin-block-start: 2px;
  padding-inline: 0 16px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-color-2-78);
  transition: color 0.5s;
}

.DocSearch-Button:hover .DocSearch-Button-Placeholder {
  color: var(--text-color-2);
}

@media (min-width: 768px) {
  .DocSearch-Button .DocSearch-Button-Placeholder {
    display: inline-block;
  }
}

.DocSearch-Button .DocSearch-Button-Keys {
  /*rtl:ignore*/
  direction: ltr;
  display: none;
  min-width: auto;
}

@media (min-width: 768px) {
  .DocSearch-Button .DocSearch-Button-Keys {
    display: flex;
    align-items: center;
  }
}

.DocSearch-Button .DocSearch-Button-Key {
  display: block;
  margin: 2px 0 0 0;
  border: 1px solid var(--vp-c-divider);
  /*rtl:begin:ignore*/
  border-inline-end: none;
  border-radius: var(--surface-border-radius, 0.25rem);
  border-radius: 0;
  padding-inline-start: 6px;
  /*rtl:end:ignore*/
  min-width: 0;
  width: auto;
  height: 22px;
  line-height: 22px;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  transition:
    color 0.5s,
    border-color 0.5s;
}

.DocSearch-Button .DocSearch-Button-Key + .DocSearch-Button-Key {
  /*rtl:begin:ignore*/
  border-inline-end: 1px solid var(--vp-c-divider);
  border-inset-inline-start: none;
  border-radius: var(--surface-border-radius, 0.25rem);
  border-radius: 0;
  padding-inline-start: 2px;
  padding-inline-end: 6px;
  /*rtl:end:ignore*/
}

.DocSearch-Button .DocSearch-Button-Key:first-child {
  font-size: 0 !important;
}

.DocSearch-Button .DocSearch-Button-Key:first-child:after {
  content: "Ctrl";
  font-size: 12px;
  letter-spacing: normal;
  color: var(--docsearch-muted-color);
}

.mac .DocSearch-Button .DocSearch-Button-Key:first-child:after {
  content: "\2318";
}

.DocSearch-Button .DocSearch-Button-Key:first-child > * {
  display: none;
}

.DocSearch-Search-Icon {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' stroke-width='1.6' viewBox='0 0 20 20'%3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' d='m14.386 14.386 4.088 4.088-4.088-4.088A7.533 7.533 0 1 1 3.733 3.733a7.533 7.533 0 0 1 10.653 10.653z'/%3E%3C/svg%3E");
}
</style>
