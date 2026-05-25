<script lang="ts">
  import { Form } from "@opui/svelte"
  import { FieldDescription } from "@opui/svelte"
  import { FieldSet } from "@opui/svelte"
  import { FieldLegend } from "@opui/svelte"
  import { FieldGroup } from "@opui/svelte"
  import { Checkbox } from "@opui/svelte"
  import { Radio } from "@opui/svelte"
</script>

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
      <Checkbox value="the-smile">
        The Smile
        {#snippet endText()}
          Thom Yorke, Jonny Greenwood, Tom Skinner
        {/snippet}
      </Checkbox>
      <Checkbox value="atoms-for-peace">
        Atoms for Peace
        {#snippet endText()}
          Thom Yorke, Flea, Nigel Godrich
        {/snippet}
      </Checkbox>
      <Checkbox value="eob">
        EOB
        {#snippet endText()}
          Ed O'Brien solo
        {/snippet}
      </Checkbox>
      <Checkbox value="jonny-scores">
        Film Scores
        {#snippet endText()}
          Film compositions by Jonny Greenwood
        {/snippet}
      </Checkbox>
      <Checkbox value="selway-solo">
        Philip Selway
        {#snippet endText()}
          Philip Selway solo albums
        {/snippet}
      </Checkbox>
    </FieldGroup>
  </FieldSet>
</Form>
