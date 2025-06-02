<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import * as Card from '$lib/components/ui/card/index';

	let { form }: { form: ActionData } = $props();
</script>

<h1 class="font-jetBrains pb-10 text-center text-9xl text-white">TOKU</h1>
<Card.Root
	class="border-cardBorder/50 bg-cardBackground font-kellySlab w-3/5 max-w-md border-2 border-solid py-2 text-center text-white"
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
					<input
						type="text"
						name="username"
						autocomplete="new-password"
						id="username"
						placeholder="Username"
						class="border-0 border-b-2 border-white bg-transparent text-center text-white/50 autofill:bg-transparent"
					/>
				</div>
				<div class="flex flex-col gap-2">
					<!-- <label for="password">Password</label> -->
					<input
						type="password"
						autocomplete="new-password"
						name="password"
						id="password"
						placeholder="Password"
						class="border-0 border-b-2 border-white bg-transparent text-center text-white/50 autofill:bg-transparent"
					/>
				</div>
			</div>
			<button type="submit" class="text-buttonText bg-buttonBackground w-1/4 rounded-[2px] text-lg"
				>Login</button
			>
		</form>
		<div class="flex w-full justify-center gap-2 pt-2">
			<p class="">Don't have an account?</p>
			<a href="/sign-up" class="text-linkText">Register</a>
		</div>
	</Card.Content>
</Card.Root>
