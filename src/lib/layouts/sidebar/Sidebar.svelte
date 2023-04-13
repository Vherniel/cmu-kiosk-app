<script lang="ts">
    export let slotTop: string = "";
    export let slotMiddle: string = "";
    export let slotBottom: string = "";
</script>

<div class={`flex flex-col h-full ${$$props.class}`.trim()}>
    {#if $$slots.top}
        <div class={`${slotTop}`.trim()}>
            <slot name="top" />
        </div>
    {/if}
    {#if $$slots.middle}
        <div class={`${slotMiddle}`.trim()}>
            <slot name="middle" />
        </div>
    {/if}
    {#if $$slots.bottom}
        <div class={`${slotBottom}`.trim()}>
            <slot name="bottom" />
        </div>
    {/if}
</div>

<style lang="scss">
    /* aside {
        background-color: #fafafa;
        flex-shrink: 0;
        flex-basis: 20rem;
        padding-top: 2rem;
        padding-bottom: 2rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    } */
</style>
