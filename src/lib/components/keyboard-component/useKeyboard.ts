import { tick } from "svelte";
import { writable } from "svelte/store";
import { get } from "svelte/store";

export let keyboardStore = writable<{
    show: boolean;
    input?: HTMLInputElement | HTMLTextAreaElement | null;
    value?: string | null;
}>({
    show: false,
});

export function useKeyboard(node: HTMLInputElement | HTMLTextAreaElement, value?: string) {
    if (node) {
        node.addEventListener("focus", async (event) => {
            await tick();
            // @ts-ignore
            keyboardStore.set({ show: true, input: event.target, value: event.target.value });
        });

        node.addEventListener("blur", async (event) => {
            await tick();
            // @ts-ignore
            keyboardStore.set({ show: false, input: event.target, value: event.target.value });
        });

        return {
            async update(newValue: any) {
                await tick();
                value = newValue;
            },
        };
    }
}
