<script lang="ts">
    import type { ComponentType } from "svelte";
    import type { Icon } from "lucide-svelte";
    import { BoxSelect } from "lucide-svelte";

    export let href: null | string = null;
    export let icon: ComponentType<Icon> = BoxSelect;
    export let disabled: boolean = false;
    export let label: string = "Lorem ipsum dolor sit amet";
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

<svelte:element this={href ? "a" : "button"} class={"card"} {href} {disabled}>
    <div>
        <div>
            <svelte:component this={icon} />
        </div>
        <div>{!disabled ? "Available" : "Unavailable"}</div>
    </div>

    <div>
        <div>{label}</div>
        <!-- <div>Indicator</div> -->
    </div>
</svelte:element>

<style lang="scss">
    .card {
        display: inline-block;
        border: solid 1px #d9d9d9;
        border-radius: 0.5rem;
        padding: 1.25rem;
        background-color: #ffffff;
        cursor: pointer;
    }
</style>
