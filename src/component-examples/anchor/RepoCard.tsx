import { Anchor, Avatar, Button, Card } from "opui-css/solid"

export default function Example() {
  return (
    <div>
      The source lives in{" "}
      <Anchor
        alignment="block-end span-inline-end"
        trigger="hover"
        id="anchor-repo-card"
        anchored={
          <Card
            variant="elevated"
            class="repo-card"
            content={
              <>
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
                  A CSS UI library exploring how next-gen HTML &amp; CSS
                  features can change the way we create components.
                </p>
                <p class="ui-caption">CSS · MIT license</p>
              </>
            }
            actions={
              <Button variant="outlined" size="small">
                Star
              </Button>
            }
          />
        }
      >
        <a
          class="ui-link"
          href="https://github.com/felix-bohlin/ui"
          interestfor="anchor-repo-card"
        >
          felix-bohlin/ui
        </a>
      </Anchor>{" "}
      on GitHub.
    </div>
  )
}
