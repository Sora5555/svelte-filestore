<script>
	import { enhance } from '$app/forms';
	import * as Card from '$lib/components/ui/card/index';
	import Title from '$lib/components/title.svelte';
	import Select from '$lib/components/select.svelte';
	import Input from '$lib/components/input.svelte';
	import Button from '$lib/components/button.svelte';
	let { data } = $props();
</script>

<Title></Title>
<Card.Root
	class="w-3/5 max-w-md border-2 border-solid border-cardBorder/50 bg-cardBackground py-2 text-center font-kellySlab text-white"
>
	<Card.Header>
		<Card.Title class="font-kellySlab text-4xl font-normal tracking-wide text-white"
			>Register</Card.Title
		>
	</Card.Header>
	<Card.Content class="w-full py-16 text-center">
		<form method="post" use:enhance class="flex flex-col items-center justify-center gap-10">
			<div class="flex flex-col gap-10">
				<div class="flex flex-col gap-2">
					<!-- <label for="username">Username</label> -->
					<Input type="text" name="username" id="username" placeholder="Username"></Input>
				</div>
				<div class="flex flex-col gap-2">
					<!-- <label for="password">Password</label> -->
					<Input type="password" name="password" id="password" placeholder="Password"></Input>
				</div>
				<div class="flex flex-col gap-2">
					<!-- <label for="password">Password</label> -->
					<Input
						type="password"
						name="reconfirm_password"
						id="reconfirm_password"
						placeholder="Reconfirm Password"
					></Input>
				</div>
				<div class="flex flex-col gap-2">
					<!-- <label for="password">Password</label> -->
					<Select
						name="role"
						id="roles"
						data={data.roles}
						displayAttr="namaRole"
						defaultChoice="Pilih Role"
					></Select>
				</div>
				<div class="flex flex-col gap-2">
					<!-- <label for="password">Password</label> -->
					<Select
						name="kampus"
						id="kampus"
						data={data.kampus}
						displayAttr="namaKampus"
						defaultChoice="Pilih Kampus"
					></Select>
				</div>
			</div>
			<Button display="Register"></Button>
		</form>
		<div class="flex w-full justify-center gap-2 pt-2">
			<p class="">Already have an account?</p>
			<a href="/login" class="text-linkText">Login!</a>
		</div>
	</Card.Content>
</Card.Root>
