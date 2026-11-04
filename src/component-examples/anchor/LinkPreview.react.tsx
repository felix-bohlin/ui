import { Anchor, AnchorContent, Card, CardHeader } from "opui-css/react"

export default function LinkPreview() {
  return (
    <>
      <div>
        Learn more about{" "}
        <Anchor
          id="anchor-link-preview-1"
          positionArea="block-end span-inline-end"
          trigger="hover"
        >
          <a
            className="ui-link"
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning"
            interestfor="anchor-link-preview-1"
          >
            CSS anchor positioning
          </a>
          <AnchorContent>
            <Card className="link-preview" variant="elevated">
              <img src="https://picsum.photos/id/1018/800/450" alt="" />
              <CardHeader>
                <p className="ui-caption">developer.mozilla.org</p>
                <h3>CSS anchor positioning</h3>
                <p>
                  Tether elements to other elements on the page, without
                  JavaScript.
                </p>
              </CardHeader>
            </Card>
          </AnchorContent>
        </Anchor>{" "}
        on MDN.
      </div>
      <style>{`
        .link-preview {
          inline-size: 280px;
          margin-block-start: var(--ui-space-2);
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
          font-size: var(--ui-font-size-400);
          margin-block: var(--ui-space-1);
        }
      `}</style>
    </>
  )
}
