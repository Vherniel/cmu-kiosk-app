<!-- <script context="module" lang="ts">
</script> -->

<script context="module" lang="ts">
    export const key = {};
</script>

<script lang="ts">
    import { setContext, onDestroy } from "svelte";
    import { get, writable } from "svelte/store";
    import clsx from "clsx";

    const steps: {}[] = [];
    const panels: {}[] = [];
    const selectedStep = writable<{} | null>(null);
    const selectedPanel = writable<{} | null>(null);

    setContext(key, {
        registerStep: (step: {}) => {
            steps.push(step);
            selectedStep.update((current) => current || step);

            onDestroy(() => {
                const i = steps.indexOf(step);
                steps.splice(i, 1);
                selectedStep.update((current) =>
                    current == step ? steps[i] || steps[steps.length - 1] : current
                );
            });
        },

        registerPanel: (panel: {}) => {
            panels.push(panel);
            selectedPanel.update((current) => current || panel);

            onDestroy(() => {
                const i = panels.indexOf(panel);
                panels.splice(i, 1);
                selectedPanel.update((current) =>
                    current == panel ? panels[i] || panels[panels.length - 1] : current
                );
            });
        },

        selectStep: (step: {}) => {
            const i = steps.indexOf(step);
            selectedStep.set(step);
            selectedPanel.set(panels[i]);
        },

        nextStep: ({ loop } = { loop: false }) => {
            const current = steps.indexOf(get(selectedStep) || 0) + 1;
            const end = steps.length - 1;
            const lastStep = loop ? steps[0] : steps[end];
            const lastPanel = loop ? panels[0] : panels[end];

            selectedStep.set(steps[current] || lastStep);
            selectedPanel.set(panels[current] || lastPanel);
        },

        previousStep: ({ loop } = { loop: false }) => {
            const current = steps.indexOf(get(selectedStep) || 0) - 1;
            const end = steps.length - 1;
            const lastStep = loop ? steps[end] : steps[0];
            const lastPanel = loop ? panels[end] : panels[0];

            selectedStep.set(steps[current] || lastStep);
            selectedPanel.set(panels[current] || lastPanel);
        },

        selectedStep,
        selectedPanel,
    });
</script>

<div class={clsx("multi-step", $$props.class)}>
    <slot />
</div>

<style lang="scss">
</style>
