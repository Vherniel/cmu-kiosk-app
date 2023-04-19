<script lang="ts">
    import { PUBLIC_KIOSK_GUEST_EMAIL } from "$env/static/public";

    import { UserIcon } from "lucide-svelte";

    import type { LayoutData } from "../../../routes/(main)/$types";

    export let img: string | null = null;
    export let data: LayoutData;

    $: ({ supabase, session } = data);

    $: user = data?.session?.user;

    let isSignedOut: boolean | null = null;

    $: isSignedOut = !session || user?.email == PUBLIC_KIOSK_GUEST_EMAIL;

    let signedIn = true;
</script>

<a href="/signin" class="btn w-full h-52 ring-1 flex flex-col p-4">
    <div>
        <div class="rounded-full overflow-hidden w-20 h-20 bg-secondary-400-500-token">
            {#if !signedIn}
                <UserIcon size="36" />
            {:else}
                <img src="/images/cmu.png" class="block w-full h-full" alt="CMU" />
            {/if}
        </div>
    </div>
    <div class="mt-4">
        <div class="font-extrabold">Guest</div>
        <div>Login to save progress</div>
    </div>
</a>

<div>
    <!-- form should be <slot /> -->
    <!-- <div class="rounded-lg border-2 border-secondary-500" data-popup="examplePopup">
        <div class="relative bg-secondary-700 p-4 z-10">
            <form action="" method="POST"></form>
        </div>
        <div class="arrow p-5 border-2 border-secondary-500 bg-secondary-700 z-0" />
    </div> -->
    <!-- make this a popup by default -->
    <!-- when signed out -->
    <!-- signin button, -->

    <!-- <svelte:element
        this={isSignedOut ? "a" : "button"}
        href={isSignedOut ? "/signin" : null}
        class="account"> -->
    <!-- 
            <Account
                {session}
                
            >

        -->

    <!-- TODO: data flow? how? -->
    <!--
            if signed in,
                should have NO borders and background
                should be a button

            if signed out,
                should have borders and background
                should be a a[href]
        -->

    <!-- <div class="img">
            <div>
                {#if img}
                    <img src="" alt="Guest" />
                {:else}
                    <User />
                {/if}
            </div>
        </div> -->
    <!-- TODO: not yet dynamic. data is static. not yet from supabase table -->
    <!-- <p class="account__name">{isSignedOut ? "Guest" : "Admin"}</p>
        <p class="account__id">
            {isSignedOut ? "ID: kiosk guest" : "ID: kiosk admin"}
        </p>
    </svelte:element> -->
</div>

<style lang="scss">
</style>
