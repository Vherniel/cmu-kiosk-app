<script lang="ts">
    import { getContext } from "svelte";
    import { key } from "./MultiStep.svelte";

    const step = {};

    const { registerStep, selectStep, selectedStep } = getContext(key);

    registerStep(step);

    export let disabled: boolean | null = null;
</script>

<button
    class={"step-tab"}
    class:selected={$selectedStep == step}
    disabled={!($selectedStep == step)}
    on:click={() => selectStep(step)}>
    <slot />
</button>

<style lang="scss">
    .selected {
        background-color: teal;
        color: #333;
    }
    button:not([disabled]) {
        cursor: pointer;
    }
</style>
