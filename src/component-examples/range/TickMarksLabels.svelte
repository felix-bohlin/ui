<script lang="ts">
  import { Field } from "opui-css/svelte"

  const qualities = ["Low", "Medium", "High"]

  let opacity = $state(50)
  let quality = $state(1)
</script>

<Field for="range-tick-marks-labels-1" label="Opacity">
  <input
    aria-valuetext={`${opacity}%`}
    bind:value={opacity}
    defaultValue={50}
    id="range-tick-marks-labels-1"
    list="range-tick-marks-labels-1-list"
    step="25"
    type="range"
  />
  <datalist aria-hidden="true" id="range-tick-marks-labels-1-list">
    <option label="0%" value="0"></option>
    <option label="25%" value="25"></option>
    <option label="50%" value="50"></option>
    <option label="75%" value="75"></option>
    <option label="100%" value="100"></option>
  </datalist>
</Field>
<Field for="range-tick-marks-labels-2" label="Quality">
  <input
    aria-valuetext={qualities[quality]}
    bind:value={quality}
    defaultValue={1}
    id="range-tick-marks-labels-2"
    list="range-tick-marks-labels-2-list"
    max="2"
    type="range"
  />
  <datalist aria-hidden="true" id="range-tick-marks-labels-2-list">
    <option label="Low" value="0"></option>
    <option label="Medium" value="1"></option>
    <option label="High" value="2"></option>
  </datalist>
</Field>
