<script lang="ts">
  import {
    Button,
    Divider,
    FieldGroup,
    FieldLegend,
    FieldSet,
    Form,
    TextField,
  } from "opui-css/svelte"
</script>

<Form>
  <FieldSet>
    <FieldLegend>Post Content</FieldLegend>
    <FieldGroup>
      <TextField label="Title" placeholder="My new post" />
    </FieldGroup>
  </FieldSet>

  <Divider />

  <FieldGroup>
    <Button>Save draft</Button>
    <Button variant="filled">Publish</Button>
  </FieldGroup>
</Form>
