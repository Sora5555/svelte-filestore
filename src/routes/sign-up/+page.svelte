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
    <label for="roles">Roles</label>
    <select name="role" id="roles">
        {#each data.roles as role}
            <option value="{role.id}">{role.namaRole}</option>
        {/each}
    </select>
    <label for="kampus">Kampus</label>
    <select name="kampus" id="kampus">
        {#each data.kampus as kampus}
            <option value="{kampus.id}">{kampus.namaKampus}</option>
        {/each}
    </select>
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