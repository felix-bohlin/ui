import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
  Radio,
} from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Choose your favorite Radiohead album</FieldLegend>
        <FieldDescription>There are no wrong answers.</FieldDescription>
        <FieldGroup name="albums">
          <Radio value="ok-computer">OK Computer</Radio>
          <Radio value="kid-a">Kid A</Radio>
          <Radio value="in-rainbows">In Rainbows</Radio>
          <Radio value="king-of-limbs">The King of Limbs</Radio>
        </FieldGroup>
      </FieldSet>

      <FieldSet>
        <FieldLegend>Which side projects do you follow?</FieldLegend>
        <FieldDescription>Some are better than others.</FieldDescription>
        <FieldGroup name="projects">
          <Checkbox
            value="the-smile"
            endText="Thom Yorke, Jonny Greenwood, Tom Skinner"
          >
            The Smile
          </Checkbox>
          <Checkbox
            value="atoms-for-peace"
            endText="Thom Yorke, Flea, Nigel Godrich"
          >
            Atoms for Peace
          </Checkbox>
          <Checkbox value="eob" endText="Ed O'Brien solo">
            EOB
          </Checkbox>
          <Checkbox
            value="jonny-scores"
            endText="Film compositions by Jonny Greenwood"
          >
            Film Scores
          </Checkbox>
          <Checkbox value="selway-solo" endText="Philip Selway solo albums">
            Philip Selway
          </Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
