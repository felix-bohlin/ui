<script lang="ts">
  import { Carousel } from "opui-css/svelte"

  const videos = [
    { label: "A red flower bud opening", name: "flower" },
    { label: "Scene from a black-and-white film", name: "friday" },
  ]
</script>

<Carousel label="Videos" markers>
  {#each videos as { label, name } (name)}
    <li>
      <video
        aria-label={label}
        controls
        playsinline
        preload="metadata"
        src={`https://interactive-examples.mdn.mozilla.net/media/cc0-videos/${name}.mp4`}
      ></video>
    </li>
  {/each}
</Carousel>
