<script lang="ts">
    import { KeyboardComponent, keyboardStore } from "$lib/components/keyboard-component";
    import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";
    import { storePopup } from "@skeletonlabs/skeleton";

    storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<div class="h-full {$keyboardStore.show ? 'pb-60' : ''}">
    <slot />
    {#if $keyboardStore.show}
        <div>
            <KeyboardComponent />
        </div>
    {/if}
</div>

<style lang="scss">
</style>
