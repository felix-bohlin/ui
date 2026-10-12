import {
  Anchor,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
} from "opui-css/react"

export default function RepoCard() {
  return (
    <>
      <div>
        The source lives in{" "}
        <Anchor
          alignment="block-end span-inline-end"
          trigger="hover"
          id="anchor-repo-card"
          anchored={
            <Card variant="elevated" className="repo-card">
              <CardContent>
                <div className="repo-card-identity">
                  <Avatar
                    src="https://github.com/felix-bohlin.png"
                    alt=""
                    variant="rounded"
                  />
                  <div>
                    <strong>felix-bohlin/ui</strong>
                    <span className="ui-caption">Public repository</span>
                  </div>
                </div>
                <p>
                  A CSS UI library exploring how next-gen HTML &amp; CSS
                  features can change the way we create components.
                </p>
                <p className="ui-caption">CSS · MIT license</p>
              </CardContent>
              <CardActions>
                <Button variant="outlined" size="small">
                  Star
                </Button>
              </CardActions>
            </Card>
          }
        >
          <a
            className="ui-link"
            href="https://github.com/felix-bohlin/ui"
            interestfor="anchor-repo-card"
          >
            felix-bohlin/ui
          </a>
        </Anchor>{" "}
        on GitHub.
      </div>
      <style>{`
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
      `}</style>
    </>
  )
}
