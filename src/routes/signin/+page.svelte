<script lang="ts">
    import { PUBLIC_KIOSK_GUEST_EMAIL, PUBLIC_KIOSK_GUEST_PASS } from "$env/static/public";

    export let data;

    $: ({ supabase, session } = data);

    let createEmail: string;
    let createPassword: string;
    let signInEmail: string;
    let signInPassword: string;

    async function onCreateAccount(event: SubmitEvent) {
        const { data, error } = await supabase.auth.signUp({
            email: createEmail,
            password: createPassword,
        });

        // console.log("onCreateAccount data: ", data);
        // console.log("onCreateAccount error: ", error);
    }

    // TODO: apply transition on loggedin
    async function onSignIn(event: SubmitEvent) {
        const asGuest = event.submitter?.className.includes("continue-as-guest");

        const { data, error } = await supabase.auth.signInWithPassword({
            email: asGuest ? PUBLIC_KIOSK_GUEST_EMAIL : signInEmail,
            password: asGuest ? PUBLIC_KIOSK_GUEST_PASS : signInPassword,
        });
    }

    async function onSignOut(event: SubmitEvent) {
        const { error } = await supabase.auth.signOut();
        // console.log("onSignOut error: ", error);
    }
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    <h1>Home</h1>
    <!-- TODO: call-out component -->
    <!-- TODO: update verbiage below -->
    <p>If you already have a CMU Email, use it</p>
    {#if !session}
        <h2>I am not logged in</h2>
        <h4>Login</h4>
        <!-- TODO: sign-in or signin -->
        <form class="sign-in" on:submit|preventDefault={onSignIn}>
            <div>
                <input
                    type="email"
                    name="signInEmail"
                    id="sign-in-email"
                    autocomplete="email"
                    required
                    bind:value={signInEmail} />
            </div>
            <div>
                <input
                    type="password"
                    name="signInPassword"
                    id="sign-in-password"
                    autocomplete="new-password"
                    required
                    bind:value={signInPassword} />
            </div>
            <input type="submit" value="Sign in" />
        </form>
        <form class="continue-as-guest" on:submit|preventDefault={onSignIn}>
            <input type="submit" class="continue-as-guest" value="Continue as guest" />
        </form>
        <h4>Or create a new account</h4>
        <form on:submit|preventDefault={onCreateAccount}>
            <div>
                <input
                    type="text"
                    name="createEmail"
                    id="create-email"
                    autocomplete="email"
                    required
                    bind:value={createEmail} />
            </div>
            <div>
                <input
                    type="password"
                    name="createPassword"
                    id="create-password"
                    autocomplete="new-password"
                    required
                    bind:value={createPassword} />
            </div>
            <input type="submit" value="Create account" />
        </form>
        <button
            on:click={async (event) => {
                const { data, error } = await supabase.auth.getSession();
                console.log(data);
            }}>Get session</button>
    {:else}
        <h2>Welcome {session.user.email}</h2>
        <p>I am logged in!</p>
        <form on:submit|preventDefault={onSignOut}>
            <input type="submit" value="Sign out" />
        </form>
        <button
            on:click={async (event) => {
                const {
                    data: { session },
                    error,
                } = await supabase.auth.getSession();
                console.log("getSession: ", session);
            }}>Get session</button>
    {/if}
</section>

<style lang="scss">
    h1,
    h2,
    h4,
    p {
        margin-bottom: 1rem;
    }
</style>
