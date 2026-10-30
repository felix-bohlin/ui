import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  Radio,
} from "opui-css/react"

export default function FieldGroupExample() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Choose your favorite Radiohead album</FieldLegend>
        <FieldDescription>There are no wrong answers.</FieldDescription>
        <FieldGroup name="albums">
          <Radio value="ok-computer">OK Computer</Radio>
          <Radio value="kid-a">Kid A</Radio>
          <Radio value="in-rainbows">In Rainbows</Radio>
          <Radio value="king-of-limbs">The King of Limbs</Radio>
        </FieldGroup>
      </Fieldset>

      <Fieldset>
        <FieldLegend>Which side projects do you follow?</FieldLegend>
        <FieldDescription>Some are better than others.</FieldDescription>
        <FieldGroup name="projects">
          <Checkbox
            endText="Thom Yorke, Flea, Nigel Godrich"
            value="atoms-for-peace"
          >
            Atoms for Peace
          </Checkbox>
          <Checkbox endText="Ed O'Brien solo" value="eob">
            EOB
          </Checkbox>
          <Checkbox
            endText="Film compositions by Jonny Greenwood"
            value="jonny-scores"
          >
            Film Scores
          </Checkbox>
          <Checkbox endText="Philip Selway solo albums" value="selway-solo">
            Philip Selway
          </Checkbox>
          <Checkbox
            endText="Thom Yorke, Jonny Greenwood, Tom Skinner"
            value="the-smile"
          >
            The Smile
          </Checkbox>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
