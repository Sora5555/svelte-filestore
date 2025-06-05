<script lang="ts">
	import { enhance } from '$app/forms';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	import * as Card from '$lib/components/ui/card/index';
	import { onMount } from 'svelte';
	let { data } = $props();
</script>

<a onclick={history.back()} class="cursor-pointer text-linkText">Kembali</a>
<form
	action="?/fileUpload"
	method="post"
	use:enhance
	enctype="multipart/form-data"
	class="flex justify-center gap-8 py-8"
>
	<Input type="file" name="file" id="file" placeholder="file"></Input>
	<Input type="text" name="judul" id="judul" placeholder="Judul File"></Input>
	<Button display="Upload"></Button>
</form>

<h1 class="w-full text-center text-6xl">
	Daftar File Pertemuan {data.pertemuanData?.judulPertemuan}
</h1>
<div class="flex flex-wrap justify-center gap-12 py-4">
	{#each data.fileUploadArray as item}
		<!-- content here -->
		<Card.Root
			class="w-3/5 max-w-md border-2 border-solid border-cardBorder/50 bg-cardBackground py-2 text-center font-kellySlab text-white"
		>
			<Card.Header>
				<Card.Title class="font-kellySlab text-4xl font-normal tracking-wide text-white"
					>Judul: {item.judul}</Card.Title
				>
			</Card.Header>
			<Card.Content class="flex w-full flex-col justify-center gap-8 text-center">
				<img src="/files/{item.namaFile}" alt="" class="w-full object-cover" />
				<a href="/files/{item.namaFile}" class="text-center text-white/50" download>Download</a>
				<!-- <img src="/files/{value.namaFile}" alt="" class="w-full object-cover" /> -->
			</Card.Content>
		</Card.Root>
	{/each}
</div>
