<script>
	let { name, id, data, displayAttr, defaultChoice, bindValue = $bindable('') } = $props();
	console.log(bindValue);
</script>

<select
	{name}
	{id}
	class="border-0 border-b-2 border-white bg-transparent text-center text-white/50 autofill:bg-transparent focus:bg-[#2D2D2D]"
	bind:value={bindValue}
>
	<option value="">{defaultChoice}</option>
	{#each data as value}
		<option value={value.id}>{value[displayAttr]}</option>
	{/each}
</select>
