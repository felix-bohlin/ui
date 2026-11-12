<script lang="ts">
  import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
  } from "opui-css/svelte"
</script>

<Card variant="outlined">
  <CardHeader as="div">
    <Avatar aria-hidden="true">LH</Avatar>
    <hgroup>
      <h3>Lena Handén</h3>
      <p>Posted 2 hours ago</p>
    </hgroup>
    <Button aria-label="More actions" round size="small">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
        ></path>
      </svg>
    </Button>
  </CardHeader>
  <CardContent>
    The new onboarding flow is live for 10% of sign-ups. Early numbers look
    good: more people finish the first project.
  </CardContent>
</Card>
