<script lang="ts">
    interface $$Props {
        previous?: boolean;
        next?: boolean;
    }

    import { getContext, onMount } from "svelte";
    import { key } from "./MultiStep.svelte";
    import type { HTMLAttributes } from "svelte/elements";

    const { nextStep, previousStep } = getContext(key);

    export let previous: boolean = true;
    export let next: boolean = true;
</script>

<div class={"step-navigation"}>
    {#if previous}
        <button class="previous" on:click={() => previousStep()}>Previous</button>
    {/if}
    {#if next}
        <button class="next" on:click={() => nextStep()}>Next</button>
    {/if}
</div>

<style lang="scss">
</style>
