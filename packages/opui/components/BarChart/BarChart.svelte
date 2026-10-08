<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    caption,
    class: className,
    focusable = true,
    format = String,
    label,
    max,
    min,
    rows,
    series,
    size,
    style,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const values = $derived(rows?.flatMap((row) => row.values) ?? [])
  const chartMax = $derived(
    max ?? (values.length > 0 ? Math.max(0, ...values) : undefined),
  )
  const chartMin = $derived(min ?? Math.min(0, ...values))
</script>

<table
  class={["ui-bar-chart", size && `ui-${size}`, className]}
  style={[
    chartMax !== undefined && `--max: ${chartMax};`,
    chartMin !== 0 && `--min: ${chartMin};`,
    style,
  ]
    .filter(Boolean)
    .join(" ") || undefined}
  {...rest}
>
  {#if caption}
    <caption>{caption}</caption>
  {/if}
  {#if series && series.length > 0}
    <thead>
      <tr>
        {#if label}
          <th scope="col">{label}</th>
        {:else}
          <td></td>
        {/if}
        {#each series as name, index (index)}
          <th scope="col">{name}</th>
        {/each}
      </tr>
    </thead>
  {/if}
  {#if rows && rows.length > 0}
    <tbody>
      {#each rows as row, index (index)}
        <tr class={[row.color && `ui-${row.color}`]}>
          <th scope="row">{row.label}</th>
          {#each row.values as value, valueIndex (valueIndex)}
            <td
              style={`--value: ${value}`}
              tabindex={focusable ? 0 : undefined}
            >
              {format(value)}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  {/if}
  {@render children?.()}
</table>
