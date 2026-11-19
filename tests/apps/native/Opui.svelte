<script lang="ts">
  import {
    Checkbox,
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

  const state = $state({
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
  <Checkbox bind:checked={state.checkbox} label="Agree" />
  <output>{state.checkbox}</output>
</form>
<form data-case="checkbox-default">
  <Checkbox checked label="Agree" />
</form>
<form data-case="checkbox-empty">
  <Checkbox label="Agree" />
</form>
<form data-case="group-bound">
  <ToggleGroup aria-label="View" bind:value={state.group} name="view">
    {#each views as view (view)}
      <ToggleButton value={view}>{view}</ToggleButton>
    {/each}
  </ToggleGroup>
  <output>{state.group}</output>
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
<form data-case="radio-bound">
  <Radio bind:group={state.radio} label="Tea" name="drink" value="tea" />
  <Radio bind:group={state.radio} label="Coffee" name="drink" value="coffee" />
  <output>{state.radio}</output>
</form>
<form data-case="radio-default">
  <Radio label="Tea" name="drink" value="tea" />
  <Radio checked label="Coffee" name="drink" value="coffee" />
</form>
<form data-case="radio-empty">
  <Radio label="Tea" name="drink" value="tea" />
  <Radio label="Coffee" name="drink" value="coffee" />
</form>
<form data-case="range-bound">
  <Range bind:value={state.range} label="Level" />
  <output>{state.range}</output>
</form>
<form data-case="range-default">
  <Range label="Level" value="40" />
</form>
<form data-case="rating-bound">
  <Rating bind:value={state.rating} label="Score" name="score" />
  <output>{state.rating}</output>
</form>
<form data-case="rating-default">
  <Rating label="Score" name="score" value={3} />
</form>
<form data-case="rating-empty">
  <Rating label="Score" name="score" />
</form>
<form data-case="select-bound">
  <Select bind:value={state.select} items={colors} label="Color" />
  <output>{state.select}</output>
</form>
<form data-case="select-default">
  <Select items={colors} label="Color" value="green" />
</form>
<form data-case="tabs-bound">
  <Tabs bind:value={state.tabs} name="tab">
    {#each tabs as tab (tab)}
      <TabsItem value={tab}>
        <TabsLabel>{tab}</TabsLabel>
        <TabsPanel>{tab}</TabsPanel>
      </TabsItem>
    {/each}
  </Tabs>
  <output>{state.tabs}</output>
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
  <TextField bind:value={state.text} label="Name" />
  <output>{state.text}</output>
</form>
<form data-case="text-default">
  <TextField label="Name" value="Ada" />
</form>
<form data-case="text-empty">
  <TextField label="Name" />
</form>
<form data-case="toggle-bound">
  <ToggleButton bind:checked={state.toggle}>Bold</ToggleButton>
  <output>{state.toggle}</output>
</form>
<form data-case="toggle-default">
  <ToggleButton checked>Bold</ToggleButton>
</form>
<form data-case="toggle-empty">
  <ToggleButton>Bold</ToggleButton>
</form>
