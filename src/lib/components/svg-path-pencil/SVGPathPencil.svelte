<script lang="ts">
    import { modeCurrent } from "@skeletonlabs/skeleton";
    // TODO: https://www.npmjs.com/package/svgo
    // basically this SO answer in svelte: https://stackoverflow.com/a/40700068/492969
    // TODO: improve path binding for easier passing data to parent

    import { RotateCcw } from "lucide-svelte";
    import { onMount } from "svelte";

    type SVGPointerEvent = PointerEvent & {
        currentTarget: EventTarget & SVGSVGElement;
    };

    let curPath: { strPath?: string; color?: "black" } = {};
    let paths: (typeof curPath)[] = [];
    export let dataPaths: string;
    // collection = [];
    let strokeWidth = 4;
    let bufferSize = 6;
    let active = false;
    let svg: SVGElement, rect: DOMRect;
    let bufferLine: { x: number; y: number }[] = []; // Contains the last positions of the mouse cursor

    onMount(resize);

    const up = () => {
        active = false;
        paths = paths.concat(curPath);
        dataPaths = JSON.stringify(paths);
    };

    const move = (event: SVGPointerEvent) => {
        if (active) {
            appendToBuffer(getMousePosition(event));
            updateSvgPath();
        }
    };

    const down = (event: SVGPointerEvent) => {
        active = true;
        curPath = {};
        bufferLine = [];
        const pt = getMousePosition(event);
        appendToBuffer(pt);
        curPath.strPath = "M" + pt.x + " " + pt.y;
        curPath.color = "black";
    };
    function resize() {
        rect = svg.getBoundingClientRect();
    }
    const getMousePosition = (event: SVGPointerEvent) => ({
        x: event.pageX - rect.left,
        y: event.pageY - rect.top,
    });

    const appendToBuffer = (pt: { x: number; y: number }) => {
        bufferLine.push(pt);
        while (bufferLine.length > bufferSize) {
            bufferLine.shift();
        }
    };

    // Calculate the average point, starting at offset in the buffer
    const getAveragePoint = (offset: number) => {
        const len = bufferLine.length;
        if (len % 2 === 1 || len >= bufferSize) {
            let totalX = 0;
            let totalY = 0;
            let pt, i;
            let count = 0;
            for (i = offset; i < len; i++) {
                count++;
                pt = bufferLine[i];
                totalX += pt.x;
                totalY += pt.y;
            }
            return {
                x: totalX / count,
                y: totalY / count,
            };
        }
        return null;
    };

    const updateSvgPath = () => {
        let pt = getAveragePoint(0);

        if (pt) {
            // Get the smoothed part of the path that will not change
            curPath.strPath += " L" + pt.x + " " + pt.y;

            // Get the last part of the path (close to the current mouse position)
            // This part will change if the mouse moves again
            let tmpPath = "";
            for (let offset = 2; offset < bufferLine.length; offset += 2) {
                pt = getAveragePoint(offset);
                tmpPath += " L" + pt?.x + " " + pt?.y;
            }
            // Set the complete current path coordinates
            curPath.strPath + tmpPath;
        }
    };
</script>

<svelte:window on:resize={resize} />

<div
    class="relative border-2 border-surface-300 dark:border-surface-400 border-dashed w-full h-[320px] rounded-lg">
    <button
        class="btn absolute right-0 mt-1 mr-1 p-2"
        on:click|preventDefault={() => {
            curPath = {};
            paths = [];
        }}><RotateCcw /></button>
    <svg
        bind:this={svg}
        class="w-full h-full"
        on:pointerdown={down}
        on:pointermove={move}
        on:pointerup={up}>
        {#each paths as p}
            <path
                stroke-width={strokeWidth}
                d={p.strPath}
                stroke={$modeCurrent ? "black" : "white"}
                fill="transparent" />
        {/each}
        <path
            stroke-width={strokeWidth}
            d={curPath.strPath}
            stroke={$modeCurrent ? "black" : "white"}
            fill="transparent" />
    </svg>
</div>

<style lang="scss">
</style>
