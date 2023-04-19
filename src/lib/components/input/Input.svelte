<script lang="ts">
    import { keyboard } from "$lib/components/keyboard-component";
    import { afterUpdate, onMount } from "svelte";
    // interface $$Props extends HTMLInputElement {}

    // Superforms
    export let superform: any;
    export let name: string;
    $: value = "";

    $: ({ form, errors, constraints } = superform);

    afterUpdate(() => {
        // console.log("form", $form[name]);
        // console.log("value", value);
        $form[name] = value;
    });

    function typeProp(node: HTMLInputElement) {
        node.type = $$props.type;
    }
</script>

<input
    use:keyboard={value}
    {...$$restProps}
    {...$constraints[name]}
    class="bg-transparent w-full border-0 px-1 py-3 focus:ring-0 focus-visible:outline-none {$$props.class}"
    data-invalid={$errors[name]}
    bind:value
    use:typeProp />

<style lang="scss">
</style>
