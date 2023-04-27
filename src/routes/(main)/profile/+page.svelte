<script lang="ts">
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import type { PageData } from "./$types";

    export let data: PageData;

    $: ({ supabase } = data);

    async function handleLogout() {
        const { error } = await supabase.auth.signOut();
        throw new Error("Signout error: ", { cause: error });
    }
</script>

<section>
    <div class="container">
        <div class="mb-16"><h1>Are you sure you want to logout?</h1></div>

        <button
            type="button"
            class="btn variant-filled-error font-extrabold"
            on:click={async () => {
                await handleLogout();
                goto("/");
            }}
            on:keyup={async () => {
                await handleLogout();
                goto("/");
            }}>Logout</button>
    </div>
</section>

<style lang="scss">
</style>
