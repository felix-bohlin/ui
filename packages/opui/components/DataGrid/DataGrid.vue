<script setup lang="ts">
import { computed, useId } from "vue"
import { createGrid } from "./model"
import type { Props, Slots } from "./types.d.vue"

const {
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
  wrap,
} = defineProps<Props>()
const slots = defineSlots<Slots>()

const filterName = useId()
const densityName = useId()
const menuId = useId()
const sortName = useId()
const headerMenuId = useId()

const grid = computed(() =>
  createGrid({
    columns,
    expandable: !!slots.detail,
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
const labels = computed(() => grid.value.labels)
const toolbar = computed(
  () =>
    !!slots.actions ||
    grid.value.filters.length > 0 ||
    densityToggle ||
    columnsMenu,
)
const densities = ["dense", "standard", "spacious"] as const
const directions = ["asc", "desc"] as const
</script>

<template>
  <div
    :class="[
      'ui-data-grid',
      {
        'ui-pin-end': pinEnd,
        'ui-pin-start': pinStart,
        'ui-resizable': resizable,
        'ui-wrap': wrap,
      },
      !densityToggle && density && density !== 'standard' && `ui-${density}`,
      $props.class,
    ]"
    :style="grid.style"
  >
    <div v-if="toolbar" class="ui-toolbar">
      <div v-if="slots.actions" class="ui-bulk-actions">
        <slot name="actions"></slot>
      </div>
      <div
        v-if="grid.filters.length > 0"
        :aria-label="labels.filter"
        class="ui-toggle-group ui-small ui-filters"
        role="radiogroup"
      >
        <label class="ui-toggle-button">
          <input checked :name="filterName" type="radio" value="" />
          {{ labels.all }}
        </label>
        <label
          v-for="filter in grid.filters"
          :key="filter.value"
          class="ui-toggle-button"
        >
          <input :name="filterName" type="radio" :value="filter.value" />
          {{ filter.label }}
        </label>
      </div>
      <div
        v-if="densityToggle"
        :aria-label="labels.density"
        class="ui-toggle-group ui-small ui-density"
        role="radiogroup"
      >
        <label v-for="value in densities" :key="value" class="ui-toggle-button">
          <input
            :checked="(density ?? 'standard') === value"
            :name="densityName"
            type="radio"
            :value="value"
          />
          {{ labels[value] }}
        </label>
      </div>
      <template v-if="columnsMenu">
        <button
          class="ui-button ui-outlined ui-small"
          command="toggle-popover"
          :commandfor="menuId"
          type="button"
        >
          {{ labels.columns }}
        </button>
        <menu
          :id="menuId"
          class="ui-menu ui-list ui-dense ui-columns ui-align-end"
          popover=""
        >
          <template v-for="column in grid.columns" :key="column.key">
            <li v-if="column.hideable !== false">
              <label class="ui-checkbox">
                <input
                  :id="`${menuId}-${column.position}`"
                  checked
                  type="checkbox"
                  :value="column.position"
                />
                {{ column.label }}
              </label>
            </li>
          </template>
        </menu>
      </template>
    </div>
    <div
      :aria-busy="loading ? 'true' : undefined"
      :aria-label="label"
      role="table"
      tabindex="0"
    >
      <div class="ui-head" role="rowgroup">
        <div v-if="columnGroups" role="row">
          <div
            v-for="name in grid.utilityCells"
            :key="name"
            :class="name"
            role="columnheader"
          ></div>
          <div
            v-for="(group, index) in columnGroups"
            :key="index"
            :aria-colspan="group.span"
            role="columnheader"
            :style="`grid-column: span ${group.span}`"
          >
            {{ group.label }}
          </div>
        </div>
        <div role="row">
          <div v-if="selectable" class="ui-row-select" role="columnheader">
            <span class="ui-sr-only">{{ labels.select }}</span>
          </div>
          <div v-if="numbered" class="ui-row-number" role="columnheader">
            <span class="ui-sr-only">{{ labels.rowNumber }}</span>
          </div>
          <div v-if="slots.detail" class="ui-expand" role="columnheader">
            <span class="ui-sr-only">{{ labels.details }}</span>
          </div>
          <div
            v-for="column in grid.columns"
            :key="column.key"
            :class="{ 'ui-fit': column.fit, 'ui-numeric': column.numeric }"
            role="columnheader"
          >
            <span>{{ column.label }}</span>
            <span v-if="column.sortable" class="ui-sort">
              <label v-for="direction in directions" :key="direction">
                <input
                  :id="`${sortName}-${column.position}-${direction}`"
                  :checked="grid.sorted(column, direction)"
                  :name="sortName"
                  type="radio"
                  :value="direction"
                />
                <span class="ui-sr-only">
                  {{ labels.sortBy }} {{ column.label }},
                  {{
                    direction === "asc" ? labels.ascending : labels.descending
                  }}
                </span>
              </label>
            </span>
            <template
              v-if="
                headerMenus &&
                (column.sortable || (columnsMenu && column.hideable !== false))
              "
            >
              <button
                :aria-label="`${labels.menu} ${column.label}`"
                class="ui-button ui-rounded ui-small"
                command="toggle-popover"
                :commandfor="`${headerMenuId}-${column.position}`"
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
                :id="`${headerMenuId}-${column.position}`"
                class="ui-menu ui-list ui-dense ui-align-end"
                popover=""
              >
                <template v-if="column.sortable">
                  <li>
                    <label :for="`${sortName}-${column.position}-asc`">
                      {{ labels.sortAscending }}
                    </label>
                  </li>
                  <li>
                    <label :for="`${sortName}-${column.position}-desc`">
                      {{ labels.sortDescending }}
                    </label>
                  </li>
                </template>
                <li v-if="columnsMenu && column.hideable !== false">
                  <label :for="`${menuId}-${column.position}`">
                    {{ labels.hideColumn }}
                  </label>
                </li>
              </menu>
            </template>
          </div>
        </div>
      </div>
      <div class="ui-body" role="rowgroup">
        <div
          v-for="(row, rowIndex) in rows"
          :key="grid.rowKey(row) ?? rowIndex"
          :data-filters="grid.rowFilters(row)"
          role="row"
          :style="grid.rowStyle(row, rowIndex)"
        >
          <div v-if="selectable" class="ui-row-select" role="cell">
            <label class="ui-checkbox">
              <input
                :form="form"
                :name="rowKey ? 'selected' : undefined"
                type="checkbox"
                :value="grid.rowKey(row)"
              />
              <span class="ui-sr-only">
                {{ labels.select }} {{ grid.rowName(row) }}
              </span>
            </label>
          </div>
          <div v-if="numbered" class="ui-row-number" role="cell"></div>
          <div v-if="slots.detail" class="ui-expand" role="cell">
            <details>
              <summary>
                <span class="ui-sr-only">
                  {{ labels.details }} {{ grid.rowName(row) }}
                </span>
              </summary>
              <div class="ui-detail">
                <slot name="detail" :row="row"></slot>
              </div>
            </details>
          </div>
          <div
            v-for="column in grid.columns"
            :key="column.key"
            :class="{ 'ui-numeric': column.numeric }"
            :role="column.rowHeader ? 'rowheader' : 'cell'"
          >
            <slot
              :name="`cell-${column.key}`"
              :column="column"
              :row="row"
              :value="row[column.key]"
            >
              <input
                v-if="column.editable"
                :aria-label="`${column.label}, ${grid.rowName(row)}`"
                :form="form"
                :name="
                  rowKey ? `${column.key}[${grid.rowKey(row)}]` : undefined
                "
                :value="String(row[column.key] ?? '')"
              />
              <template v-else>{{ row[column.key] }}</template>
            </slot>
          </div>
        </div>
        <div class="ui-empty" role="row">
          <div role="cell">
            <slot name="empty">{{ labels.empty }}</slot>
          </div>
        </div>
      </div>
      <div v-if="grid.hasSum" class="ui-foot" role="rowgroup">
        <div role="row">
          <div
            v-for="name in grid.utilityCells"
            :key="name"
            :class="name"
            role="cell"
          ></div>
          <template v-for="column in grid.columns" :key="column.key">
            <div v-if="column.rowHeader" role="rowheader">
              {{ labels.total }}
            </div>
            <div
              v-else
              :class="{ 'ui-numeric': column.numeric, 'ui-sum': column.sum }"
              role="cell"
            ></div>
          </template>
        </div>
      </div>
    </div>
    <div v-if="footer" class="ui-status">
      <span v-if="selectable" class="ui-selection">
        <span class="ui-selected-count"></span> {{ labels.selected }}
      </span>
      <span><span class="ui-row-count"></span> {{ labels.rows }}</span>
    </div>
  </div>
</template>
