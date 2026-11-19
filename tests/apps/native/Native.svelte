<script lang="ts">
  const colors = ["blue", "green", "red"]
  const stars = [0, 1, 2, 3, 4, 5]
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
  <input aria-label="Agree" bind:checked={state.checkbox} type="checkbox" />
  <output>{state.checkbox}</output>
</form>
<form data-case="checkbox-default">
  <input aria-label="Agree" checked type="checkbox" />
</form>
<form data-case="checkbox-empty">
  <input aria-label="Agree" type="checkbox" />
</form>
<form data-case="group-bound">
  {#each views as view (view)}
    <input
      aria-label={view}
      bind:group={state.group}
      name="view"
      type="radio"
      value={view}
    />
  {/each}
  <output>{state.group}</output>
</form>
<form data-case="group-default">
  {#each views as view (view)}
    <input
      aria-label={view}
      defaultChecked={view === "week"}
      name="view"
      type="radio"
      value={view}
    />
  {/each}
</form>
<form data-case="group-empty">
  {#each views as view (view)}
    <input aria-label={view} name="view" type="radio" value={view} />
  {/each}
</form>
<form data-case="radio-bound">
  <input
    aria-label="Tea"
    bind:group={state.radio}
    name="drink"
    type="radio"
    value="tea"
  />
  <input
    aria-label="Coffee"
    bind:group={state.radio}
    name="drink"
    type="radio"
    value="coffee"
  />
  <output>{state.radio}</output>
</form>
<form data-case="radio-default">
  <input aria-label="Tea" name="drink" type="radio" value="tea" />
  <input aria-label="Coffee" checked name="drink" type="radio" value="coffee" />
</form>
<form data-case="radio-empty">
  <input aria-label="Tea" name="drink" type="radio" value="tea" />
  <input aria-label="Coffee" name="drink" type="radio" value="coffee" />
</form>
<form data-case="range-bound">
  <input aria-label="Level" bind:value={state.range} type="range" />
  <output>{state.range}</output>
</form>
<form data-case="range-default">
  <input aria-label="Level" type="range" value="40" />
</form>
<form data-case="rating-bound">
  {#each stars as star (star)}
    <input
      aria-label={`${star} stars`}
      bind:group={state.rating}
      name="score"
      type="radio"
      value={star}
    />
  {/each}
  <output>{state.rating}</output>
</form>
<form data-case="rating-default">
  {#each stars as star (star)}
    <input
      aria-label={`${star} stars`}
      checked={star === 3}
      name="score"
      type="radio"
      value={star}
    />
  {/each}
</form>
<form data-case="rating-empty">
  {#each stars as star (star)}
    <input
      aria-label={`${star} stars`}
      name="score"
      type="radio"
      value={star}
    />
  {/each}
</form>
<form data-case="select-bound">
  <select aria-label="Color" bind:value={state.select}>
    {#each colors as color (color)}
      <option value={color}>{color}</option>
    {/each}
  </select>
  <output>{state.select}</output>
</form>
<form data-case="select-default">
  <select aria-label="Color" value="green">
    {#each colors as color (color)}
      <option value={color}>{color}</option>
    {/each}
  </select>
</form>
<form data-case="tabs-bound">
  {#each tabs as tab (tab)}
    <input
      aria-label={tab}
      bind:group={state.tabs}
      name="tab"
      type="radio"
      value={tab}
    />
  {/each}
  <output>{state.tabs}</output>
</form>
<form data-case="tabs-default">
  {#each tabs as tab (tab)}
    <input
      aria-label={tab}
      defaultChecked={tab === "two"}
      name="tab"
      type="radio"
      value={tab}
    />
  {/each}
</form>
<form data-case="text-bound">
  <input aria-label="Name" bind:value={state.text} />
  <output>{state.text}</output>
</form>
<form data-case="text-default">
  <input aria-label="Name" value="Ada" />
</form>
<form data-case="text-empty">
  <input aria-label="Name" />
</form>
<form data-case="toggle-bound">
  <input aria-label="Bold" bind:checked={state.toggle} type="checkbox" />
  <output>{state.toggle}</output>
</form>
<form data-case="toggle-default">
  <input aria-label="Bold" checked type="checkbox" />
</form>
<form data-case="toggle-empty">
  <input aria-label="Bold" type="checkbox" />
</form>
