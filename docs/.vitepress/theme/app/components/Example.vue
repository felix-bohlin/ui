<script setup lang="ts">
import { ref, useId } from "vue"

const props = withDefaults(
  defineProps<{
    centered?: boolean
    column?: boolean
    exampleClass?: string
    gapL?: boolean
    hideCode?: boolean
    richText?: "rich-text" | "not-rich-text"
    row?: boolean
    theme?: "theme-all" | "theme-one" | "theme-two"
    wrapperClass?: string
  }>(),
  {
    hideCode: undefined,
    richText: "not-rich-text",
    theme: "theme-all",
  },
)

const codeViewerId = useId()
const showCode = ref(!props?.hideCode)
</script>

<template>
  <article
    class="example-wrapper"
    :class="[
      wrapperClass,
      centered ? 'example-centered' : '',
      richText ?? 'not-rich-text',
      theme,
    ]"
  >
    <div v-if="$slots.controls" class="controls">
      <slot name="controls" />
    </div>

    <div
      v-if="$slots.example"
      class="example"
      :class="[
        column && 'example-column',
        row && 'example-row',
        gapL && 'gap-l',
        exampleClass,
      ]"
    >
      <slot name="example" />
    </div>

    <button
      :aria-controls="codeViewerId"
      v-if="$slots.code && $slots.example"
      @click="showCode = !showCode"
      class="chip small"
    >
      <span class="text"> {{ showCode ? "Hide code" : "Show code" }}</span>
      <svg
        :class="{ rotated: showCode }"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M5.366 11.116a1.25 1.25 0 0 1 1.768 0L16 19.982l8.866-8.866a1.25 1.25 0 0 1 1.768 1.768l-9.75 9.75a1.25 1.25 0 0 1-1.768 0l-9.75-9.75a1.25 1.25 0 0 1 0-1.768"
        />
      </svg>
    </button>

    <div :id="codeViewerId" role="region">
      <slot v-if="showCode && $slots.code" name="code" />
    </div>
  </article>
</template>

<style>
.dark {
  .example-wrapper {
    &:before {
      opacity: 0.075;
    }
  }
}

.prefers-theme-one .example-wrapper.theme-one {
  display: grid;
}
.prefers-theme-two .example-wrapper.theme-two {
  display: grid;
}

.example-wrapper {
  border-color: var(--border-color);
  border-radius: var(--surface-border-radius, 0.25rem);
  border-style: solid;
  border-bottom-width: 0;
  box-shadow: var(--shadow-1);
  container-type: inline-size;
  display: grid;
  margin-inline: -1rem;
  margin-block: var(--size-3, 1rem);
  position: relative;

  &:before {
    background-image: radial-gradient(
      var(--text-color-1) 1.4500000000000002px,
      transparent 1.4500000000000002px
    );
    background-size: 20px 20px;
    content: "";
    inset: 0;
    opacity: 0.2;
    pointer-events: none;
    position: absolute;
    z-index: -1;
  }

  &:has(.example) {
    border-width: 1px;
  }

  @media (width > 640px) {
    margin-inline: 0;
  }

  .controls {
    background-color: var(--surface-default);
    border-block-end: var(--border-width) solid var(--border-color);
    display: flex;
    justify-content: end;
    gap: var(--size-3);
    padding: var(--size-3);
  }

  .example {
    margin-block: var(--size-3, 1rem);
    padding-block: 0;

    & + .chip {
      border-radius: var(--surface-border-radius);
      justify-self: end;
      margin: 0 -1px -1px 0;
      opacity: 0.64;

      .rotated {
        rotate: 180deg;
      }
    }
  }

  .vp-code-group {
    margin-block-start: 0;
  }

  .vp-code-group .tabs {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .example + [class^="language"] {
    border-block-start: 1px solid var(--border-color);
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
  }

  [class^="language"] {
    margin-block: 0 !important;

    @media (width <= 60ch) {
      margin-inline: 0 !important;
    }
  }

  .example-row {
    align-items: start;
    display: flex;
    flex-wrap: wrap;
    gap: var(--size-3, 1rem);
    justify-content: center;
  }

  .example-column {
    display: flex;
    flex-direction: column;
    gap: var(--size-3, 1rem);
  }

  .gap-l {
    gap: var(--size-8);
  }

  &.example-centered {
    .example-column {
      align-items: center;
    }
  }

  .example {
    margin-block: var(--size-7) var(--size-3, 1rem);
    padding: var(--size-3, 1rem);

    & + [class^="language"] {
      margin-block-start: 0 !important;
    }
  }
}
</style>
