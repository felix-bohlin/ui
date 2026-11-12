<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem description="Uploaded by Lena Handén" label="Product tour">
      <template #start>
        <video controls muted>
          <source
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            type="video/mp4"
          />
        </video>
      </template>
      <template #end>1:30</template>
    </ListItem>
    <ListItem
      description="Uploaded by Pekka Gåpåbottanen"
      label="Release highlights"
    >
      <template #start>
        <video controls muted>
          <source
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            type="video/mp4"
          />
        </video>
      </template>
      <template #end>0:45</template>
    </ListItem>
  </List>
</template>
