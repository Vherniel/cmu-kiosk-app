<script lang="ts">
    import { afterUpdate, onMount, getContext, setContext } from "svelte";

    setContext("currentStep", []);

    // TODO: hide instead of remove DOM elements

    let nodeElement: any;
    let steps: any; // original DOM nodes
    let stepView: any; // active step DOM node in current view
    let component: HTMLElement;
    let hidden: boolean = true;

    console.log(getContext("currentStep"));

    onMount(() => {
        // make activeStep non-indexed based
        stepView = steps[activeStep - 1];
        hidden = false;
    });

    function stepNodes(node: HTMLElement, activeStep: number) {
        nodeElement = node;
        steps = [...node.children];

        updateSteps(activeStep);

        function updateSteps(activeStep: number) {
            [...node.children].forEach((child) => child.remove());
            stepView = steps[activeStep - 1];
            node.appendChild(stepView);
        }

        return {
            update(activeStep: number) {
                updateSteps(activeStep);
            },
            destroy() {},
        };
    }

    function onClick(event: any) {
        console.log(nodeElement); // prints undefined when it should print the slotted child div
    }
    function onClickStep(event: any) {
        console.log(stepView); // prints undefined when it should print the slotted child div
    }

    export let activeStep = 1;
    export let element = "div";
</script>

<button on:click={onClick}>print step nodes</button>
<button on:click={onClickStep}>print step</button>

<svelte:element
    this={element}
    bind:this={component}
    use:stepNodes={activeStep}
    class="multi-step-component {hidden && 'visually-hidden'}"
    {...$$restProps}>
    <slot />
</svelte:element>
