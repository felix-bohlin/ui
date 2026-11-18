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
      id="anchor-repo-card-1"
      positionArea="block-end span-inline-end"
      trigger="hover"
    >
      <a
        class="ui-link"
        href="https://github.com/felix-bohlin/ui"
        interestfor="anchor-repo-card-1"
        >felix-bohlin/ui</a
      >
      <AnchorContent>
        <Card class="repo-card" variant="elevated">
          <CardContent>
            <div class="repo-card-identity">
              <Avatar
                alt=""
                shape="rounded"
                src="https://github.com/felix-bohlin.png"
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
            <Button size="small" variant="outlined">Star</Button>
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
