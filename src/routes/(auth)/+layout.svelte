<script lang="ts">
	let { data, children } = $props();
</script>

<img src="./Group 3.svg" alt="" class="absolute right-24 top-24" /><img
	src="./Group 4.svg"
	alt=""
	class="absolute bottom-10 left-20"
/><img src="./Group 5.svg" alt="" class="absolute bottom-40 right-40" /><img
	src="./Group 7.svg"
	alt=""
	class="absolute left-20 top-12"
/>
<div class="bg-main flex max-w-full flex-col items-center justify-center p-14 text-white">
	{@render children()}
</div>
