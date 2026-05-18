<script setup lang="ts">
import { Checkbox, FieldDescription, FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/vue"
</script>

<template>
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
        <template #end-text>Thom Yorke, Jonny Greenwood, Tom Skinner</template>
      </Checkbox>
      <Checkbox value="atoms-for-peace">
        Atoms for Peace
        <template #end-text>Thom Yorke, Flea, Nigel Godrich</template>
      </Checkbox>
      <Checkbox value="eob">
        EOB
        <template #end-text>Ed O'Brien solo</template>
      </Checkbox>
      <Checkbox value="jonny-scores">
        Film Scores
        <template #end-text>Film compositions by Jonny Greenwood</template>
      </Checkbox>
      <Checkbox value="selway-solo">
        Philip Selway
        <template #end-text>Philip Selway solo albums</template>
      </Checkbox>
    </FieldGroup>
  </FieldSet>
</Form>
</template>
