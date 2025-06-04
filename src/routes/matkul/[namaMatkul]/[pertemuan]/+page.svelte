<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';

	let { data } = $props();
</script>

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

{#each data.fileUploadArray as item}
	<!-- content here -->
	<img src="/files/{item.namaFile}" alt="" class="w-full object-cover" />
{/each}
