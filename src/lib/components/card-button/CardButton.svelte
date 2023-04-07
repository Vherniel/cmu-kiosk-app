<script lang="ts">
    import type { ComponentType } from "svelte";
    import { type Icon, BoxSelect, Check } from "lucide-svelte";

    export let href: null | string = null;
    export let icon: ComponentType<Icon> = BoxSelect;
    export let disabled: boolean = false;
    export let label: string = "Lorem ipsum dolor sit amet consectetur";
</script>

<!-- default -->
<!-- svelte-ignore missing-declaration -->
<!-- <CardButton
    href={"/"}
    icon={IconComponent}
    disabled={false}
    label={""}
/>

<svelte:element></svelte:element> -->

<svelte:element
    this={href ? "a" : "button"}
    class={"card"}
    href={disabled ? "javascript:void(0)" : href}
    on:click|preventDefault
    {disabled}>
    <div class="header">
        <div>
            <svelte:component this={icon} size="32" />
        </div>
        <div class="status-text">{!disabled ? "Available" : "Unavailable"}</div>
    </div>

    <div class="footer">
        <div class="label">{label}</div>
        <!-- 
            Statuses:
                Acquired             -- Check
                Available            -- Triangle
                Unavailable          -- Cross and greyed
                Unavailable:Acquired -- Check and greyed
        -->
        <div class="status-icon"><Check color="#fff" size="18" /></div>
    </div>
</svelte:element>

<style lang="scss">
    .card {
        display: flex;
        flex-direction: column;
        background-color: #ffffff;
        border: solid 1px #d9d9d9;
        border-radius: 0.5rem;
        padding: 1.25rem;
        color: #000;
        text-decoration: none;
        cursor: pointer;
        height: 12rem;
        width: 100%;
    }
    .header {
        display: flex;
        align-items: center;
        .status-text {
            margin-left: auto;
        }
    }
    .footer {
        // padding-top: 4rem;
        display: flex;
        align-items: center;
        margin-top: auto;
        .label {
            margin-right: 2rem;
            font-size: 1.25rem;
            font-weight: var(--font-bold);
        }
        .status-icon {
            margin-left: auto;
            border-radius: 999px;
            align-self: flex-end;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #000;
            min-width: 1.5rem;
            min-height: 1.5rem;
            max-width: 1.5rem;
            max-height: 1.5rem;
            width: 1.5rem;
            height: 1.5rem;
        }
    }
</style>
