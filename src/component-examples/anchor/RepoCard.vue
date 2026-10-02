<script setup lang="ts">
import { Anchor, Avatar, Button, Card } from "opui-css/vue"
</script>

<template>
  <div>
    The source lives in
    <Anchor
      alignment="block-end span-inline-end"
      trigger="hover"
      id="anchor-repo-card"
    >
      <a
        class="ui-link"
        href="https://github.com/felix-bohlin/ui"
        interestfor="anchor-repo-card"
        >felix-bohlin/ui</a
      >
      <template #anchored>
        <Card variant="elevated" class="repo-card">
          <template #content>
            <div class="repo-card-identity">
              <Avatar
                src="https://github.com/felix-bohlin.png"
                alt=""
                variant="rounded"
              />
              <div>
                <strong>felix-bohlin/ui</strong>
                <span class="ui-caption">Public repository</span>
              </div>
            </div>
            <p>
              A CSS UI library exploring how next-gen HTML &amp; CSS features
              can change the way we create components.
            </p>
            <p class="ui-caption">CSS · MIT license</p>
          </template>
          <template #actions>
            <Button variant="outlined" size="small">Star</Button>
          </template>
        </Card>
      </template>
    </Anchor>
    on GitHub.
  </div>
</template>

<style>
.repo-card {
  font-size: var(--font-size-05);
  inline-size: 280px;
  margin-block-start: var(--size-2);
}

.repo-card .ui-content {
  display: grid;
  gap: var(--size-2);
}

.repo-card-identity {
  align-items: center;
  display: flex;
  gap: var(--size-3);
}

.repo-card-identity > div {
  display: grid;
}
</style>
