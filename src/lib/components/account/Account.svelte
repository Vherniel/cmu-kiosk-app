<script lang="ts">
    import { PUBLIC_KIOSK_GUEST_EMAIL } from "$env/static/public";
    import { afterUpdate, onMount } from "svelte";
    import { UserIcon } from "lucide-svelte";
    import type { LayoutData } from "../../../routes/(main)/$types";
    import { beforeUpdate } from "svelte";

    export let data: LayoutData;

    $: ({ session, user } = data);

    let fullName: string;
    let studentNumber: number;

    $: fullName;
    $: studentNumber;

    beforeUpdate(async () => {
        if (user) {
            fullName = `${user.first_name} ${user.middle_name} ${user.last_name}`;
            studentNumber = user.student_number;
        }
    });

    let isSignedOut: boolean | null = null;

    $: isSignedOut = !session || session.user?.email == PUBLIC_KIOSK_GUEST_EMAIL;
</script>

<a
    href={isSignedOut ? "/sign-in" : "/profile"}
    class="btn w-full h-52 flex flex-col p-4 {isSignedOut
        ? 'ring-2 ring-secondary-200 dark:ring-secondary-700'
        : 'bg-secondary-50 dark:bg-secondary-900'}">
    <div>
        <div class="rounded-full overflow-hidden w-20 h-20 bg-secondary-400-500-token">
            {#if isSignedOut}
                <div class="w-full h-full flex items-center justify-center">
                    <UserIcon size="36" />
                </div>
            {:else}
                <img
                    src={user?.img ? user?.img : "/images/cmu.png"}
                    class="block w-full h-full object-contain {user?.img ? '' : 'p-2'}"
                    alt="CMU" />
            {/if}
        </div>
    </div>
    <div class="mt-4">
        <div class="font-extrabold">
            {isSignedOut ? "Guest" : fullName}
        </div>
        <div>{isSignedOut ? "Login to save progress" : `Student no.: ${studentNumber}`}</div>
    </div>
</a>

<style lang="scss">
</style>
