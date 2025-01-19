---
overline: Components
title: Range
---

<script setup>
  import Example from "../../.vitepress/theme/app/components/Example.vue"
  </script>

<Example>
<template #example>

<label class="range">
  <span class="label">Label</span>
  <input type="range" />
</label>

<label class="range">
  <span class="label">Disabled</span>
  <input type="range" disabled />
</label>

</template>
<template #code>

```html
<label class="range">
  <span class="label">Label</span>
  <input type="range" />
</label>

<label class="range">
  <span class="label">Disabled</span>
  <input type="range" disabled />
</label>
```

</template>
</Example>

## Accessibility

<ul>
  <li><kbd>Right Arrow</kbd>: Increase the value of the slider by one step.</li>
  <li><kbd>Up Arrow</kbd>: Increase the value of the slider by one step.</li>
  <li><kbd>Left Arrow</kbd>: Decrease the value of the slider by one step.</li>
  <li><kbd>Down Arrow</kbd>: Decrease the value of the slider by one step.</li>
  <li><kbd>Home</kbd>: Set the slider to the first allowed value in its range.</li>
  <li><kbd>End</kbd>: Set the slider to the last allowed value in its range.</li>
  <li><kbd>Page Up</kbd> (Optional): Increase the slider value by an amount larger than the step change made by <kbd>Up Arrow</kbd>.</li>
  <li><kbd>Page Down</kbd> (Optional): Decrease the slider value by an amount larger than the step change made by <kbd>Down Arrow</kbd>.</li>
</ul>

## Installation

::: code-group
<<< @/../src/inputs/range.css [range.css]
:::
