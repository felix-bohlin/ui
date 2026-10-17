import { Callout, CalloutContent } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <Callout>
        <CalloutContent>
          <h3>Note</h3>
          <p>
            This is a tonal Callout. Notice the lack of icons - it's not really
            needed here.
          </p>
        </CalloutContent>
      </Callout>
      <Callout variant="outlined">
        <CalloutContent>
          <h3>Another Callout</h3>
          <p>
            This is an outlined Callout. Why not use a{" "}
            <a className="ui-link" href="#">
              Card
            </a>{" "}
            since they look very similar? For one, the Callout is a more focused
            component with different properties.
          </p>
        </CalloutContent>
      </Callout>
    </>
  )
}
