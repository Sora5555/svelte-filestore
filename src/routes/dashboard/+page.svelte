<script lang="ts">
    import { enhance } from "$app/forms";
    let {data} = $props();
    let namaRole = data.role.namaRole;
</script>

{#if namaRole == "admin"}
<h5>Tambah kampus</h5>
<form action="?/tambahKampus" method="post" use:enhance>
    <label for="namaKampus">Nama Kampus</label>
    <input type="text" name="namaKampus" id="namaKampus">
    <label for="singkatanKampus">Singkatan Kampus</label>
    <input type="text" name="singkatanKampus" id="singkatanKampus">
    <button type="submit">Tambah</button>
</form>
{/if}
<h1>Hi user {data.role.namaRole}</h1>
<ul>
    {#await data.kampus}
        <li>Waiting for data</li>
    {:then kampusData} 
        {#each kampusData as kampus}
            <li>{kampus.namaKampus} <form action="?/tambahSemester"><input type="hidden" name="idKampus" value="{kampus.id}"> <button type="submit">Tambah Semester</button></form></li>
        {/each}
    {/await}
</ul>