<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import * as Card from '$lib/components/ui/card/index';
	import Title from '$lib/components/title.svelte';
	import Input from '$lib/components/input.svelte';
	import Button from '$lib/components/button.svelte';

	let { form }: { form: ActionData } = $props();
</script>

<Title></Title>
<Card.Root
	class="w-3/5 max-w-md border-2 border-solid border-cardBorder/50 bg-cardBackground py-2 text-center font-kellySlab text-white"
>
	<Card.Header>
		<Card.Title class="font-kellySlab text-4xl font-normal tracking-wide text-white"
			>LOGIN</Card.Title
		>
	</Card.Header>
	<Card.Content class="w-full py-16 text-center">
		<form
			action="?/login"
			method="post"
			use:enhance
			class="flex flex-col items-center justify-center gap-10"
		>
			<div class="flex flex-col gap-10">
				<div class="flex flex-col gap-2">
					<!-- <label for="username">Username</label> -->
					<Input type="text" name="username" id="username" placeholder="Username"></Input>
				</div>
				<div class="flex flex-col gap-2">
					<!-- <label for="password">Password</label> -->
					<Input type="password" name="password" id="password" placeholder="Password"></Input>
				</div>
			</div>
			<Button display="Login"></Button>
		</form>
		<div class="flex w-full justify-center gap-2 pt-2">
			<p class="">Don't have an account?</p>
			<a href="/sign-up" class="text-linkText">Register</a>
		</div>
	</Card.Content>
</Card.Root>
