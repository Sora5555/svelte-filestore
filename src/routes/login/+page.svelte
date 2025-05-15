<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";
    import * as Card from "$lib/components/ui/card/index"

    let { form } : {form: ActionData} = $props();
</script>

<Card.Root class="max-w-md text-center px-16 py-4 bg-[#1C1C1C] border-solid border-1 border-[#717171]/50 text-white font-['Kelly_Slab']">
  <Card.Header>
    <Card.Title class="font-['Kelly_Slab'] text-white text-4xl tracking-wide">LOGIN</Card.Title>
  </Card.Header>
  <Card.Content>
    <form action="?/login" method="post" use:enhance class="flex flex-col gap-14" >
    <div class="flex flex-col gap-7">
        <div class="flex flex-col gap-2">
            <label for="username">Username</label>
            <input type="text" name="username" autocomplete="new-password" id="username" class="text-center autofill:bg-transparent bg-transparent border-0 border-b-2">
        </div>
        <div class="flex flex-col gap-2">
            <label for="password">Password</label>
            <input type="password" autocomplete="new-password" name="password" id="password"  class="text-center autofill:bg-transparent bg-transparent border-0 border-b-2">
        </div>
    </div>
    <button type="submit" class="bg-[#EAEAEA] text-[#242424] py-2">Login</button>
</form>
  </Card.Content>
</Card.Root>
