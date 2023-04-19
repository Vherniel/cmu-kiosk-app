<script lang="ts">
    import { enhance } from "$app/forms";
    import { ProgressRadial } from "@skeletonlabs/skeleton";
    import { Key, User } from "lucide-svelte";

    let showPassword = false;
    let focusPassword: HTMLLabelElement;

    let isFormSubmitted = false;
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="h-full">
    <div class="h-full flex">
        <div class="flex-1 flex items-center">
            <div class="px-20 pb-24 w-full">
                <header>
                    <h1>Let’s signin first</h1>
                    <p class="mt-4 mb-12">
                        Signin to save your progress and to keep track your records.
                    </p>
                </header>
                <form
                    method="POST"
                    use:enhance={() => {
                        isFormSubmitted = !isFormSubmitted;
                    }}>
                    <label class="my-4">
                        <span class="inline-block mb-1">Username</span>
                        <div
                            class="input-group grid-cols-[auto_1fr_auto] bg-transparent border-2 border-surface-50 focus-within:border-primary-500 dark:border-surface-500 dark:bg-surface-800 dark:focus-within:border-primary-500">
                            <div><User /></div>
                            <input
                                type="text"
                                name="username"
                                class="input bg-transparent dark:bg-transparent px-0 h-12"
                                required
                                disabled={isFormSubmitted}
                                placeholder="Student ID or CMU Email" />
                        </div>
                    </label>
                    <label class="my-4" bind:this={focusPassword}>
                        <span class="inline-block mb-1">Password</span>
                        <div
                            class="input-group grid-cols-[auto_1fr_auto] bg-transparent border-2 border-surface-50 focus-within:border-primary-500 dark:border-surface-500 dark:bg-surface-800 dark:focus-within:border-primary-500">
                            <div><Key /></div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                class="input bg-transparent dark:bg-transparent px-0 h-12"
                                required
                                disabled={isFormSubmitted}
                                autocomplete="off"
                                placeholder="Enter your password here" />
                            <button
                                class={`font-extrabold ${
                                    showPassword
                                        ? "text-primary-500"
                                        : "text-surface-900/30 dark:text-primary-50/30"
                                }`}
                                on:click|preventDefault={() => {
                                    showPassword = !showPassword;
                                    focusPassword.focus();
                                }}>
                                Show
                            </button>
                        </div>
                    </label>
                    <div class="flex items-center mt-8 w-full">
                        <button
                            type="submit"
                            name="signin"
                            value="signin"
                            disabled={isFormSubmitted}
                            class="btn font-extrabold variant-filled-primary px-16 py-4 active:bg-primary-500/30">
                            Signin
                        </button>
                        <button
                            type="submit"
                            name="signin"
                            value="guest"
                            formnovalidate
                            disabled={isFormSubmitted}
                            class="btn font-extrabold bg-transparent ml-2 px-4 py-4 active:bg-primary-500/30">
                            Continue as Guest
                        </button>
                        {#if isFormSubmitted}
                            <div>
                                <ProgressRadial
                                    width="w-6"
                                    stroke={128}
                                    meter="stroke-primary-500"
                                    track="stroke-primary-500/30" />
                            </div>
                        {/if}
                    </div>
                </form>
            </div>
        </div>
        <div class="flex-1 bg-surface-700">
            <img
                src="/images/cmu-new-building-inspection.png"
                class="h-full object-cover object-"
                alt="CMU New Building" />
        </div>
    </div>
</section>

<style lang="scss">
</style>
