<script lang="ts">
    // import MdBorderClear from "svelte-icons/md/MdBorderClear.svelte";
    import type { ComponentType } from "svelte/types/runtime/internal/dev";
    import type { Icon } from "lucide-svelte";
    import { BoxSelect } from "lucide-svelte";

    export let name = "Route name";
    export let icon: ComponentType<Icon> = BoxSelect;
    export let href = "/";
    export let selected = false;
</script>

<li class="m-0">
    <a
        {href}
        class={`btn bg-initial px-6 py-8 w-full justify-start active:variant-soft-primary ${
            selected && "variant-filled-primary font-bold"
        }`.trim()}>
        <div class="icon">
            <svelte:component this={icon} />
        </div>
        <span class="name pl-2">{name}</span>
    </a>
</li>

<style lang="scss">
</style>
