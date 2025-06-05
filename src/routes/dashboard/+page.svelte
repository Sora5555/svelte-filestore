<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	import Select from '$lib/components/select.svelte';
	import * as Card from '$lib/components/ui/card/index';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	let { data, form } = $props();
	let namaRole = data.role.namaRole;
	let semesterSelect = $state(''); //binding this variable to setup form submit on change
	let valueSelectKampus = $state('');
	let updateSemester;
	let jumlahSemester = $derived.by(() => {
		if (data.role.namaRole == 'admin') {
			return data.kampus.filter((value) => {
				if (value.id.toString() == valueSelectKampus) {
					return value;
				}
			})[0]?.jumlahSemester;
		} else {
			return data.kampus[0]?.jumlahSemester;
		}
	});

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

<div class=" flex w-full items-center justify-center gap-8 text-center">
	{#if namaRole == 'admin'}
		<Select
			name="kampusSelect"
			id="kampusSelect"
			bind:bindValue={valueSelectKampus}
			displayAttr="namaKampus"
			defaultChoice="Pilih Kampus"
			data={data.kampus}
		></Select>
	{/if}

	<Select
		name="semesterSelect"
		id="semesterSelect"
		data={jumlahSemester}
		displayAttr="semester"
		defaultChoice="Pilih Semester"
		bind:bindValue={semesterSelect}
	></Select>

	<form
		action="?/matkulAdd"
		method="post"
		use:enhance
		class="flex items-center justify-between gap-4"
	>
		{#if form?.error}
			<h1>{form?.error}</h1>
		{/if}
		<input type="hidden" name="semesterId" value={semesterSelect} />
		<Input type="text" name="namaMatkul" id="namaMatkul" placeholder="Nama Matkul"></Input>
		<div class="my-4"><Button display="Tambah Matkul"></Button></div>
	</form>
</div>
<h1 class="w-full text-center text-6xl">Daftar Matkul</h1>
<div class="flex flex-wrap justify-center gap-12 py-4">
	{#each jumlahMatkul as matkul}
		<Card.Root
			class="w-1/5 max-w-md border-2 border-solid border-cardBorder/50 bg-cardBackground py-2 text-center font-kellySlab text-white"
		>
			<Card.Content class="w-full py-16 text-center text-4xl font-normal tracking-wide text-white"
				><a href="/matkul/{matkul.id}">{matkul.namaMatkul}</a></Card.Content
			>
		</Card.Root>
	{/each}
</div>
