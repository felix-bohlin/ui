import { Anchor, Card, CardHeader } from "opui-css/react"

export default function LinkPreview() {
  return (
    <>
      <div>
        Learn more about{" "}
        <Anchor
          alignment="block-end span-inline-end"
          trigger="hover"
          id="anchor-link-preview"
          anchored={
            <Card variant="elevated" className="link-preview">
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
          }
        >
          <a
            className="ui-link"
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning"
            interestfor="anchor-link-preview"
          >
            CSS anchor positioning
          </a>
        </Anchor>{" "}
        on MDN.
      </div>
      <style>{`
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
      `}</style>
    </>
  )
}
