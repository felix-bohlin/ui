<script setup lang="ts">
import { Callout, CalloutContent } from "opui-css/vue"
</script>

<template>
  <Callout>
    <CalloutContent>
      <h3>Scheduled maintenance</h3>
      <p>
        The dashboard is read-only on Sunday from 02:00 to 04:00 UTC while we
        upgrade the database.
      </p>
    </CalloutContent>
  </Callout>
  <Callout variant="outlined">
    <CalloutContent>
      <h3>Billing has moved</h3>
      <p>
        Invoices and payment methods are now in the Billing tab of your
        workspace settings.
      </p>
    </CalloutContent>
  </Callout>
</template>
