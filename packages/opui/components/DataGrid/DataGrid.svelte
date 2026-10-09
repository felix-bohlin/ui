<script lang="ts">
  import { createGrid } from "./model"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    columnGroups,
    columns,
    columnsMenu,
    density,
    densityToggle,
    filters,
    footer,
    form,
    headerMenus,
    label,
    labels: customLabels,
    loading,
    maxBlockSize,
    numbered,
    pinEnd,
    pinStart,
    resizable,
    rowKey,
    rows,
    selectable,
    sort,
    style,
    wrap,

    // Snippets
    actions,
    cells,
    detail,
    empty,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const filterName = `filter-${uid}`
  const densityName = `density-${uid}`
  const menuId = `columns-${uid}`
  const sortName = `sort-${uid}`
  const headerMenuId = `header-menu-${uid}`

  const grid = $derived(
    createGrid({
      columns,
      expandable: !!detail,
      filters,
      labels: customLabels,
      maxBlockSize,
      numbered,
      rowKey,
      rows,
      selectable,
      sort,
    }),
  )
  const labels = $derived(grid.labels)
  const toolbar = $derived(
    !!actions || grid.filters.length > 0 || densityToggle || columnsMenu,
  )
  const mergedStyle = $derived(
    [grid.style, style].filter(Boolean).join("; ") || undefined,
  )
  const densities = ["dense", "standard", "spacious"] as const
  const directions = ["asc", "desc"] as const
</script>

<div
  class={[
    "ui-data-grid",
    {
      "ui-pin-end": pinEnd,
      "ui-pin-start": pinStart,
      "ui-resizable": resizable,
      "ui-wrap": wrap,
    },
    !densityToggle && density && density !== "standard" && `ui-${density}`,
    className,
  ]}
  style={mergedStyle}
  {...rest}
>
  {#if toolbar}
    <div class="ui-toolbar">
      {#if actions}
        <div class="ui-bulk-actions">
          {@render actions()}
        </div>
      {/if}
      {#if grid.filters.length > 0}
        <div
          aria-label={labels.filter}
          class="ui-toggle-group ui-small ui-filters"
          role="radiogroup"
        >
          <label class="ui-toggle-button">
            <input checked name={filterName} type="radio" value="" />
            {labels.all}
          </label>
          {#each grid.filters as filter (filter.value)}
            <label class="ui-toggle-button">
              <input name={filterName} type="radio" value={filter.value} />
              {filter.label}
            </label>
          {/each}
        </div>
      {/if}
      {#if densityToggle}
        <div
          aria-label={labels.density}
          class="ui-toggle-group ui-small ui-density"
          role="radiogroup"
        >
          {#each densities as value (value)}
            <label class="ui-toggle-button">
              <input
                checked={(density ?? "standard") === value}
                name={densityName}
                type="radio"
                {value}
              />
              {labels[value]}
            </label>
          {/each}
        </div>
      {/if}
      {#if columnsMenu}
        <button
          class="ui-button ui-outlined ui-small"
          command="toggle-popover"
          commandfor={menuId}
          type="button"
        >
          {labels.columns}
        </button>
        <menu
          class="ui-menu ui-list ui-dense ui-columns ui-align-end"
          id={menuId}
          popover=""
        >
          {#each grid.columns as column (column.key)}
            {#if column.hideable !== false}
              <li>
                <label class="ui-checkbox">
                  <input
                    checked
                    id={`${menuId}-${column.position}`}
                    type="checkbox"
                    value={column.position}
                  />
                  {column.label}
                </label>
              </li>
            {/if}
          {/each}
        </menu>
      {/if}
    </div>
  {/if}
  <div
    aria-busy={loading ? "true" : undefined}
    aria-label={label}
    role="table"
    tabindex="0"
  >
    <div class="ui-head" role="rowgroup">
      {#if columnGroups}
        <div role="row">
          {#each grid.utilityCells as name (name)}
            <div class={name} role="cell"></div>
          {/each}
          {#each columnGroups as group, index (index)}
            <div
              aria-colspan={group.span}
              role="columnheader"
              style={`grid-column: span ${group.span}`}
            >
              {group.label}
            </div>
          {/each}
        </div>
      {/if}
      <div role="row">
        {#if selectable}
          <div class="ui-row-select" role="columnheader">
            <span class="ui-sr-only">{labels.select}</span>
          </div>
        {/if}
        {#if numbered}
          <div class="ui-row-number" role="columnheader">
            <span class="ui-sr-only">{labels.rowNumber}</span>
          </div>
        {/if}
        {#if detail}
          <div class="ui-expand" role="columnheader">
            <span class="ui-sr-only">{labels.details}</span>
          </div>
        {/if}
        {#each grid.columns as column (column.key)}
          <div
            class={{ "ui-fit": column.fit, "ui-numeric": column.numeric }}
            role="columnheader"
          >
            <span>{column.label}</span>
            {#if column.sortable}
              <span class="ui-sort">
                {#each directions as direction (direction)}
                  <label>
                    <input
                      checked={grid.sorted(column, direction)}
                      id={`${sortName}-${column.position}-${direction}`}
                      name={sortName}
                      type="radio"
                      value={direction}
                    />
                    <span class="ui-sr-only">
                      {labels.sortBy}
                      {column.label},
                      {direction === "asc"
                        ? labels.ascending
                        : labels.descending}
                    </span>
                  </label>
                {/each}
              </span>
            {/if}
            {#if headerMenus && (column.sortable || (columnsMenu && column.hideable !== false))}
              <button
                aria-label={`${labels.menu} ${column.label}`}
                class="ui-button ui-rounded ui-small"
                command="toggle-popover"
                commandfor={`${headerMenuId}-${column.position}`}
                type="button"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path
                    d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <menu
                class="ui-menu ui-list ui-dense ui-align-end"
                id={`${headerMenuId}-${column.position}`}
                popover=""
              >
                {#if column.sortable}
                  <li>
                    <label for={`${sortName}-${column.position}-asc`}>
                      {labels.sortAscending}
                    </label>
                  </li>
                  <li>
                    <label for={`${sortName}-${column.position}-desc`}>
                      {labels.sortDescending}
                    </label>
                  </li>
                {/if}
                {#if columnsMenu && column.hideable !== false}
                  <li>
                    <label for={`${menuId}-${column.position}`}>
                      {labels.hideColumn}
                    </label>
                  </li>
                {/if}
              </menu>
            {/if}
          </div>
        {/each}
      </div>
    </div>
    <div class="ui-body" role="rowgroup">
      {#each rows as row, rowIndex (grid.rowKey(row) ?? rowIndex)}
        <div
          data-filters={grid.rowFilters(row)}
          role="row"
          style={grid.rowStyle(row, rowIndex)}
        >
          {#if selectable}
            <div class="ui-row-select" role="cell">
              <label class="ui-checkbox">
                <input
                  {form}
                  name={rowKey ? "selected" : undefined}
                  type="checkbox"
                  value={grid.rowKey(row)}
                />
                <span class="ui-sr-only">
                  {labels.select}
                  {grid.rowName(row)}
                </span>
              </label>
            </div>
          {/if}
          {#if numbered}
            <div class="ui-row-number" role="cell"></div>
          {/if}
          {#if detail}
            <div class="ui-expand" role="cell">
              <details>
                <summary>
                  <span class="ui-sr-only">
                    {labels.details}
                    {grid.rowName(row)}
                  </span>
                </summary>
                <div class="ui-detail">
                  {@render detail(row)}
                </div>
              </details>
            </div>
          {/if}
          {#each grid.columns as column (column.key)}
            <div
              class={{ "ui-numeric": column.numeric }}
              role={column.rowHeader ? "rowheader" : "cell"}
            >
              {#if cells?.[column.key]}
                {@render cells[column.key](row, column)}
              {:else if column.editable}
                <input
                  aria-label={`${column.label}, ${grid.rowName(row)}`}
                  {form}
                  name={rowKey
                    ? `${column.key}[${grid.rowKey(row)}]`
                    : undefined}
                  value={String(row[column.key] ?? "")}
                />
              {:else}
                {row[column.key]}
              {/if}
            </div>
          {/each}
        </div>
      {/each}
      <div class="ui-empty" role="row">
        <div role="cell">
          {#if empty}
            {@render empty()}
          {:else}
            {labels.empty}
          {/if}
        </div>
      </div>
    </div>
    {#if grid.hasSum}
      <div class="ui-foot" role="rowgroup">
        <div role="row">
          {#each grid.utilityCells as name (name)}
            <div class={name} role="cell"></div>
          {/each}
          {#each grid.columns as column (column.key)}
            {#if column.rowHeader}
              <div role="rowheader">{labels.total}</div>
            {:else}
              <div
                class={{ "ui-numeric": column.numeric, "ui-sum": column.sum }}
                role="cell"
              ></div>
            {/if}
          {/each}
        </div>
      </div>
    {/if}
  </div>
  {#if footer}
    <div class="ui-status">
      {#if selectable}
        <span class="ui-selection">
          <span class="ui-selected-count"></span>
          {labels.selected}
        </span>
      {/if}
      <span><span class="ui-row-count"></span> {labels.rows}</span>
    </div>
  {/if}
</div>
