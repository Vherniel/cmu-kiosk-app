<script lang="ts">
    import type { ComponentType } from "svelte";
    import { type Icon, BoxSelect, Check, X } from "lucide-svelte";

    export let href: null | string = null;
    export let icon: ComponentType<Icon> = BoxSelect;
    export let disabled: boolean = false;
    export let label: string = "Lorem ipsum dolor sit amet consectetur";
</script>

<svelte:element
    this={href ? "a" : "button"}
    href={disabled ? "javascript:void(0)" : href}
    class="btn text-left whitespace-break-spaces card p-5 flex flex-col h-44 text-surface-900 !ring-2 bg-tertiary-50 ring-surface-50 dark:text-primary-100 dark:ring-surface-500 dark:bg-surface-700 {disabled
        ? 'cursor-not-allowed dark:!bg-surface-900 dark:!text-primary-50/30'
        : ''} {$$props.class}"
    on:click
    {disabled}>
    <div class="flex items-center w-full">
        <div class="mr-auto">
            <svelte:component this={icon} size="32" />
        </div>
        <div class="status-text">{!disabled ? "Available" : "Unavailable"}</div>
    </div>

    <div class="flex items-end mt-auto w-full">
        <div class="mr-auto font-extrabold">{label}</div>
        <!-- 
            Statuses:
                Acquired             -- Check
                Available            -- Triangle
                Unavailable          -- Cross and greyed
                Unavailable:Acquired -- Check and greyed
        -->
        <div class="status-icon">
            {#if disabled}
                <X size="18" />
            {:else}
                <Check size="18" />
            {/if}
        </div>
    </div>
</svelte:element>

<style lang="scss">
</style>
