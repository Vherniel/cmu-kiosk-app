<script context="module" lang="ts">
</script>

<script lang="ts">
    import { onMount } from "svelte";

    import type { HTMLInputAttributes } from "svelte/elements";
    import type { EnhancedForm } from "sveltekit-superforms/client";
    import type { AnyZodObject } from "zod";

    interface $$Props extends HTMLInputAttributes {
        name: string;
        superform: EnhancedForm<any, any>;
        label?: string;
        id: string;
    }

    interface $$Slots {
        invalid: {};
    }

    // export let type:  | "text" = "text";
    // export let name;
    // export let class;
    export let name: string;
    export let id: string;
    export let label: string | null = null;

    // Superforms
    export let superform: EnhancedForm<any, any>;

    /**
     * Type 'EnhancedForm<ZodObject<
     *      { Name: ZodString; Age: ZodNumber; "E-mail": ZodString; },
     *      "strip",
     *      ZodTypeAny,
     *      { Name: string; Age: number; "E-mail": string; },
     *      { Name: string; Age: number; "E-mail": string; }>, any
     * >' is not assignable to type 'EnhancedForm<AnyZodObject, any>'.
     */

    $: ({ form, errors, constraints } = superform);
</script>

<!-- <InputText label="Full name" /> -->

<p class={"form-control" + $$props.class}>
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
