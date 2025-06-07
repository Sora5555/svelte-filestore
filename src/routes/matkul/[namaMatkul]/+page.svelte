<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import Back from '$lib/components/back.svelte';
	import Button from '$lib/components/button.svelte';
	import Delete from '$lib/components/delete.svelte';
	import Input from '$lib/components/input.svelte';
	import * as Card from '$lib/components/ui/card/index';

	let { data } = $props();
</script>

<Back />
<form
	action="?/pertemuanAdd"
	method="post"
	use:enhance
	enctype="multipart/form-data"
	class="flex justify-center gap-8 py-8"
>
	<Input type="text" name="judul_pertemuan" id="judul_pertemuan" placeholder="Judul Pertemuan"
	></Input>
	<Input type="number" name="nomor_pertemuan" id="nomor_pertemuan" placeholder="Nomor Pertemuan"
	></Input>
	<Button display="Tambah Pertemuan"></Button>
</form>
<h1 class="w-full text-center text-6xl">Daftar Pertemuan {data.matkulData?.namaMatkul}</h1>
<div class="flex flex-wrap justify-center gap-12 py-4">
	{#each data.pertemuanArray as value}
		<Card.Root
			class="w-3/5 max-w-md border-2 border-solid border-cardBorder/50 bg-cardBackground py-2 text-center font-kellySlab text-white"
		>
			<Card.Header>
				<Card.Title class="font-kellySlab text-4xl font-normal tracking-wide text-white"
					>Judul: {value.judulPertemuan}</Card.Title
				>
			</Card.Header>
			<Card.Content class="flex w-full justify-center text-center">
				<div class="flex justify-center gap-4">
					<a href="/matkul/{data.matkulData?.id}/{value.id}" class="text-center text-white/50"
						>Pertemuan ke: {value.nomorPertemuan}</a
					>
					{#if data.role?.namaRole == 'admin'}
						<form action="?/deletePertemuan" method="POST">
							<input type="hidden" name="id" id="id" value={value.id} />
							<Delete />
						</form>
					{/if}
				</div>
				<!-- <img src="/files/{value.namaFile}" alt="" class="w-full object-cover" /> -->
			</Card.Content>
		</Card.Root>
	{/each}
</div>
