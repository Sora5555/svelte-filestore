<script lang="ts">
	let { type, name, id, placeholder } = $props();
</script>

<input
	{type}
	autocomplete="new-password"
	{name}
	{id}
	{placeholder}
	class="border-0 border-b-2 border-white bg-transparent text-center text-white/50 autofill:bg-transparent"
/>
