<template>
  <div class="anatomy">
    <div class="ui-select">
      <div>
        <button class="anatomy">
          <selectedcontent></selectedcontent>
        </button>
        <div class="ui-list">
          <option>Option One</option>
        </div>
      </div>
    </div>
    <div class="ui-list">
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
