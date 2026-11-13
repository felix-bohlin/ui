<script setup lang="ts">
import { Card, CardContent } from "opui-css/vue"
</script>

<template>
  <div
    aria-label="Account settings"
    role="region"
    style="max-block-size: 16rem; overflow: auto"
    tabindex="0"
  >
    <div class="ui-layout-container">
      <div
        class="ui-layout-columns ui-breakpoint-small"
        style="--_columns: 15rem 1fr"
      >
        <Card class="ui-sticky" variant="tonal">
          <CardContent>Account settings</CardContent>
        </Card>
        <div class="ui-layout-column">
          <Card variant="outlined">
            <CardContent>
              Bassbook Gold: your plan, payment method and past receipts. A
              change to the plan applies from the next renewal date.
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>
              Data export: a ZIP file of your setlists, tabs and comments, with
              one CSV file per table, sent to your email address.
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>
              Notifications: which pokes and gig alerts reach you by email, push
              or SMS, and whether they arrive at once or in one daily digest.
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>
              Profile: your name, photo and the email address people see when
              you share a setlist with them or mention them in a comment.
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>
              Security: your password, two-step verification and the devices
              signed in to your account, which you can sign out one by one.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
