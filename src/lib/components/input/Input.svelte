<script lang="ts">
    import { keyboard, keyboardStore } from "$lib/components/keyboard-component";
    import { afterUpdate } from "svelte";
    // interface $$Props extends HTMLInputElement {}

    // Superforms
    export let superform: any;
    export let name: string;
    let element: any;
    $: value = "";

    $: ({ form, errors, constraints } = superform);

    afterUpdate(() => {
        if ($keyboardStore.input == element) {
            $form[name] = $keyboardStore.value;
        }
    });

    function typeProp(node: HTMLInputElement) {
        node.type = $$props.type;
    }
</script>

<input
    on:focus
    use:keyboard={value}
    {...$$restProps}
    {...$constraints[name]}
    class="bg-transparent w-full border-0 px-1 py-3 focus:ring-0 focus-visible:outline-none {$$props.class}"
    data-invalid={$errors[name]}
    bind:value
    bind:this={element}
    use:typeProp />

<style lang="scss">
</style>
