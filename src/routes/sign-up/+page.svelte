<script>

    import { enhance } from "$app/forms";
    let { data } = $props();
</script>


<form method="POST" use:enhance>
    <label for="username">Username</label>
    <input type="text" name="username" id="username">
    <label for="password">Password</label>
    <input type="password" name="password" id="password">
    <label for="reconfirm_password">Password</label>
    <input type="password" name="reconfirm_password" id="reconfirm_password">
    <button type="submit">Submit</button>
</form>

<table>
    <thead>
        <tr>
            <th>Username</th>
        </tr>
    </thead>
    <tbody>
        {#each data.users as singleData}
            <tr>
                <td>{singleData.username}</td>
            </tr>
        {/each}
    </tbody>
</table>