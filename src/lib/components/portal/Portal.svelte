<script context="module" lang="ts">
    import { tick } from "svelte";

    export function portal(node: HTMLElement, target: HTMLElement | string = "body") {
        let targetEl;
        async function update(newTarget: any) {
            target = newTarget;
            if (typeof target == "string") {
                targetEl = document.querySelector(target);
                if (targetEl == null) {
                    await tick();
                    targetEl = document.querySelector(target);
                }
                if (targetEl == null) {
                    throw new Error(`No element found matching CSS selector: "${target}"`);
                }
            } else if (target instanceof HTMLElement) {
                targetEl = target;
            } else {
                throw new TypeError(
                    `Unknown portal target type: ${
                        target === null ? "null" : typeof target
                    }. Allowed types: string (CSS selector) or HTMLElement.`
                );
            }
            targetEl.appendChild(node);
            node.hidden = false;
            console.log(newTarget);
        }
        function destroy() {
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        }
        update(target);
        return {
            update,
            destroy,
        };
    }
</script>

<script lang="ts">
    export let target: HTMLElement | string = document.body;
</script>

<div use:portal={target} hidden>
    <slot />
</div>
