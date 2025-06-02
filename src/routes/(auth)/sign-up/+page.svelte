<script>
	import { enhance } from '$app/forms';
	import * as Card from '$lib/components/ui/card/index';
	let { data } = $props();
</script>

<h1 class="font-jetBrains pb-10 text-center text-9xl text-white">TOKU</h1>
<Card.Root
	class="border-cardBorder/50 bg-cardBackground font-kellySlab w-3/5 max-w-md border-2 border-solid py-2 text-center text-white"
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
				<div class="flex flex-col gap-2">
					<!-- <label for="password">Password</label> -->
					<input
						type="password"
						autocomplete="new-password"
						name="reconfirm_password"
						id="reconfirm_password"
						placeholder="Reconfirm Password"
						class="border-0 border-b-2 border-white bg-transparent text-center text-white/50 autofill:bg-transparent"
					/>
				</div>
				<div class="flex flex-col gap-2">
					<!-- <label for="password">Password</label> -->
					<select
						name="role"
						id="roles"
						class="border-0 border-b-2 border-white bg-transparent text-center text-white/50 autofill:bg-transparent focus:bg-[#2D2D2D]"
					>
						{#each data.roles as role}
							<option value={role.id}>{role.namaRole}</option>
						{/each}
					</select>
				</div>
				<div class="flex flex-col gap-2">
					<!-- <label for="password">Password</label> -->
					<label for="kampus"></label>
					<select
						name="kampus"
						id="kampus"
						class="border-0 border-b-2 border-white bg-transparent text-center text-white/50 autofill:bg-transparent focus:bg-[#2D2D2D]"
					>
						<option value="">Pilih kampus</option>
						{#each data.kampus as kampus}
							<option value={kampus.id}>{kampus.namaKampus}</option>
						{/each}
					</select>
				</div>
			</div>
			<button type="submit" class="bg-buttonBackground text-buttonText w-1/4 rounded-[2px] text-lg"
				>Login</button
			>
		</form>
		<div class="flex w-full justify-center gap-2 pt-2">
			<p class="">Already have an account?</p>
			<a href="/login" class="text-linkText">Login!</a>
		</div>
	</Card.Content>
</Card.Root>
