<script lang="ts">
  import { TextField } from "opui-css/svelte"
</script>

<div class="example-column">
  <TextField label="Color" type="color" />
  <TextField label="Email" placeholder="name@email.com" type="email" />
  <TextField label="Password" placeholder="Password" type="password" />
  <TextField label="Search" placeholder="Search" type="search" />
  <TextField label="Phone" placeholder="(555) 010-0100" type="tel" />
  <TextField label="Text" placeholder="Text" type="text" />
  <TextField label="URL" placeholder="https://example.com" type="url" />
</div>

<div class="example-column">
  <TextField label="Date" type="date" />
  <TextField label="Datetime local" type="datetime-local" />
  <TextField label="Month" type="month" />
  <TextField label="Time" type="time" />
  <TextField label="Week" type="week" />
</div>
