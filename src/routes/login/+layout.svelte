<script lang="ts">
    let { data, children } = $props();
</script>
<div class="max-w-full h-screen flex justify-center items-center bg-[#2D2D2D] text-white">
    {@render children()}
</div>