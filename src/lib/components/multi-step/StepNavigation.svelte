<script lang="ts">
    interface $$Props {
        previous?: boolean;
        next?: boolean;
    }

    import { getContext } from "svelte";
    import { key } from "./MultiStep.svelte";

    // @ts-ignore
    const { steps, selectedStep, nextStep, previousStep } = getContext(key);

    export let previous: boolean = true;
    export let next: boolean = true;
</script>

<div class={"step-navigation"}>
    {#if previous}
        <button
            class="previous"
            disabled={$selectedStep == steps[0]}
            on:click={() => previousStep()}>Previous</button>
    {/if}
    {#if next}
        <button
            class="next"
            disabled={$selectedStep == steps[steps.length - 1]}
            on:click={() => nextStep()}>Next</button>
    {/if}
</div>

<style lang="scss">
</style>
