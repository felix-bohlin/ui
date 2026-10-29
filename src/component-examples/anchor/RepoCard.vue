<script setup lang="ts">
import {
  Anchor,
  AnchorContent,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
} from "opui-css/vue"
</script>

<template>
  <div>
    The source lives in
    <Anchor
      positionArea="block-end span-inline-end"
      trigger="hover"
      id="anchor-repo-card-1"
    >
      <a
        class="ui-link"
        href="https://github.com/felix-bohlin/ui"
        interestfor="anchor-repo-card-1"
        >felix-bohlin/ui</a
      >
      <AnchorContent>
        <Card variant="elevated" class="repo-card">
          <CardContent>
            <div class="repo-card-identity">
              <Avatar
                src="https://github.com/felix-bohlin.png"
                alt=""
                shape="rounded"
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
            <p class="ui-caption">CSS, MIT license</p>
          </CardContent>
          <CardActions>
            <Button variant="outlined" size="small">Star</Button>
          </CardActions>
        </Card>
      </AnchorContent>
    </Anchor>
    on GitHub.
  </div>
</template>

<style>
.repo-card {
  font-size: var(--ui-font-size-small);
  inline-size: 280px;
  margin-block-start: var(--ui-space-2);
}

.repo-card .ui-content {
  display: grid;
  gap: var(--ui-space-2);
}

.repo-card-identity {
  align-items: center;
  display: flex;
  gap: var(--ui-space-3);
}

.repo-card-identity > div {
  display: grid;
}
</style>
