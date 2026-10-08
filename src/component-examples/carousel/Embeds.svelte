<script lang="ts">
  import { Carousel } from "opui-css/svelte"

  const tutorials = [
    {
      id: "gmI5nvzv170",
      title: "CSS only carousel? Learn ::scroll-button() in 9 minutes",
    },
    { id: "bP8mrNdR-hs", title: "I love the new CSS functions" },
    {
      id: "qu1jE41O_8o",
      title: "Use these CSS features instead of JavaScript",
    },
  ]
</script>

<Carousel label="Tutorials" markers>
  {#each tutorials as { id, title } (id)}
    <li>
      <iframe
        allow="encrypted-media; fullscreen; picture-in-picture"
        allowfullscreen
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        {title}
      ></iframe>
    </li>
  {/each}
</Carousel>
