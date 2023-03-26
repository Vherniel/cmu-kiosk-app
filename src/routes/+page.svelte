<script>
    export let data;

    $: ({ supabase, session } = data);

    /** @type {string} */
    let createEmail;
    /** @type {string} */
    let createPassword;

    /** @type {string} */
    let signInEmail;
    /** @type {string} */
    let signInPassword;

    /** @param {SubmitEvent} event */
    async function onCreateAccount(event) {
        const { data, error } = await supabase.auth.signUp({
            email: createEmail,
            password: createPassword,
        });

        console.log("onCreateAccount data: ", data);
        console.log("onCreateAccount error: ", error);
    }

    /** @param {SubmitEvent} event */
    async function onSignIn(event) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: signInEmail,
            password: signInPassword,
        });
        console.log("onSignIn data: ", data);
        console.log("onSignIn error: ", error);
    }

    /** @param {SubmitEvent} event */
    async function onSignOut(event) {
        const { error } = await supabase.auth.signOut();
        console.log("onSignOut error: ", error);
    }
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    <h1>Home</h1>
    <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci dolorum voluptatibus
        eveniet aliquam, officia nulla? Deserunt, sequi fugit! Soluta asperiores similique cum
        ab eum ex maiores hic dolor nihil ea?
    </p>
    {#if !session}
        <h2>I am not logged in</h2>
        <h4>Login</h4>
        <form on:submit|preventDefault={onSignIn}>
            <div>
                <input
                    type="email"
                    name="signInEmail"
                    id="sign-in-email"
                    autocomplete="email"
                    bind:value={signInEmail}
                />
            </div>
            <div>
                <input
                    type="password"
                    name="signInPassword"
                    id="sign-in-password"
                    autocomplete="new-password"
                    bind:value={signInPassword}
                />
            </div>
            <input type="submit" value="Sign in" />
        </form>
        <h4>Or create a new account</h4>
        <form on:submit|preventDefault={onCreateAccount}>
            <div>
                <input
                    type="email"
                    name="createEmail"
                    id="create-email"
                    autocomplete="email"
                    bind:value={createEmail}
                />
            </div>
            <div>
                <input
                    type="password"
                    name="createPassword"
                    id="create-password"
                    autocomplete="new-password"
                    bind:value={createPassword}
                />
            </div>
            <input type="submit" value="Create account" />
        </form>
        <button
            on:click={async (event) => {
                const { data, error } = await supabase.auth.getSession();
                console.log(data);
            }}>Get session</button
        >
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
            }}>Get session</button
        >
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
