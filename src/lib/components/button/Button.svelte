<script lang="ts">
    import type { ComponentType } from "svelte/internal";
    import { type Icon, BoxSelect } from "lucide-svelte";
    export let icon: ComponentType<Icon> = BoxSelect;
    export let disabled: boolean = false;
    // export let prefix: any;
    // export let suffix: any;
</script>

<!-- TODO: Tooltip -->
<svelte:element this={""} class="button" {disabled}>
    <div class="button-layout">
        <svelte:component this={icon} />
        <span class="label"><slot /></span>
    </div>
</svelte:element>

<style lang="scss">
    .button-layout {
        display: flex;
        align-items: center;
    }
    .button {
        border: 0;
        border-radius: 0.25em;
        padding-top: 1em;
        padding-bottom: 1em;
        padding-left: 1.5em;
        padding-right: 1.5em;
        font-weight: var(--font-bold);
        font-size: 0.875rem;
        cursor: pointer;
    }
    .button[disabled] {
        cursor: not-allowed;
    }
</style>
