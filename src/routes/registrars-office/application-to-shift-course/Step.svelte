<script lang="ts">
    import { getContext, onMount, setContext } from "svelte";

    let step: any = [];
    setContext("currentStep", step);

    onMount(() => {
        step = [...step, stepNumber];
    });

    export let name = "Step name";
    export let stepNumber: number | null = null;
</script>

<div class="step">
    <strong>{name}</strong>
    <slot />
</div>

<style lang="scss"></style>
