import type { Component } from "svelte"
import { render } from "svelte/server"

export const renderHydratableSvelte = (
  Component: Component,
  idPrefix: string,
) => render(Component, { idPrefix, props: {} }).body
