<script setup lang="ts">
import {
  Avatar,
  Button,
  Checkbox,
  Chip,
  ControlGroup,
  FieldGroup,
  Menu,
  Select,
  SelectAll,
  SortableTable,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TextField,
} from "opui-css/vue"
</script>

<template>
  <div
    class="data-table ui-layout-container ui-layout-column ui-large"
    style="--_max-inline-size: 80rem"
  >
    <div class="ui-layout-row ui-spread">
      <hgroup class="ui-hgroup">
        <p>Admin corner</p>
        <h1 class="ui-h3">Members</h1>
        <p>128 bassists, 94 of them on a paid plan. Woohoo!</p>
      </hgroup>
      <div class="ui-layout-row ui-small">
        <Button type="button" variant="outlined">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5 20h14v-2H5zM19 9h-4V3H9v6H5l7 7z"
            ></path></svg
          ><span class="ui-text">Export</span>
        </Button>
        <Button type="button" variant="filled">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
            ></path></svg
          ><span class="ui-text">Add member</span>
        </Button>
      </div>
    </div>
    <FieldGroup orientation="horizontal" role="search">
      <TextField
        hideLabel
        id="data-table-q"
        label="Search members"
        name="q"
        placeholder="Search by name or email"
        type="search"
      >
        <template #start>
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"
            ></path>
          </svg>
        </template>
      </TextField>
      <Select
        hideLabel
        id="data-table-status"
        :items="[
          { label: 'All statuses', value: '' },
          { label: 'Active', value: 'active' },
          { label: 'On a break', value: 'on-break' },
          { label: 'Past due', value: 'past-due' },
          { label: 'Trial', value: 'trial' },
        ]"
        label="Status"
        name="status"
      />
      <Select
        hideLabel
        id="data-table-plan"
        :items="[
          { label: 'All plans', value: '' },
          { label: 'Platinum', value: 'platinum' },
          { label: 'Silver', value: 'silver' },
          { label: 'Gold', value: 'gold' },
        ]"
        label="Plan"
        name="plan"
      />
    </FieldGroup>
    <div class="ui-layout-row ui-small ui-spread data-table-bulk">
      <p>2 members selected</p>
      <div class="ui-layout-row ui-x-small">
        <Button size="small" type="button">Send a poke</Button>
        <Button size="small" type="button">Export</Button>
        <Button color="critical" size="small" type="button">Delete</Button>
      </div>
    </div>
    <SelectAll>
      <SortableTable>
        <Table flush overflow="scroll" :tabindex="0">
          <TableCaption class="ui-sr-only">Members</TableCaption>
          <TableHead>
            <TableRow>
              <TableHeaderCell scope="col">
                <Checkbox
                  data-select-all=""
                  hideLabel
                  label="Select all members"
                  name="data-table-all"
                />
              </TableHeaderCell>
              <TableHeaderCell aria-sort="ascending" scope="col" sortable
                >Member</TableHeaderCell
              >
              <TableHeaderCell scope="col" sortable>Plan</TableHeaderCell>
              <TableHeaderCell scope="col" sortable>Status</TableHeaderCell>
              <TableHeaderCell numeric scope="col" sortable
                >Points</TableHeaderCell
              >
              <TableHeaderCell scope="col" sortable>Joined</TableHeaderCell>
              <TableHeaderCell class="data-table-actions" scope="col">
                <span class="ui-sr-only">Actions</span>
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked
                  hideLabel
                  label="Select Holly Humbucker"
                  name="data-table-row"
                  value="holly"
                />
              </TableCell>
              <TableCell data-sort-value="Holly Humbucker">
                <div class="ui-layout-media ui-small">
                  <Avatar aria-hidden="true">HH</Avatar>
                  <div>
                    <p class="data-table-person">Holly Humbucker</p>
                    <p class="ui-caption">holly@humbucker.example</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>Gold</TableCell>
              <TableCell>
                <Chip
                  as="span"
                  dot
                  label="Trial"
                  severity="info"
                  size="small"
                />
              </TableCell>
              <TableCell data-sort-value="120" numeric>120</TableCell>
              <TableCell data-sort-value="2026-09-28">28 Sep 2026</TableCell>
              <TableCell class="data-table-actions">
                <Button
                  aria-label="Actions for Holly Humbucker"
                  command="toggle-popover"
                  commandfor="data-table-menu-holly"
                  round
                  size="small"
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"
                    ></path>
                  </svg>
                </Button>
                <Menu
                  align="end"
                  id="data-table-menu-holly"
                  :items="[
                    { href: '#data-table-holly', label: 'View profile' },
                    { label: 'Change plan' },
                    { borderTop: true, color: 'critical', label: 'Delete' },
                  ]"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Checkbox
                  hideLabel
                  label="Select Ines Hertz"
                  name="data-table-row"
                  value="ines"
                />
              </TableCell>
              <TableCell data-sort-value="Ines Hertz">
                <div class="ui-layout-media ui-small">
                  <Avatar aria-hidden="true">IH</Avatar>
                  <div>
                    <p class="data-table-person">Ines Hertz</p>
                    <p class="ui-caption">ines@hertz.example</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>Gold</TableCell>
              <TableCell>
                <Chip
                  as="span"
                  dot
                  label="On a break"
                  severity="neutral"
                  size="small"
                />
              </TableCell>
              <TableCell data-sort-value="1840" numeric>1 840</TableCell>
              <TableCell data-sort-value="2025-11-22">22 Nov 2025</TableCell>
              <TableCell class="data-table-actions">
                <Button
                  aria-label="Actions for Ines Hertz"
                  command="toggle-popover"
                  commandfor="data-table-menu-ines"
                  round
                  size="small"
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"
                    ></path>
                  </svg>
                </Button>
                <Menu
                  align="end"
                  id="data-table-menu-ines"
                  :items="[
                    { href: '#data-table-ines', label: 'View profile' },
                    { label: 'Change plan' },
                    { borderTop: true, color: 'critical', label: 'Delete' },
                  ]"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked
                  hideLabel
                  label="Select Lou Headstock"
                  name="data-table-row"
                  value="lou"
                />
              </TableCell>
              <TableCell data-sort-value="Lou Headstock">
                <div class="ui-layout-media ui-small">
                  <Avatar aria-hidden="true">LH</Avatar>
                  <div>
                    <p class="data-table-person">Lou Headstock</p>
                    <p class="ui-caption">lou@headstock.example</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>Gold</TableCell>
              <TableCell>
                <Chip
                  as="span"
                  dot
                  label="Active"
                  severity="success"
                  size="small"
                />
              </TableCell>
              <TableCell data-sort-value="4800" numeric>4 800</TableCell>
              <TableCell data-sort-value="2026-03-03">3 Mar 2026</TableCell>
              <TableCell class="data-table-actions">
                <Button
                  aria-label="Actions for Lou Headstock"
                  command="toggle-popover"
                  commandfor="data-table-menu-lou"
                  round
                  size="small"
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"
                    ></path>
                  </svg>
                </Button>
                <Menu
                  align="end"
                  id="data-table-menu-lou"
                  :items="[
                    { href: '#data-table-lou', label: 'View profile' },
                    { label: 'Change plan' },
                    { borderTop: true, color: 'critical', label: 'Delete' },
                  ]"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Checkbox
                  hideLabel
                  label="Select Percy Groove"
                  name="data-table-row"
                  value="percy"
                />
              </TableCell>
              <TableCell data-sort-value="Percy Groove">
                <div class="ui-layout-media ui-small">
                  <Avatar aria-hidden="true">PG</Avatar>
                  <div>
                    <p class="data-table-person">Percy Groove</p>
                    <p class="ui-caption">percy@groove.example</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>Silver</TableCell>
              <TableCell>
                <Chip
                  as="span"
                  dot
                  label="Past due"
                  severity="warning"
                  size="small"
                />
              </TableCell>
              <TableCell data-sort-value="490" numeric>490</TableCell>
              <TableCell data-sort-value="2026-05-19">19 May 2026</TableCell>
              <TableCell class="data-table-actions">
                <Button
                  aria-label="Actions for Percy Groove"
                  command="toggle-popover"
                  commandfor="data-table-menu-percy"
                  round
                  size="small"
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"
                    ></path>
                  </svg>
                </Button>
                <Menu
                  align="end"
                  id="data-table-menu-percy"
                  :items="[
                    { href: '#data-table-percy', label: 'View profile' },
                    { label: 'Change plan' },
                    { borderTop: true, color: 'critical', label: 'Delete' },
                  ]"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Checkbox
                  hideLabel
                  label="Select Rory Rootnote"
                  name="data-table-row"
                  value="rory"
                />
              </TableCell>
              <TableCell data-sort-value="Rory Rootnote">
                <div class="ui-layout-media ui-small">
                  <Avatar aria-hidden="true">RR</Avatar>
                  <div>
                    <p class="data-table-person">Rory Rootnote</p>
                    <p class="ui-caption">rory@lowend.example</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>Platinum</TableCell>
              <TableCell>
                <Chip
                  as="span"
                  dot
                  label="Active"
                  severity="success"
                  size="small"
                />
              </TableCell>
              <TableCell data-sort-value="9120" numeric>9 120</TableCell>
              <TableCell data-sort-value="2026-01-12">12 Jan 2026</TableCell>
              <TableCell class="data-table-actions">
                <Button
                  aria-label="Actions for Rory Rootnote"
                  command="toggle-popover"
                  commandfor="data-table-menu-rory"
                  round
                  size="small"
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"
                    ></path>
                  </svg>
                </Button>
                <Menu
                  align="end"
                  id="data-table-menu-rory"
                  :items="[
                    { href: '#data-table-rory', label: 'View profile' },
                    { label: 'Change plan' },
                    { borderTop: true, color: 'critical', label: 'Delete' },
                  ]"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </SortableTable>
    </SelectAll>
    <div class="ui-layout-row ui-spread">
      <p>Showing 1–5 of 128 members</p>
      <nav aria-label="Pagination">
        <ControlGroup size="small" variant="outlined">
          <Button aria-label="Previous page" disabled href="#data-table-page-1"
            ><svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
              ></path></svg
          ></Button>
          <Button aria-current="page" href="#data-table-page-1">1</Button>
          <Button href="#data-table-page-2">2</Button>
          <Button href="#data-table-page-3">3</Button>
          <Button href="#data-table-page-22">22</Button>
          <Button aria-label="Next page" href="#data-table-page-2"
            ><svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
              ></path></svg
          ></Button>
        </ControlGroup>
      </nav>
    </div>
  </div>
</template>

<style>
.data-table {
  .data-table-bulk {
    border: var(--ui-border-width) solid var(--ui-border-color);
    border-radius: var(--ui-radius);
    padding: var(--ui-space-2) var(--ui-space-3);

    p {
      font-weight: var(--ui-font-weight-semibold);
    }
  }

  &:not(:has(tbody :checked)) .data-table-bulk {
    display: none;
  }

  tbody tr:has(:checked) > * {
    background-color: oklch(from var(--ui-primary) l c h / 8%);
  }

  .data-table-person {
    font-weight: var(--ui-font-weight-medium);
  }

  .data-table-actions {
    text-align: end;
  }
}
</style>
