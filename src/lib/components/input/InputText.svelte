<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";
    import type { EnhancedForm } from "sveltekit-superforms/client";

    interface $$Props extends HTMLInputAttributes {
        name: string;
        superform: EnhancedForm<any, any>;
        label?: string;
        id: string;
    }

    interface $$Slots {
        invalid: {};
    }

    export let name: string;
    export let id: string;
    export let label: string | null = null;

    // Superforms
    export let superform: EnhancedForm<any, any>;

    $: ({ form, errors, constraints } = superform);
</script>

<p class={"form-control " + $$props.class}>
    {#if label}
        <span style:display="block">
            <label for={id}>{label}</label>
        </span>
    {/if}
    <input
        type="text"
        {name}
        {id}
        data-invalid={$errors[name]}
        class="input-text"
        bind:value={$form[name]}
        {...$constraints[name]}
        {...$$restProps} />
    {#if $errors[name]}
        <slot name="invalid" />
    {/if}
</p>

<style lang="scss">
</style>
