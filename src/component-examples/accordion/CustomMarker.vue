<script setup lang="ts">
import { Accordion } from "opui-css/vue"
</script>

<template>
  <Accordion variant="outlined">
    <template #summary>Custom marker</template>
    <template #marker>
      <svg
        class="ui-marker"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <!-- Icon from Fluent UI System Icons by Microsoft Corporation - https://github.com/microsoft/fluentui-system-icons/blob/main/LICENSE -->
        <path
          fill="currentColor"
          d="M11.5 3.5a1 1 0 0 0-1 1v7.502a.75.75 0 0 1-1.02.7l-2.513-.966a2.84 2.84 0 0 0-3.254.895c5.488 2.461 7.557 4.81 8.477 6.833c.33.725.977 1.113 1.578 1.02l3.456-.532a1.25 1.25 0 0 0 1.022-.934l1.153-4.633a3.25 3.25 0 0 0-2.65-3.995l-3.616-.569a.75.75 0 0 1-.633-.74V4.5a1 1 0 0 0-1-1M9 4.5a2.5 2.5 0 1 1 5 0v3.94l2.983.468a4.75 4.75 0 0 1 3.872 5.84l-1.153 4.632a2.75 2.75 0 0 1-2.25 2.054l-3.455.533c-1.442.222-2.646-.726-3.173-1.882c-.735-1.617-2.527-3.834-8.19-6.29a1.055 1.055 0 0 1-.511-1.463a4.34 4.34 0 0 1 5.382-1.996L9 10.91z"
        ></path>
      </svg>
    </template>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id
      sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse
      potenti. Cras ut ante in libero tempus sodales sed quis dolor.
    </p>
  </Accordion>
</template>
