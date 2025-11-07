<template>
  <button class="VPSwitch" type="button" role="switch">
    <span class="check">
      <span class="icon" v-if="$slots.default">
        <slot />
      </span>
    </span>
  </button>
</template>

<style scoped>
.VPSwitch {
  position: relative;
  border-radius: 11px;
  display: block;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid var(--vp-border-color);
  background-color: var(--vp-input-switch-bg-color);
  transition: border-color 0.25s !important;
}

.VPSwitch:hover {
  border-color: var(--primary);
}

.check {
  position: absolute;
  top: 1px;
  /*rtl:ignore*/
  inset-inline-start: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--vp-c-neutral-inverse);
  box-shadow: var(--shadow-1);
  transition: transform 0.25s !important;
}

.icon {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  overflow: hidden;
}

.icon :deep([class^="vpi-"]) {
  position: absolute;
  top: 3px;
  inset-inline-start: 3px;
  width: 12px;
  height: 12px;
  color: var(--text-color-2-78);
}

.dark .icon :deep([class^="vpi-"]) {
  color: var(--text-color-2);
  transition: opacity 0.25s !important;
}
</style>
