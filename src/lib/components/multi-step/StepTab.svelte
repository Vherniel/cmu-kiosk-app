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
    {disabled}
    on:click={() => selectStep(step)}>
    <slot />
</button>

<style lang="scss">
    .selected {
        border-bottom: 2px solid teal;
        color: #333;
    }
</style>
