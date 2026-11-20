<script lang="ts">
  import {
    Checkbox,
    NumberField,
    Radio,
    Range,
    Rating,
    Select,
    Tabs,
    TabsItem,
    TabsLabel,
    TabsPanel,
    TextField,
    ToggleButton,
    ToggleGroup,
  } from "opui-css/svelte"

  const colors = [
    { label: "blue", value: "blue" },
    { label: "green", value: "green" },
    { label: "red", value: "red" },
  ]
  const tabs = ["one", "two", "three"]
  const views = ["day", "week", "month"]

  let round = $state(0)

  const values = $state({
    checkbox: true,
    group: "week",
    radio: "coffee",
    range: 40,
    rating: 3,
    select: "green",
    tabs: "two",
    text: "Ada",
    toggle: true,
  })
</script>

<form data-case="checkbox-bound">
  <Checkbox bind:checked={values.checkbox} label="Agree" />
  <output>{values.checkbox}</output>
</form>
<form data-case="checkbox-default">
  <Checkbox defaultChecked label="Agree" />
</form>
<form data-case="checkbox-empty">
  <Checkbox label="Agree" />
</form>
<form data-case="checkbox-rerender">
  <Checkbox defaultChecked data-round={round} label="Agree" />
</form>
<form data-case="group-bound">
  <ToggleGroup aria-label="View" bind:value={values.group} name="view">
    {#each views as view (view)}
      <ToggleButton value={view}>{view}</ToggleButton>
    {/each}
  </ToggleGroup>
  <output>{values.group}</output>
</form>
<form data-case="group-default">
  <ToggleGroup aria-label="View" name="view">
    {#each views as view (view)}
      <ToggleButton defaultChecked={view === "week"} value={view}>
        {view}
      </ToggleButton>
    {/each}
  </ToggleGroup>
</form>
<form data-case="group-empty">
  <ToggleGroup aria-label="View" name="view">
    {#each views as view (view)}
      <ToggleButton value={view}>{view}</ToggleButton>
    {/each}
  </ToggleGroup>
</form>
<form data-case="number-default">
  <NumberField label="Quantity" defaultValue={1} />
</form>
<form data-case="radio-bound">
  <Radio bind:group={values.radio} label="Tea" name="drink" value="tea" />
  <Radio bind:group={values.radio} label="Coffee" name="drink" value="coffee" />
  <output>{values.radio}</output>
</form>
<form data-case="radio-default">
  <Radio label="Tea" name="drink" value="tea" />
  <Radio defaultChecked label="Coffee" name="drink" value="coffee" />
</form>
<form data-case="radio-empty">
  <Radio label="Tea" name="drink" value="tea" />
  <Radio label="Coffee" name="drink" value="coffee" />
</form>
<form data-case="range-bound">
  <Range bind:value={values.range} label="Level" />
  <output>{values.range}</output>
</form>
<form data-case="range-default">
  <Range label="Level" defaultValue="40" />
</form>
<form data-case="rating-bound">
  <Rating bind:value={values.rating} label="Score" name="score" />
  <output>{values.rating}</output>
</form>
<form data-case="rating-default">
  <Rating label="Score" name="score" value={3} />
</form>
<form data-case="rating-empty">
  <Rating label="Score" name="score" />
</form>
<form data-case="select-bound">
  <Select bind:value={values.select} items={colors} label="Color" />
  <output>{values.select}</output>
</form>
<form data-case="select-default">
  <Select items={colors} label="Color" value="green" />
</form>
<form data-case="tabs-bound">
  <Tabs bind:value={values.tabs} name="tab">
    {#each tabs as tab (tab)}
      <TabsItem value={tab}>
        <TabsLabel>{tab}</TabsLabel>
        <TabsPanel>{tab}</TabsPanel>
      </TabsItem>
    {/each}
  </Tabs>
  <output>{values.tabs}</output>
</form>
<form data-case="tabs-default">
  <Tabs name="tab">
    {#each tabs as tab (tab)}
      <TabsItem defaultChecked={tab === "two"} value={tab}>
        <TabsLabel>{tab}</TabsLabel>
        <TabsPanel>{tab}</TabsPanel>
      </TabsItem>
    {/each}
  </Tabs>
</form>
<form data-case="text-bound">
  <TextField for="text-bound" label="Name">
    <input bind:value={values.text} id="text-bound" />
  </TextField>
  <output>{values.text}</output>
</form>
<form data-case="text-default">
  <TextField for="text-default" label="Name">
    <input defaultValue="Ada" id="text-default" />
  </TextField>
</form>
<form data-case="text-empty">
  <TextField for="text-empty" label="Name">
    <input id="text-empty" />
  </TextField>
</form>
<form data-case="text-rerender">
  <TextField for="text-rerender" label="Name">
    <input data-round={round} defaultValue="Ada" id="text-rerender" />
  </TextField>
</form>
<form data-case="toggle-bound">
  <ToggleButton bind:checked={values.toggle}>Bold</ToggleButton>
  <output>{values.toggle}</output>
</form>
<form data-case="toggle-default">
  <ToggleButton defaultChecked>Bold</ToggleButton>
</form>
<form data-case="toggle-empty">
  <ToggleButton>Bold</ToggleButton>
</form>
<button data-rerender onclick={() => round++} type="button">Render again</button
>
