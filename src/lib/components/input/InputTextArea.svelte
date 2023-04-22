<script lang="ts">
    import { keyboard, keyboardStore } from "$lib/components/keyboard-component";
    import { afterUpdate } from "svelte";

    interface $$Slots {
        invalid?: {};
        prefix?: {};
        postfix?: {};
    }

    // Superforms
    export let superform: any;
    $: ({ form, errors, constraints } = superform);

    export let name: string;
    export let label: string | null = null;
    let element: any;
    $: value = "";

    // interface $$Props extends HTMLInputElement {}

    afterUpdate(() => {
        if ($keyboardStore.input == element) {
            $form[name] = $keyboardStore.value;
        }
    });
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
                <textarea
                    use:keyboard={value}
                    {...$$restProps}
                    {...$constraints[name]}
                    data-invalid={$errors[name]}
                    bind:value
                    bind:this={element}
                    class="bg-transparent w-full border-0 py-3 focus:ring-0 focus-visible:outline-none {$$slots.prefix ||
                    $$slots.postfix
                        ? ''
                        : 'px-4'}"
                    on:focus
                    {...$$restProps} />
                <!-- <Input
                    on:focus
                    {...$$restProps}
                    {type}
                    {name}
                    {superform}
                    class= /> -->
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
            <textarea
                use:keyboard={value}
                {...$$restProps}
                {...$constraints[name]}
                data-invalid={$errors[name]}
                bind:value
                bind:this={element}
                class="bg-transparent w-full border-0 py-3 focus:ring-0 focus-visible:outline-none {$$slots.prefix ||
                $$slots.postfix
                    ? ''
                    : 'px-4'}"
                on:focus
                {...$$restProps} />
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
