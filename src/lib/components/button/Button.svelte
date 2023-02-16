<script lang="ts">
    import type { SvelteComponent } from "svelte";
    // export let prefix: any;
    // export let suffix: any;
    export let icon: any;
</script>

<!-- TODO: Tooltip -->
<button class="button">
    <div class="button-layout">
        {#if typeof icon == "string"}
            icon
        {:else}
            <svelte:component this={icon} />
        {/if}

        <span class="label"><slot /></span>
    </div>
</button>

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
        font-weight: bold;
        font-size: 0.875rem;
        cursor: pointer;
    }
    .button[disabled] {
        cursor: not-allowed;
    }
</style>
