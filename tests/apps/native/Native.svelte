<script lang="ts">
  const colors = ["blue", "green", "red"]
  const stars = [0, 1, 2, 3, 4, 5]
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
  <input aria-label="Agree" bind:checked={values.checkbox} type="checkbox" />
  <output>{values.checkbox}</output>
</form>
<form data-case="checkbox-default">
  <input aria-label="Agree" defaultChecked type="checkbox" />
</form>
<form data-case="checkbox-empty">
  <input aria-label="Agree" type="checkbox" />
</form>
<form data-case="checkbox-rerender">
  <input aria-label="Agree" defaultChecked data-round={round} type="checkbox" />
</form>
<form data-case="checkbox-spread">
  <input {...{ "data-round": round }} aria-label="Agree" type="checkbox" />
</form>
<form data-case="group-bound">
  {#each views as view (view)}
    <input
      aria-label={view}
      bind:group={values.group}
      name="view"
      type="radio"
      value={view}
    />
  {/each}
  <output>{values.group}</output>
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
<form data-case="number-default">
  <input aria-label="Quantity" type="number" defaultValue="1" />
</form>
<form data-case="radio-bound">
  <input
    aria-label="Tea"
    bind:group={values.radio}
    name="drink"
    type="radio"
    value="tea"
  />
  <input
    aria-label="Coffee"
    bind:group={values.radio}
    name="drink"
    type="radio"
    value="coffee"
  />
  <output>{values.radio}</output>
</form>
<form data-case="radio-default">
  <input aria-label="Tea" name="drink" type="radio" value="tea" />
  <input
    aria-label="Coffee"
    defaultChecked
    name="drink"
    type="radio"
    value="coffee"
  />
</form>
<form data-case="radio-empty">
  <input aria-label="Tea" name="drink" type="radio" value="tea" />
  <input aria-label="Coffee" name="drink" type="radio" value="coffee" />
</form>
<form data-case="radio-spread">
  <input
    {...{ "data-round": round }}
    aria-label="Tea"
    name="drink"
    type="radio"
    value="tea"
  />
  <input
    {...{ "data-round": round }}
    aria-label="Coffee"
    name="drink"
    type="radio"
    value="coffee"
  />
</form>
<form data-case="range-bound">
  <input aria-label="Level" bind:value={values.range} type="range" />
  <output>{values.range}</output>
</form>
<form data-case="range-default">
  <input aria-label="Level" type="range" defaultValue="40" />
</form>
<form data-case="rating-bound">
  {#each stars as star (star)}
    <input
      aria-label={`${star} stars`}
      bind:group={values.rating}
      name="score"
      type="radio"
      value={star}
    />
  {/each}
  <output>{values.rating}</output>
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
<form data-case="rating-spread">
  {#each stars as star (star)}
    <input
      {...{ "data-round": round }}
      aria-label={`${star} stars`}
      name="score"
      type="radio"
      value={star}
    />
  {/each}
</form>
<form data-case="select-bound">
  <select aria-label="Color" bind:value={values.select}>
    {#each colors as color (color)}
      <option value={color}>{color}</option>
    {/each}
  </select>
  <output>{values.select}</output>
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
      bind:group={values.tabs}
      name="tab"
      type="radio"
      value={tab}
    />
  {/each}
  <output>{values.tabs}</output>
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
  <input aria-label="Name" bind:value={values.text} />
  <output>{values.text}</output>
</form>
<form data-case="text-default">
  <input aria-label="Name" defaultValue="Ada" />
</form>
<form data-case="text-empty">
  <input aria-label="Name" />
</form>
<form data-case="text-rerender">
  <input aria-label="Name" data-round={round} defaultValue="Ada" />
</form>
<form data-case="toggle-bound">
  <input aria-label="Bold" bind:checked={values.toggle} type="checkbox" />
  <output>{values.toggle}</output>
</form>
<form data-case="toggle-default">
  <input aria-label="Bold" defaultChecked type="checkbox" />
</form>
<form data-case="toggle-empty">
  <input aria-label="Bold" type="checkbox" />
</form>
<button data-rerender onclick={() => round++} type="button">Render again</button
>
