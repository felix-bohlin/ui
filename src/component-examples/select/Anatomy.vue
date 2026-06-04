<template>
  <div class="anatomy">
    <div class="select">
      <div>
        <button class="anatomy">
          <selectedcontent></selectedcontent>
        </button>
        <div class="list">
          <option>Option One</option>
        </div>
      </div>
    </div>
    <div class="list">
      <option selected>Option One</option>
      <option>Option Two</option>
      <option>Option Three</option>
    </div>
  </div>

  <style>
    .anatomy {
      display: grid;
      gap: var(--size-1);
      margin: 0 auto;
    }
  </style>
</template>
