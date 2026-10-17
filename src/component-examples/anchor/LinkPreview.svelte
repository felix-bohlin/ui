<script lang="ts">
  import { Anchor, AnchorContent, Card, CardHeader } from "opui-css/svelte"
</script>

<div>
  Learn more about
  <Anchor
    alignment="block-end span-inline-end"
    trigger="hover"
    id="anchor-link-preview-1"
  >
    <a
      class="ui-link"
      href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning"
      interestfor="anchor-link-preview-1">CSS anchor positioning</a
    >
    <AnchorContent>
      <Card variant="elevated" class="link-preview">
        <img src="https://picsum.photos/id/1018/800/450" alt="" />
        <CardHeader>
          <p class="ui-caption">developer.mozilla.org</p>
          <h3>CSS anchor positioning</h3>
          <p>
            Tether elements to other elements on the page, without JavaScript.
          </p>
        </CardHeader>
      </Card>
    </AnchorContent>
  </Anchor>
  on MDN.
</div>

<style>
  :global {
    .link-preview {
      inline-size: 280px;
      margin-block-start: var(--size-2);
    }

    .link-preview img {
      aspect-ratio: 16 / 9;
      inline-size: 100%;
      object-fit: cover;
    }

    .link-preview hgroup {
      padding-block-start: 0;
    }

    .link-preview h3 {
      font-size: var(--font-size-2);
      margin-block: var(--size-1);
    }
  }
</style>
