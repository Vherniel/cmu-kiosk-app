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

<li class="item" class:selected>
    <a {href} class="link">
        <div class="icon">
            <svelte:component this={icon} />
        </div>
        <div class="name">{name}</div>
    </a>
</li>

<style lang="scss">
    .item {
        margin: 0;
    }
    .link {
        display: flex;
        align-items: center;
        border-radius: 0.75rem;
        padding-top: 2rem;
        padding-bottom: 2rem;
        padding-left: 1.75rem;
        padding-right: 1.75rem;
        text-decoration: none;
        color: black;
    }
    .icon {
        width: 1.5rem;
        height: 1.5rem;
    }
    .name {
        font-weight: var(--font-bold);
        margin-left: 1rem;
    }

    .selected {
        .link {
            background-color: #ebebeb;
        }
    }
</style>
