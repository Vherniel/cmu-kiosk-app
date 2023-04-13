<script lang="ts">
    import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";
    import { storePopup } from "@skeletonlabs/skeleton";
    storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<slot />

<style lang="scss">
</style>
