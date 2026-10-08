# Data grid

Sorting, filtering, selection, totals, pinned columns, resizing and detail panels without JavaScript. For static data, see [Table](https://open-props-ui.netlify.app/html/components/table.md).

## Anatomy

All Active

Dense Standard Spacious

Select

Show details for

Name Sort by Name, ascending Sort by Name, descending

Tickets

Select Ada Lovelace

Show details for Ada Lovelace

ada\@example.com

Ada Lovelace

42

Select Alan Turing

Show details for Alan Turing

alan\@example.com

Alan Turing

37

No rows

Total

selected rows

- `.ui-data-grid`

  The grid and its toolbar and footer.

- `.ui-toolbar`

  Filters, density and column toggles.

- `.ui-filters`

  Filter radios.

- `.ui-density`

  Density radios.

- `<menu class="ui-columns">`

  Column checkboxes in a popover.

- `[role="table"]`

  The scroll container.

- `.ui-head`

  The sticky header.

- `.ui-sort`

  Sort radios.

- `.ui-body .ui-row-number`

  Row numbers, in sorted order.

- `.ui-body .ui-row-select`

  Row selection checkboxes.

- `.ui-body .ui-expand summary`

  Expandable detail panel.

- `[role="cell"]`

  A cell.

- `.ui-foot`

  The sticky totals row.

- `.ui-status`

  Selected and visible row counts.

### This is SO COOL!

Don't miss the [Under the hood](#under-the-hood) section to see how it works!

## Basics

Rows and cells use ARIA table roles. Rows are subgrids, so column widths are shared across the header, body and totals.

```html
<div class="ui-data-grid">
  <div aria-label="Team" role="table" tabindex="0">
    <div class="ui-head" role="rowgroup">
      <div role="row">
        <div role="columnheader">
          <span>Name</span>
        </div>
        <div role="columnheader">
          <span>Role</span>
        </div>
        <div role="columnheader">
          <span>Location</span>
        </div>
        <div class="ui-numeric" role="columnheader">
          <span>Tickets</span>
        </div>
      </div>
    </div>
    <div class="ui-body" role="rowgroup">
      <div role="row">
        <div role="rowheader">Ada Lovelace</div>
        <div role="cell">Engineer</div>
        <div role="cell">London</div>
        <div class="ui-numeric" role="cell">42</div>
      </div>
      <div role="row">
        <div role="rowheader">Alan Turing</div>
        <div role="cell">Researcher</div>
        <div role="cell">Manchester</div>
        <div class="ui-numeric" role="cell">37</div>
      </div>
      <div role="row">
        <div role="rowheader">Grace Hopper</div>
        <div role="cell">Admiral</div>
        <div role="cell">New York</div>
        <div class="ui-numeric" role="cell">58</div>
      </div>
      <div role="row">
        <div role="rowheader">Hedy Lamarr</div>
        <div role="cell">Inventor</div>
        <div role="cell">Vienna</div>
        <div class="ui-numeric" role="cell">12</div>
      </div>
      <div role="row">
        <div role="rowheader">Katherine Johnson</div>
        <div role="cell">Mathematician</div>
        <div role="cell">Hampton</div>
        <div class="ui-numeric" role="cell">51</div>
      </div>
      <div role="row">
        <div role="rowheader">Margaret Hamilton</div>
        <div role="cell">Director</div>
        <div role="cell">Boston</div>
        <div class="ui-numeric" role="cell">64</div>
      </div>
      <div class="ui-empty" role="row">
        <div role="cell">No rows</div>
      </div>
    </div>
  </div>
</div>
```

## Custom cells

Cells can hold other components, such as `.ui-avatar`, `.ui-chip` and `.ui-progress`.

```html
<div class="ui-data-grid" style="--_col-3: minmax(10rem, 1fr)">
  <div aria-label="Team" role="table" tabindex="0">
    <div class="ui-head" role="rowgroup">
      <div role="row">
        <div role="columnheader">
          <span>Name</span>
        </div>
        <div role="columnheader">
          <span>Status</span>
        </div>
        <div role="columnheader">
          <span>Progress</span>
        </div>
      </div>
    </div>
    <div class="ui-body" role="rowgroup">
      <div role="row">
        <div role="rowheader">
          <div class="ui-avatar">AL</div>
          Ada Lovelace
        </div>
        <div role="cell">
          <div class="ui-chip ui-small ui-tonal">
            <span class="ui-text">Active</span>
          </div>
        </div>
        <div role="cell">
          <div class="ui-progress">
            <progress
              max="100"
              value="82"
              aria-label="Progress, Ada Lovelace"
            ></progress>
          </div>
        </div>
      </div>
      <div role="row">
        <div role="rowheader">
          <div class="ui-avatar">AT</div>
          Alan Turing
        </div>
        <div role="cell">
          <div class="ui-chip ui-small ui-tonal">
            <span class="ui-text">Away</span>
          </div>
        </div>
        <div role="cell">
          <div class="ui-progress">
            <progress
              max="100"
              value="64"
              aria-label="Progress, Alan Turing"
            ></progress>
          </div>
        </div>
      </div>
      <div role="row">
        <div role="rowheader">
          <div class="ui-avatar">GH</div>
          Grace Hopper
        </div>
        <div role="cell">
          <div class="ui-chip ui-small ui-tonal">
            <span class="ui-text">Active</span>
          </div>
        </div>
        <div role="cell">
          <div class="ui-progress">
            <progress
              max="100"
              value="95"
              aria-label="Progress, Grace Hopper"
            ></progress>
          </div>
        </div>
      </div>
      <div role="row">
        <div role="rowheader">
          <div class="ui-avatar">HL</div>
          Hedy Lamarr
        </div>
        <div role="cell">
          <div class="ui-chip ui-small ui-tonal">
            <span class="ui-text">Offline</span>
          </div>
        </div>
        <div role="cell">
          <div class="ui-progress">
            <progress
              max="100"
              value="40"
              aria-label="Progress, Hedy Lamarr"
            ></progress>
          </div>
        </div>
      </div>
      <div role="row">
        <div role="rowheader">
          <div class="ui-avatar">KJ</div>
          Katherine Johnson
        </div>
        <div role="cell">
          <div class="ui-chip ui-small ui-tonal">
            <span class="ui-text">Away</span>
          </div>
        </div>
        <div role="cell">
          <div class="ui-progress">
            <progress
              max="100"
              value="77"
              aria-label="Progress, Katherine Johnson"
            ></progress>
          </div>
        </div>
      </div>
      <div role="row">
        <div role="rowheader">
          <div class="ui-avatar">MH</div>
          Margaret Hamilton
        </div>
        <div role="cell">
          <div class="ui-chip ui-small ui-tonal">
            <span class="ui-text">Active</span>
          </div>
        </div>
        <div role="cell">
          <div class="ui-progress">
            <progress
              max="100"
              value="88"
              aria-label="Progress, Margaret Hamilton"
            ></progress>
          </div>
        </div>
      </div>
      <div class="ui-empty" role="row">
        <div role="cell">No rows</div>
      </div>
    </div>
  </div>
</div>
```

## Sorting

Sort radios in a header with `value="asc"` and `value="desc"`. Each row sets `--_rank-[n]`, its position when sorted by column `n`.

```html
<div class="ui-data-grid">
  <div aria-label="Team" role="table" tabindex="0">
    <div class="ui-head" role="rowgroup">
      <div role="row">
        <div role="columnheader">
          <span>Name</span>
          <span class="ui-sort">
            <label>
              <input
                id="sorting-sort-1-1-asc"
                name="sorting-sort-1"
                type="radio"
                value="asc"
              />
              <span class="ui-sr-only">Sort by Name, ascending</span>
            </label>
            <label>
              <input
                id="sorting-sort-1-1-desc"
                name="sorting-sort-1"
                type="radio"
                value="desc"
              />
              <span class="ui-sr-only">Sort by Name, descending</span>
            </label>
          </span>
        </div>
        <div role="columnheader">
          <span>Role</span>
          <span class="ui-sort">
            <label>
              <input
                id="sorting-sort-1-2-asc"
                name="sorting-sort-1"
                type="radio"
                value="asc"
              />
              <span class="ui-sr-only">Sort by Role, ascending</span>
            </label>
            <label>
              <input
                id="sorting-sort-1-2-desc"
                name="sorting-sort-1"
                type="radio"
                value="desc"
              />
              <span class="ui-sr-only">Sort by Role, descending</span>
            </label>
          </span>
        </div>
        <div role="columnheader">
          <span>Location</span>
          <span class="ui-sort">
            <label>
              <input
                id="sorting-sort-1-3-asc"
                name="sorting-sort-1"
                type="radio"
                value="asc"
              />
              <span class="ui-sr-only">Sort by Location, ascending</span>
            </label>
            <label>
              <input
                id="sorting-sort-1-3-desc"
                name="sorting-sort-1"
                type="radio"
                value="desc"
              />
              <span class="ui-sr-only">Sort by Location, descending</span>
            </label>
          </span>
        </div>
        <div class="ui-numeric" role="columnheader">
          <span>Tickets</span>
          <span class="ui-sort">
            <label>
              <input
                id="sorting-sort-1-4-asc"
                name="sorting-sort-1"
                type="radio"
                value="asc"
              />
              <span class="ui-sr-only">Sort by Tickets, ascending</span>
            </label>
            <label>
              <input
                checked
                id="sorting-sort-1-4-desc"
                name="sorting-sort-1"
                type="radio"
                value="desc"
              />
              <span class="ui-sr-only">Sort by Tickets, descending</span>
            </label>
          </span>
        </div>
      </div>
    </div>
    <div class="ui-body" role="rowgroup">
      <div
        role="row"
        style="--_rank-1: 1; --_rank-2: 3; --_rank-3: 3; --_rank-4: 3"
      >
        <div role="rowheader">Ada Lovelace</div>
        <div role="cell">Engineer</div>
        <div role="cell">London</div>
        <div class="ui-numeric" role="cell">42</div>
      </div>
      <div
        role="row"
        style="--_rank-1: 2; --_rank-2: 6; --_rank-3: 4; --_rank-4: 2"
      >
        <div role="rowheader">Alan Turing</div>
        <div role="cell">Researcher</div>
        <div role="cell">Manchester</div>
        <div class="ui-numeric" role="cell">37</div>
      </div>
      <div
        role="row"
        style="--_rank-1: 3; --_rank-2: 1; --_rank-3: 5; --_rank-4: 5"
      >
        <div role="rowheader">Grace Hopper</div>
        <div role="cell">Admiral</div>
        <div role="cell">New York</div>
        <div class="ui-numeric" role="cell">58</div>
      </div>
      <div
        role="row"
        style="--_rank-1: 4; --_rank-2: 4; --_rank-3: 6; --_rank-4: 1"
      >
        <div role="rowheader">Hedy Lamarr</div>
        <div role="cell">Inventor</div>
        <div role="cell">Vienna</div>
        <div class="ui-numeric" role="cell">12</div>
      </div>
      <div
        role="row"
        style="--_rank-1: 5; --_rank-2: 5; --_rank-3: 2; --_rank-4: 4"
      >
        <div role="rowheader">Katherine Johnson</div>
        <div role="cell">Mathematician</div>
        <div role="cell">Hampton</div>
        <div class="ui-numeric" role="cell">51</div>
      </div>
      <div
        role="row"
        style="--_rank-1: 6; --_rank-2: 2; --_rank-3: 1; --_rank-4: 6"
      >
        <div role="rowheader">Margaret Hamilton</div>
        <div role="cell">Director</div>
        <div role="cell">Boston</div>
        <div class="ui-numeric" role="cell">64</div>
      </div>
      <div class="ui-empty" role="row">
        <div role="cell">No rows</div>
      </div>
    </div>
  </div>
</div>
```

## Row numbers

A `.ui-row-number` cell in each row. The number follows the sort order and stays with the row when a filter hides others.

```html
<div class="ui-data-grid">
  <div aria-label="Team" role="table" tabindex="0">
    <div class="ui-head" role="rowgroup">
      <div role="row">
        <div class="ui-row-number" role="columnheader">
          <span class="ui-sr-only">Row number</span>
        </div>
        <div role="columnheader">
          <span>Name</span>
          <span class="ui-sort">
            <label>
              <input
                id="row-numbers-sort-1-2-asc"
                name="row-numbers-sort-1"
                type="radio"
                value="asc"
              />
              <span class="ui-sr-only">Sort by Name, ascending</span>
            </label>
            <label>
              <input
                id="row-numbers-sort-1-2-desc"
                name="row-numbers-sort-1"
                type="radio"
                value="desc"
              />
              <span class="ui-sr-only">Sort by Name, descending</span>
            </label>
          </span>
        </div>
        <div role="columnheader">
          <span>Location</span>
          <span class="ui-sort">
            <label>
              <input
                id="row-numbers-sort-1-3-asc"
                name="row-numbers-sort-1"
                type="radio"
                value="asc"
              />
              <span class="ui-sr-only">Sort by Location, ascending</span>
            </label>
            <label>
              <input
                id="row-numbers-sort-1-3-desc"
                name="row-numbers-sort-1"
                type="radio"
                value="desc"
              />
              <span class="ui-sr-only">Sort by Location, descending</span>
            </label>
          </span>
        </div>
        <div class="ui-numeric" role="columnheader">
          <span>Tickets</span>
          <span class="ui-sort">
            <label>
              <input
                id="row-numbers-sort-1-4-asc"
                name="row-numbers-sort-1"
                type="radio"
                value="asc"
              />
              <span class="ui-sr-only">Sort by Tickets, ascending</span>
            </label>
            <label>
              <input
                id="row-numbers-sort-1-4-desc"
                name="row-numbers-sort-1"
                type="radio"
                value="desc"
              />
              <span class="ui-sr-only">Sort by Tickets, descending</span>
            </label>
          </span>
        </div>
      </div>
    </div>
    <div class="ui-body" role="rowgroup">
      <div role="row" style="--_rank-2: 1; --_rank-3: 3; --_rank-4: 3">
        <div class="ui-row-number" role="cell"></div>
        <div role="rowheader">Ada Lovelace</div>
        <div role="cell">London</div>
        <div class="ui-numeric" role="cell">42</div>
      </div>
      <div role="row" style="--_rank-2: 2; --_rank-3: 4; --_rank-4: 2">
        <div class="ui-row-number" role="cell"></div>
        <div role="rowheader">Alan Turing</div>
        <div role="cell">Manchester</div>
        <div class="ui-numeric" role="cell">37</div>
      </div>
      <div role="row" style="--_rank-2: 3; --_rank-3: 5; --_rank-4: 5">
        <div class="ui-row-number" role="cell"></div>
        <div role="rowheader">Grace Hopper</div>
        <div role="cell">New York</div>
        <div class="ui-numeric" role="cell">58</div>
      </div>
      <div role="row" style="--_rank-2: 4; --_rank-3: 6; --_rank-4: 1">
        <div class="ui-row-number" role="cell"></div>
        <div role="rowheader">Hedy Lamarr</div>
        <div role="cell">Vienna</div>
        <div class="ui-numeric" role="cell">12</div>
      </div>
      <div role="row" style="--_rank-2: 5; --_rank-3: 2; --_rank-4: 4">
        <div class="ui-row-number" role="cell"></div>
        <div role="rowheader">Katherine Johnson</div>
        <div role="cell">Hampton</div>
        <div class="ui-numeric" role="cell">51</div>
      </div>
      <div role="row" style="--_rank-2: 6; --_rank-3: 1; --_rank-4: 6">
        <div class="ui-row-number" role="cell"></div>
        <div role="rowheader">Margaret Hamilton</div>
        <div role="cell">Boston</div>
        <div class="ui-numeric" role="cell">64</div>
      </div>
      <div class="ui-empty" role="row">
        <div role="cell">No rows</div>
      </div>
    </div>
  </div>
</div>
```

## Selection

A `.ui-row-select` cell with a checkbox. `.ui-selected-count` and `.ui-row-count` in `.ui-status` count with CSS counters.

```html
<div class="ui-data-grid">
  <div aria-label="Team" role="table" tabindex="0">
    <div class="ui-head" role="rowgroup">
      <div role="row">
        <div class="ui-row-select" role="columnheader">
          <span class="ui-sr-only">Select</span>
        </div>
        <div role="columnheader">
          <span>Name</span>
        </div>
        <div role="columnheader">
          <span>Role</span>
        </div>
        <div role="columnheader">
          <span>Location</span>
        </div>
        <div class="ui-numeric" role="columnheader">
          <span>Tickets</span>
        </div>
      </div>
    </div>
    <div class="ui-body" role="rowgroup">
      <div role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Ada Lovelace</span>
          </label>
        </div>
        <div role="rowheader">Ada Lovelace</div>
        <div role="cell">Engineer</div>
        <div role="cell">London</div>
        <div class="ui-numeric" role="cell">42</div>
      </div>
      <div role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Alan Turing</span>
          </label>
        </div>
        <div role="rowheader">Alan Turing</div>
        <div role="cell">Researcher</div>
        <div role="cell">Manchester</div>
        <div class="ui-numeric" role="cell">37</div>
      </div>
      <div role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Grace Hopper</span>
          </label>
        </div>
        <div role="rowheader">Grace Hopper</div>
        <div role="cell">Admiral</div>
        <div role="cell">New York</div>
        <div class="ui-numeric" role="cell">58</div>
      </div>
      <div role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Hedy Lamarr</span>
          </label>
        </div>
        <div role="rowheader">Hedy Lamarr</div>
        <div role="cell">Inventor</div>
        <div role="cell">Vienna</div>
        <div class="ui-numeric" role="cell">12</div>
      </div>
      <div role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Katherine Johnson</span>
          </label>
        </div>
        <div role="rowheader">Katherine Johnson</div>
        <div role="cell">Mathematician</div>
        <div role="cell">Hampton</div>
        <div class="ui-numeric" role="cell">51</div>
      </div>
      <div role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Margaret Hamilton</span>
          </label>
        </div>
        <div role="rowheader">Margaret Hamilton</div>
        <div role="cell">Director</div>
        <div role="cell">Boston</div>
        <div class="ui-numeric" role="cell">64</div>
      </div>
      <div class="ui-empty" role="row">
        <div role="cell">No rows</div>
      </div>
    </div>
  </div>
  <div class="ui-status">
    <span class="ui-selection">
      <span class="ui-selected-count"> </span> selected</span
    >
    <span> <span class="ui-row-count"> </span> rows</span>
  </div>
</div>
```

## Bulk actions and forms

`.ui-bulk-actions` in `.ui-toolbar` only shows while rows are selected. Give checkboxes a `name` and `value`, and editable inputs a `name`, to submit them. `form` ties them to a form outside the grid, so a reset button clears the selection without touching sorting or filters.

```html
<form id="team-actions" method="dialog"></form>
<div class="ui-data-grid">
  <div class="ui-toolbar">
    <div class="ui-bulk-actions">
      <button
        form="team-actions"
        type="submit"
        class="ui-button ui-small ui-tonal"
      >
        Archive
      </button>
      <button form="team-actions" type="reset" class="ui-button ui-small">
        Clear selection
      </button>
    </div>
  </div>
  <div aria-label="Team" role="table" tabindex="0">
    <div class="ui-head" role="rowgroup">
      <div role="row">
        <div class="ui-row-select" role="columnheader">
          <span class="ui-sr-only">Select</span>
        </div>
        <div role="columnheader">
          <span>Name</span>
        </div>
        <div role="columnheader">
          <span>Role</span>
        </div>
        <div role="columnheader">
          <span>Location</span>
        </div>
      </div>
    </div>
    <div class="ui-body" role="rowgroup">
      <div role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input
              form="team-actions"
              name="selected"
              type="checkbox"
              value="ada"
            />
            <span class="ui-sr-only">Select Ada Lovelace</span>
          </label>
        </div>
        <div role="rowheader">Ada Lovelace</div>
        <div role="cell">
          <input
            aria-label="Role, Ada Lovelace"
            form="team-actions"
            name="role[ada]"
            value="Engineer"
          />
        </div>
        <div role="cell">London</div>
      </div>
      <div role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input
              form="team-actions"
              name="selected"
              type="checkbox"
              value="alan"
            />
            <span class="ui-sr-only">Select Alan Turing</span>
          </label>
        </div>
        <div role="rowheader">Alan Turing</div>
        <div role="cell">
          <input
            aria-label="Role, Alan Turing"
            form="team-actions"
            name="role[alan]"
            value="Researcher"
          />
        </div>
        <div role="cell">Manchester</div>
      </div>
      <div role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input
              form="team-actions"
              name="selected"
              type="checkbox"
              value="grace"
            />
            <span class="ui-sr-only">Select Grace Hopper</span>
          </label>
        </div>
        <div role="rowheader">Grace Hopper</div>
        <div role="cell">
          <input
            aria-label="Role, Grace Hopper"
            form="team-actions"
            name="role[grace]"
            value="Admiral"
          />
        </div>
        <div role="cell">New York</div>
      </div>
      <div role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input
              form="team-actions"
              name="selected"
              type="checkbox"
              value="hedy"
            />
            <span class="ui-sr-only">Select Hedy Lamarr</span>
          </label>
        </div>
        <div role="rowheader">Hedy Lamarr</div>
        <div role="cell">
          <input
            aria-label="Role, Hedy Lamarr"
            form="team-actions"
            name="role[hedy]"
            value="Inventor"
          />
        </div>
        <div role="cell">Vienna</div>
      </div>
      <div role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input
              form="team-actions"
              name="selected"
              type="checkbox"
              value="katherine"
            />
            <span class="ui-sr-only">Select Katherine Johnson</span>
          </label>
        </div>
        <div role="rowheader">Katherine Johnson</div>
        <div role="cell">
          <input
            aria-label="Role, Katherine Johnson"
            form="team-actions"
            name="role[katherine]"
            value="Mathematician"
          />
        </div>
        <div role="cell">Hampton</div>
      </div>
      <div role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input
              form="team-actions"
              name="selected"
              type="checkbox"
              value="margaret"
            />
            <span class="ui-sr-only">Select Margaret Hamilton</span>
          </label>
        </div>
        <div role="rowheader">Margaret Hamilton</div>
        <div role="cell">
          <input
            aria-label="Role, Margaret Hamilton"
            form="team-actions"
            name="role[margaret]"
            value="Director"
          />
        </div>
        <div role="cell">Boston</div>
      </div>
      <div class="ui-empty" role="row">
        <div role="cell">No rows</div>
      </div>
    </div>
  </div>
  <div class="ui-status">
    <span class="ui-selection">
      <span class="ui-selected-count"> </span> selected</span
    >
    <span> <span class="ui-row-count"> </span> rows</span>
  </div>
</div>
```

## Filtering

Radios in `.ui-filters`. A row with `data-filters="1"` matches the radio with `value="1"`. `value="selected"` shows selected rows.

```html
<div class="ui-data-grid">
  <div class="ui-toolbar">
    <div
      aria-label="Filter rows"
      class="ui-toggle-group ui-small ui-filters"
      role="radiogroup"
    >
      <label class="ui-toggle-button">
        <input
          checked
          name="filtering-filter-1"
          type="radio"
          value=""
        />All</label
      >
      <label class="ui-toggle-button">
        <input name="filtering-filter-1" type="radio" value="1" />Active</label
      >
      <label class="ui-toggle-button">
        <input name="filtering-filter-1" type="radio" value="2" />Away</label
      >
      <label class="ui-toggle-button">
        <input
          name="filtering-filter-1"
          type="radio"
          value="selected"
        />Selected</label
      >
    </div>
  </div>
  <div aria-label="Team" role="table" tabindex="0">
    <div class="ui-head" role="rowgroup">
      <div role="row">
        <div class="ui-row-select" role="columnheader">
          <span class="ui-sr-only">Select</span>
        </div>
        <div role="columnheader">
          <span>Name</span>
        </div>
        <div role="columnheader">
          <span>Role</span>
        </div>
        <div role="columnheader">
          <span>Location</span>
        </div>
        <div class="ui-numeric" role="columnheader">
          <span>Tickets</span>
        </div>
      </div>
    </div>
    <div class="ui-body" role="rowgroup">
      <div data-filters="1" role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Ada Lovelace</span>
          </label>
        </div>
        <div role="rowheader">Ada Lovelace</div>
        <div role="cell">Engineer</div>
        <div role="cell">London</div>
        <div class="ui-numeric" role="cell">42</div>
      </div>
      <div data-filters="2" role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Alan Turing</span>
          </label>
        </div>
        <div role="rowheader">Alan Turing</div>
        <div role="cell">Researcher</div>
        <div role="cell">Manchester</div>
        <div class="ui-numeric" role="cell">37</div>
      </div>
      <div data-filters="1" role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Grace Hopper</span>
          </label>
        </div>
        <div role="rowheader">Grace Hopper</div>
        <div role="cell">Admiral</div>
        <div role="cell">New York</div>
        <div class="ui-numeric" role="cell">58</div>
      </div>
      <div role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Hedy Lamarr</span>
          </label>
        </div>
        <div role="rowheader">Hedy Lamarr</div>
        <div role="cell">Inventor</div>
        <div role="cell">Vienna</div>
        <div class="ui-numeric" role="cell">12</div>
      </div>
      <div data-filters="2" role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Katherine Johnson</span>
          </label>
        </div>
        <div role="rowheader">Katherine Johnson</div>
        <div role="cell">Mathematician</div>
        <div role="cell">Hampton</div>
        <div class="ui-numeric" role="cell">51</div>
      </div>
      <div data-filters="1" role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Margaret Hamilton</span>
          </label>
        </div>
        <div role="rowheader">Margaret Hamilton</div>
        <div role="cell">Director</div>
        <div role="cell">Boston</div>
        <div class="ui-numeric" role="cell">64</div>
      </div>
      <div class="ui-empty" role="row">
        <div role="cell">No rows</div>
      </div>
    </div>
  </div>
  <div class="ui-status">
    <span class="ui-selection">
      <span class="ui-selected-count"> </span> selected</span
    >
    <span> <span class="ui-row-count"> </span> rows</span>
  </div>
</div>
```

## Column visibility

Checkboxes in `.ui-columns` with the column number as `value`.

```html
<div class="ui-data-grid">
  <div class="ui-toolbar">
    <button
      class="ui-button ui-outlined ui-small"
      command="toggle-popover"
      commandfor="column-visibility-columns-1"
      type="button"
    >
      Columns
    </button>
    <menu
      class="ui-menu ui-list ui-dense ui-columns ui-align-end"
      id="column-visibility-columns-1"
      popover
    >
      <li>
        <label class="ui-checkbox">
          <input
            checked
            id="column-visibility-columns-1-1"
            type="checkbox"
            value="1"
          />Name</label
        >
      </li>
      <li>
        <label class="ui-checkbox">
          <input
            checked
            id="column-visibility-columns-1-2"
            type="checkbox"
            value="2"
          />Role</label
        >
      </li>
      <li>
        <label class="ui-checkbox">
          <input
            checked
            id="column-visibility-columns-1-3"
            type="checkbox"
            value="3"
          />Location</label
        >
      </li>
      <li>
        <label class="ui-checkbox">
          <input
            checked
            id="column-visibility-columns-1-4"
            type="checkbox"
            value="4"
          />Tickets</label
        >
      </li>
    </menu>
  </div>
  <div aria-label="Team" role="table" tabindex="0">
    <div class="ui-head" role="rowgroup">
      <div role="row">
        <div role="columnheader">
          <span>Name</span>
        </div>
        <div role="columnheader">
          <span>Role</span>
        </div>
        <div role="columnheader">
          <span>Location</span>
        </div>
        <div class="ui-numeric" role="columnheader">
          <span>Tickets</span>
        </div>
      </div>
    </div>
    <div class="ui-body" role="rowgroup">
      <div role="row">
        <div role="rowheader">Ada Lovelace</div>
        <div role="cell">Engineer</div>
        <div role="cell">London</div>
        <div class="ui-numeric" role="cell">42</div>
      </div>
      <div role="row">
        <div role="rowheader">Alan Turing</div>
        <div role="cell">Researcher</div>
        <div role="cell">Manchester</div>
        <div class="ui-numeric" role="cell">37</div>
      </div>
      <div role="row">
        <div role="rowheader">Grace Hopper</div>
        <div role="cell">Admiral</div>
        <div role="cell">New York</div>
        <div class="ui-numeric" role="cell">58</div>
      </div>
      <div role="row">
        <div role="rowheader">Hedy Lamarr</div>
        <div role="cell">Inventor</div>
        <div role="cell">Vienna</div>
        <div class="ui-numeric" role="cell">12</div>
      </div>
      <div role="row">
        <div role="rowheader">Katherine Johnson</div>
        <div role="cell">Mathematician</div>
        <div role="cell">Hampton</div>
        <div class="ui-numeric" role="cell">51</div>
      </div>
      <div role="row">
        <div role="rowheader">Margaret Hamilton</div>
        <div role="cell">Director</div>
        <div role="cell">Boston</div>
        <div class="ui-numeric" role="cell">64</div>
      </div>
      <div class="ui-empty" role="row">
        <div role="cell">No rows</div>
      </div>
    </div>
  </div>
</div>
```

## Header menus

A popover menu in each header. Its items are `label` elements pointing at the sort radios and column checkboxes by `id`.

```html
<div class="ui-data-grid">
  <div class="ui-toolbar">
    <button
      class="ui-button ui-outlined ui-small"
      command="toggle-popover"
      commandfor="header-menus-columns-1"
      type="button"
    >
      Columns
    </button>
    <menu
      class="ui-menu ui-list ui-dense ui-columns ui-align-end"
      id="header-menus-columns-1"
      popover
    >
      <li>
        <label class="ui-checkbox">
          <input
            checked
            id="header-menus-columns-1-1"
            type="checkbox"
            value="1"
          />Name</label
        >
      </li>
      <li>
        <label class="ui-checkbox">
          <input
            checked
            id="header-menus-columns-1-2"
            type="checkbox"
            value="2"
          />Role</label
        >
      </li>
      <li>
        <label class="ui-checkbox">
          <input
            checked
            id="header-menus-columns-1-3"
            type="checkbox"
            value="3"
          />Location</label
        >
      </li>
      <li>
        <label class="ui-checkbox">
          <input
            checked
            id="header-menus-columns-1-4"
            type="checkbox"
            value="4"
          />Tickets</label
        >
      </li>
    </menu>
  </div>
  <div aria-label="Team" role="table" tabindex="0">
    <div class="ui-head" role="rowgroup">
      <div role="row">
        <div role="columnheader">
          <span>Name</span>
          <span class="ui-sort">
            <label>
              <input
                id="header-menus-sort-1-1-asc"
                name="header-menus-sort-1"
                type="radio"
                value="asc"
              />
              <span class="ui-sr-only">Sort by Name, ascending</span>
            </label>
            <label>
              <input
                id="header-menus-sort-1-1-desc"
                name="header-menus-sort-1"
                type="radio"
                value="desc"
              />
              <span class="ui-sr-only">Sort by Name, descending</span>
            </label>
          </span>
          <button
            aria-label="Options for Name"
            class="ui-button ui-rounded ui-small"
            command="toggle-popover"
            commandfor="header-menus-header-menu-1-1"
            type="button"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path
                d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
                fill="currentColor"
              ></path>
            </svg>
          </button>
          <menu
            class="ui-menu ui-list ui-dense ui-align-end"
            id="header-menus-header-menu-1-1"
            popover
          >
            <li>
              <label for="header-menus-sort-1-1-asc">Sort ascending</label>
            </li>
            <li>
              <label for="header-menus-sort-1-1-desc">Sort descending</label>
            </li>
            <li>
              <label for="header-menus-columns-1-1">Hide column</label>
            </li>
          </menu>
        </div>
        <div role="columnheader">
          <span>Role</span>
          <span class="ui-sort">
            <label>
              <input
                id="header-menus-sort-1-2-asc"
                name="header-menus-sort-1"
                type="radio"
                value="asc"
              />
              <span class="ui-sr-only">Sort by Role, ascending</span>
            </label>
            <label>
              <input
                id="header-menus-sort-1-2-desc"
                name="header-menus-sort-1"
                type="radio"
                value="desc"
              />
              <span class="ui-sr-only">Sort by Role, descending</span>
            </label>
          </span>
          <button
            aria-label="Options for Role"
            class="ui-button ui-rounded ui-small"
            command="toggle-popover"
            commandfor="header-menus-header-menu-1-2"
            type="button"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path
                d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
                fill="currentColor"
              ></path>
            </svg>
          </button>
          <menu
            class="ui-menu ui-list ui-dense ui-align-end"
            id="header-menus-header-menu-1-2"
            popover
          >
            <li>
              <label for="header-menus-sort-1-2-asc">Sort ascending</label>
            </li>
            <li>
              <label for="header-menus-sort-1-2-desc">Sort descending</label>
            </li>
            <li>
              <label for="header-menus-columns-1-2">Hide column</label>
            </li>
          </menu>
        </div>
        <div role="columnheader">
          <span>Location</span>
          <span class="ui-sort">
            <label>
              <input
                id="header-menus-sort-1-3-asc"
                name="header-menus-sort-1"
                type="radio"
                value="asc"
              />
              <span class="ui-sr-only">Sort by Location, ascending</span>
            </label>
            <label>
              <input
                id="header-menus-sort-1-3-desc"
                name="header-menus-sort-1"
                type="radio"
                value="desc"
              />
              <span class="ui-sr-only">Sort by Location, descending</span>
            </label>
          </span>
          <button
            aria-label="Options for Location"
            class="ui-button ui-rounded ui-small"
            command="toggle-popover"
            commandfor="header-menus-header-menu-1-3"
            type="button"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path
                d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
                fill="currentColor"
              ></path>
            </svg>
          </button>
          <menu
            class="ui-menu ui-list ui-dense ui-align-end"
            id="header-menus-header-menu-1-3"
            popover
          >
            <li>
              <label for="header-menus-sort-1-3-asc">Sort ascending</label>
            </li>
            <li>
              <label for="header-menus-sort-1-3-desc">Sort descending</label>
            </li>
            <li>
              <label for="header-menus-columns-1-3">Hide column</label>
            </li>
          </menu>
        </div>
        <div class="ui-numeric" role="columnheader">
          <span>Tickets</span>
          <span class="ui-sort">
            <label>
              <input
                id="header-menus-sort-1-4-asc"
                name="header-menus-sort-1"
                type="radio"
                value="asc"
              />
              <span class="ui-sr-only">Sort by Tickets, ascending</span>
            </label>
            <label>
              <input
                id="header-menus-sort-1-4-desc"
                name="header-menus-sort-1"
                type="radio"
                value="desc"
              />
              <span class="ui-sr-only">Sort by Tickets, descending</span>
            </label>
          </span>
          <button
            aria-label="Options for Tickets"
            class="ui-button ui-rounded ui-small"
            command="toggle-popover"
            commandfor="header-menus-header-menu-1-4"
            type="button"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path
                d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
                fill="currentColor"
              ></path>
            </svg>
          </button>
          <menu
            class="ui-menu ui-list ui-dense ui-align-end"
            id="header-menus-header-menu-1-4"
            popover
          >
            <li>
              <label for="header-menus-sort-1-4-asc">Sort ascending</label>
            </li>
            <li>
              <label for="header-menus-sort-1-4-desc">Sort descending</label>
            </li>
            <li>
              <label for="header-menus-columns-1-4">Hide column</label>
            </li>
          </menu>
        </div>
      </div>
    </div>
    <div class="ui-body" role="rowgroup">
      <div
        role="row"
        style="--_rank-1: 1; --_rank-2: 3; --_rank-3: 3; --_rank-4: 3"
      >
        <div role="rowheader">Ada Lovelace</div>
        <div role="cell">Engineer</div>
        <div role="cell">London</div>
        <div class="ui-numeric" role="cell">42</div>
      </div>
      <div
        role="row"
        style="--_rank-1: 2; --_rank-2: 6; --_rank-3: 4; --_rank-4: 2"
      >
        <div role="rowheader">Alan Turing</div>
        <div role="cell">Researcher</div>
        <div role="cell">Manchester</div>
        <div class="ui-numeric" role="cell">37</div>
      </div>
      <div
        role="row"
        style="--_rank-1: 3; --_rank-2: 1; --_rank-3: 5; --_rank-4: 5"
      >
        <div role="rowheader">Grace Hopper</div>
        <div role="cell">Admiral</div>
        <div role="cell">New York</div>
        <div class="ui-numeric" role="cell">58</div>
      </div>
      <div
        role="row"
        style="--_rank-1: 4; --_rank-2: 4; --_rank-3: 6; --_rank-4: 1"
      >
        <div role="rowheader">Hedy Lamarr</div>
        <div role="cell">Inventor</div>
        <div role="cell">Vienna</div>
        <div class="ui-numeric" role="cell">12</div>
      </div>
      <div
        role="row"
        style="--_rank-1: 5; --_rank-2: 5; --_rank-3: 2; --_rank-4: 4"
      >
        <div role="rowheader">Katherine Johnson</div>
        <div role="cell">Mathematician</div>
        <div role="cell">Hampton</div>
        <div class="ui-numeric" role="cell">51</div>
      </div>
      <div
        role="row"
        style="--_rank-1: 6; --_rank-2: 2; --_rank-3: 1; --_rank-4: 6"
      >
        <div role="rowheader">Margaret Hamilton</div>
        <div role="cell">Director</div>
        <div role="cell">Boston</div>
        <div class="ui-numeric" role="cell">64</div>
      </div>
      <div class="ui-empty" role="row">
        <div role="cell">No rows</div>
      </div>
    </div>
  </div>
</div>
```

## Density

`.ui-dense` or `.ui-spacious`, or radios in `.ui-density`.

```html
<div class="ui-data-grid">
  <div class="ui-toolbar">
    <div
      aria-label="Density"
      class="ui-toggle-group ui-small ui-density"
      role="radiogroup"
    >
      <label class="ui-toggle-button">
        <input
          checked
          name="density-density-1"
          type="radio"
          value="dense"
        />Dense</label
      >
      <label class="ui-toggle-button">
        <input
          name="density-density-1"
          type="radio"
          value="standard"
        />Standard</label
      >
      <label class="ui-toggle-button">
        <input
          name="density-density-1"
          type="radio"
          value="spacious"
        />Spacious</label
      >
    </div>
  </div>
  <div aria-label="Team" role="table" tabindex="0">
    <div class="ui-head" role="rowgroup">
      <div role="row">
        <div role="columnheader">
          <span>Name</span>
        </div>
        <div role="columnheader">
          <span>Role</span>
        </div>
        <div role="columnheader">
          <span>Location</span>
        </div>
        <div class="ui-numeric" role="columnheader">
          <span>Tickets</span>
        </div>
      </div>
    </div>
    <div class="ui-body" role="rowgroup">
      <div role="row">
        <div role="rowheader">Ada Lovelace</div>
        <div role="cell">Engineer</div>
        <div role="cell">London</div>
        <div class="ui-numeric" role="cell">42</div>
      </div>
      <div role="row">
        <div role="rowheader">Alan Turing</div>
        <div role="cell">Researcher</div>
        <div role="cell">Manchester</div>
        <div class="ui-numeric" role="cell">37</div>
      </div>
      <div role="row">
        <div role="rowheader">Grace Hopper</div>
        <div role="cell">Admiral</div>
        <div role="cell">New York</div>
        <div class="ui-numeric" role="cell">58</div>
      </div>
      <div role="row">
        <div role="rowheader">Hedy Lamarr</div>
        <div role="cell">Inventor</div>
        <div role="cell">Vienna</div>
        <div class="ui-numeric" role="cell">12</div>
      </div>
      <div role="row">
        <div role="rowheader">Katherine Johnson</div>
        <div role="cell">Mathematician</div>
        <div role="cell">Hampton</div>
        <div class="ui-numeric" role="cell">51</div>
      </div>
      <div role="row">
        <div role="rowheader">Margaret Hamilton</div>
        <div role="cell">Director</div>
        <div role="cell">Boston</div>
        <div class="ui-numeric" role="cell">64</div>
      </div>
      <div class="ui-empty" role="row">
        <div role="cell">No rows</div>
      </div>
    </div>
  </div>
</div>
```

## Column widths

Columns share the space and never get narrower than their content. `--_col-[n]` sets a track size, and `.ui-fit` on a header fits the column to its content.

```html
<div class="ui-data-grid" style="--_col-1: 12rem; --_col-3: 2fr">
  <div aria-label="Team" role="table" tabindex="0">
    <div class="ui-head" role="rowgroup">
      <div role="row">
        <div role="columnheader">
          <span>Name</span>
        </div>
        <div class="ui-fit" role="columnheader">
          <span>Role</span>
        </div>
        <div role="columnheader">
          <span>Location</span>
        </div>
        <div class="ui-numeric" role="columnheader">
          <span>Tickets</span>
        </div>
      </div>
    </div>
    <div class="ui-body" role="rowgroup">
      <div role="row">
        <div role="rowheader">Ada Lovelace</div>
        <div role="cell">Engineer</div>
        <div role="cell">London</div>
        <div class="ui-numeric" role="cell">42</div>
      </div>
      <div role="row">
        <div role="rowheader">Alan Turing</div>
        <div role="cell">Researcher</div>
        <div role="cell">Manchester</div>
        <div class="ui-numeric" role="cell">37</div>
      </div>
      <div role="row">
        <div role="rowheader">Grace Hopper</div>
        <div role="cell">Admiral</div>
        <div role="cell">New York</div>
        <div class="ui-numeric" role="cell">58</div>
      </div>
      <div role="row">
        <div role="rowheader">Hedy Lamarr</div>
        <div role="cell">Inventor</div>
        <div role="cell">Vienna</div>
        <div class="ui-numeric" role="cell">12</div>
      </div>
      <div role="row">
        <div role="rowheader">Katherine Johnson</div>
        <div role="cell">Mathematician</div>
        <div role="cell">Hampton</div>
        <div class="ui-numeric" role="cell">51</div>
      </div>
      <div role="row">
        <div role="rowheader">Margaret Hamilton</div>
        <div role="cell">Director</div>
        <div role="cell">Boston</div>
        <div class="ui-numeric" role="cell">64</div>
      </div>
      <div class="ui-empty" role="row">
        <div role="cell">No rows</div>
      </div>
    </div>
  </div>
</div>
```

## Resizable

`.ui-resizable`. Drag the corner of a header.

```html
<div class="ui-data-grid ui-resizable">
  <div aria-label="Team" role="table" tabindex="0">
    <div class="ui-head" role="rowgroup">
      <div role="row">
        <div role="columnheader">
          <span>Name</span>
        </div>
        <div role="columnheader">
          <span>Role</span>
        </div>
        <div role="columnheader">
          <span>Email</span>
        </div>
        <div role="columnheader">
          <span>Location</span>
        </div>
      </div>
    </div>
    <div class="ui-body" role="rowgroup">
      <div role="row">
        <div role="rowheader">Ada Lovelace</div>
        <div role="cell">Engineer</div>
        <div role="cell">ada@example.com</div>
        <div role="cell">London</div>
      </div>
      <div role="row">
        <div role="rowheader">Alan Turing</div>
        <div role="cell">Researcher</div>
        <div role="cell">alan@example.com</div>
        <div role="cell">Manchester</div>
      </div>
      <div role="row">
        <div role="rowheader">Grace Hopper</div>
        <div role="cell">Admiral</div>
        <div role="cell">grace@example.com</div>
        <div role="cell">New York</div>
      </div>
      <div role="row">
        <div role="rowheader">Hedy Lamarr</div>
        <div role="cell">Inventor</div>
        <div role="cell">hedy@example.com</div>
        <div role="cell">Vienna</div>
      </div>
      <div role="row">
        <div role="rowheader">Katherine Johnson</div>
        <div role="cell">Mathematician</div>
        <div role="cell">katherine@example.com</div>
        <div role="cell">Hampton</div>
      </div>
      <div role="row">
        <div role="rowheader">Margaret Hamilton</div>
        <div role="cell">Director</div>
        <div role="cell">margaret@example.com</div>
        <div role="cell">Boston</div>
      </div>
      <div class="ui-empty" role="row">
        <div role="cell">No rows</div>
      </div>
    </div>
  </div>
</div>
```

## Pinned columns

`.ui-pin-start` and `.ui-pin-end`, and `--_max-block-size` for a sticky header. Shadows show when there is more to scroll.

```html
<div
  class="ui-data-grid ui-pin-end ui-pin-start"
  style="
    --_col-2: 11rem;
    --_col-3: 10rem;
    --_col-4: 14rem;
    --_col-5: 10rem;
    --_col-6: 8rem;
    --_col-7: 8rem;
    --_max-block-size: 16rem;
  "
>
  <div aria-label="Team" role="table" tabindex="0">
    <div class="ui-head" role="rowgroup">
      <div role="row">
        <div class="ui-row-select" role="columnheader">
          <span class="ui-sr-only">Select</span>
        </div>
        <div role="columnheader">
          <span>Name</span>
        </div>
        <div role="columnheader">
          <span>Role</span>
        </div>
        <div role="columnheader">
          <span>Email</span>
        </div>
        <div role="columnheader">
          <span>Location</span>
        </div>
        <div class="ui-numeric" role="columnheader">
          <span>Joined</span>
        </div>
        <div class="ui-numeric" role="columnheader">
          <span>Tickets</span>
        </div>
        <div class="ui-fit" role="columnheader">
          <span>Actions</span>
        </div>
      </div>
    </div>
    <div class="ui-body" role="rowgroup">
      <div role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Ada Lovelace</span>
          </label>
        </div>
        <div role="rowheader">Ada Lovelace</div>
        <div role="cell">Engineer</div>
        <div role="cell">ada@example.com</div>
        <div role="cell">London</div>
        <div class="ui-numeric" role="cell">2015</div>
        <div class="ui-numeric" role="cell">42</div>
        <div role="cell">
          <button class="ui-button ui-small" type="button">Edit</button>
        </div>
      </div>
      <div role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Alan Turing</span>
          </label>
        </div>
        <div role="rowheader">Alan Turing</div>
        <div role="cell">Researcher</div>
        <div role="cell">alan@example.com</div>
        <div role="cell">Manchester</div>
        <div class="ui-numeric" role="cell">2018</div>
        <div class="ui-numeric" role="cell">37</div>
        <div role="cell">
          <button class="ui-button ui-small" type="button">Edit</button>
        </div>
      </div>
      <div role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Grace Hopper</span>
          </label>
        </div>
        <div role="rowheader">Grace Hopper</div>
        <div role="cell">Admiral</div>
        <div role="cell">grace@example.com</div>
        <div role="cell">New York</div>
        <div class="ui-numeric" role="cell">2012</div>
        <div class="ui-numeric" role="cell">58</div>
        <div role="cell">
          <button class="ui-button ui-small" type="button">Edit</button>
        </div>
      </div>
      <div role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Hedy Lamarr</span>
          </label>
        </div>
        <div role="rowheader">Hedy Lamarr</div>
        <div role="cell">Inventor</div>
        <div role="cell">hedy@example.com</div>
        <div role="cell">Vienna</div>
        <div class="ui-numeric" role="cell">2021</div>
        <div class="ui-numeric" role="cell">12</div>
        <div role="cell">
          <button class="ui-button ui-small" type="button">Edit</button>
        </div>
      </div>
      <div role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Katherine Johnson</span>
          </label>
        </div>
        <div role="rowheader">Katherine Johnson</div>
        <div role="cell">Mathematician</div>
        <div role="cell">katherine@example.com</div>
        <div role="cell">Hampton</div>
        <div class="ui-numeric" role="cell">2016</div>
        <div class="ui-numeric" role="cell">51</div>
        <div role="cell">
          <button class="ui-button ui-small" type="button">Edit</button>
        </div>
      </div>
      <div role="row">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Margaret Hamilton</span>
          </label>
        </div>
        <div role="rowheader">Margaret Hamilton</div>
        <div role="cell">Director</div>
        <div role="cell">margaret@example.com</div>
        <div role="cell">Boston</div>
        <div class="ui-numeric" role="cell">2013</div>
        <div class="ui-numeric" role="cell">64</div>
        <div role="cell">
          <button class="ui-button ui-small" type="button">Edit</button>
        </div>
      </div>
      <div class="ui-empty" role="row">
        <div role="cell">No rows</div>
      </div>
    </div>
  </div>
</div>
```

## Detail panel

A `.ui-expand` cell with a `details` element. Its content spans the row.

```html
<div class="ui-data-grid">
  <div aria-label="Team" role="table" tabindex="0">
    <div class="ui-head" role="rowgroup">
      <div role="row">
        <div class="ui-expand" role="columnheader">
          <span class="ui-sr-only">Show details for</span>
        </div>
        <div role="columnheader">
          <span>Name</span>
        </div>
        <div role="columnheader">
          <span>Role</span>
        </div>
        <div role="columnheader">
          <span>Location</span>
        </div>
        <div class="ui-numeric" role="columnheader">
          <span>Tickets</span>
        </div>
      </div>
    </div>
    <div class="ui-body" role="rowgroup">
      <div role="row">
        <div class="ui-expand" role="cell">
          <details>
            <summary>
              <span class="ui-sr-only">Show details for Ada Lovelace</span>
            </summary>
            <div class="ui-detail">
              <p>Ada Lovelace joined in 2015. Contact: ada@example.com</p>
            </div>
          </details>
        </div>
        <div role="rowheader">Ada Lovelace</div>
        <div role="cell">Engineer</div>
        <div role="cell">London</div>
        <div class="ui-numeric" role="cell">42</div>
      </div>
      <div role="row">
        <div class="ui-expand" role="cell">
          <details>
            <summary>
              <span class="ui-sr-only">Show details for Alan Turing</span>
            </summary>
            <div class="ui-detail">
              <p>Alan Turing joined in 2018. Contact: alan@example.com</p>
            </div>
          </details>
        </div>
        <div role="rowheader">Alan Turing</div>
        <div role="cell">Researcher</div>
        <div role="cell">Manchester</div>
        <div class="ui-numeric" role="cell">37</div>
      </div>
      <div role="row">
        <div class="ui-expand" role="cell">
          <details>
            <summary>
              <span class="ui-sr-only">Show details for Grace Hopper</span>
            </summary>
            <div class="ui-detail">
              <p>Grace Hopper joined in 2012. Contact: grace@example.com</p>
            </div>
          </details>
        </div>
        <div role="rowheader">Grace Hopper</div>
        <div role="cell">Admiral</div>
        <div role="cell">New York</div>
        <div class="ui-numeric" role="cell">58</div>
      </div>
      <div role="row">
        <div class="ui-expand" role="cell">
          <details>
            <summary>
              <span class="ui-sr-only">Show details for Hedy Lamarr</span>
            </summary>
            <div class="ui-detail">
              <p>Hedy Lamarr joined in 2021. Contact: hedy@example.com</p>
            </div>
          </details>
        </div>
        <div role="rowheader">Hedy Lamarr</div>
        <div role="cell">Inventor</div>
        <div role="cell">Vienna</div>
        <div class="ui-numeric" role="cell">12</div>
      </div>
      <div role="row">
        <div class="ui-expand" role="cell">
          <details>
            <summary>
              <span class="ui-sr-only">Show details for Katherine Johnson</span>
            </summary>
            <div class="ui-detail">
              <p>
                Katherine Johnson joined in 2016. Contact: katherine@example.com
              </p>
            </div>
          </details>
        </div>
        <div role="rowheader">Katherine Johnson</div>
        <div role="cell">Mathematician</div>
        <div role="cell">Hampton</div>
        <div class="ui-numeric" role="cell">51</div>
      </div>
      <div role="row">
        <div class="ui-expand" role="cell">
          <details>
            <summary>
              <span class="ui-sr-only">Show details for Margaret Hamilton</span>
            </summary>
            <div class="ui-detail">
              <p>
                Margaret Hamilton joined in 2013. Contact: margaret@example.com
              </p>
            </div>
          </details>
        </div>
        <div role="rowheader">Margaret Hamilton</div>
        <div role="cell">Director</div>
        <div role="cell">Boston</div>
        <div class="ui-numeric" role="cell">64</div>
      </div>
      <div class="ui-empty" role="row">
        <div role="cell">No rows</div>
      </div>
    </div>
  </div>
</div>
```

## Editable cells

An `input` in a cell looks like text until hovered or focused.

```html
<div class="ui-data-grid">
  <div aria-label="Team" role="table" tabindex="0">
    <div class="ui-head" role="rowgroup">
      <div role="row">
        <div role="columnheader">
          <span>Name</span>
        </div>
        <div role="columnheader">
          <span>Role</span>
        </div>
        <div role="columnheader">
          <span>Location</span>
        </div>
      </div>
    </div>
    <div class="ui-body" role="rowgroup">
      <div role="row">
        <div role="rowheader">Ada Lovelace</div>
        <div role="cell">
          <input aria-label="Role, Ada Lovelace" value="Engineer" />
        </div>
        <div role="cell">
          <input aria-label="Location, Ada Lovelace" value="London" />
        </div>
      </div>
      <div role="row">
        <div role="rowheader">Alan Turing</div>
        <div role="cell">
          <input aria-label="Role, Alan Turing" value="Researcher" />
        </div>
        <div role="cell">
          <input aria-label="Location, Alan Turing" value="Manchester" />
        </div>
      </div>
      <div role="row">
        <div role="rowheader">Grace Hopper</div>
        <div role="cell">
          <input aria-label="Role, Grace Hopper" value="Admiral" />
        </div>
        <div role="cell">
          <input aria-label="Location, Grace Hopper" value="New York" />
        </div>
      </div>
      <div role="row">
        <div role="rowheader">Hedy Lamarr</div>
        <div role="cell">
          <input aria-label="Role, Hedy Lamarr" value="Inventor" />
        </div>
        <div role="cell">
          <input aria-label="Location, Hedy Lamarr" value="Vienna" />
        </div>
      </div>
      <div role="row">
        <div role="rowheader">Katherine Johnson</div>
        <div role="cell">
          <input aria-label="Role, Katherine Johnson" value="Mathematician" />
        </div>
        <div role="cell">
          <input aria-label="Location, Katherine Johnson" value="Hampton" />
        </div>
      </div>
      <div role="row">
        <div role="rowheader">Margaret Hamilton</div>
        <div role="cell">
          <input aria-label="Role, Margaret Hamilton" value="Director" />
        </div>
        <div role="cell">
          <input aria-label="Location, Margaret Hamilton" value="Boston" />
        </div>
      </div>
      <div class="ui-empty" role="row">
        <div role="cell">No rows</div>
      </div>
    </div>
  </div>
</div>
```

## Column groups

A header row with `aria-colspan` and a matching `grid-column` span.

```html
<div class="ui-data-grid">
  <div aria-label="Team" role="table" tabindex="0">
    <div class="ui-head" role="rowgroup">
      <div role="row">
        <div aria-colspan="3" role="columnheader" style="grid-column: span 3">
          Person
        </div>
        <div aria-colspan="2" role="columnheader" style="grid-column: span 2">
          Work
        </div>
      </div>
      <div role="row">
        <div role="columnheader">
          <span>Name</span>
        </div>
        <div role="columnheader">
          <span>Role</span>
        </div>
        <div role="columnheader">
          <span>Location</span>
        </div>
        <div class="ui-numeric" role="columnheader">
          <span>Tickets</span>
        </div>
        <div class="ui-numeric" role="columnheader">
          <span>Progress</span>
        </div>
      </div>
    </div>
    <div class="ui-body" role="rowgroup">
      <div role="row">
        <div role="rowheader">Ada Lovelace</div>
        <div role="cell">Engineer</div>
        <div role="cell">London</div>
        <div class="ui-numeric" role="cell">42</div>
        <div class="ui-numeric" role="cell">82</div>
      </div>
      <div role="row">
        <div role="rowheader">Alan Turing</div>
        <div role="cell">Researcher</div>
        <div role="cell">Manchester</div>
        <div class="ui-numeric" role="cell">37</div>
        <div class="ui-numeric" role="cell">64</div>
      </div>
      <div role="row">
        <div role="rowheader">Grace Hopper</div>
        <div role="cell">Admiral</div>
        <div role="cell">New York</div>
        <div class="ui-numeric" role="cell">58</div>
        <div class="ui-numeric" role="cell">95</div>
      </div>
      <div role="row">
        <div role="rowheader">Hedy Lamarr</div>
        <div role="cell">Inventor</div>
        <div role="cell">Vienna</div>
        <div class="ui-numeric" role="cell">12</div>
        <div class="ui-numeric" role="cell">40</div>
      </div>
      <div role="row">
        <div role="rowheader">Katherine Johnson</div>
        <div role="cell">Mathematician</div>
        <div role="cell">Hampton</div>
        <div class="ui-numeric" role="cell">51</div>
        <div class="ui-numeric" role="cell">77</div>
      </div>
      <div role="row">
        <div role="rowheader">Margaret Hamilton</div>
        <div role="cell">Director</div>
        <div role="cell">Boston</div>
        <div class="ui-numeric" role="cell">64</div>
        <div class="ui-numeric" role="cell">88</div>
      </div>
      <div class="ui-empty" role="row">
        <div role="cell">No rows</div>
      </div>
    </div>
  </div>
</div>
```

## Totals

Each row sets `--_sum-[n]`, and a `.ui-sum` cell in `.ui-foot` shows the total of column `n`. Totals follow the filters.

```html
<div class="ui-data-grid">
  <div aria-label="Team" role="table" tabindex="0">
    <div class="ui-head" role="rowgroup">
      <div role="row">
        <div class="ui-row-select" role="columnheader">
          <span class="ui-sr-only">Select</span>
        </div>
        <div role="columnheader">
          <span>Name</span>
        </div>
        <div role="columnheader">
          <span>Location</span>
        </div>
        <div class="ui-numeric" role="columnheader">
          <span>Joined</span>
        </div>
        <div class="ui-numeric" role="columnheader">
          <span>Tickets</span>
        </div>
      </div>
    </div>
    <div class="ui-body" role="rowgroup">
      <div role="row" style="--_sum-5: 42">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Ada Lovelace</span>
          </label>
        </div>
        <div role="rowheader">Ada Lovelace</div>
        <div role="cell">London</div>
        <div class="ui-numeric" role="cell">2015</div>
        <div class="ui-numeric" role="cell">42</div>
      </div>
      <div role="row" style="--_sum-5: 37">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Alan Turing</span>
          </label>
        </div>
        <div role="rowheader">Alan Turing</div>
        <div role="cell">Manchester</div>
        <div class="ui-numeric" role="cell">2018</div>
        <div class="ui-numeric" role="cell">37</div>
      </div>
      <div role="row" style="--_sum-5: 58">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Grace Hopper</span>
          </label>
        </div>
        <div role="rowheader">Grace Hopper</div>
        <div role="cell">New York</div>
        <div class="ui-numeric" role="cell">2012</div>
        <div class="ui-numeric" role="cell">58</div>
      </div>
      <div role="row" style="--_sum-5: 12">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Hedy Lamarr</span>
          </label>
        </div>
        <div role="rowheader">Hedy Lamarr</div>
        <div role="cell">Vienna</div>
        <div class="ui-numeric" role="cell">2021</div>
        <div class="ui-numeric" role="cell">12</div>
      </div>
      <div role="row" style="--_sum-5: 51">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Katherine Johnson</span>
          </label>
        </div>
        <div role="rowheader">Katherine Johnson</div>
        <div role="cell">Hampton</div>
        <div class="ui-numeric" role="cell">2016</div>
        <div class="ui-numeric" role="cell">51</div>
      </div>
      <div role="row" style="--_sum-5: 64">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Margaret Hamilton</span>
          </label>
        </div>
        <div role="rowheader">Margaret Hamilton</div>
        <div role="cell">Boston</div>
        <div class="ui-numeric" role="cell">2013</div>
        <div class="ui-numeric" role="cell">64</div>
      </div>
      <div class="ui-empty" role="row">
        <div role="cell">No rows</div>
      </div>
    </div>
    <div class="ui-foot" role="rowgroup">
      <div role="row">
        <div class="ui-row-select" role="cell"></div>
        <div role="rowheader">Total</div>
        <div role="cell"></div>
        <div class="ui-numeric" role="cell"></div>
        <div class="ui-numeric ui-sum" role="cell"></div>
      </div>
    </div>
  </div>
  <div class="ui-status">
    <span class="ui-selection">
      <span class="ui-selected-count"> </span> selected</span
    >
    <span> <span class="ui-row-count"> </span> rows</span>
  </div>
</div>
```

## Loading

`aria-busy="true"` on the table.

```html
<div class="ui-data-grid">
  <div aria-busy="true" aria-label="Team" role="table" tabindex="0">
    <div class="ui-head" role="rowgroup">
      <div role="row">
        <div role="columnheader">
          <span>Name</span>
        </div>
        <div role="columnheader">
          <span>Role</span>
        </div>
        <div role="columnheader">
          <span>Location</span>
        </div>
        <div class="ui-numeric" role="columnheader">
          <span>Tickets</span>
        </div>
      </div>
    </div>
    <div class="ui-body" role="rowgroup">
      <div role="row">
        <div role="rowheader">Ada Lovelace</div>
        <div role="cell">Engineer</div>
        <div role="cell">London</div>
        <div class="ui-numeric" role="cell">42</div>
      </div>
      <div role="row">
        <div role="rowheader">Alan Turing</div>
        <div role="cell">Researcher</div>
        <div role="cell">Manchester</div>
        <div class="ui-numeric" role="cell">37</div>
      </div>
      <div role="row">
        <div role="rowheader">Grace Hopper</div>
        <div role="cell">Admiral</div>
        <div role="cell">New York</div>
        <div class="ui-numeric" role="cell">58</div>
      </div>
      <div role="row">
        <div role="rowheader">Hedy Lamarr</div>
        <div role="cell">Inventor</div>
        <div role="cell">Vienna</div>
        <div class="ui-numeric" role="cell">12</div>
      </div>
      <div role="row">
        <div role="rowheader">Katherine Johnson</div>
        <div role="cell">Mathematician</div>
        <div role="cell">Hampton</div>
        <div class="ui-numeric" role="cell">51</div>
      </div>
      <div role="row">
        <div role="rowheader">Margaret Hamilton</div>
        <div role="cell">Director</div>
        <div role="cell">Boston</div>
        <div class="ui-numeric" role="cell">64</div>
      </div>
      <div class="ui-empty" role="row">
        <div role="cell">No rows</div>
      </div>
    </div>
  </div>
</div>
```

## Empty state

The `.ui-empty` row shows when no rows match.

```html
<div class="ui-data-grid">
  <div aria-label="Team" role="table" tabindex="0">
    <div class="ui-head" role="rowgroup">
      <div role="row">
        <div role="columnheader">
          <span>Name</span>
        </div>
        <div role="columnheader">
          <span>Role</span>
        </div>
        <div role="columnheader">
          <span>Location</span>
        </div>
        <div class="ui-numeric" role="columnheader">
          <span>Tickets</span>
        </div>
      </div>
    </div>
    <div class="ui-body" role="rowgroup">
      <div class="ui-empty" role="row">
        <div role="cell">
          <p>Nobody has joined the team yet.</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Right to left

`dir="rtl"` mirrors pinned columns, scroll shadows, sort arrows and the detail toggle.

```html
<div
  class="ui-data-grid ui-pin-end ui-pin-start"
  style="
    --_col-4: 13rem;
    --_col-5: 10rem;
    --_col-6: 14rem;
    --_col-7: 10rem;
    --_col-8: 9rem;
    --_max-block-size: 16rem;
  "
  dir="rtl"
>
  <div aria-label="Team" role="table" tabindex="0">
    <div class="ui-head" role="rowgroup">
      <div role="row">
        <div class="ui-row-select" role="columnheader">
          <span class="ui-sr-only">Select</span>
        </div>
        <div class="ui-row-number" role="columnheader">
          <span class="ui-sr-only">Row number</span>
        </div>
        <div class="ui-expand" role="columnheader">
          <span class="ui-sr-only">Show details for</span>
        </div>
        <div role="columnheader">
          <span>Name</span>
          <span class="ui-sort">
            <label>
              <input
                id="rtl-sort-1-4-asc"
                name="rtl-sort-1"
                type="radio"
                value="asc"
              />
              <span class="ui-sr-only">Sort by Name, ascending</span>
            </label>
            <label>
              <input
                id="rtl-sort-1-4-desc"
                name="rtl-sort-1"
                type="radio"
                value="desc"
              />
              <span class="ui-sr-only">Sort by Name, descending</span>
            </label>
          </span>
        </div>
        <div role="columnheader">
          <span>Role</span>
        </div>
        <div role="columnheader">
          <span>Email</span>
        </div>
        <div role="columnheader">
          <span>Location</span>
          <span class="ui-sort">
            <label>
              <input
                id="rtl-sort-1-7-asc"
                name="rtl-sort-1"
                type="radio"
                value="asc"
              />
              <span class="ui-sr-only">Sort by Location, ascending</span>
            </label>
            <label>
              <input
                id="rtl-sort-1-7-desc"
                name="rtl-sort-1"
                type="radio"
                value="desc"
              />
              <span class="ui-sr-only">Sort by Location, descending</span>
            </label>
          </span>
        </div>
        <div class="ui-numeric" role="columnheader">
          <span>Tickets</span>
          <span class="ui-sort">
            <label>
              <input
                id="rtl-sort-1-8-asc"
                name="rtl-sort-1"
                type="radio"
                value="asc"
              />
              <span class="ui-sr-only">Sort by Tickets, ascending</span>
            </label>
            <label>
              <input
                id="rtl-sort-1-8-desc"
                name="rtl-sort-1"
                type="radio"
                value="desc"
              />
              <span class="ui-sr-only">Sort by Tickets, descending</span>
            </label>
          </span>
        </div>
      </div>
    </div>
    <div class="ui-body" role="rowgroup">
      <div role="row" style="--_rank-4: 1; --_rank-7: 3; --_rank-8: 3">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Ada Lovelace</span>
          </label>
        </div>
        <div class="ui-row-number" role="cell"></div>
        <div class="ui-expand" role="cell">
          <details>
            <summary>
              <span class="ui-sr-only">Show details for Ada Lovelace</span>
            </summary>
            <div class="ui-detail">
              <p>ada@example.com</p>
            </div>
          </details>
        </div>
        <div role="rowheader">Ada Lovelace</div>
        <div role="cell">Engineer</div>
        <div role="cell">ada@example.com</div>
        <div role="cell">London</div>
        <div class="ui-numeric" role="cell">42</div>
      </div>
      <div role="row" style="--_rank-4: 2; --_rank-7: 4; --_rank-8: 2">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Alan Turing</span>
          </label>
        </div>
        <div class="ui-row-number" role="cell"></div>
        <div class="ui-expand" role="cell">
          <details>
            <summary>
              <span class="ui-sr-only">Show details for Alan Turing</span>
            </summary>
            <div class="ui-detail">
              <p>alan@example.com</p>
            </div>
          </details>
        </div>
        <div role="rowheader">Alan Turing</div>
        <div role="cell">Researcher</div>
        <div role="cell">alan@example.com</div>
        <div role="cell">Manchester</div>
        <div class="ui-numeric" role="cell">37</div>
      </div>
      <div role="row" style="--_rank-4: 3; --_rank-7: 5; --_rank-8: 5">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Grace Hopper</span>
          </label>
        </div>
        <div class="ui-row-number" role="cell"></div>
        <div class="ui-expand" role="cell">
          <details>
            <summary>
              <span class="ui-sr-only">Show details for Grace Hopper</span>
            </summary>
            <div class="ui-detail">
              <p>grace@example.com</p>
            </div>
          </details>
        </div>
        <div role="rowheader">Grace Hopper</div>
        <div role="cell">Admiral</div>
        <div role="cell">grace@example.com</div>
        <div role="cell">New York</div>
        <div class="ui-numeric" role="cell">58</div>
      </div>
      <div role="row" style="--_rank-4: 4; --_rank-7: 6; --_rank-8: 1">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Hedy Lamarr</span>
          </label>
        </div>
        <div class="ui-row-number" role="cell"></div>
        <div class="ui-expand" role="cell">
          <details>
            <summary>
              <span class="ui-sr-only">Show details for Hedy Lamarr</span>
            </summary>
            <div class="ui-detail">
              <p>hedy@example.com</p>
            </div>
          </details>
        </div>
        <div role="rowheader">Hedy Lamarr</div>
        <div role="cell">Inventor</div>
        <div role="cell">hedy@example.com</div>
        <div role="cell">Vienna</div>
        <div class="ui-numeric" role="cell">12</div>
      </div>
      <div role="row" style="--_rank-4: 5; --_rank-7: 2; --_rank-8: 4">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Katherine Johnson</span>
          </label>
        </div>
        <div class="ui-row-number" role="cell"></div>
        <div class="ui-expand" role="cell">
          <details>
            <summary>
              <span class="ui-sr-only">Show details for Katherine Johnson</span>
            </summary>
            <div class="ui-detail">
              <p>katherine@example.com</p>
            </div>
          </details>
        </div>
        <div role="rowheader">Katherine Johnson</div>
        <div role="cell">Mathematician</div>
        <div role="cell">katherine@example.com</div>
        <div role="cell">Hampton</div>
        <div class="ui-numeric" role="cell">51</div>
      </div>
      <div role="row" style="--_rank-4: 6; --_rank-7: 1; --_rank-8: 6">
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Margaret Hamilton</span>
          </label>
        </div>
        <div class="ui-row-number" role="cell"></div>
        <div class="ui-expand" role="cell">
          <details>
            <summary>
              <span class="ui-sr-only">Show details for Margaret Hamilton</span>
            </summary>
            <div class="ui-detail">
              <p>margaret@example.com</p>
            </div>
          </details>
        </div>
        <div role="rowheader">Margaret Hamilton</div>
        <div role="cell">Director</div>
        <div role="cell">margaret@example.com</div>
        <div role="cell">Boston</div>
        <div class="ui-numeric" role="cell">64</div>
      </div>
      <div class="ui-empty" role="row">
        <div role="cell">No rows</div>
      </div>
    </div>
  </div>
</div>
```

## All features

```html
<div
  class="ui-data-grid ui-pin-end ui-pin-start"
  style="--_max-block-size: 24rem"
>
  <div class="ui-toolbar">
    <div
      aria-label="Filter rows"
      class="ui-toggle-group ui-small ui-filters"
      role="radiogroup"
    >
      <label class="ui-toggle-button">
        <input
          checked
          name="all-features-filter-1"
          type="radio"
          value=""
        />All</label
      >
      <label class="ui-toggle-button">
        <input
          name="all-features-filter-1"
          type="radio"
          value="1"
        />Active</label
      >
      <label class="ui-toggle-button">
        <input name="all-features-filter-1" type="radio" value="2" />Away</label
      >
      <label class="ui-toggle-button">
        <input
          name="all-features-filter-1"
          type="radio"
          value="selected"
        />Selected</label
      >
    </div>
    <div
      aria-label="Density"
      class="ui-toggle-group ui-small ui-density"
      role="radiogroup"
    >
      <label class="ui-toggle-button">
        <input
          name="all-features-density-1"
          type="radio"
          value="dense"
        />Dense</label
      >
      <label class="ui-toggle-button">
        <input
          checked
          name="all-features-density-1"
          type="radio"
          value="standard"
        />Standard</label
      >
      <label class="ui-toggle-button">
        <input
          name="all-features-density-1"
          type="radio"
          value="spacious"
        />Spacious</label
      >
    </div>
    <button
      class="ui-button ui-outlined ui-small"
      command="toggle-popover"
      commandfor="all-features-columns-1"
      type="button"
    >
      Columns
    </button>
    <menu
      class="ui-menu ui-list ui-dense ui-columns ui-align-end"
      id="all-features-columns-1"
      popover
    >
      <li>
        <label class="ui-checkbox">
          <input
            checked
            id="all-features-columns-1-4"
            type="checkbox"
            value="4"
          />Name</label
        >
      </li>
      <li>
        <label class="ui-checkbox">
          <input
            checked
            id="all-features-columns-1-5"
            type="checkbox"
            value="5"
          />Role</label
        >
      </li>
      <li>
        <label class="ui-checkbox">
          <input
            checked
            id="all-features-columns-1-6"
            type="checkbox"
            value="6"
          />Status</label
        >
      </li>
      <li>
        <label class="ui-checkbox">
          <input
            checked
            id="all-features-columns-1-7"
            type="checkbox"
            value="7"
          />Location</label
        >
      </li>
      <li>
        <label class="ui-checkbox">
          <input
            checked
            id="all-features-columns-1-8"
            type="checkbox"
            value="8"
          />Joined</label
        >
      </li>
      <li>
        <label class="ui-checkbox">
          <input
            checked
            id="all-features-columns-1-9"
            type="checkbox"
            value="9"
          />Tickets</label
        >
      </li>
    </menu>
  </div>
  <div aria-label="Team" role="table" tabindex="0">
    <div class="ui-head" role="rowgroup">
      <div role="row">
        <div class="ui-row-select" role="columnheader">
          <span class="ui-sr-only">Select</span>
        </div>
        <div class="ui-row-number" role="columnheader">
          <span class="ui-sr-only">Row number</span>
        </div>
        <div class="ui-expand" role="columnheader">
          <span class="ui-sr-only">Show details for</span>
        </div>
        <div role="columnheader">
          <span>Name</span>
          <span class="ui-sort">
            <label>
              <input
                id="all-features-sort-1-4-asc"
                name="all-features-sort-1"
                type="radio"
                value="asc"
              />
              <span class="ui-sr-only">Sort by Name, ascending</span>
            </label>
            <label>
              <input
                id="all-features-sort-1-4-desc"
                name="all-features-sort-1"
                type="radio"
                value="desc"
              />
              <span class="ui-sr-only">Sort by Name, descending</span>
            </label>
          </span>
        </div>
        <div role="columnheader">
          <span>Role</span>
          <span class="ui-sort">
            <label>
              <input
                id="all-features-sort-1-5-asc"
                name="all-features-sort-1"
                type="radio"
                value="asc"
              />
              <span class="ui-sr-only">Sort by Role, ascending</span>
            </label>
            <label>
              <input
                id="all-features-sort-1-5-desc"
                name="all-features-sort-1"
                type="radio"
                value="desc"
              />
              <span class="ui-sr-only">Sort by Role, descending</span>
            </label>
          </span>
        </div>
        <div role="columnheader">
          <span>Status</span>
          <span class="ui-sort">
            <label>
              <input
                id="all-features-sort-1-6-asc"
                name="all-features-sort-1"
                type="radio"
                value="asc"
              />
              <span class="ui-sr-only">Sort by Status, ascending</span>
            </label>
            <label>
              <input
                id="all-features-sort-1-6-desc"
                name="all-features-sort-1"
                type="radio"
                value="desc"
              />
              <span class="ui-sr-only">Sort by Status, descending</span>
            </label>
          </span>
        </div>
        <div role="columnheader">
          <span>Location</span>
          <span class="ui-sort">
            <label>
              <input
                id="all-features-sort-1-7-asc"
                name="all-features-sort-1"
                type="radio"
                value="asc"
              />
              <span class="ui-sr-only">Sort by Location, ascending</span>
            </label>
            <label>
              <input
                id="all-features-sort-1-7-desc"
                name="all-features-sort-1"
                type="radio"
                value="desc"
              />
              <span class="ui-sr-only">Sort by Location, descending</span>
            </label>
          </span>
        </div>
        <div class="ui-numeric" role="columnheader">
          <span>Joined</span>
          <span class="ui-sort">
            <label>
              <input
                id="all-features-sort-1-8-asc"
                name="all-features-sort-1"
                type="radio"
                value="asc"
              />
              <span class="ui-sr-only">Sort by Joined, ascending</span>
            </label>
            <label>
              <input
                id="all-features-sort-1-8-desc"
                name="all-features-sort-1"
                type="radio"
                value="desc"
              />
              <span class="ui-sr-only">Sort by Joined, descending</span>
            </label>
          </span>
        </div>
        <div class="ui-numeric" role="columnheader">
          <span>Tickets</span>
          <span class="ui-sort">
            <label>
              <input
                id="all-features-sort-1-9-asc"
                name="all-features-sort-1"
                type="radio"
                value="asc"
              />
              <span class="ui-sr-only">Sort by Tickets, ascending</span>
            </label>
            <label>
              <input
                id="all-features-sort-1-9-desc"
                name="all-features-sort-1"
                type="radio"
                value="desc"
              />
              <span class="ui-sr-only">Sort by Tickets, descending</span>
            </label>
          </span>
        </div>
        <div class="ui-fit" role="columnheader">
          <span>Actions</span>
        </div>
      </div>
    </div>
    <div class="ui-body" role="rowgroup">
      <div
        data-filters="1"
        role="row"
        style="
          --_rank-4: 1;
          --_rank-5: 3;
          --_rank-6: 1;
          --_rank-7: 3;
          --_rank-8: 3;
          --_rank-9: 3;
          --_sum-9: 42;
        "
      >
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Ada Lovelace</span>
          </label>
        </div>
        <div class="ui-row-number" role="cell"></div>
        <div class="ui-expand" role="cell">
          <details>
            <summary>
              <span class="ui-sr-only">Show details for Ada Lovelace</span>
            </summary>
            <div class="ui-detail">
              <p>Ada Lovelace joined in 2015. Contact: ada@example.com</p>
            </div>
          </details>
        </div>
        <div role="rowheader">
          <div class="ui-avatar">AL</div>
          Ada Lovelace
        </div>
        <div role="cell">
          <input aria-label="Role, Ada Lovelace" value="Engineer" />
        </div>
        <div role="cell">
          <div class="ui-chip ui-small ui-tonal">
            <span class="ui-text">Active</span>
          </div>
        </div>
        <div role="cell">London</div>
        <div class="ui-numeric" role="cell">2015</div>
        <div class="ui-numeric" role="cell">42</div>
        <div role="cell">
          <button class="ui-button ui-small" type="button">Edit</button>
        </div>
      </div>
      <div
        data-filters="2"
        role="row"
        style="
          --_rank-4: 2;
          --_rank-5: 6;
          --_rank-6: 4;
          --_rank-7: 4;
          --_rank-8: 5;
          --_rank-9: 2;
          --_sum-9: 37;
        "
      >
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Alan Turing</span>
          </label>
        </div>
        <div class="ui-row-number" role="cell"></div>
        <div class="ui-expand" role="cell">
          <details>
            <summary>
              <span class="ui-sr-only">Show details for Alan Turing</span>
            </summary>
            <div class="ui-detail">
              <p>Alan Turing joined in 2018. Contact: alan@example.com</p>
            </div>
          </details>
        </div>
        <div role="rowheader">
          <div class="ui-avatar">AT</div>
          Alan Turing
        </div>
        <div role="cell">
          <input aria-label="Role, Alan Turing" value="Researcher" />
        </div>
        <div role="cell">
          <div class="ui-chip ui-small ui-tonal">
            <span class="ui-text">Away</span>
          </div>
        </div>
        <div role="cell">Manchester</div>
        <div class="ui-numeric" role="cell">2018</div>
        <div class="ui-numeric" role="cell">37</div>
        <div role="cell">
          <button class="ui-button ui-small" type="button">Edit</button>
        </div>
      </div>
      <div
        data-filters="1"
        role="row"
        style="
          --_rank-4: 3;
          --_rank-5: 1;
          --_rank-6: 2;
          --_rank-7: 5;
          --_rank-8: 1;
          --_rank-9: 5;
          --_sum-9: 58;
        "
      >
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Grace Hopper</span>
          </label>
        </div>
        <div class="ui-row-number" role="cell"></div>
        <div class="ui-expand" role="cell">
          <details>
            <summary>
              <span class="ui-sr-only">Show details for Grace Hopper</span>
            </summary>
            <div class="ui-detail">
              <p>Grace Hopper joined in 2012. Contact: grace@example.com</p>
            </div>
          </details>
        </div>
        <div role="rowheader">
          <div class="ui-avatar">GH</div>
          Grace Hopper
        </div>
        <div role="cell">
          <input aria-label="Role, Grace Hopper" value="Admiral" />
        </div>
        <div role="cell">
          <div class="ui-chip ui-small ui-tonal">
            <span class="ui-text">Active</span>
          </div>
        </div>
        <div role="cell">New York</div>
        <div class="ui-numeric" role="cell">2012</div>
        <div class="ui-numeric" role="cell">58</div>
        <div role="cell">
          <button class="ui-button ui-small" type="button">Edit</button>
        </div>
      </div>
      <div
        role="row"
        style="
          --_rank-4: 4;
          --_rank-5: 4;
          --_rank-6: 6;
          --_rank-7: 6;
          --_rank-8: 6;
          --_rank-9: 1;
          --_sum-9: 12;
        "
      >
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Hedy Lamarr</span>
          </label>
        </div>
        <div class="ui-row-number" role="cell"></div>
        <div class="ui-expand" role="cell">
          <details>
            <summary>
              <span class="ui-sr-only">Show details for Hedy Lamarr</span>
            </summary>
            <div class="ui-detail">
              <p>Hedy Lamarr joined in 2021. Contact: hedy@example.com</p>
            </div>
          </details>
        </div>
        <div role="rowheader">
          <div class="ui-avatar">HL</div>
          Hedy Lamarr
        </div>
        <div role="cell">
          <input aria-label="Role, Hedy Lamarr" value="Inventor" />
        </div>
        <div role="cell">
          <div class="ui-chip ui-small ui-tonal">
            <span class="ui-text">Offline</span>
          </div>
        </div>
        <div role="cell">Vienna</div>
        <div class="ui-numeric" role="cell">2021</div>
        <div class="ui-numeric" role="cell">12</div>
        <div role="cell">
          <button class="ui-button ui-small" type="button">Edit</button>
        </div>
      </div>
      <div
        data-filters="2"
        role="row"
        style="
          --_rank-4: 5;
          --_rank-5: 5;
          --_rank-6: 5;
          --_rank-7: 2;
          --_rank-8: 4;
          --_rank-9: 4;
          --_sum-9: 51;
        "
      >
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Katherine Johnson</span>
          </label>
        </div>
        <div class="ui-row-number" role="cell"></div>
        <div class="ui-expand" role="cell">
          <details>
            <summary>
              <span class="ui-sr-only">Show details for Katherine Johnson</span>
            </summary>
            <div class="ui-detail">
              <p>
                Katherine Johnson joined in 2016. Contact: katherine@example.com
              </p>
            </div>
          </details>
        </div>
        <div role="rowheader">
          <div class="ui-avatar">KJ</div>
          Katherine Johnson
        </div>
        <div role="cell">
          <input aria-label="Role, Katherine Johnson" value="Mathematician" />
        </div>
        <div role="cell">
          <div class="ui-chip ui-small ui-tonal">
            <span class="ui-text">Away</span>
          </div>
        </div>
        <div role="cell">Hampton</div>
        <div class="ui-numeric" role="cell">2016</div>
        <div class="ui-numeric" role="cell">51</div>
        <div role="cell">
          <button class="ui-button ui-small" type="button">Edit</button>
        </div>
      </div>
      <div
        data-filters="1"
        role="row"
        style="
          --_rank-4: 6;
          --_rank-5: 2;
          --_rank-6: 3;
          --_rank-7: 1;
          --_rank-8: 2;
          --_rank-9: 6;
          --_sum-9: 64;
        "
      >
        <div class="ui-row-select" role="cell">
          <label class="ui-checkbox">
            <input type="checkbox" />
            <span class="ui-sr-only">Select Margaret Hamilton</span>
          </label>
        </div>
        <div class="ui-row-number" role="cell"></div>
        <div class="ui-expand" role="cell">
          <details>
            <summary>
              <span class="ui-sr-only">Show details for Margaret Hamilton</span>
            </summary>
            <div class="ui-detail">
              <p>
                Margaret Hamilton joined in 2013. Contact: margaret@example.com
              </p>
            </div>
          </details>
        </div>
        <div role="rowheader">
          <div class="ui-avatar">MH</div>
          Margaret Hamilton
        </div>
        <div role="cell">
          <input aria-label="Role, Margaret Hamilton" value="Director" />
        </div>
        <div role="cell">
          <div class="ui-chip ui-small ui-tonal">
            <span class="ui-text">Active</span>
          </div>
        </div>
        <div role="cell">Boston</div>
        <div class="ui-numeric" role="cell">2013</div>
        <div class="ui-numeric" role="cell">64</div>
        <div role="cell">
          <button class="ui-button ui-small" type="button">Edit</button>
        </div>
      </div>
      <div class="ui-empty" role="row">
        <div role="cell">No rows</div>
      </div>
    </div>
    <div class="ui-foot" role="rowgroup">
      <div role="row">
        <div class="ui-row-select" role="cell"></div>
        <div class="ui-row-number" role="cell"></div>
        <div class="ui-expand" role="cell"></div>
        <div role="rowheader">Total</div>
        <div role="cell"></div>
        <div role="cell"></div>
        <div role="cell"></div>
        <div class="ui-numeric" role="cell"></div>
        <div class="ui-numeric ui-sum" role="cell"></div>
        <div role="cell"></div>
      </div>
    </div>
  </div>
  <div class="ui-status">
    <span class="ui-selection">
      <span class="ui-selected-count"> </span> selected</span
    >
    <span> <span class="ui-row-count"> </span> rows</span>
  </div>
</div>
```

## Accessibility

Uses ARIA table roles, and the table scrolls with the keyboard. Every control is a native checkbox, radio or input with a name. CSS can't update `aria-sort`, and sorting changes the visual order, so `reading-flow` keeps the reading and focus order in step where supported.

## API

### Data grid API

| Type          | Modifiers                             | Default | Description                                                                       |
| ------------- | ------------------------------------- | ------- | --------------------------------------------------------------------------------- |
| Column groups | `[role="columnheader"][aria-colspan]` | -       | A header cell that spans several columns.                                         |
| Column widths | `--_col-[n]`                          | -       | The track size of column `n`.                                                     |
| Density       | default, `.ui-dense`, `.ui-spacious`  | default | Row height and cell padding.                                                      |
| Filters       | `[role="row"][data-filters]`          | -       | The filter values a row matches, separated by spaces.                             |
| Fit           | `[role="columnheader"].ui-fit`        | -       | Sizes the column to its content instead of sharing space.                         |
| Form          | `.ui-body input[form]`                | -       | Associates selection checkboxes and editable inputs with a form outside the grid. |
| Height        | `--_max-block-size`                   | `none`  | Scrolls the rows below a sticky header.                                           |
| Label         | `[role="table"][aria-label]`          | -       | Accessible name of the grid.                                                      |
| Loading       | `[role="table"][aria-busy="true"]`    | -       | Dims the rows and shows a loading bar.                                            |
| Numeric       | `.ui-numeric`                         | -       | Aligns numbers to the end with tabular figures.                                   |
| Pin end       | `.ui-pin-end`                         | -       | Keeps the last column in view.                                                    |
| Pin start     | `.ui-pin-start`                       | -       | Keeps the first column in view.                                                   |
| Resizable     | `.ui-resizable`                       | -       | Lets users drag header cells to resize columns.                                   |
| Sorting       | `--_rank-[n]`                         | -       | The position of a row when sorted by column `n`.                                  |
| Totals        | `--_sum-[n]`                          | -       | The integer a row adds to the `.ui-sum` cell of column `n`.                       |
| Wrap          | `.ui-wrap`                            | -       | Wraps cell text instead of truncating it.                                         |

#### Parts

| Part                          | Description                          |
| ----------------------------- | ------------------------------------ |
| `.ui-data-grid`               | The grid and its toolbar and footer. |
| `.ui-toolbar`                 | Filters, density and column toggles. |
| `.ui-filters`                 | Filter radios.                       |
| `.ui-density`                 | Density radios.                      |
| `<menu class="ui-columns">`   | Column checkboxes in a popover.      |
| `[role="table"]`              | The scroll container.                |
| `.ui-head`                    | The sticky header.                   |
| `.ui-sort`                    | Sort radios.                         |
| `.ui-body .ui-row-number`     | Row numbers, in sorted order.        |
| `.ui-body .ui-row-select`     | Row selection checkboxes.            |
| `.ui-body .ui-expand summary` | Expandable detail panel.             |
| `[role="cell"]`               | A cell.                              |
| `.ui-foot`                    | The sticky totals row.               |
| `.ui-status`                  | Selected and visible row counts.     |

#### CSS variables

| Variable                     | Default                                      | Description                                                                                                                                                                                              |
| ---------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--border-color`             | `light-dark(var(--gray-4), var(--gray-12))`  | Default border color for cards, lists, tables and dividers.                                                                                                                                              |
| `--border-radius`            | `var(--size-2)`                              | Default corner radius for cards, callouts, tables and accordions.                                                                                                                                        |
| `--border-width`             | `1px`                                        | Default border width for components that draw a border.                                                                                                                                                  |
| `--button-size-small`        | `var(--control-size-small)`                  | `Button` height with `.ui-small`.                                                                                                                                                                        |
| `--button-size-x-small`      | `var(--control-size-x-small)`                | `Button` and `ButtonGroup` height with `.ui-x-small`.                                                                                                                                                    |
| `--choice-size`              | `var(--size-4)`                              | Default `Checkbox` and `Radio` input size.                                                                                                                                                               |
| `--control-size`             | `calc(40px * var(--density))`                | Shared default height for fields and buttons so they line up.                                                                                                                                            |
| `--control-size-small`       | `calc(32px * var(--density))`                | Shared small height for fields and buttons.                                                                                                                                                              |
| `--critical`                 | `var(--red)`                                 | Severity color for errors and destructive actions.                                                                                                                                                       |
| `--disabled-opacity`         | `0.64`                                       | Opacity applied to disabled controls.                                                                                                                                                                    |
| `--duration`                 | `0.2s`                                       | Default transition duration. Multiplied by `--motion`.                                                                                                                                                   |
| `--ease`                     | `ease`                                       | Default easing for transitions.                                                                                                                                                                          |
| `--focus-ring-color`         | Unset                                        | Color of the keyboard focus ring. When unset, the ring uses the page background color inverted.                                                                                                          |
| `--focus-ring-inset`         | `calc(-1 * var(--focus-ring-width))`         | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.                                                                                        |
| `--focus-ring-style`         | `solid`                                      | Outline style of the focus ring.                                                                                                                                                                         |
| `--focus-ring-width`         | `2px`                                        | Width of the focus ring.                                                                                                                                                                                 |
| `--font-size-05`             | `0.875rem`                                   | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                                                                                                    |
| `--font-weight-semibold`     | `var(--font-weight-6)`                       | Font weight for labels, table headers and titles.                                                                                                                                                        |
| `--icon-size`                | `var(--size-4)`                              | Default icon size inside components.                                                                                                                                                                     |
| `--motion`                   | `1`                                          | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
| `--primary`                  | `light-dark(var(--color-9), var(--color-6))` | Brand color for primary actions and accents.                                                                                                                                                             |
| `--state-active-alpha`       | `20%`                                        | Alpha of the pressed state layer on neutral buttons in light mode.                                                                                                                                       |
| `--state-hover-alpha`        | `10%`                                        | Alpha of the hover state layer on neutral buttons in light mode.                                                                                                                                         |
| `--state-hover-alpha-accent` | `15%`                                        | Alpha of the hover state layer on primary and critical buttons.                                                                                                                                          |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))`  | Page and card background.                                                                                                                                                                                |
| `--surface-filled`           | `light-dark(var(--gray-4), var(--gray-15))`  | Background of filled areas such as progress tracks and table stripes.                                                                                                                                    |
| `--surface-tonal`            | `light-dark(var(--gray-3), var(--gray-12))`  | Background of tonal variants.                                                                                                                                                                            |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`  | Body text color.                                                                                                                                                                                         |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))`  | Emphasized text color for headings, labels and values.                                                                                                                                                   |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

Cells are matched to columns by position, up to 12 columns. Selection, sorting, filtering, column visibility and density are radio buttons and checkboxes read with `:has()`. Sort radios go in the column header with `value="asc"` or `value="desc"`, filter and density radios in `.ui-filters` and `.ui-density`, and column checkboxes in `.ui-columns` with the column number as `value`. `.ui-bulk-actions` in `.ui-toolbar` only shows while rows are selected. A header menu is a popover of `label` elements pointing at those controls by `id`.

## Under the hood

1. Subgrid

   - One grid holds the column tracks
   - Row groups and rows span every track and inherit them with `subgrid`
   - The longest name widens the column in every row, like a table
   - Rows are still real boxes, with their own background

2. Selection

   - Check a row: the checkbox holds the state
   - `:has(:checked)` styles the row that contains it

3. Sorting

   - Each row stores its position per column, such as `--by-name`
   - The checked radio picks which one becomes the row's `order`
   - Negate it to sort descending
   - `reading-flow: grid-order` makes focus follow the new order

4. Counters

   - Rows and checked rows increment counters
   - The footer comes after the grid, so it reads the final totals
   - Rows with `display: none` don't count, so totals can follow filters

5. Sticky header

   - The grid scrolls and the header row sticks
   - Drag **Height** down and scroll the rows
   - `scroll-state(scrollable: block-start)` shows the shadow only when there is content above

6. Hide a column

   - Uncheck **Role**
   - `initial` makes `--role-track` invalid, so `var(--role-track,)` falls back to nothing
   - The track leaves the template and the remaining cells keep their columns

Step 1 of 6: Subgrid

- [Subgrid ](https://webstatus.dev/features/subgrid)(Widely available): Chrome 117+, Edge 117+, Firefox 71+, Safari 16+

```html
<div class="grid" role="table" aria-label="Team">
  <div class="row head" role="row">
    <span role="columnheader">Select</span>
    <span role="columnheader">Name</span>
    <span role="columnheader">Role</span>
    <span role="columnheader">Tickets</span>
  </div>
  <div class="body" role="rowgroup">
    <div class="row" role="row" style="--by-name: 1; --by-tickets: 3">
      <span role="cell"><input type="checkbox" /></span>
      <span role="rowheader">Ada Lovelace</span>
      <span role="cell">Engineer</span>
      <span role="cell">42</span>
    </div>
  </div>
</div>
```

```css
.grid {
  display: grid;
  grid-template-columns: auto minmax(max-content, 1fr) var(--role-track,) auto;
}

.body,
.row {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
}

.body {
  background-color: var(--border-color);
  row-gap: 1px;
}

.row {
  background-color: var(--surface-default);
}

.row > * {
  padding: var(--pad);
}
```

Step 2 of 6: Selection

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+

```css
.row:has(:checked) {
  background-color: color-mix(
    in oklch,
    var(--surface-default),
    var(--primary) 14%
  );
}
```

Step 3 of 6: Sorting

- [`reading-flow` ](https://webstatus.dev/features/reading-flow)(Limited availability): Chrome 137+, Edge 137+, Firefox not supported, Safari not supported

```css
.demo:has([value="name"]:checked) .body > .row {
  order: var(--by-name);
}

.demo:has([value="tickets"]:checked) .body > .row {
  order: calc(var(--by-tickets) * -1);
}

.body {
  reading-flow: grid-order;
}
```

Step 4 of 6: Counters

- [`Counters (CSS)` ](https://webstatus.dev/features/counters)(Widely available): Chrome 2+, Edge 12+, Firefox 1+, Safari 3+

```css
.grid {
  counter-reset: rows selected;
}

.body > .row {
  counter-increment: rows;
}

.body > .row:has(:checked) {
  counter-increment: rows selected;
}

.footer::before {
  content: counter(selected) " of " counter(rows) " selected";
}
```

Step 5 of 6: Sticky header

- [Container scroll-state queries ](https://webstatus.dev/features/container-scroll-state-queries)(Limited availability): Chrome 133+, Edge 133+, Firefox not supported, Safari not supported

```css
.grid {
  container-type: scroll-state;
  max-block-size: var(--height);
  overflow: auto;
}

.head {
  background-color: var(--surface-filled);
  inset-block-start: 0;
  position: sticky;
  transition: box-shadow 0.2s;
  z-index: 1;

  @container scroll-state(scrollable: block-start) {
    box-shadow: 0 8px 8px -8px oklch(0% 0 0 / 40%);
  }
}
```

Step 6 of 6: Hide a column

- [Custom properties ](https://webstatus.dev/features/custom-properties)(Widely available): Chrome 49+, Edge 15+, Firefox 31+, Safari 9.1+

```css
.demo:has(.show-role:not(:checked)) {
  --role-track: initial;

  .row > :nth-child(3) {
    display: none;
  }
}
```

### Every technique

The full component adds positional column matching, filters, pinning, detail panels and resizing on top of the build-up. Sort radios and column checkboxes are matched to columns by position, so one rule per column covers up to 12 columns. The counters are reset on the table, not the root: the root is a size container, and its style containment would scope them away from the footer.

| Feature                  | How                                                                                                                                         | CSS                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Column alignment         | Rows are subgrids of one grid, so every row shares the column tracks.                                                                       | `subgrid`                              |
| Selection                | Checked rows are styled and counted with :has().                                                                                            | `:has(:checked)`                       |
| Counts and totals        | Visible rows, selected rows and column totals are CSS counters. Hidden rows don't count.                                                    | `counter-increment`                    |
| Sorting                  | Each row stores its rank per column. The checked sort radio picks which rank becomes the row's order.                                       | `order, reading-flow`                  |
| Row numbers              | Each row resets a counter to its sibling-index(), its rank when sorted ascending, or sibling-count() minus its rank when sorted descending. | `sibling-index(), counter-reset`       |
| Filtering                | The checked filter radio hides rows that don't match.                                                                                       | `:has(), ~=`                           |
| Column visibility        | An unchecked column removes its track from the template and hides its cells.                                                                | `var(--x,)`                            |
| Sticky header and totals | The header and totals row stick to the scroll container.                                                                                    | `position: sticky`                     |
| Pinned columns           | Pinned cells stick to the inline edges. Each one is offset by its index.                                                                    | `sibling-index()`                      |
| Scroll shadows           | Shadows appear only when there is content to scroll back to.                                                                                | `scroll-state()`                       |
| Detail panels            | The details content spans the whole row and fades in.                                                                                       | `::details-content, display: contents` |
| Column resizing          | Header cells are resizable. Body cells don't contribute to the column width.                                                                | `resize, contain: inline-size`         |
| Editable cells           | Inputs grow with their value.                                                                                                               | `field-sizing: content`                |
| Column menu              | A popover anchored to its button, opened without JavaScript.                                                                                | `popover, commandfor`                  |

### Pinned columns and scroll shadows

Pinned cells are sticky. `sibling-index()` offsets each pinned checkbox, expand and first column by the ones before it, with `:nth-child()` rules as a fallback. The table is a `scroll-state` container, so shadows only appear when there is content to scroll back to.

```css
.ui-pin-start [role="row"] > :first-child {
  inset-inline-start: calc((sibling-index() - 1) * var(--_utility-size));
  position: sticky;

  @container ui-data-grid scroll-state(scrollable: inline-start) {
    box-shadow: 8px 0 8px -8px var(--_pin-shadow-color);
  }
}
```

### Detail panels

The expand cell and its `details` are `display: contents`, so the summary becomes a grid item in the row and `::details-content` moves to a second grid row that spans all columns. It fades in instead of animating its height: every frame of a height animation would lay out the whole grid again.

```css
.ui-expand:has(> details),
.ui-expand details {
  display: contents;
}

.ui-expand details::details-content {
  grid-column: 1 / -1;
  grid-row: 2;
  opacity: 0;
  transition:
    content-visibility 0.2s allow-discrete,
    opacity 0.2s;
}

.ui-expand details[open]::details-content {
  opacity: 1;
}
```

### Row numbers

`content` can't print a number, but a counter can. Each row resets a counter to its position: `sibling-index()` when unsorted, its rank when sorted ascending, and `sibling-count()` minus its rank when sorted descending. The number cell prints the counter. Without `sibling-index()`, it falls back to the visible row counter.

```css
.ui-body > [role="row"] {
  --_position: sibling-index();
  counter-reset: ui-data-grid-index var(--_position);
}

.ui-data-grid:has(
    .ui-head [role="row"] > :nth-child(3) input[value="desc"]:checked
  )
  .ui-body > [role="row"] {
  --_position: calc(sibling-count() - var(--_rank-3));
}

.ui-row-number::before {
  content: counter(ui-data-grid-index);
}
```

### Resizing and editing

Resizable headers use `resize: inline`. Body cells get `contain: inline-size` so they stop contributing to the column width, and the header alone sets it. Editable cells are inputs with `field-sizing: content`, so a column fits its longest value.

```css
.ui-resizable {
  [role="columnheader"] {
    resize: inline;
  }

  .ui-body [role="row"] > * {
    contain: inline-size;
  }
}

[role="cell"] > input {
  field-sizing: content;
}
```

### Fallbacks

Browsers without `reading-flow` or scroll-state queries still sort and pin columns, without the synced focus order or the shadows. Astro and Vue compute ranks, sums and filter matches when rendering. In HTML they are written in the markup.

### Performance

The state lives in `:has()` on the root, so every sort, filter, selection or column toggle restyles every cell. Hovering and scrolling only restyle the row under the pointer. The cost grows with rows times columns: a four column grid with 1,000 rows restyles about 5,000 elements per toggle, which takes around 150 ms on a slow CPU. Counters only run on grids that print numbers or totals. Keep grids to a few hundred rows and paginate beyond that.

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Partial support Missing: container-scroll-state-queries, reading-flow, sibling-count.
- Safari: Partial support Missing: container-scroll-state-queries, reading-flow.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Data+Grid.md).

## Installation

- `opui-css/css/components/data-grid.css`

## Changelog

### What's new

- New component. A data grid with sorting, filtering, selection, pinned columns and detail panels, built with subgrid and `:has()`. HTML and CSS only.
