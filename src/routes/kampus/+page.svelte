<script>
	import { enhance } from '$app/forms';
	import Back from '$lib/components/back.svelte';
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	import * as Card from '$lib/components/ui/card/index';

	let { data } = $props();
</script>

<Back />
<form action="?/tambahKampus" method="post" use:enhance class="flex w-full justify-center gap-8">
	<Input type="text" name="namaKampus" id="namaKampus" placeholder="Nama Kampus"></Input>
	<Input type="text" name="singkatanKampus" id="singkatanKampus" placeholder="Singkatan Kampus"
	></Input>
	<Button display="Tambah"></Button>
</form>
<h1 class="w-full py-4 text-center text-6xl">Daftar Kampus</h1>
<div class="flex flex-wrap justify-center gap-12 py-4">
	{#each data?.kampusArray as kampus}
		<Card.Root
			class="w-3/5 max-w-md border-2 border-solid border-cardBorder/50 bg-cardBackground py-2 text-center font-kellySlab text-white"
		>
			<Card.Header>
				<Card.Title class="font-kellySlab text-4xl font-normal tracking-wide text-white"
					>{kampus?.namaKampus}</Card.Title
				>
			</Card.Header>
			<Card.Content class="flex w-full flex-col justify-center text-center">
				Jumlah Semester: {kampus.jumlahSemester.length}
				<form action="?/tambahSemester&id={kampus.id}" method="post" use:enhance>
					<input type="hidden" name="idKampus" value={kampus.id} />
					<Button display="Tambah Semester"></Button>
				</form>
				<!-- <img src="/files/{value.namaFile}" alt="" class="w-full object-cover" /> -->
			</Card.Content>
		</Card.Root>
	{/each}
</div>
