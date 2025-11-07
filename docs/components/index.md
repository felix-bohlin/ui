---
title: Components
description: Here are all OPUI components. More components are continuously being added!
---

<script setup>
  import {useData} from "vitepress"

  const { theme} = useData()

  const components = theme.value.sidebar["/components"][1].items
</script>

<style scoped>
  .card-grid {
    display: grid;
    gap: var(--size-3);
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    align-items: stretch;
    margin-block-start: var(--size-3);
  }

  .card-grid a.card {
    display: block;
    text-decoration: none;
    color: inherit;
  }

  .card:hover {
    p {
      text-decoration: underline;
    }
  }

  .card-grid a.card .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-grid a.card .content p {
    margin: 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
</style>

<ul class="card-grid">
  <li v-for="component in components">
  <a :href="component.link" class="card outlined">
    <div class="content">
      <p>{{component.text}}</p>
    </div>
  </a>
  </li>
</ul>
