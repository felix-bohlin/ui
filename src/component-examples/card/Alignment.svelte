<script>
  import { Card } from "@opui/svelte"
  import { Button } from "@opui/svelte"
  import { IconButton } from "@opui/svelte"
</script>

<Card variant="outlined" actions={{ align: "end" }}>
  {#snippet content()}
    Buttons aligned to the end. Works too!
  {/snippet}
  {#snippet action()}
    <Button>Cancel</Button>
    <Button>Save</Button>
  {/snippet}
</Card>

<Card variant="outlined" actions={{ align: "end" }}>
  {#snippet content()}
    Again, buttons are aligned to the end!
  {/snippet}
  {#snippet action()}
    <Button variant="outlined">Cancel</Button>
    <Button variant="filled">Save</Button>
  {/snippet}
</Card>

<Card variant="outlined" actions={{ align: "end" }}>
  {#snippet content()}
    Icon buttons aligned to the end!
  {/snippet}
  {#snippet action()}
    <IconButton aria-label="Favorite">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M3.384 7.13c2.972-4.17 9.167-4.174 12.146-.008l.465.65l.417-.593c2.955-4.195 9.16-4.236 12.17-.081A7.48 7.48 0 0 1 28 16.583L16.732 28.681a1 1 0 0 1-1.464 0L3.992 16.54a7.46 7.46 0 0 1-.608-9.41m10.52 1.155c-2.181-3.05-6.716-3.046-8.892.007a5.46 5.46 0 0 0 .446 6.887L16.002 26.53l10.534-11.31a5.48 5.48 0 0 0 .427-6.95c-2.205-3.044-6.751-3.013-8.916.06l-1.229 1.744a1 1 0 0 1-1.63.006z"
        ></path>
      </svg>
    </IconButton>
    <IconButton aria-label="Share">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        ><path
          fill="currentColor"
          d="M14 3a1 1 0 1 1 0 2H7.5A2.5 2.5 0 0 0 5 7.5v17A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5V19a1 1 0 1 1 2 0v5.5a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17A4.5 4.5 0 0 1 7.5 3zm5.58-.907a1 1 0 0 1 1.067.146l10 8.5a1 1 0 0 1 0 1.523l-10 8.5A1 1 0 0 1 18.999 20v-3.96c-3.193.258-5.636 1.722-7.34 3.213a15.6 15.6 0 0 0-2.115 2.26c-.234.307-.407.56-.52.733c-.085.13-.136.215-.152.243l-.006.006l.001.001A1 1 0 0 1 7 22.036c0-.222-.003-.444.003-.666c.011-.406.042-.982.12-1.67c.155-1.37.5-3.218 1.265-5.08s1.967-3.776 3.855-5.225C13.948 8.086 16.161 7.2 19 7.032V3a1 1 0 0 1 .58-.907M20.998 8a1 1 0 0 1-1 1c-2.925 0-5.018.814-6.539 1.98c-1.533 1.177-2.551 2.763-3.224 4.4a16.5 16.5 0 0 0-.957 3.38c.318-.33.672-.672 1.062-1.013C12.462 15.891 15.687 14 19.999 14a1 1 0 0 1 1 1v2.838l7.456-6.338L21 5.161z"
        ></path></svg
      >
    </IconButton>
  {/snippet}
</Card>
