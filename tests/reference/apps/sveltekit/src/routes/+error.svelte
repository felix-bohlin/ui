<script lang="ts">
  import { page } from "$app/state"
</script>

<svelte:head>
  <title>{page.status === 404 ? "Not found" : "Error"} | Reference</title>
</svelte:head>

{#if page.status === 404}
  <div class="app-screen" data-screen="not-found">
    <h1>Not found</h1>
  </div>
{:else}
  <div class="app-screen" data-screen="error">
    <h1>{page.error?.message}</h1>
  </div>
{/if}
