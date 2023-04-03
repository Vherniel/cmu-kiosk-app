<script lang="ts">
    import { getContext } from "svelte";
    import { TABS } from "./Tabs.svelte";

    const tab = {};
    const { registerTab, selectTab, selectedTab } = getContext<any>(TABS);

    registerTab(tab);

    export let disabled: boolean | null = null;
</script>

<button class:selected={$selectedTab === tab} {disabled} on:click={() => selectTab(tab)}>
    <slot />
</button>

<style>
    /* button {
        background: none;
        border: none;
        border-bottom: 2px solid white;
        border-radius: 0;
        margin: 0;
        color: #ccc;
    } */

    .selected {
        border-bottom: 2px solid teal;
        color: #333;
    }
</style>
