<script lang="ts">
    import { afterUpdate, getContext } from "svelte";
    import { key } from "./MultiStep.svelte";
    import { Check } from "lucide-svelte";

    interface $$Props {
        name?: string | null;
        previous?: boolean | null;
        next?: boolean | null;
    }

    export let name: string | null = null;

    export let previous: boolean | null = true;
    export let next: boolean | null = true;

    const step: {
        name?: string | null;
        previous?: boolean | null;
        next?: boolean | null;
    } = {
        name,
        previous,
        next,
    };

    // @ts-ignore
    const { steps, registerStep, selectedStep } = getContext(key);

    let done = false;

    $: stepIndex = steps.indexOf(step);

    registerStep(step);

    afterUpdate(() => {
        selectedStep.update((current) => {
            // only apply the next step to the specific steop
            if ($selectedStep == step) {
                current.next = next;
            }
            return current;
        });
    });

    $: done = stepIndex < steps.indexOf($selectedStep) ? true : false;
</script>

<div class="flex items-center">
    <div
        class="flex items-center justify-center rounded-full w-8 h-8 border-2 {$selectedStep ==
        step
            ? 'border-primary-500 '
            : done
            ? 'bg-primary-500 border-primary-500'
            : 'border-surface-500/20 dark:border-primary-300/30'}">
        <span class="font-extrabold {$selectedStep == step ? 'text-black' : 'text-gray-300'}">
            {#if done}
                <Check class="stroke-primary-200 dark:stroke-surface-500" />
            {:else}
                <span
                    class={$selectedStep == step
                        ? "text-primary-500"
                        : "border-surface-500/20 dark:text-primary-300/30"}>
                    {stepIndex + 1}
                </span>
            {/if}
        </span>
    </div>
    <span
        class="ml-3 font-extrabold {$selectedStep == step
            ? 'text-primary-500'
            : 'text-surface-500/20 dark:text-primary-300/30'}"><slot /></span>
</div>

<!-- removes the last connecting line -->
{#if !(steps.length - 1 == stepIndex)}
    <div class="w-8 h-4 flex justify-center">
        <div
            class="border-l-[1px] border-r-[1px] h-full {done
                ? 'border-primary-500'
                : 'border-surface-500/20 dark:border-primary-300/30'}" />
    </div>
{/if}

<style lang="scss">
</style>
