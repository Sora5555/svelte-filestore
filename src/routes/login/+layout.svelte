<script lang="ts">
    let { data, children } = $props();
</script>
<img src="./Group 3.svg" alt="" class="absolute top-24 right-24"><img src="./Group 4.svg" alt="" class="absolute bottom-10 left-20"><img src="./Group 5.svg" alt="" class="absolute bottom-40 right-40"><img src="./Group 7.svg" alt="" class="absolute top-12 left-20">
<div class="max-w-full h-screen flex justify-center items-center bg-[#2D2D2D] text-white flex-col">
    {@render children()}
</div>