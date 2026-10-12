import {
  TextField,
  TextFieldControl,
  TextFieldEndText,
  TextFieldInput,
  TextFieldLabel,
} from "opui-css/react"

export default function Validation() {
  return (
    <>
      <div className="example-row">
        <TextField>
          <TextFieldLabel>I'm required</TextFieldLabel>
          <TextFieldControl>
            <TextFieldInput placeholder="Placeholder" required />
          </TextFieldControl>
        </TextField>
        <TextField variant="filled">
          <TextFieldLabel>So am I!</TextFieldLabel>
          <TextFieldControl>
            <TextFieldInput placeholder="Placeholder" required />
          </TextFieldControl>
        </TextField>
      </div>

      <div className="example-row">
        <TextField error>
          <TextFieldLabel>Label</TextFieldLabel>
          <TextFieldControl>
            <TextFieldInput
              placeholder="Placeholder"
              defaultValue="This isn't right"
            />
          </TextFieldControl>
          <TextFieldEndText>
            Only double-negatives are allowed.
          </TextFieldEndText>
        </TextField>
        <TextField error variant="filled">
          <TextFieldLabel>Label</TextFieldLabel>
          <TextFieldControl>
            <TextFieldInput placeholder="Placeholder" defaultValue="Uh-oh" />
          </TextFieldControl>
          <TextFieldEndText>
            Only letters from the first half of the alphabet are allowed.
          </TextFieldEndText>
        </TextField>
      </div>
    </>
  )
}
