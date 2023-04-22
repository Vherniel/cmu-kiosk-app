<script lang="ts">
    import Input from "./Input.svelte";

    interface $$Slots {
        invalid?: {};
        prefix?: {};
        postfix?: {};
    }

    type TypeProps = "text" | "email" | "search" | "tel" | "url";

    export let name: string;
    export let label: string | null = null;
    export let type: TypeProps = "text";

    // Superforms
    export let superform: any;

    $: ({ errors } = superform);
</script>

<div class="form-control mb-4">
    {#if label}
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label mb-1">
            <span>{label}</span>
            <span class="input-text">
                {#if $$slots.prefix}
                    <span class="px-4"><slot name="prefix" /></span>
                {/if}
                <Input
                    on:focus
                    {...$$restProps}
                    {type}
                    {name}
                    {superform}
                    class={$$slots.prefix || $$slots.postfix ? "" : "px-4"} />
                {#if $$slots.postfix}
                    <span class="px-4"><slot name="postfix" /></span>
                {/if}
            </span>
        </label>
    {:else}
        <span class="input-text">
            {#if $$slots.prefix}
                <span class="px-4"><slot name="prefix" /></span>
            {/if}
            <Input
                on:focus
                {...$$restProps}
                {type}
                {name}
                {superform}
                class={$$slots.prefix || $$slots.postfix ? null : "px-4"} />
            {#if $$slots.postfix}
                <span class="px-4"><slot name="postfix" /></span>
            {/if}
        </span>
    {/if}

    {#if $errors[name]}
        <slot name="invalid" />
    {/if}
</div>

<style lang="scss">
</style>
