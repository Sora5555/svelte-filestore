<script lang="ts">
    import { enhance, applyAction } from "$app/forms";
    let {data, form} = $props();
    let namaRole = data.role.namaRole;
    let semesterSelect = $state("") //binding this variable to setup form submit on change
    let valueSelectKampus = $state("");
    let jumlahSemester = $derived.by( () => {
       let selectedKampus = (data.kampus).filter((value) => {
            if(value.id.toString() == valueSelectKampus){
                return value
            }
       })
      return selectedKampus[0]?.jumlahSemester;
    });
   
    let jumlahMatkul = $derived.by(() => {
        let selectedSemester = semesterSelect ? jumlahSemester?.filter((value) => {
            if(value.id.toString() == semesterSelect){
                return value;
            }
        }):[]
        return selectedSemester[0]?.matkul;
    })
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
        {#each data.kampus as kampus}
            <li>{kampus.namaKampus} Jumlah Semester: {kampus.jumlahSemester.length}
                <form action="?/tambahSemester&id={kampus.id}" method="post" use:enhance>
                    <input type="hidden" name="idKampus" value="{kampus.id}"> 
                    <button type="submit">Tambah Semester</button>
                </form>
            </li>
        {/each}
</ul>

<select name="kampusSelect" id="kampusSelect" bind:value={valueSelectKampus}>
        {#each data.kampus as kampus}
            <option value="{kampus.id}">{kampus.namaKampus}</option>
        {/each}
</select>

    <select name="semesterSelect" id="semesterSelect" bind:value={semesterSelect}  >
        {#each jumlahSemester as semester}
            <option value="{semester.id}">{semester.semester}</option>
        {/each}
    </select>
<form action="?/matkulAdd" method="post" use:enhance>
    {#if form?.error}
        <h1>{form?.error}</h1>
    {/if}
    <input type="hidden" name="semesterId" value="{semesterSelect}">
    <label for="namaMatkul">Nama Matkul</label>
    <input type="text" name="namaMatkul" id="namaMatkul">
    <button type="submit">Tambah Matkul</button>
</form>
<ul>
     {#each jumlahMatkul as matkul}
            <a href="/matkul/{matkul.id}">{matkul.namaMatkul}</a>
        {/each}
</ul>


