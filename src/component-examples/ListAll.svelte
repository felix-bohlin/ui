<!--
<script lang="ts">
  import { Avatar } from "@opui/svelte"
  import { CheckboxInput } from "@opui/svelte"
  import { ListItem } from "@opui/svelte"
  import { RadioInput } from "@opui/svelte"
  import { SwitchInput } from "@opui/svelte"
  const { prefix = "" } = $props()
</script>

<ListItem headline="Headline" />

<ListItem
  headline="Headline"
  description="Supporting text that truly is quite long enough to fill up multiple lines."
/>

<ListItem headline="Trailing supporting text" end="100+" />

<ListItem headline="Trailing keyboard command">
  {#snippet end()}
    <kbd>CTRL+Shift+X</kbd>
  {/snippet}
</ListItem>

<ListItem borderTop headline="Headline with start icon">
  {#snippet start()}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M16 16a7 7 0 1 0 0-14a7 7 0 0 0 0 14m-8.5 2A3.5 3.5 0 0 0 4 21.5v.5c0 2.393 1.523 4.417 3.685 5.793C9.859 29.177 12.802 30 16 30s6.14-.823 8.315-2.207C26.477 26.417 28 24.393 28 22v-.5a3.5 3.5 0 0 0-3.5-3.5z"
      ></path>
    </svg>
  {/snippet}
</ListItem>

<ListItem
  headline="Headline with start icon"
  description="Supporting text that truly is quite long enough to fill up multiple lines."
>
  {#snippet start()}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M16 16a7 7 0 1 0 0-14a7 7 0 0 0 0 14m-8.5 2A3.5 3.5 0 0 0 4 21.5v.5c0 2.393 1.523 4.417 3.685 5.793C9.859 29.177 12.802 30 16 30s6.14-.823 8.315-2.207C26.477 26.417 28 24.393 28 22v-.5a3.5 3.5 0 0 0-3.5-3.5z"
      ></path>
    </svg>
  {/snippet}
</ListItem>

<ListItem
  inset
  headline="Inset class"
  description="Makes the text line up nicely"
/>

<ListItem borderTop>
  <button>
    <div class="text">
      <p>Button list item</p>
    </div>
  </button>
</ListItem>

<ListItem>
  <a href="#">
    <div class="text">
      <p>Link list item</p>
    </div>
  </a>
</ListItem>

<ListItem borderTop headline="Headline">
  {#snippet start()}
    <Avatar>OP</Avatar>
  {/snippet}
</ListItem>

<ListItem headline="Headline" description="Supporting text">
  {#snippet start()}
    <Avatar>
      <img
        src="https://images.unsplash.com/photo-1614530606961-c4ce986825c1?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
    </Avatar>
  {/snippet}
</ListItem>

<ListItem borderTop>
  <button>
    <div class="start">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 28 28"
      >
        <path
          fill="currentColor"
          d="M21.75 3A3.25 3.25 0 0 1 25 6.25v15.5A3.25 3.25 0 0 1 21.75 25H6.25A3.25 3.25 0 0 1 3 21.75V6.25A3.25 3.25 0 0 1 6.25 3zm0 1.5H6.25A1.75 1.75 0 0 0 4.5 6.25V15h6a.75.75 0 0 1 .743.648l.007.102a2.75 2.75 0 1 0 5.5 0a.75.75 0 0 1 .648-.743L17.5 15h6V6.25a1.75 1.75 0 0 0-1.75-1.75"
        ></path>
      </svg>
    </div>
    <div class="text">
      <p>Button with start icon</p>
    </div>
  </button>
</ListItem>

<ListItem>
  <a href="#">
    <div class="start">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m13.94 5l5.061 5.06L9.063 20a2.25 2.25 0 0 1-1 .58l-5.115 1.395a.75.75 0 0 1-.92-.921l1.394-5.116a2.25 2.25 0 0 1 .58-.999zm-7.414 6l-1.5 1.5H2.75a.75.75 0 0 1 0-1.5zm14.352-8.174l.153.144l.145.153a3.58 3.58 0 0 1-.145 4.908l-.97.969L15 3.94l.97-.97a3.58 3.58 0 0 1 4.908-.144M10.526 7l-1.5 1.5H2.75a.75.75 0 1 1 0-1.5zm4-4l-1.5 1.5H2.75a.75.75 0 1 1 0-1.5z"
        ></path>
      </svg>
    </div>
    <div class="text">
      <p>Link with start icon</p>
    </div>
  </a>
</ListItem>

<ListItem borderTop>
  <button>
    <div class="text">
      <p>End icon</p>
    </div>
    <div class="end">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M11.116 26.634a1.25 1.25 0 0 1 0-1.768L19.982 16l-8.866-8.866a1.25 1.25 0 0 1 1.768-1.768l9.75 9.75a1.25 1.25 0 0 1 0 1.768l-9.75 9.75a1.25 1.25 0 0 1-1.768 0"
        ></path>
      </svg>
    </div>
  </button>
</ListItem>

<ListItem headline="End icon button">
  {#snippet end()}
    <div>
      <button class="icon-button">
        <span class="sr-only">More</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M16 9.5a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5m0 9a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5M13.5 25a2.5 2.5 0 1 0 5 0a2.5 2.5 0 0 0-5 0"
          ></path>
        </svg>
      </button>
    </div>
  {/snippet}
</ListItem>

<ListItem borderTop type="checkbox" for={`${prefix}checkbox-all`}>
  {#snippet text()}Checkbox{/snippet}
  {#snippet end()}
    <CheckboxInput id={`${prefix}checkbox-all`} />
  {/snippet}
</ListItem>

<ListItem borderTop type="radio" for={`${prefix}radio-all-1`}>
  {#snippet text()}Radio 1{/snippet}
  {#snippet end()}
    <RadioInput id={`${prefix}radio-all-1`} name={`${prefix}radio-group-all`} />
  {/snippet}
</ListItem>

<ListItem type="radio" for={`${prefix}radio-all-2`}>
  {#snippet text()}Radio 2{/snippet}
  {#snippet end()}
    <RadioInput id={`${prefix}radio-all-2`} name={`${prefix}radio-group-all`} />
  {/snippet}
</ListItem>

<ListItem borderTop type="switch" for={`${prefix}switch-all-1`}>
  {#snippet text()}Switch 1{/snippet}
  {#snippet end()}
    <SwitchInput id={`${prefix}switch-all-1`} />
  {/snippet}
</ListItem>
-->
