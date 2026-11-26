<script lang="ts">
  import { Range } from "opui-css/svelte"
</script>

<Range label="Volume" spread>
  {#snippet startText()}Media, calls and alerts.{/snippet}
  {#snippet endText()}Headphones stay below 85 dB.{/snippet}
</Range>

<Range disabled label="Microphone" spread>
  {#snippet startText()}Set by your organization.{/snippet}
</Range>

<Range
  endText="Set it to 20 or more to hear alarms."
  error
  label="Alarm volume"
  spread
  value="10"
>
  {#snippet startText()}Rings for alarms and timers.{/snippet}
</Range>

<Range
  items={[
    { value: 0, label: "Left" },
    { value: 50, label: "Center" },
    { value: 100, label: "Right" },
  ]}
  label="Balance"
  spread
/>
