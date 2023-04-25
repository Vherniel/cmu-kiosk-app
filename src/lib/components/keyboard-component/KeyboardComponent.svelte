<script lang="ts">
    import Keyboard from "svelte-keyboard";
    import standard from "svelte-keyboard/layouts/qwerty/standard";
    import { keyboardStore } from "./useKeyboard";

    // $: element = $keyboardStore.input;
    // $: value = "";

    let selectionStart: number | null = 0;
    let selectionEnd: number | null = 0;

    async function eraseInCursorPosition() {
        if ($keyboardStore.input) {
            ({ selectionStart } = $keyboardStore.input);
            if (typeof selectionStart == "number") {
                const newValue =
                    $keyboardStore.input.value.slice(0, selectionStart - 1) +
                    $keyboardStore.input.value.slice(selectionStart);
                $keyboardStore.input.value = newValue;
            }
        }
    }

    async function eraseSelected() {
        if ($keyboardStore.input) {
            ({ selectionStart, selectionEnd } = $keyboardStore.input);
            if (typeof selectionStart == "number" && typeof selectionEnd == "number") {
                const newValue =
                    $keyboardStore.input.value.slice(0, selectionStart) +
                    $keyboardStore.input.value.slice(selectionEnd);
                $keyboardStore.input.value = newValue;
            }
        }
    }
</script>

<!-- <input
    type="text"
    class="font-extrabold dark:text-surface-500"
    bind:this={element}
    bind:value
    use:keyboard /> -->

<Keyboard
    --height="4rem"
    custom={standard}
    on:keydown={async (event) => {
        if ($keyboardStore.input) {
            if (event.detail == "Backspace") {
                if ($keyboardStore.input.selectionStart != $keyboardStore.input.selectionEnd) {
                    console.log("eraseSelection");
                    await eraseSelected();
                    return $keyboardStore.input?.setSelectionRange(
                        selectionStart,
                        selectionStart
                    );
                }

                if ($keyboardStore.input.selectionStart || 0 > 0) {
                    console.log("eraseInCursorPosition");
                    await eraseInCursorPosition();
                    if (selectionStart == $keyboardStore.input.value.length) {
                        return $keyboardStore.input?.setSelectionRange(
                            selectionStart,
                            selectionStart
                        );
                    }
                    if (selectionStart) {
                        return $keyboardStore.input?.setSelectionRange(
                            selectionStart - 1,
                            selectionStart - 1
                        );
                    }
                }

                return;
            }

            if (event.detail == "Space") {
                return ($keyboardStore.input.value += " ");
            }

            $keyboardStore.input.value += event.detail;
        }
    }} />

<style lang="scss">
</style>
