<!-- <script context="module" lang="ts">
</script> -->

<script context="module" lang="ts">
    export const key = {};
</script>

<script lang="ts">
    import { page } from "$app/stores";
    import { setContext, afterUpdate, onDestroy } from "svelte";
    import { get, writable } from "svelte/store";
    import { boolean } from "zod";

    const steps: {}[] = [];
    const panels: {}[] = [];
    const selectedStep = writable<{
        name: string;
        previous: boolean;
        next: boolean;
    } | null>(null);
    const selectedPanel = writable<{} | null>(null);

    setContext(key, {
        registerStep: (step: {}) => {
            steps.push(step);
            // @ts-ignore
            selectedStep.update((current) => current || step);

            onDestroy(() => {
                const i = steps.indexOf(step);
                steps.splice(i, 1);
                selectedStep.update((current) =>
                    // @ts-ignore
                    current == step ? steps[i] || steps[steps.length - 1] : current
                );
            });
        },

        registerPanel: (panel: {}) => {
            panels.push(panel);
            selectedPanel.update((current) => current || panel);

            afterUpdate(() => {
                const currentStep = $page.url.searchParams.get("step");
                const index = steps.findIndex((step: any) => step.name == currentStep);
                // @ts-ignore
                selectedStep.set(steps[index == -1 ? 0 : index]);
                selectedPanel.set(panels[index == -1 ? 0 : index]);
            });

            onDestroy(() => {
                const i = panels.indexOf(panel);
                panels.splice(i, 1);
                selectedPanel.update((current) =>
                    current == panel ? panels[i] || panels[panels.length - 1] : current
                );
            });
        },

        selectStep: (stepToSelect: any) => {
            $page.url.searchParams.set("step", stepToSelect.name);
            const index = steps.findIndex((step: any) => step.name == stepToSelect.name);
            // @ts-ignore
            selectedStep.set(steps[index == -1 ? 0 : index]);
            selectedPanel.set(panels[index == -1 ? 0 : index]);
            document.querySelector("#page")?.scrollTo(0, 0);
        },

        nextStep: ({ loop } = { loop: false }) => {
            if ($selectedStep) {
                const current = steps.indexOf(get(selectedStep) || 0) + 1;
                const end = steps.length - 1;
                const lastStep = loop ? steps[0] : steps[end];
                const lastPanel = loop ? panels[0] : panels[end];
                // @ts-ignore
                selectedStep.set(steps[current] || lastStep);
                selectedPanel.set(panels[current] || lastPanel);
                $page.url.searchParams.set("step", $selectedStep.name);
                document.querySelector("#page")?.scrollTo(0, 0);
            }
        },

        previousStep: ({ loop } = { loop: false }) => {
            if ($selectedStep) {
                const current = steps.indexOf(get(selectedStep) || 0) - 1;
                const end = steps.length - 1;
                const lastStep = loop ? steps[end] : steps[0];
                const lastPanel = loop ? panels[end] : panels[0];
                // @ts-ignore
                selectedStep.set(steps[current] || lastStep);
                selectedPanel.set(panels[current] || lastPanel);
                $page.url.searchParams.set("step", $selectedStep.name);
                document.querySelector("#page")?.scrollTo(0, 0);
            }
        },

        selectedStep,
        selectedPanel,
        steps,
        panels,
    });
</script>

<div class={"multi-step"}>
    <slot />
</div>

<style lang="scss">
</style>
