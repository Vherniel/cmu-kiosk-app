<script context="module" lang="ts">
    import { LightSwitch } from "@skeletonlabs/skeleton";
    import {
        setInitialClassState,
        setModeCurrent,
        setModeUserPrefers,
    } from "@skeletonlabs/skeleton";

    setModeUserPrefers(false);
</script>

<script lang="ts">
    import { modeCurrent } from "@skeletonlabs/skeleton";
</script>

<svelte:head>{@html `<script>(${setInitialClassState.toString()})();</script>`}</svelte:head>

<button
    class="flex items-center"
    on:keyup={(event) => {
        if (event.key == " " || event.key == "Enter") setModeCurrent(!$modeCurrent);
    }}>
    <div>
        <LightSwitch ring="ring-[1px] ring-surface-300" />
    </div>
    <div on:mouseup={(event) => setModeCurrent(!$modeCurrent)}>
        <p class="ml-3 font-bold">
            {$modeCurrent ? "Light mode" : "Dark mode"}
        </p>
    </div>
</button>
