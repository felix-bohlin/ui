import { Anchor, Card } from "opui-css/solid"

export default function Example() {
  return (
    <div>
      Learn more about{" "}
      <Anchor
        alignment="block-end span-inline-end"
        trigger="hover"
        id="anchor-link-preview"
        anchored={
          <Card variant="elevated" class="link-preview">
            <img src="https://picsum.photos/id/1018/800/450" alt="" />
            <hgroup>
              <p class="ui-caption">developer.mozilla.org</p>
              <h3>CSS anchor positioning</h3>
              <p>
                Tether elements to other elements on the page, without
                JavaScript.
              </p>
            </hgroup>
          </Card>
        }
      >
        <a
          class="ui-link"
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning"
          interestfor="anchor-link-preview"
        >
          CSS anchor positioning
        </a>
      </Anchor>{" "}
      on MDN.
    </div>
  )
}
