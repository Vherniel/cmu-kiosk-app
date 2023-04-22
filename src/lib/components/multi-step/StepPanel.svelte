<script lang="ts">
    import { getContext } from "svelte";
    import { key } from "./MultiStep.svelte";

    interface $$Props {
        name?: string | null;
    }

    export let name: string | null = null;

    const panel: { name?: string | null } = { name };

    // @ts-ignore
    const { registerPanel, selectedPanel } = getContext(key);

    registerPanel(panel);
</script>

{#if $selectedPanel == panel}
    <div {...$$restProps}>
        <slot />
    </div>
{/if}

<style lang="scss">
</style>
