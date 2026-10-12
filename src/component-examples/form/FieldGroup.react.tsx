import {
  Checkbox,
  CheckboxEndText,
  CheckboxInput,
  CheckboxLabel,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
  Radio,
} from "opui-css/react"

export default function FieldGroupExample() {
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
          <Checkbox>
            <CheckboxInput value="the-smile" />
            <CheckboxLabel>The Smile</CheckboxLabel>
            <CheckboxEndText>
              Thom Yorke, Jonny Greenwood, Tom Skinner
            </CheckboxEndText>
          </Checkbox>
          <Checkbox>
            <CheckboxInput value="atoms-for-peace" />
            <CheckboxLabel>Atoms for Peace</CheckboxLabel>
            <CheckboxEndText>Thom Yorke, Flea, Nigel Godrich</CheckboxEndText>
          </Checkbox>
          <Checkbox>
            <CheckboxInput value="eob" />
            <CheckboxLabel>EOB</CheckboxLabel>
            <CheckboxEndText>Ed O'Brien solo</CheckboxEndText>
          </Checkbox>
          <Checkbox>
            <CheckboxInput value="jonny-scores" />
            <CheckboxLabel>Film Scores</CheckboxLabel>
            <CheckboxEndText>
              Film compositions by Jonny Greenwood
            </CheckboxEndText>
          </Checkbox>
          <Checkbox>
            <CheckboxInput value="selway-solo" />
            <CheckboxLabel>Philip Selway</CheckboxLabel>
            <CheckboxEndText>Philip Selway solo albums</CheckboxEndText>
          </Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
