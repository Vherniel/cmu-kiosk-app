<script lang="ts">
    import { getContext } from "svelte";
    import { key } from "./MultiStep.svelte";

    export let name;

    const panel = { name };

    // @ts-ignore
    const { registerPanel, selectedPanel } = getContext(key);

    registerPanel(panel);
</script>

{#if $selectedPanel == panel}
    <div class={"step-panel"}>
        <slot />
    </div>
{/if}

<style lang="scss">
</style>
