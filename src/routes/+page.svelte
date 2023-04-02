<script>
    import { PUBLIC_KIOSK_GUEST_EMAIL } from "$env/static/public";

    export let data;

    $: ({ session } = data);
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    {#if !session}
        <h1>You are not logged in</h1>
    {:else if session.user.email == PUBLIC_KIOSK_GUEST_EMAIL}
        <h1>Welcome <u>{session.user.email}</u></h1>
        <p>You are continuing as <strong><u>Guest</u></strong></p>
    {:else}
        <h1>Welcome <u>{session.user.email}</u></h1>
        <p>You are continuing as <strong><u>Admin</u></strong></p>
    {/if}
</section>

<style lang="scss">
    h1,
    h2,
    p {
        margin-bottom: 1rem;
    }
</style>
