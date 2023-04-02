<script lang="ts">
    import { PUBLIC_KIOSK_GUEST_EMAIL } from "$env/static/public";

    import { User } from "lucide-svelte";

    import type { LayoutData } from "../../../routes/$types";

    export let img: string | null = null;
    export let data: LayoutData;
    $: ({ supabase, session } = data);

    $: user = data?.session?.user;

    let isSignedOut: boolean | null = null;

    $: isSignedOut = !session || user?.email == PUBLIC_KIOSK_GUEST_EMAIL;
</script>

<a
    href={isSignedOut ? "/signin" : "javascript:void(0)"}
    class="account"
    on:click={(e) => {
        if (!isSignedOut) {
            // if signed in
            e.preventDefault();
        }
    }}>
    <div class="img">
        <div>
            {#if img}
                <img src="" alt="Guest" />
            {:else}
                <User />
            {/if}
        </div>
    </div>
    <!-- TODO: not yet dynamic. data is static. not yet from supabase table -->
    <p class="account__name">{isSignedOut ? "Guest" : "Admin"}</p>
    <p class="account__id">
        {isSignedOut ? "ID: kiosk.guest" : "ID: kiosk.admin"}
    </p>
</a>

<style>
    .account {
        display: block;
        color: unset;
        text-decoration: none;
        text-align: center;
        border-radius: 0.75rem;
        border: solid 1px #d9d9d9;
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
    .img {
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 1rem;
        width: 6rem;
        height: 6rem;
        background-color: #cccccc;
        overflow: hidden;
        border-radius: 999px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .account__name,
    .account__id {
        margin-top: 0;
        margin-bottom: 0;
    }
    .account__name {
        font-weight: var(--font-bold);
    }
</style>
