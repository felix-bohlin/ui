<script setup lang="ts">
import { Tabs, TabsItem, TabsLabel, TabsPanel } from "opui-css/vue"
</script>

<template>
  <Tabs name="vertical-tabs" orientation="vertical">
    <TabsItem checked>
      <TabsLabel>Profile</TabsLabel>
      <TabsPanel>
        <h3>Profile</h3>
        <p>Your name, photo and the bio people see next to your posts.</p>
      </TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsLabel>Security</TabsLabel>
      <TabsPanel>
        <h3>Security</h3>
        <p>
          Your password, passkeys and the devices signed in to your account.
        </p>
      </TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsLabel>Notifications</TabsLabel>
      <TabsPanel>
        <h3>Notifications</h3>
        <p>Which updates reach you by email and which by push.</p>
      </TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsLabel>Connected apps</TabsLabel>
      <TabsPanel>
        <h3>Connected apps</h3>
        <p>The calendar and storage services that can read your account.</p>
      </TabsPanel>
    </TabsItem>
  </Tabs>

  <Tabs name="vertical-line-tabs" orientation="vertical" variant="line">
    <TabsItem checked>
      <TabsLabel>Monday</TabsLabel>
      <TabsPanel>Workshops on layout, color and motion, from 9:00.</TabsPanel>
    </TabsItem>
    <TabsItem>
      <TabsLabel>Tuesday</TabsLabel>
      <TabsPanel
        >Talks in both halls, and the speaker dinner at 19:00.</TabsPanel
      >
    </TabsItem>
    <TabsItem>
      <TabsLabel>Wednesday</TabsLabel>
      <TabsPanel>Lightning talks until noon, then the closing panel.</TabsPanel>
    </TabsItem>
  </Tabs>
</template>
