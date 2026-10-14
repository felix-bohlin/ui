import { useId, type ReactNode } from "react"
import { cx } from "../cx"
import { createGrid } from "./model"
import type { Props } from "./types.react"

const densities = ["dense", "standard", "spacious"] as const
const directions = ["asc", "desc"] as const

export default function DataGrid({
  className,
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
  actions,
  cells,
  detail,
  empty,
  ...rest
}: Props) {
  const uid = useId()
  const filterName = `filter-${uid}`
  const densityName = `density-${uid}`
  const menuId = `columns-${uid}`
  const sortName = `sort-${uid}`
  const headerMenuId = `header-menu-${uid}`

  const grid = createGrid({
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
  })
  const { labels } = grid
  const toolbar =
    !!actions || grid.filters.length > 0 || densityToggle || columnsMenu

  return (
    <div
      className={cx([
        "ui-data-grid",
        {
          "ui-pin-end": pinEnd,
          "ui-pin-start": pinStart,
          "ui-resizable": resizable,
          "ui-wrap": wrap,
        },
        !densityToggle && density && `ui-${density}`,
        className,
      ])}
      style={{ ...grid.vars, ...style }}
      {...rest}
    >
      {toolbar && (
        <div className="ui-toolbar">
          {!!actions && <div className="ui-bulk-actions">{actions}</div>}
          {grid.filters.length > 0 && (
            <div
              aria-label={labels.filter}
              className="ui-toggle-group ui-small ui-filters"
              role="radiogroup"
            >
              <label className="ui-toggle-button">
                <input defaultChecked name={filterName} type="radio" value="" />
                {labels.all}
              </label>
              {grid.filters.map((filter) => (
                <label className="ui-toggle-button" key={filter.value}>
                  <input name={filterName} type="radio" value={filter.value} />
                  {filter.label}
                </label>
              ))}
            </div>
          )}
          {densityToggle && (
            <div
              aria-label={labels.density}
              className="ui-toggle-group ui-small ui-density"
              role="radiogroup"
            >
              {densities.map((value) => (
                <label className="ui-toggle-button" key={value}>
                  <input
                    defaultChecked={(density ?? "standard") === value}
                    name={densityName}
                    type="radio"
                    value={value}
                  />
                  {labels[value]}
                </label>
              ))}
            </div>
          )}
          {columnsMenu && (
            <>
              <button
                className="ui-button ui-outlined ui-small"
                command="toggle-popover"
                commandfor={menuId}
                type="button"
              >
                {labels.columns}
              </button>
              <menu
                className="ui-menu ui-list ui-dense ui-columns ui-align-end"
                id={menuId}
                popover=""
              >
                {grid.columns
                  .filter((column) => column.hideable !== false)
                  .map((column) => (
                    <li key={column.key}>
                      <label className="ui-checkbox">
                        <input
                          defaultChecked
                          id={`${menuId}-${column.position}`}
                          type="checkbox"
                          value={column.position}
                        />
                        {column.label}
                      </label>
                    </li>
                  ))}
              </menu>
            </>
          )}
        </div>
      )}
      <div
        aria-busy={loading ? "true" : undefined}
        aria-label={label}
        role="table"
        tabIndex={0}
      >
        <div className="ui-head" role="rowgroup">
          {columnGroups && (
            <div role="row">
              {grid.utilityCells.map((name) => (
                <div className={name} key={name} role="cell" />
              ))}
              {columnGroups.map((group, index) => (
                <div
                  aria-colspan={group.span}
                  key={index}
                  role="columnheader"
                  style={{ gridColumn: `span ${group.span}` }}
                >
                  {group.label}
                </div>
              ))}
            </div>
          )}
          <div role="row">
            {selectable && (
              <div className="ui-row-select" role="columnheader">
                <span className="ui-sr-only">{labels.select}</span>
              </div>
            )}
            {numbered && (
              <div className="ui-row-number" role="columnheader">
                <span className="ui-sr-only">{labels.rowNumber}</span>
              </div>
            )}
            {detail && (
              <div className="ui-expand" role="columnheader">
                <span className="ui-sr-only">{labels.details}</span>
              </div>
            )}
            {grid.columns.map((column) => (
              <div
                className={cx([
                  { "ui-fit": column.fit, "ui-numeric": column.numeric },
                ])}
                key={column.key}
                role="columnheader"
              >
                <span>{column.label}</span>
                {column.sortable && (
                  <span className="ui-sort">
                    {directions.map((direction) => (
                      <label key={direction}>
                        <input
                          className="ui-sr-only"
                          defaultChecked={grid.sorted(column, direction)}
                          id={`${sortName}-${column.position}-${direction}`}
                          name={sortName}
                          type="radio"
                          value={direction}
                        />
                        <span className="ui-sr-only">
                          {labels.sortBy} {column.label},{" "}
                          {direction === "asc"
                            ? labels.ascending
                            : labels.descending}
                        </span>
                      </label>
                    ))}
                  </span>
                )}
                {headerMenus &&
                  (column.sortable ||
                    (columnsMenu && column.hideable !== false)) && (
                    <>
                      <button
                        aria-label={`${labels.menu} ${column.label}`}
                        className="ui-button ui-rounded ui-small"
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
                        className="ui-menu ui-list ui-dense ui-align-end"
                        id={`${headerMenuId}-${column.position}`}
                        popover=""
                      >
                        {column.sortable && (
                          <>
                            <li>
                              <label
                                htmlFor={`${sortName}-${column.position}-asc`}
                              >
                                {labels.sortAscending}
                              </label>
                            </li>
                            <li>
                              <label
                                htmlFor={`${sortName}-${column.position}-desc`}
                              >
                                {labels.sortDescending}
                              </label>
                            </li>
                          </>
                        )}
                        {columnsMenu && column.hideable !== false && (
                          <li>
                            <label htmlFor={`${menuId}-${column.position}`}>
                              {labels.hideColumn}
                            </label>
                          </li>
                        )}
                      </menu>
                    </>
                  )}
              </div>
            ))}
          </div>
        </div>
        <div className="ui-body" role="rowgroup">
          {rows.map((row, rowIndex) => (
            <div
              data-filters={grid.rowFilters(row)}
              key={grid.rowKey(row) ?? rowIndex}
              role="row"
              style={grid.rowVars(row, rowIndex)}
            >
              {selectable && (
                <div className="ui-row-select" role="cell">
                  <label className="ui-checkbox">
                    <input
                      form={form}
                      name={rowKey ? "selected" : undefined}
                      type="checkbox"
                      value={grid.rowKey(row)}
                    />
                    <span className="ui-sr-only">
                      {labels.select} {grid.rowName(row)}
                    </span>
                  </label>
                </div>
              )}
              {numbered && <div className="ui-row-number" role="cell" />}
              {detail && (
                <div className="ui-expand" role="cell">
                  <details>
                    <summary>
                      <span className="ui-sr-only">
                        {labels.details} {grid.rowName(row)}
                      </span>
                    </summary>
                    <div className="ui-detail">{detail(row)}</div>
                  </details>
                </div>
              )}
              {grid.columns.map((column) => (
                <div
                  className={cx([{ "ui-numeric": column.numeric }])}
                  key={column.key}
                  role={column.rowHeader ? "rowheader" : "cell"}
                >
                  {cells?.[column.key] ? (
                    cells[column.key](row, column)
                  ) : column.editable ? (
                    <input
                      aria-label={`${column.label}, ${grid.rowName(row)}`}
                      defaultValue={String(row[column.key] ?? "")}
                      form={form}
                      name={
                        rowKey
                          ? `${column.key}[${grid.rowKey(row)}]`
                          : undefined
                      }
                    />
                  ) : (
                    (row[column.key] as ReactNode)
                  )}
                </div>
              ))}
            </div>
          ))}
          <div className="ui-empty" role="row">
            <div role="cell">{empty ?? labels.empty}</div>
          </div>
        </div>
        {grid.hasSum && (
          <div className="ui-foot" role="rowgroup">
            <div role="row">
              {grid.utilityCells.map((name) => (
                <div className={name} key={name} role="cell" />
              ))}
              {grid.columns.map((column) =>
                column.rowHeader ? (
                  <div key={column.key} role="rowheader">
                    {labels.total}
                  </div>
                ) : (
                  <div
                    className={cx([
                      { "ui-numeric": column.numeric, "ui-sum": column.sum },
                    ])}
                    key={column.key}
                    role="cell"
                  />
                ),
              )}
            </div>
          </div>
        )}
      </div>
      {footer && (
        <div className="ui-status">
          {selectable && (
            <span className="ui-selection">
              <span className="ui-selected-count" /> {labels.selected}
            </span>
          )}
          <span>
            <span className="ui-row-count" /> {labels.rows}
          </span>
        </div>
      )}
    </div>
  )
}
