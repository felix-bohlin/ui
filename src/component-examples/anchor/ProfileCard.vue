<script setup lang="ts">
import { Anchor, Avatar, Button, Card } from "opui-css/vue"
</script>

<template>
  <div>
    <Anchor
      alignment="block-end span-inline-end"
      trigger="hover"
      id="profile-card"
    >
      <a class="ui-link" href="#" interestfor="profile-card">@adalindqvist</a>
      <template #anchored>
        <Card variant="elevated" class="profile-card">
          <template #content>
            <div class="profile-card-identity">
              <Avatar
                src="https://images.unsplash.com/photo-1614530606961-c4ce986825c1?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <div>
                <strong>Ada Lindqvist</strong>
                <span class="ui-caption">@adalindqvist</span>
              </div>
            </div>
            <p>
              Design engineer. Building accessible component libraries and
              writing about CSS.
            </p>
            <p class="ui-caption">Stockholm · Joined March 2024</p>
          </template>
          <template #actions>
            <Button variant="outlined" size="small">Follow</Button>
          </template>
        </Card>
      </template>
    </Anchor>
    approved these changes.
  </div>
</template>

<style>
.profile-card {
  font-size: var(--font-size-05);
  inline-size: 280px;
  margin-block-start: var(--size-2);
}

.profile-card .ui-content {
  display: grid;
  gap: var(--size-2);
}

.profile-card-identity {
  align-items: center;
  display: flex;
  gap: var(--size-3);
}

.profile-card-identity > div {
  display: grid;
}
</style>
