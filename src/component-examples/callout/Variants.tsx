import { Callout } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Callout title="Note">
        <p>
          This is a tonal Callout. Notice the lack of icons - it's not really
          needed here.
        </p>
      </Callout>
      <Callout title="Another Callout" variant="outlined">
        <p>
          This is an outlined Callout. Why not use a{" "}
          <a class="ui-link" href="/components/card">
            Card
          </a>{" "}
          since they look very similar? For one, the Callout is a more focused
          component with different properties.
        </p>
      </Callout>
    </>
  )
}
