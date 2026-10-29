<script lang="ts">
  import {
    Switch,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from "opui-css/svelte"
</script>

<Table>
  <TableHead>
    <TableRow>
      <TableHeaderCell><span class="ui-sr-only">On</span></TableHeaderCell>
      <TableHeaderCell>Channel</TableHeaderCell>
      <TableHeaderCell>Schedule</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>
        <Switch checked hideLabel name="switch-hidden-label" value="email"
          >Email</Switch
        >
      </TableCell>
      <TableCell>Email</TableCell>
      <TableCell>Daily</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Switch hideLabel name="switch-hidden-label" value="push">Push</Switch>
      </TableCell>
      <TableCell>Push</TableCell>
      <TableCell>Right away</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Switch hideLabel name="switch-hidden-label" value="sms">SMS</Switch>
      </TableCell>
      <TableCell>SMS</TableCell>
      <TableCell>Weekly</TableCell>
    </TableRow>
  </TableBody>
</Table>

<p>
  Play
  <Switch checked hideLabel name="switch-hidden-label-sound" value="sounds"
    >Sounds</Switch
  >
  sounds and
  <Switch hideLabel name="switch-hidden-label-sound" value="haptics"
    >Haptics</Switch
  >
  haptics.
</p>
