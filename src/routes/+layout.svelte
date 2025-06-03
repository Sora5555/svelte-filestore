<script lang="ts">
	import '../app.css';
	import { enhance } from '$app/forms';
	let { data, children } = $props();
	import Title from '$lib/components/title.svelte';
</script>

{#if data?.user?.username}
	<nav class="flex w-full items-center justify-between bg-main px-5 py-6 text-white">
		<Title size="text-6xl" padding=""></Title>
		<ul class="flex justify-around">
			<li>
				<form action="/dashboard?/logout" method="post">
					<button type="submit">Logout</button>
				</form>
			</li>
		</ul>
	</nav>
{/if}
<div class="mt-8 bg-main text-white">{@render children()}</div>
