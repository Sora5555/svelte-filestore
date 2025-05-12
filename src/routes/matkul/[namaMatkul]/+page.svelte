<script>
	import { enhance } from "$app/forms";
    import { page } from "$app/state";

    let {data} = $props();
    console.log(data.fileArray);
</script>
<form action="?/fileUpload" method="post" use:enhance enctype="multipart/form-data">
    <input type="file" name="file" id="file">
    <input type="text" name="judul" id="judul">
    <button type="submit">Upload</button>
</form>

{#each data.fileArray as file}
    <h1>{file.judul}</h1>
    <img src="/files/{file.namaFile}" alt="">
{/each}
