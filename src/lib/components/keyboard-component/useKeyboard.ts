import { writable } from "svelte/store";

export let keyboardStore = writable<{
    show: boolean;
    input?: HTMLInputElement | HTMLTextAreaElement | null;
    value?: string | null;
}>({
    show: false,
});

export function useKeyboard(node: HTMLInputElement | HTMLTextAreaElement, value?: string) {
    if (node) {
        node.addEventListener("focus", (event) => {
            keyboardStore.set({ show: true, input: node, value });
            const page = document.querySelector("#page");
            const inputScrollOffset = node.getBoundingClientRect().top || 0;
            console.log(node.getBoundingClientRect().top - 200);

            page?.scrollTo(0, inputScrollOffset);
        });

        node.addEventListener("blur", (event) => {
            keyboardStore.set({ show: false, input: null, value });
        });
    }
}
