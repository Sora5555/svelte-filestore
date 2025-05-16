<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";
    import * as Card from "$lib/components/ui/card/index"

    let { form } : {form: ActionData} = $props();
</script>
<h1 class="text-center font-['Jetbrains_Mono'] text-white text-9xl pb-10">TOKU</h1>
<Card.Root class="max-w-md text-center w-3/5 py-2 bg-[#1C1C1C] border-solid border-2 border-[#717171]/50 text-white font-['Kelly_Slab']">
  <Card.Header>
    <Card.Title class="font-['Kelly_Slab'] text-white text-4xl tracking-wide font-normal">LOGIN</Card.Title>
  </Card.Header>
  <Card.Content class="py-16 text-center w-full">
    <form action="?/login" method="post" use:enhance class="flex flex-col gap-10 justify-center items-center" >
    <div class="flex flex-col gap-10">
        <div class="flex flex-col gap-2">
            <!-- <label for="username">Username</label> -->
            <input type="text" name="username" autocomplete="new-password" id="username" placeholder="Username" class="text-center autofill:bg-transparent bg-transparent border-0 border-b-2 border-white text-white/50">
        </div>
        <div class="flex flex-col gap-2">
            <!-- <label for="password">Password</label> -->
            <input type="password" autocomplete="new-password" name="password" id="password"  placeholder="Password" class="text-center autofill:bg-transparent bg-transparent border-0 border-b-2 border-white text-white/50">
        </div>
    </div>
    <button type="submit" class="bg-[#EAEAEA] text-[#242424] w-1/4 rounded-[2px] text-lg">Login</button>
</form>
<div class="flex w-full justify-center gap-2 pt-2">
  <p class="">Don't have an account?</p> <a href="/sign-up" class="text-[#9E9D9D]">Register</a>
</div>
  </Card.Content>
</Card.Root>
