<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	import Select from '$lib/components/select.svelte';
	let { data, form } = $props();
	let namaRole = data.role.namaRole;
	let semesterSelect = $state(''); //binding this variable to setup form submit on change
	let valueSelectKampus = $state('');
	let jumlahSemester = $derived(data.kampus[0]?.jumlahSemester);
	let updateSemester;
	if (data.role.namaRole == 'admin') {
		updateSemester = () => {
			let selectedKampus = data.kampus.filter((value) => {
				if (value.id.toString() == valueSelectKampus) {
					return value;
				}
			});
		};
	}
	let jumlahMatkul = $derived.by(() => {
		let selectedSemester = semesterSelect
			? jumlahSemester?.filter((value) => {
					if (value.id.toString() == semesterSelect) {
						return value;
					}
				})
			: [];
		return selectedSemester[0]?.matkul;
	});
</script>

{#if namaRole == 'admin'}
	<h5>Tambah kampus</h5>
	<form action="?/tambahKampus" method="post" use:enhance>
		<label for="namaKampus">Nama Kampus</label>
		<input type="text" name="namaKampus" id="namaKampus" />
		<label for="singkatanKampus">Singkatan Kampus</label>
		<input type="text" name="singkatanKampus" id="singkatanKampus" />
		<button type="submit">Tambah</button>
	</form>

	<h1>Hi user {data.role.namaRole}</h1>
	<ul>
		{#each data?.kampus as kampus}
			<li>
				{kampus?.namaKampus} Jumlah Semester: {kampus.jumlahSemester.length}
				<form action="?/tambahSemester&id={kampus.id}" method="post" use:enhance>
					<input type="hidden" name="idKampus" value={kampus.id} />
					<button type="submit">Tambah Semester</button>
				</form>
			</li>
		{/each}
	</ul>
	<select
		name="kampusSelect"
		id="kampusSelect"
		bind:value={valueSelectKampus}
		onchange={updateSemester}
	>
		{#each data.kampus as kampus}
			<option value={kampus.id}>{kampus.namaKampus}</option>
		{/each}
	</select>
{/if}
<div class=" mx-4 flex w-56 flex-col justify-center gap-8 text-center">
	<Select
		name="semesterSelect"
		id="semesterSelect"
		data={jumlahSemester}
		displayAttr="semester"
		defaultChoice="Pilih Semester"
		bind:bindValue={semesterSelect}
	></Select>

	<form action="?/matkulAdd" method="post" use:enhance class="flex flex-col items-center">
		{#if form?.error}
			<h1>{form?.error}</h1>
		{/if}
		<input type="hidden" name="semesterId" value={semesterSelect} />
		<Input type="text" name="namaMatkul" id="namaMatkul" placeholder="Nama Matkul"></Input>
		<div class="my-4"><Button display="Tambah Matkul"></Button></div>
	</form>
</div>
<ul>
	{#each jumlahMatkul as matkul}
		<a href="/matkul/{matkul.id}">{matkul.namaMatkul}</a>
	{/each}
</ul>
