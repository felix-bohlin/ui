import { Button, Card } from "opui-css/solid"

export default function Example() {
  return (
    <Card
      variant="elevated"
      class="anatomy"
      header={
        <>
          <p>Overline</p>
          <h2 class="ui-h3">Headline</h2>
          <p>Subhead</p>
        </>
      }
      content="Explain more about the topic shown in the headline and subhead through supporting text."
      actions={
        <>
          <Button>Share</Button>
          <Button>Learn more</Button>
        </>
      }
    />
  )
}
