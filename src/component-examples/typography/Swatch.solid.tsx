/** @jsxImportSource @solidjs/web */
export default function Swatch() {
  return (
    <ul role="list" class="ui-layout-row">
      <li class="ui-layout-row ui-x-small">
        <span class="ui-swatch ui-success"></span>
        Online
      </li>
      <li class="ui-layout-row ui-x-small">
        <span class="ui-swatch ui-warning"></span>
        Degraded
      </li>
      <li class="ui-layout-row ui-x-small">
        <span class="ui-swatch ui-critical"></span>
        Down
      </li>
      <li class="ui-layout-row ui-x-small">
        <span
          class="ui-swatch"
          style="--_swatch-bg-color: var(--ui-color-7)"
        ></span>
        Maintenance
      </li>
    </ul>
  )
}
