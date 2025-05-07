<script lang="ts">
	import '../app.css';
	import { enhance } from '$app/forms';
	let { data, children } = $props();
</script>
{#if data?.user?.username}
	<nav>
		<ul>
			<li>Dashboard</li>
			<li>Matkul</li>
			<li><form action="/dashboard?/logout" method="post">
				<button type="submit">Logout</button>
			</form></li>
		</ul>
	</nav>
{/if}
{@render children()}
