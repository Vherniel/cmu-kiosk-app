<script lang="ts">
    import { getContext } from "svelte";
    import { key } from "./MultiStep.svelte";
    import { ArrowLeft, ArrowRight } from "lucide-svelte";

    // @ts-ignore
    const { steps, selectedStep, nextStep, previousStep } = getContext(key);

    $: previousDisabled = !$selectedStep.previous || $selectedStep == steps[0];
    $: nextDisabled = !$selectedStep.next || $selectedStep == steps[steps.length - 1];
</script>

<div class="mt-12 border-t-4 border-t-surface-50/30">
    <div class="-mx-4 flex h-32">
        <button
            class="previous flex-1 m-4 text-2xl{previousDisabled ? ' text-surface-300' : ''}"
            disabled={previousDisabled}
            on:click={() => previousStep()}>
            <div class="flex justify-center items-center">
                <span class="mx-1"><ArrowLeft /></span>
                <span class="mx-1">Previous</span>
            </div>
        </button>

        <button
            class="next flex-1 m-4 text-2xl{nextDisabled ? ' text-surface-300' : ''}"
            disabled={nextDisabled}
            on:click={() => nextStep()}>
            <div class="flex justify-center items-center">
                <span class="mx-1">Next</span>
                <span class="mx-1"><ArrowRight /></span>
            </div>
        </button>
    </div>
</div>

<style lang="scss">
</style>
