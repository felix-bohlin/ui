<script setup>
		import { computed } from "vue";
import Baseline from "../.vitepress/theme/app/components/Baseline.vue"
const limited = ['field-sizing', 'container-style-queries', 'scope', 'interpolate-size', 'details-content', 'accent-color', 'overlay', 'datalist']
const baseline2025 = ['popover']
const baseline2024 = ['details-name','transition-behavior', 'light-dark', 'scrollbar-width']
const baseline2023 = ['container-queries', 'color-mix', 'has','nesting']

const filteredIds = computed(() => {
	return {
		'limited': limited,
		'2025': baseline2025,
		'2024': baseline2024,
		"2023": baseline2023,
		'all': [...limited, ...baseline2024, ...baseline2023]
	}[activeToggle.value]
})

	const activeToggle = defineModel({default: "all"})

	const buttons = [
		{
			id: 'all',
			label: 'All'
		},
		{
			id: 'limited',
			label: 'Limited'
		},
		{
			id: '2025',
			label: '2025'
		},
		{
			id: '2024',
			label: '2024'
		},
		{
			id: '2023',
			label: '2023'
		}
	]
</script>

<hgroup>
<p>Guide</p>
<h1>Browser compatibility</h1>
<p>These are the latest (and not always super-supported) features used by Open Props UI.</p>
</hgroup>

<nav class="tabs filled">
  <div role="tablist" aria-label="Underlined tabs">
    <button
     	v-for="button in buttons"
  		:key="button.id"
  		@click="activeToggle = button.id"
  		:aria-selected="activeToggle === button.id ? 'true' : 'false'"
      :id="`underlined-tab-${button.id}`"
      role="tab"
      :tabindex="activeToggle === button.id ? 0 : -1"
    >
      {{ button.label }}
    </button>
  </div>
</nav>

<Baseline :ids="filteredIds" />
