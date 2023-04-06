<script lang="ts">
    import { getContext } from "svelte";
    import { key } from "./MultiStep.svelte";
    import clsx from "clsx";

    const panel = {};
    const { registerPanel, selectedPanel } = getContext(key);

    registerPanel(panel);
</script>

{#if $selectedPanel == panel}
    <div class={clsx("step-panel", $$props.class)}>
        <slot />
    </div>
{/if}

<style lang="scss">
</style>
