<script lang="ts">
    import Callout from "$lib/components/callout/Callout.svelte";
    import { AlertTriangle } from "lucide-svelte";
    import { onMount, afterUpdate } from "svelte";
    import type { PageData } from "./$types";

    export let data: PageData;

    const dataMap = [["students-lounge", "Student’s Lounge"]];

    let roomEvents: any[] = data.roomEvents;
    let selectedRoom: null | undefined | string;

    async function showSchedule() {
        console.log("click");
    }

    function clickOutside(node) {
        const handleClick = (event) => {
            if (!node.contains(event.target)) {
                node.dispatchEvent(new CustomEvent("outclick"));
            }
        };

        document.addEventListener("click", handleClick, true);

        return {
            destroy() {
                document.removeEventListener("click", handleClick, true);
            },
        };
    }
</script>

<section class="h-full">
    <div class="flex h-full">
        <div class="flex-1">
            <div class="container">
                <h1>Wayfinder</h1>
                <Callout>
                    <AlertTriangle slot="icon" />
                    <h3 slot="title">Attention: An important notice</h3>
                    <div slot="content">
                        <p>
                            The following blueprints in this sections is <em>non-standard.</em>
                            Actual blueprints should be acquired from the university for more accurate
                            representation of the building. The researchers requested the floorplan
                            blueprints but it is
                            <em>currently unavailable due to legal concerns.</em>
                        </p>
                        <p>
                            The floorplan below is just an example and a rough estimation of the
                            faculty building with mock data.
                        </p>
                    </div>
                </Callout>
                <div>
                    <svg
                        use:clickOutside
                        on:outclick={() => {
                            document
                                .querySelectorAll(
                                    `#${selectedRoom}, [id="${selectedRoom}-text"], [id="${selectedRoom}-label"] > rect[fill]`
                                )
                                .forEach((node) => {
                                    if (node.attributes.fill.value == "white")
                                        node.setAttribute("fill", "black");
                                    if (node.attributes.fill.value == "#124DBA")
                                        node.setAttribute("fill", "white");
                                });
                            selectedRoom = null;
                        }}
                        viewBox="0 0 1413 584"
                        width="auto"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g id="Wayfinder">
                            <g id="Blueprint">
                                <g id="Rooms">
                                    <rect
                                        on:click={async (event) => {
                                            if (event.currentTarget || event.target) {
                                                selectedRoom = event.currentTarget.id;
                                                [roomEvents] = roomEvents.filter(
                                                    ({ name }) => name == selectedRoom
                                                );

                                                if (selectedRoom == event.currentTarget.id) {
                                                    event.currentTarget?.setAttribute(
                                                        "fill",
                                                        "#dddddd"
                                                    );
                                                    document
                                                        .querySelectorAll(
                                                            `[id="${selectedRoom}-text"], [id="${selectedRoom}-label"] > rect[fill]`
                                                        )
                                                        .forEach((node) => {
                                                            if (
                                                                node.attributes.fill.value ==
                                                                "white"
                                                            )
                                                                node.setAttribute(
                                                                    "fill",
                                                                    "#124DBA"
                                                                );
                                                            if (
                                                                node.attributes.fill.value ==
                                                                "black"
                                                            )
                                                                node.setAttribute(
                                                                    "fill",
                                                                    "white"
                                                                );
                                                        });
                                                }
                                            }
                                        }}
                                        on:keyup={(event) => {
                                            event.currentTarget;
                                        }}
                                        id="students-lounge"
                                        x="6"
                                        y="191"
                                        width="1401"
                                        height="227"
                                        fill="white"
                                        stroke="black"
                                        stroke-width="12" />
                                    <rect
                                        id="conference-room"
                                        x="6"
                                        y="6"
                                        width="279"
                                        height="185"
                                        fill="white"
                                        stroke="black"
                                        stroke-width="12" />
                                    <rect
                                        id="conference-room-2"
                                        x="285"
                                        y="6"
                                        width="281"
                                        height="185"
                                        fill="white"
                                        stroke="black"
                                        stroke-width="12" />
                                    <g id="deans-table">
                                        <path d="M1126 6H1407V191H1126V6Z" fill="white" />
                                        <path
                                            d="M1126 6V0H1120V6H1126ZM1407 6H1413V0H1407V6ZM1407 191V197H1413V191H1407ZM1126 191H1120V197H1126V191ZM1126 12H1407V0H1126V12ZM1401 6V191H1413V6H1401ZM1407 185H1126V197H1407V185ZM1132 191V6H1120V191H1132Z"
                                            fill="black" />
                                    </g>
                                    <g id="admin">
                                        <path d="M846 6H1126V191H846V6Z" fill="white" />
                                        <path
                                            d="M846 6V0H840V6H846ZM1126 6H1132V0H1126V6ZM1126 191V197H1132V191H1126ZM846 191H840V197H846V191ZM846 12H1126V0H846V12ZM1120 6V191H1132V6H1120ZM1126 185H846V197H1126V185ZM852 191V6H840V191H852Z"
                                            fill="black" />
                                    </g>
                                    <rect
                                        id="university-presidents-office"
                                        x="566"
                                        y="6"
                                        width="280"
                                        height="185"
                                        fill="white"
                                        stroke="black"
                                        stroke-width="12" />
                                    <rect
                                        id="stairs-1"
                                        x="6"
                                        y="417"
                                        width="140"
                                        height="92"
                                        fill="white"
                                        stroke="black"
                                        stroke-width="12" />
                                    <rect
                                        id="hallway"
                                        x="146"
                                        y="417"
                                        width="1120"
                                        height="92"
                                        fill="white"
                                        stroke="black"
                                        stroke-width="12" />
                                    <rect
                                        id="stairs-2"
                                        x="1266"
                                        y="417"
                                        width="141"
                                        height="92"
                                        fill="white"
                                        stroke="black"
                                        stroke-width="12" />
                                    <rect
                                        id="balcony"
                                        x="426"
                                        y="509"
                                        width="560"
                                        height="69"
                                        fill="white"
                                        stroke="black"
                                        stroke-width="12" />
                                </g>
                                <g id="doors">
                                    <g id="door-2">
                                        <g id="Rectangle 292">
                                            <mask id="path-14-inside-1_422_6" fill="white">
                                                <path d="M1132 411H1170V423H1132V411Z" />
                                            </mask>
                                            <path
                                                d="M1132 411H1170V423H1132V411Z"
                                                fill="white" />
                                            <path
                                                d="M1132 412H1170V410H1132V412ZM1170 422H1132V424H1170V422Z"
                                                fill="black"
                                                mask="url(#path-14-inside-1_422_6)" />
                                        </g>
                                        <line
                                            id="Line 73"
                                            x1="1132"
                                            y1="417"
                                            x2="1170"
                                            y2="417"
                                            stroke="black" />
                                    </g>
                                    <g id="door-1">
                                        <g id="Rectangle 292_2">
                                            <mask id="path-17-inside-2_422_6" fill="white">
                                                <path d="M292 411H330V423H292V411Z" />
                                            </mask>
                                            <path d="M292 411H330V423H292V411Z" fill="white" />
                                            <path
                                                d="M292 412H330V410H292V412ZM330 422H292V424H330V422Z"
                                                fill="black"
                                                mask="url(#path-17-inside-2_422_6)" />
                                        </g>
                                        <line
                                            id="Line 73_2"
                                            x1="292"
                                            y1="417"
                                            x2="330"
                                            y2="417"
                                            stroke="black" />
                                    </g>
                                    <g id="door-3">
                                        <g id="Rectangle 292_3">
                                            <mask id="path-20-inside-3_422_6" fill="white">
                                                <path d="M764 185H802V197H764V185Z" />
                                            </mask>
                                            <path d="M764 185H802V197H764V185Z" fill="white" />
                                            <path
                                                d="M764 186H802V184H764V186ZM802 196H764V198H802V196Z"
                                                fill="black"
                                                mask="url(#path-20-inside-3_422_6)" />
                                        </g>
                                        <line
                                            id="Line 73_3"
                                            x1="764"
                                            y1="191"
                                            x2="802"
                                            y2="191"
                                            stroke="black" />
                                    </g>
                                    <g id="door-5">
                                        <g id="Rectangle 292_4">
                                            <mask id="path-23-inside-4_422_6" fill="white">
                                                <path d="M42 185H115V197H42V185Z" />
                                            </mask>
                                            <path d="M42 185H115V197H42V185Z" fill="white" />
                                            <path
                                                d="M42 186H115V184H42V186ZM115 196H42V198H115V196Z"
                                                fill="black"
                                                mask="url(#path-23-inside-4_422_6)" />
                                        </g>
                                        <line
                                            id="Line 73_4"
                                            x1="42"
                                            y1="191"
                                            x2="115"
                                            y2="191"
                                            stroke="black" />
                                    </g>
                                    <g id="door-4">
                                        <g id="Rectangle 292_5">
                                            <mask id="path-26-inside-5_422_6" fill="white">
                                                <path d="M177 185H251V197H177V185Z" />
                                            </mask>
                                            <path d="M177 185H251V197H177V185Z" fill="white" />
                                            <path
                                                d="M177 186H251V184H177V186ZM251 196H177V198H251V196Z"
                                                fill="black"
                                                mask="url(#path-26-inside-5_422_6)" />
                                        </g>
                                        <line
                                            id="Line 73_5"
                                            x1="177"
                                            y1="191"
                                            x2="251"
                                            y2="191"
                                            stroke="black" />
                                    </g>
                                </g>
                                <g id="Lines">
                                    <g id="Line">
                                        <rect
                                            id="Rectangle 291"
                                            x="140"
                                            y="12"
                                            width="12"
                                            height="173"
                                            fill="white" />
                                        <g id="Rectangle 281">
                                            <mask id="path-30-inside-6_422_6" fill="white">
                                                <path d="M145 12H147V185H145V12Z" />
                                            </mask>
                                            <path
                                                d="M148 185V179.233H146V185H148ZM148 156.167V144.633H146V156.167H148ZM148 121.567V110.033H146V121.567H148ZM148 86.9667V75.4333H146V86.9667H148ZM148 52.3667V40.8333H146V52.3667H148ZM148 17.7667V12H146V17.7667H148ZM149 185V179.233H145V185H149ZM149 156.167V144.633H145V156.167H149ZM149 121.567V110.033H145V121.567H149ZM149 86.9667V75.4333H145V86.9667H149ZM149 52.3667V40.8333H145V52.3667H149ZM149 17.7667V12H145V17.7667H149Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-30-inside-6_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_2">
                                        <rect
                                            id="Rectangle 291_2"
                                            x="140"
                                            y="197"
                                            width="12"
                                            height="214"
                                            fill="white" />
                                        <g id="Rectangle 281_2">
                                            <mask id="path-33-inside-7_422_6" fill="white">
                                                <path d="M145 197H147V411H145V197Z" />
                                            </mask>
                                            <path
                                                d="M148 411V405.056H146V411H148ZM148 381.278V369.389H146V381.278H148ZM148 345.611V333.722H146V345.611H148ZM148 309.944V298.056H146V309.944H148ZM148 274.278V262.389H146V274.278H148ZM148 238.611V226.722H146V238.611H148ZM148 202.944V197H146V202.944H148ZM149 411V405.056H145V411H149ZM149 381.278V369.389H145V381.278H149ZM149 345.611V333.722H145V345.611H149ZM149 309.944V298.056H145V309.944H149ZM149 274.278V262.389H145V274.278H149ZM149 238.611V226.722H145V238.611H149ZM149 202.944V197H145V202.944H149Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-33-inside-7_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_3">
                                        <rect
                                            id="Rectangle 291_3"
                                            x="280"
                                            y="197"
                                            width="12"
                                            height="214"
                                            fill="white" />
                                        <g id="Rectangle 281_3">
                                            <mask id="path-36-inside-8_422_6" fill="white">
                                                <path d="M285 197H287V411H285V197Z" />
                                            </mask>
                                            <path
                                                d="M288 411V405.056H286V411H288ZM288 381.278V369.389H286V381.278H288ZM288 345.611V333.722H286V345.611H288ZM288 309.944V298.056H286V309.944H288ZM288 274.278V262.389H286V274.278H288ZM288 238.611V226.722H286V238.611H288ZM288 202.944V197H286V202.944H288ZM289 411V405.056H285V411H289ZM289 381.278V369.389H285V381.278H289ZM289 345.611V333.722H285V345.611H289ZM289 309.944V298.056H285V309.944H289ZM289 274.278V262.389H285V274.278H289ZM289 238.611V226.722H285V238.611H289ZM289 202.944V197H285V202.944H289Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-36-inside-8_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_4">
                                        <rect
                                            id="Rectangle 291_4"
                                            x="420"
                                            y="197"
                                            width="12"
                                            height="214"
                                            fill="white" />
                                        <g id="Rectangle 281_4">
                                            <mask id="path-39-inside-9_422_6" fill="white">
                                                <path d="M425 197H427V411H425V197Z" />
                                            </mask>
                                            <path
                                                d="M428 411V405.056H426V411H428ZM428 381.278V369.389H426V381.278H428ZM428 345.611V333.722H426V345.611H428ZM428 309.944V298.056H426V309.944H428ZM428 274.278V262.389H426V274.278H428ZM428 238.611V226.722H426V238.611H428ZM428 202.944V197H426V202.944H428ZM429 411V405.056H425V411H429ZM429 381.278V369.389H425V381.278H429ZM429 345.611V333.722H425V345.611H429ZM429 309.944V298.056H425V309.944H429ZM429 274.278V262.389H425V274.278H429ZM429 238.611V226.722H425V238.611H429ZM429 202.944V197H425V202.944H429Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-39-inside-9_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_5">
                                        <rect
                                            id="Rectangle 291_5"
                                            x="560"
                                            y="198"
                                            width="12"
                                            height="213"
                                            fill="white" />
                                        <g id="Rectangle 281_5">
                                            <mask id="path-42-inside-10_422_6" fill="white">
                                                <path d="M565 198H567V411H565V198Z" />
                                            </mask>
                                            <path
                                                d="M568 411V405.083H566V411H568ZM568 381.417V369.583H566V381.417H568ZM568 345.917V334.083H566V345.917H568ZM568 310.417V298.583H566V310.417H568ZM568 274.917V263.083H566V274.917H568ZM568 239.417V227.583H566V239.417H568ZM568 203.917V198H566V203.917H568ZM569 411V405.083H565V411H569ZM569 381.417V369.583H565V381.417H569ZM569 345.917V334.083H565V345.917H569ZM569 310.417V298.583H565V310.417H569ZM569 274.917V263.083H565V274.917H569ZM569 239.417V227.583H565V239.417H569ZM569 203.917V198H565V203.917H569Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-42-inside-10_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_6">
                                        <rect
                                            id="Rectangle 291_6"
                                            x="397"
                                            y="197"
                                            width="12"
                                            height="163"
                                            transform="rotate(-90 397 197)"
                                            fill="white" />
                                        <g id="Rectangle 281_6">
                                            <mask id="path-45-inside-11_422_6" fill="white">
                                                <path d="M397 192V190L560 190V192L397 192Z" />
                                            </mask>
                                            <path
                                                d="M560 189H554.567V191H560V189ZM532.833 189H521.967V191H532.833V189ZM500.233 189H489.367V191L500.233 191V189ZM467.633 189H456.767V191H467.633V189ZM435.033 189H424.167V191H435.033V189ZM402.433 189H397V191H402.433V189ZM560 188H554.567V192H560V188ZM532.833 188H521.967V192H532.833V188ZM500.233 188H489.367V192L500.233 192V188ZM467.633 188H456.767V192H467.633V188ZM435.033 188H424.167V192H435.033V188ZM402.433 188H397V192H402.433V188Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-45-inside-11_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_7">
                                        <rect
                                            id="Rectangle 291_7"
                                            x="939"
                                            y="197"
                                            width="12"
                                            height="181"
                                            transform="rotate(-90 939 197)"
                                            fill="white" />
                                        <g id="Rectangle 281_7">
                                            <mask id="path-48-inside-12_422_6" fill="white">
                                                <path d="M939 192V190L1120 190V192L939 192Z" />
                                            </mask>
                                            <path
                                                d="M1120 189H1113.97V191H1120V189ZM1089.83 189H1077.77V191H1089.83V189ZM1053.63 189L1041.57 189V191L1053.63 191V189ZM1017.43 189H1005.37V191H1017.43V189ZM981.233 189H969.167V191H981.233V189ZM945.033 189H939V191H945.033V189ZM1120 188H1113.97V192H1120V188ZM1089.83 188H1077.77V192H1089.83V188ZM1053.63 188L1041.57 188V192H1053.63V188ZM1017.43 188H1005.37V192H1017.43V188ZM981.233 188H969.167V192H981.233V188ZM945.033 188H939V192H945.033V188Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-48-inside-12_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_8">
                                        <rect
                                            id="Rectangle 291_8"
                                            x="1260"
                                            y="197"
                                            width="12"
                                            height="141"
                                            transform="rotate(-90 1260 197)"
                                            fill="white" />
                                        <g id="Rectangle 281_8">
                                            <mask id="path-51-inside-13_422_6" fill="white">
                                                <path
                                                    d="M1260 192V190L1401 190V192L1260 192Z" />
                                            </mask>
                                            <path
                                                d="M1401 189H1395.12V191H1401V189ZM1371.62 189L1359.88 189V191L1371.62 191V189ZM1336.38 189H1324.62V191H1336.38V189ZM1301.13 189H1289.37V191H1301.13V189ZM1265.88 189H1260V191H1265.88V189ZM1401 188H1395.12V192H1401V188ZM1371.62 188L1359.88 188V192L1371.62 192V188ZM1336.38 188H1324.62V192H1336.38V188ZM1301.13 188H1289.37V192H1301.13V188ZM1265.88 188H1260V192H1265.88V188Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-51-inside-13_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_9">
                                        <rect
                                            id="Rectangle 291_9"
                                            x="420"
                                            y="12"
                                            width="12"
                                            height="173"
                                            fill="white" />
                                        <g id="Rectangle 281_9">
                                            <mask id="path-54-inside-14_422_6" fill="white">
                                                <path d="M425 12H427V185H425V12Z" />
                                            </mask>
                                            <path
                                                d="M428 185V179.233H426V185H428ZM428 156.167V144.633H426V156.167H428ZM428 121.567V110.033H426V121.567H428ZM428 86.9667V75.4333H426V86.9667H428ZM428 52.3667V40.8333H426V52.3667H428ZM428 17.7667V12H426V17.7667H428ZM429 185V179.233H425V185H429ZM429 156.167V144.633H425V156.167H429ZM429 121.567V110.033H425V121.567H429ZM429 86.9667V75.4333H425V86.9667H429ZM429 52.3667V40.8333H425V52.3667H429ZM429 17.7667V12H425V17.7667H429Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-54-inside-14_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_10">
                                        <rect
                                            id="Rectangle 291_10"
                                            x="1260"
                                            y="12"
                                            width="12"
                                            height="399"
                                            fill="white" />
                                        <g id="Rectangle 281_10">
                                            <mask id="path-57-inside-15_422_6" fill="white">
                                                <path d="M1265 12H1267V411H1265V12Z" />
                                            </mask>
                                            <path
                                                d="M1268 411V404.955H1266V411H1268ZM1268 380.773V368.682H1266V380.773H1268ZM1268 344.5V332.409H1266V344.5H1268ZM1268 308.227V296.136H1266V308.227H1268ZM1268 271.955V259.864H1266V271.955H1268ZM1268 235.682V223.591H1266V235.682H1268ZM1268 199.409V187.318H1266V199.409H1268ZM1268 163.136V151.045H1266V163.136H1268ZM1268 126.864V114.773H1266V126.864H1268ZM1268 90.5909V78.5H1266V90.5909H1268ZM1268 54.3181V42.2272H1266V54.3181H1268ZM1268 18.0454V12H1266V18.0454H1268ZM1269 411V404.955H1265V411H1269ZM1269 380.773V368.682H1265V380.773H1269ZM1269 344.5V332.409H1265V344.5H1269ZM1269 308.227V296.136H1265V308.227H1269ZM1269 271.955V259.864H1265V271.955H1269ZM1269 235.682V223.591H1265V235.682H1269ZM1269 199.409V187.318H1265V199.409H1269ZM1269 163.136V151.045H1265V163.136H1269ZM1269 126.864V114.773H1265V126.864H1269ZM1269 90.5909V78.5H1265V90.5909H1269ZM1269 54.3181V42.2272H1265V54.3181H1269ZM1269 18.0454V12H1265V18.0454H1269Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-57-inside-15_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_11">
                                        <rect
                                            id="Rectangle 291_11"
                                            x="1120"
                                            y="197"
                                            width="12"
                                            height="214"
                                            fill="white" />
                                        <g id="Rectangle 281_11">
                                            <mask id="path-60-inside-16_422_6" fill="white">
                                                <path d="M1125 197H1127V411H1125V197Z" />
                                            </mask>
                                            <path
                                                d="M1128 411V405.056H1126V411H1128ZM1128 381.278V369.389H1126V381.278H1128ZM1128 345.611V333.722H1126V345.611H1128ZM1128 309.944V298.056H1126V309.944H1128ZM1128 274.278V262.389H1126V274.278H1128ZM1128 238.611V226.722H1126V238.611H1128ZM1128 202.944V197H1126V202.944H1128ZM1129 411V405.056H1125V411H1129ZM1129 381.278V369.389H1125V381.278H1129ZM1129 345.611V333.722H1125V345.611H1129ZM1129 309.944V298.056H1125V309.944H1129ZM1129 274.278V262.389H1125V274.278H1129ZM1129 238.611V226.722H1125V238.611H1129ZM1129 202.944V197H1125V202.944H1129Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-60-inside-16_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_12">
                                        <rect
                                            id="Rectangle 291_12"
                                            x="980"
                                            y="12"
                                            width="12"
                                            height="399"
                                            fill="white" />
                                        <g id="Rectangle 281_12">
                                            <mask id="path-63-inside-17_422_6" fill="white">
                                                <path d="M985 12H987V411H985V12Z" />
                                            </mask>
                                            <path
                                                d="M988 411V404.955H986V411H988ZM988 380.773V368.682H986V380.773H988ZM988 344.5V332.409H986V344.5H988ZM988 308.227V296.136H986V308.227H988ZM988 271.955V259.864H986V271.955H988ZM988 235.682V223.591H986V235.682H988ZM988 199.409V187.318H986V199.409H988ZM988 163.136V151.045H986V163.136H988ZM988 126.864V114.773H986V126.864H988ZM988 90.5909V78.5H986V90.5909H988ZM988 54.3181V42.2272H986V54.3181H988ZM988 18.0454V12H986V18.0454H988ZM989 411V404.955H985V411H989ZM989 380.773V368.682H985V380.773H989ZM989 344.5V332.409H985V344.5H989ZM989 308.227V296.136H985V308.227H989ZM989 271.955V259.864H985V271.955H989ZM989 235.682V223.591H985V235.682H989ZM989 199.409V187.318H985V199.409H989ZM989 163.136V151.045H985V163.136H989ZM989 126.864V114.773H985V126.864H989ZM989 90.5909V78.5H985V90.5909H989ZM989 54.3181V42.2272H985V54.3181H989ZM989 18.0454V12H985V18.0454H989Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-63-inside-17_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_13">
                                        <rect
                                            id="Rectangle 291_13"
                                            x="840"
                                            y="197"
                                            width="12"
                                            height="214"
                                            fill="white" />
                                        <g id="Rectangle 281_13">
                                            <mask id="path-66-inside-18_422_6" fill="white">
                                                <path d="M845 197H847V411H845V197Z" />
                                            </mask>
                                            <path
                                                d="M848 411V405.056H846V411H848ZM848 381.278V369.389H846V381.278H848ZM848 345.611V333.722H846V345.611H848ZM848 309.944V298.056H846V309.944H848ZM848 274.278V262.389H846V274.278H848ZM848 238.611V226.722H846V238.611H848ZM848 202.944V197H846V202.944H848ZM849 411V405.056H845V411H849ZM849 381.278V369.389H845V381.278H849ZM849 345.611V333.722H845V345.611H849ZM849 309.944V298.056H845V309.944H849ZM849 274.278V262.389H845V274.278H849ZM849 238.611V226.722H845V238.611H849ZM849 202.944V197H845V202.944H849Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-66-inside-18_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_14">
                                        <rect
                                            id="Rectangle 291_14"
                                            x="700"
                                            y="197"
                                            width="12"
                                            height="214"
                                            fill="white" />
                                        <g id="Rectangle 281_14">
                                            <mask id="path-69-inside-19_422_6" fill="white">
                                                <path d="M705 197H707V411H705V197Z" />
                                            </mask>
                                            <path
                                                d="M708 411V405.056H706V411H708ZM708 381.278V369.389H706V381.278H708ZM708 345.611V333.722H706V345.611H708ZM708 309.944V298.056H706V309.944H708ZM708 274.278V262.389H706V274.278H708ZM708 238.611V226.722H706V238.611H708ZM708 202.944V197H706V202.944H708ZM709 411V405.056H705V411H709ZM709 381.278V369.389H705V381.278H709ZM709 345.611V333.722H705V345.611H709ZM709 309.944V298.056H705V309.944H709ZM709 274.278V262.389H705V274.278H709ZM709 238.611V226.722H705V238.611H709ZM709 202.944V197H705V202.944H709Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-69-inside-19_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_15">
                                        <rect
                                            id="Rectangle 291_15"
                                            x="700"
                                            y="12"
                                            width="12"
                                            height="173"
                                            fill="white" />
                                        <g id="Rectangle 281_15">
                                            <mask id="path-72-inside-20_422_6" fill="white">
                                                <path d="M705 12H707V185H705V12Z" />
                                            </mask>
                                            <path
                                                d="M708 185V179.233H706V185H708ZM708 156.167V144.633H706V156.167H708ZM708 121.567V110.033H706V121.567H708ZM708 86.9667V75.4333H706V86.9667H708ZM708 52.3667V40.8333H706V52.3667H708ZM708 17.7667V12H706V17.7667H708ZM709 185V179.233H705V185H709ZM709 156.167V144.633H705V156.167H709ZM709 121.567V110.033H705V121.567H709ZM709 86.9667V75.4333H705V86.9667H709ZM709 52.3667V40.8333H705V52.3667H709ZM709 17.7667V12H705V17.7667H709Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-72-inside-20_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_16">
                                        <rect
                                            id="Rectangle 291_16"
                                            x="840"
                                            y="423"
                                            width="12"
                                            height="149"
                                            fill="white" />
                                        <g id="Rectangle 281_16">
                                            <mask id="path-75-inside-21_422_6" fill="white">
                                                <path d="M845 423H847V572H845V423Z" />
                                            </mask>
                                            <path
                                                d="M848 572V565.792H846V572H848ZM848 540.958V528.542H846V540.958H848ZM848 503.708V491.292H846V503.708H848ZM848 466.458V454.042H846V466.458H848ZM848 429.208V423H846V429.208H848ZM849 572V565.792H845V572H849ZM849 540.958V528.542H845V540.958H849ZM849 503.708V491.292H845V503.708H849ZM849 466.458V454.042H845V466.458H849ZM849 429.208V423H845V429.208H849Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-75-inside-21_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_17">
                                        <rect
                                            id="Rectangle 291_17"
                                            x="700"
                                            y="423"
                                            width="12"
                                            height="149"
                                            fill="white" />
                                        <g id="Rectangle 281_17">
                                            <mask id="path-78-inside-22_422_6" fill="white">
                                                <path d="M705 423H707V572H705V423Z" />
                                            </mask>
                                            <path
                                                d="M708 572V565.792H706V572H708ZM708 540.958V528.542H706V540.958H708ZM708 503.708V491.292H706V503.708H708ZM708 466.458V454.042H706V466.458H708ZM708 429.208V423H706V429.208H708ZM709 572V565.792H705V572H709ZM709 540.958V528.542H705V540.958H709ZM709 503.708V491.292H705V503.708H709ZM709 466.458V454.042H705V466.458H709ZM709 429.208V423H705V429.208H709Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-78-inside-22_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_18">
                                        <rect
                                            id="Rectangle 291_18"
                                            x="560"
                                            y="423"
                                            width="12"
                                            height="149"
                                            fill="white" />
                                        <g id="Rectangle 281_18">
                                            <mask id="path-81-inside-23_422_6" fill="white">
                                                <path d="M565 423H567V572H565V423Z" />
                                            </mask>
                                            <path
                                                d="M568 572V565.792H566V572H568ZM568 540.958V528.542H566V540.958H568ZM568 503.708V491.292H566V503.708H568ZM568 466.458V454.042H566V466.458H568ZM568 429.208V423H566V429.208H568ZM569 572V565.792H565V572H569ZM569 540.958V528.542H565V540.958H569ZM569 503.708V491.292H565V503.708H569ZM569 466.458V454.042H565V466.458H569ZM569 429.208V423H565V429.208H569Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-81-inside-23_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_19">
                                        <rect
                                            id="Rectangle 291_19"
                                            x="140"
                                            y="423"
                                            width="12"
                                            height="80"
                                            fill="white" />
                                        <g id="Rectangle 281_19">
                                            <mask id="path-84-inside-24_422_6" fill="white">
                                                <path d="M145 423H147V503H145V423Z" />
                                            </mask>
                                            <path
                                                d="M148 503V496.333H146V503H148ZM148 469.667V456.333H146V469.667H148ZM148 429.667V423H146V429.667H148ZM149 503V496.333H145V503H149ZM149 469.667V456.333H145V469.667H149ZM149 429.667V423H145V429.667H149Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-84-inside-24_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_20">
                                        <rect
                                            id="Rectangle 291_20"
                                            x="280"
                                            y="423"
                                            width="12"
                                            height="80"
                                            fill="white" />
                                        <g id="Rectangle 281_20">
                                            <mask id="path-87-inside-25_422_6" fill="white">
                                                <path d="M285 423H287V503H285V423Z" />
                                            </mask>
                                            <path
                                                d="M288 503V496.333H286V503H288ZM288 469.667V456.333H286V469.667H288ZM288 429.667V423H286V429.667H288ZM289 503V496.333H285V503H289ZM289 469.667V456.333H285V469.667H289ZM289 429.667V423H285V429.667H289Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-87-inside-25_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_21">
                                        <rect
                                            id="Rectangle 291_21"
                                            x="420"
                                            y="423"
                                            width="12"
                                            height="80"
                                            fill="white" />
                                        <g id="Rectangle 281_21">
                                            <mask id="path-90-inside-26_422_6" fill="white">
                                                <path d="M425 423H427V503H425V423Z" />
                                            </mask>
                                            <path
                                                d="M428 503V496.333H426V503H428ZM428 469.667V456.333H426V469.667H428ZM428 429.667V423H426V429.667H428ZM429 503V496.333H425V503H429ZM429 469.667V456.333H425V469.667H429ZM429 429.667V423H425V429.667H429Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-90-inside-26_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_22">
                                        <rect
                                            id="Rectangle 291_22"
                                            x="980"
                                            y="503"
                                            width="12"
                                            height="548"
                                            transform="rotate(90 980 503)"
                                            fill="white" />
                                        <g id="Rectangle 281_22">
                                            <mask id="path-93-inside-27_422_6" fill="white">
                                                <path
                                                    d="M980 508L980 510L432 510L432 508L980 508Z" />
                                            </mask>
                                            <path
                                                d="M432 511L438.089 511L438.089 509L432 509L432 511ZM462.444 511L474.622 511L474.622 509L462.444 509L462.444 511ZM498.978 511L511.156 511L511.156 509L498.978 509L498.978 511ZM535.511 511L547.689 511L547.689 509L535.511 509L535.511 511ZM572.044 511L584.222 511L584.222 509L572.044 509L572.044 511ZM608.578 511L620.756 511L620.756 509L608.578 509L608.578 511ZM645.111 511L657.289 511L657.289 509L645.111 509L645.111 511ZM681.644 511L693.822 511L693.822 509L681.644 509L681.644 511ZM718.178 511L730.356 511L730.356 509L718.178 509L718.178 511ZM754.711 511L766.889 511L766.889 509L754.711 509L754.711 511ZM791.244 511L803.422 511L803.422 509L791.244 509L791.244 511ZM827.778 511L839.956 511L839.956 509L827.778 509L827.778 511ZM864.311 511L876.489 511L876.489 509L864.311 509L864.311 511ZM900.844 511L913.022 511L913.022 509L900.844 509L900.844 511ZM937.378 511L949.556 511L949.556 509L937.378 509L937.378 511ZM973.911 511L980 511L980 509L973.911 509L973.911 511ZM432 512L438.089 512L438.089 508L432 508L432 512ZM462.444 512L474.622 512L474.622 508L462.444 508L462.444 512ZM498.978 512L511.156 512L511.156 508L498.978 508L498.978 512ZM535.511 512L547.689 512L547.689 508L535.511 508L535.511 512ZM572.044 512L584.222 512L584.222 508L572.044 508L572.044 512ZM608.578 512L620.756 512L620.756 508L608.578 508L608.578 512ZM645.111 512L657.289 512L657.289 508L645.111 508L645.111 512ZM681.644 512L693.822 512L693.822 508L681.644 508L681.644 512ZM718.178 512L730.356 512L730.356 508L718.178 508L718.178 512ZM754.711 512L766.889 512L766.889 508L754.711 508L754.711 512ZM791.244 512L803.422 512L803.422 508L791.244 508L791.244 512ZM827.778 512L839.956 512L839.956 508L827.778 508L827.778 512ZM864.311 512L876.489 512L876.489 508L864.311 508L864.311 512ZM900.844 512L913.022 512L913.022 508L900.844 508L900.844 512ZM937.378 512L949.556 512L949.556 508L937.378 508L937.378 512ZM973.911 512L980 512L980 508L973.911 508L973.911 512Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-93-inside-27_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_23">
                                        <rect
                                            id="Rectangle 291_23"
                                            x="980"
                                            y="423"
                                            width="12"
                                            height="80"
                                            fill="white" />
                                        <g id="Rectangle 281_23">
                                            <mask id="path-96-inside-28_422_6" fill="white">
                                                <path d="M985 423H987V503H985V423Z" />
                                            </mask>
                                            <path
                                                d="M988 503V496.333H986V503H988ZM988 469.667V456.333H986V469.667H988ZM988 429.667V423H986V429.667H988ZM989 503V496.333H985V503H989ZM989 469.667V456.333H985V469.667H989ZM989 429.667V423H985V429.667H989Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-96-inside-28_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_24">
                                        <rect
                                            id="Rectangle 291_24"
                                            x="1120"
                                            y="423"
                                            width="12"
                                            height="80"
                                            fill="white" />
                                        <g id="Rectangle 281_24">
                                            <mask id="path-99-inside-29_422_6" fill="white">
                                                <path d="M1125 423H1127V503H1125V423Z" />
                                            </mask>
                                            <path
                                                d="M1128 503V496.333H1126V503H1128ZM1128 469.667V456.333H1126V469.667H1128ZM1128 429.667V423H1126V429.667H1128ZM1129 503V496.333H1125V503H1129ZM1129 469.667V456.333H1125V469.667H1129ZM1129 429.667V423H1125V429.667H1129Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-99-inside-29_422_6)" />
                                        </g>
                                    </g>
                                    <g id="Line_25">
                                        <rect
                                            id="Rectangle 291_25"
                                            x="1260"
                                            y="423"
                                            width="12"
                                            height="80"
                                            fill="white" />
                                        <g id="Rectangle 281_25">
                                            <mask id="path-102-inside-30_422_6" fill="white">
                                                <path d="M1265 423H1267V503H1265V423Z" />
                                            </mask>
                                            <path
                                                d="M1268 503V496.333H1266V503H1268ZM1268 469.667V456.333H1266V469.667H1268ZM1268 429.667V423H1266V429.667H1268ZM1269 503V496.333H1265V503H1269ZM1269 469.667V456.333H1265V469.667H1269ZM1269 429.667V423H1265V429.667H1269Z"
                                                fill="#CDCDCD"
                                                mask="url(#path-102-inside-30_422_6)" />
                                        </g>
                                    </g>
                                </g>
                            </g>
                            <g id="balcony-label">
                                <rect
                                    x="653"
                                    y="521"
                                    width="108"
                                    height="41"
                                    rx="5"
                                    fill="white" />
                                <path
                                    id="balcony-text"
                                    d="M669.425 549V534.6H675.185C676.212 534.6 677.042 534.807 677.675 535.22C678.309 535.627 678.772 536.14 679.065 536.76C679.359 537.38 679.505 538.007 679.505 538.64C679.505 539.447 679.322 540.117 678.955 540.65C678.595 541.183 678.099 541.54 677.465 541.72V541.22C678.365 541.407 679.039 541.823 679.485 542.47C679.939 543.117 680.165 543.84 680.165 544.64C680.165 545.5 680.005 546.257 679.685 546.91C679.372 547.563 678.892 548.077 678.245 548.45C677.599 548.817 676.785 549 675.805 549H669.425ZM672.185 546.44H675.525C675.892 546.44 676.219 546.363 676.505 546.21C676.792 546.05 677.015 545.83 677.175 545.55C677.342 545.263 677.425 544.927 677.425 544.54C677.425 544.2 677.355 543.897 677.215 543.63C677.075 543.363 676.862 543.153 676.575 543C676.295 542.84 675.945 542.76 675.525 542.76H672.185V546.44ZM672.185 540.22H675.145C675.452 540.22 675.725 540.167 675.965 540.06C676.205 539.953 676.395 539.79 676.535 539.57C676.675 539.343 676.745 539.053 676.745 538.7C676.745 538.26 676.609 537.89 676.335 537.59C676.062 537.29 675.665 537.14 675.145 537.14H672.185V540.22ZM685.16 549.3C684.386 549.3 683.73 549.153 683.19 548.86C682.656 548.56 682.25 548.163 681.97 547.67C681.696 547.17 681.56 546.62 681.56 546.02C681.56 545.52 681.636 545.063 681.79 544.65C681.943 544.237 682.19 543.873 682.53 543.56C682.876 543.24 683.34 542.973 683.92 542.76C684.32 542.613 684.796 542.483 685.35 542.37C685.903 542.257 686.53 542.15 687.23 542.05C687.93 541.943 688.7 541.827 689.54 541.7L688.56 542.24C688.56 541.6 688.406 541.13 688.1 540.83C687.793 540.53 687.28 540.38 686.56 540.38C686.16 540.38 685.743 540.477 685.31 540.67C684.876 540.863 684.573 541.207 684.4 541.7L681.94 540.92C682.213 540.027 682.726 539.3 683.48 538.74C684.233 538.18 685.26 537.9 686.56 537.9C687.513 537.9 688.36 538.047 689.1 538.34C689.84 538.633 690.4 539.14 690.78 539.86C690.993 540.26 691.12 540.66 691.16 541.06C691.2 541.46 691.22 541.907 691.22 542.4V549H688.84V546.78L689.18 547.24C688.653 547.967 688.083 548.493 687.47 548.82C686.863 549.14 686.093 549.3 685.16 549.3ZM685.74 547.16C686.24 547.16 686.66 547.073 687 546.9C687.346 546.72 687.62 546.517 687.82 546.29C688.026 546.063 688.166 545.873 688.24 545.72C688.38 545.427 688.46 545.087 688.48 544.7C688.506 544.307 688.52 543.98 688.52 543.72L689.32 543.92C688.513 544.053 687.86 544.167 687.36 544.26C686.86 544.347 686.456 544.427 686.15 544.5C685.843 544.573 685.573 544.653 685.34 544.74C685.073 544.847 684.856 544.963 684.69 545.09C684.53 545.21 684.41 545.343 684.33 545.49C684.256 545.637 684.22 545.8 684.22 545.98C684.22 546.227 684.28 546.44 684.4 546.62C684.526 546.793 684.703 546.927 684.93 547.02C685.156 547.113 685.426 547.16 685.74 547.16ZM694.02 549V534.3H696.74V549H694.02ZM704.498 549.3C703.378 549.3 702.418 549.05 701.618 548.55C700.818 548.05 700.205 547.37 699.778 546.51C699.351 545.65 699.138 544.68 699.138 543.6C699.138 542.507 699.358 541.53 699.798 540.67C700.245 539.81 700.871 539.133 701.678 538.64C702.485 538.147 703.438 537.9 704.538 537.9C705.811 537.9 706.878 538.223 707.738 538.87C708.605 539.51 709.158 540.387 709.398 541.5L706.678 542.22C706.518 541.66 706.238 541.223 705.838 540.91C705.445 540.597 704.998 540.44 704.498 540.44C703.925 540.44 703.455 540.58 703.088 540.86C702.721 541.133 702.451 541.51 702.278 541.99C702.105 542.463 702.018 543 702.018 543.6C702.018 544.54 702.225 545.303 702.638 545.89C703.058 546.47 703.678 546.76 704.498 546.76C705.111 546.76 705.578 546.62 705.898 546.34C706.218 546.06 706.458 545.66 706.618 545.14L709.398 545.72C709.091 546.867 708.511 547.75 707.658 548.37C706.805 548.99 705.751 549.3 704.498 549.3ZM715.965 549.3C714.878 549.3 713.925 549.057 713.105 548.57C712.285 548.083 711.645 547.413 711.185 546.56C710.732 545.7 710.505 544.713 710.505 543.6C710.505 542.473 710.738 541.483 711.205 540.63C711.672 539.77 712.315 539.1 713.135 538.62C713.955 538.14 714.898 537.9 715.965 537.9C717.052 537.9 718.005 538.143 718.825 538.63C719.652 539.117 720.295 539.79 720.755 540.65C721.215 541.503 721.445 542.487 721.445 543.6C721.445 544.72 721.212 545.71 720.745 546.57C720.285 547.423 719.642 548.093 718.815 548.58C717.995 549.06 717.045 549.3 715.965 549.3ZM715.965 546.76C716.838 546.76 717.488 546.467 717.915 545.88C718.348 545.287 718.565 544.527 718.565 543.6C718.565 542.64 718.345 541.873 717.905 541.3C717.472 540.727 716.825 540.44 715.965 540.44C715.372 540.44 714.885 540.573 714.505 540.84C714.125 541.107 713.842 541.477 713.655 541.95C713.475 542.423 713.385 542.973 713.385 543.6C713.385 544.567 713.602 545.337 714.035 545.91C714.475 546.477 715.118 546.76 715.965 546.76ZM731.004 549V543.9C731.004 543.653 730.991 543.34 730.964 542.96C730.937 542.573 730.854 542.187 730.714 541.8C730.574 541.413 730.344 541.09 730.024 540.83C729.711 540.57 729.264 540.44 728.684 540.44C728.451 540.44 728.201 540.477 727.934 540.55C727.667 540.623 727.417 540.767 727.184 540.98C726.951 541.187 726.757 541.493 726.604 541.9C726.457 542.307 726.384 542.847 726.384 543.52L724.824 542.78C724.824 541.927 724.997 541.127 725.344 540.38C725.691 539.633 726.211 539.03 726.904 538.57C727.604 538.11 728.484 537.88 729.544 537.88C730.391 537.88 731.081 538.023 731.614 538.31C732.147 538.597 732.561 538.96 732.854 539.4C733.154 539.84 733.367 540.3 733.494 540.78C733.621 541.253 733.697 541.687 733.724 542.08C733.751 542.473 733.764 542.76 733.764 542.94V549H731.004ZM723.624 549V538.2H726.044V541.78H726.384V549H723.624ZM737.348 553.8L739.428 548.08L739.468 549.76L734.768 538.2H737.588L740.748 546.38H740.108L743.248 538.2H745.968L739.868 553.8H737.348Z"
                                    fill="black" />
                                <rect
                                    x="653"
                                    y="521"
                                    width="108"
                                    height="41"
                                    rx="5"
                                    stroke="#124DBA"
                                    stroke-width="2" />
                            </g>
                            <g id="hallway-label">
                                <rect
                                    x="653"
                                    y="443"
                                    width="107"
                                    height="41"
                                    rx="5"
                                    fill="white" />
                                <path
                                    id="hallway-text"
                                    d="M669.736 471V456.6H672.456V462.52H678.896V456.6H681.616V471H678.896V465.06H672.456V471H669.736ZM687.423 471.3C686.65 471.3 685.993 471.153 685.453 470.86C684.92 470.56 684.513 470.163 684.233 469.67C683.96 469.17 683.823 468.62 683.823 468.02C683.823 467.52 683.9 467.063 684.053 466.65C684.207 466.237 684.453 465.873 684.793 465.56C685.14 465.24 685.603 464.973 686.183 464.76C686.583 464.613 687.06 464.483 687.613 464.37C688.167 464.257 688.793 464.15 689.493 464.05C690.193 463.943 690.963 463.827 691.803 463.7L690.823 464.24C690.823 463.6 690.67 463.13 690.363 462.83C690.057 462.53 689.543 462.38 688.823 462.38C688.423 462.38 688.007 462.477 687.573 462.67C687.14 462.863 686.837 463.207 686.663 463.7L684.203 462.92C684.477 462.027 684.99 461.3 685.743 460.74C686.497 460.18 687.523 459.9 688.823 459.9C689.777 459.9 690.623 460.047 691.363 460.34C692.103 460.633 692.663 461.14 693.043 461.86C693.257 462.26 693.383 462.66 693.423 463.06C693.463 463.46 693.483 463.907 693.483 464.4V471H691.103V468.78L691.443 469.24C690.917 469.967 690.347 470.493 689.733 470.82C689.127 471.14 688.357 471.3 687.423 471.3ZM688.003 469.16C688.503 469.16 688.923 469.073 689.263 468.9C689.61 468.72 689.883 468.517 690.083 468.29C690.29 468.063 690.43 467.873 690.503 467.72C690.643 467.427 690.723 467.087 690.743 466.7C690.77 466.307 690.783 465.98 690.783 465.72L691.583 465.92C690.777 466.053 690.123 466.167 689.623 466.26C689.123 466.347 688.72 466.427 688.413 466.5C688.107 466.573 687.837 466.653 687.603 466.74C687.337 466.847 687.12 466.963 686.953 467.09C686.793 467.21 686.673 467.343 686.593 467.49C686.52 467.637 686.483 467.8 686.483 467.98C686.483 468.227 686.543 468.44 686.663 468.62C686.79 468.793 686.967 468.927 687.193 469.02C687.42 469.113 687.69 469.16 688.003 469.16ZM696.284 471V456.3H699.004V471H696.284ZM702.202 471V456.3H704.922V471H702.202ZM710.22 471L706.92 460.18L709.58 460.2L711.54 466.64L713.53 460.2H715.79L717.78 466.64L719.74 460.2H722.4L719.1 471H717.02L714.66 463.96L712.3 471H710.22ZM726.603 471.3C725.83 471.3 725.173 471.153 724.633 470.86C724.1 470.56 723.693 470.163 723.413 469.67C723.14 469.17 723.003 468.62 723.003 468.02C723.003 467.52 723.08 467.063 723.233 466.65C723.386 466.237 723.633 465.873 723.973 465.56C724.32 465.24 724.783 464.973 725.363 464.76C725.763 464.613 726.24 464.483 726.793 464.37C727.346 464.257 727.973 464.15 728.673 464.05C729.373 463.943 730.143 463.827 730.983 463.7L730.003 464.24C730.003 463.6 729.85 463.13 729.543 462.83C729.236 462.53 728.723 462.38 728.003 462.38C727.603 462.38 727.186 462.477 726.753 462.67C726.32 462.863 726.016 463.207 725.843 463.7L723.383 462.92C723.656 462.027 724.17 461.3 724.923 460.74C725.676 460.18 726.703 459.9 728.003 459.9C728.956 459.9 729.803 460.047 730.543 460.34C731.283 460.633 731.843 461.14 732.223 461.86C732.436 462.26 732.563 462.66 732.603 463.06C732.643 463.46 732.663 463.907 732.663 464.4V471H730.283V468.78L730.623 469.24C730.096 469.967 729.526 470.493 728.913 470.82C728.306 471.14 727.536 471.3 726.603 471.3ZM727.183 469.16C727.683 469.16 728.103 469.073 728.443 468.9C728.79 468.72 729.063 468.517 729.263 468.29C729.47 468.063 729.61 467.873 729.683 467.72C729.823 467.427 729.903 467.087 729.923 466.7C729.95 466.307 729.963 465.98 729.963 465.72L730.763 465.92C729.956 466.053 729.303 466.167 728.803 466.26C728.303 466.347 727.9 466.427 727.593 466.5C727.286 466.573 727.016 466.653 726.783 466.74C726.516 466.847 726.3 466.963 726.133 467.09C725.973 467.21 725.853 467.343 725.773 467.49C725.7 467.637 725.663 467.8 725.663 467.98C725.663 468.227 725.723 468.44 725.843 468.62C725.97 468.793 726.146 468.927 726.373 469.02C726.6 469.113 726.87 469.16 727.183 469.16ZM736.038 475.8L738.118 470.08L738.158 471.76L733.458 460.2H736.278L739.438 468.38H738.798L741.938 460.2H744.658L738.558 475.8H736.038Z"
                                    fill="black" />
                                <rect
                                    x="653"
                                    y="443"
                                    width="107"
                                    height="41"
                                    rx="5"
                                    stroke="#124DBA"
                                    stroke-width="2" />
                            </g>
                            <g id="students-lounge-label">
                                <rect
                                    x="598"
                                    y="283"
                                    width="204"
                                    height="41"
                                    fill="white"
                                    rx="5" />
                                <path
                                    id="students-lounge-text"
                                    d="M619.906 311.3C618.84 311.3 617.876 311.113 617.016 310.74C616.163 310.36 615.46 309.82 614.906 309.12C614.36 308.413 614.013 307.573 613.866 306.6L616.706 306.18C616.906 307.007 617.32 307.643 617.946 308.09C618.573 308.537 619.286 308.76 620.086 308.76C620.533 308.76 620.966 308.69 621.386 308.55C621.806 308.41 622.15 308.203 622.416 307.93C622.69 307.657 622.826 307.32 622.826 306.92C622.826 306.773 622.803 306.633 622.756 306.5C622.716 306.36 622.646 306.23 622.546 306.11C622.446 305.99 622.303 305.877 622.116 305.77C621.936 305.663 621.706 305.567 621.426 305.48L617.686 304.38C617.406 304.3 617.08 304.187 616.706 304.04C616.34 303.893 615.983 303.683 615.636 303.41C615.29 303.137 615 302.777 614.766 302.33C614.54 301.877 614.426 301.307 614.426 300.62C614.426 299.653 614.67 298.85 615.156 298.21C615.643 297.57 616.293 297.093 617.106 296.78C617.92 296.467 618.82 296.313 619.806 296.32C620.8 296.333 621.686 296.503 622.466 296.83C623.246 297.157 623.9 297.633 624.426 298.26C624.953 298.88 625.333 299.64 625.566 300.54L622.626 301.04C622.52 300.573 622.323 300.18 622.036 299.86C621.75 299.54 621.406 299.297 621.006 299.13C620.613 298.963 620.2 298.873 619.766 298.86C619.34 298.847 618.936 298.907 618.556 299.04C618.183 299.167 617.876 299.353 617.636 299.6C617.403 299.847 617.286 300.14 617.286 300.48C617.286 300.793 617.383 301.05 617.576 301.25C617.77 301.443 618.013 301.6 618.306 301.72C618.6 301.84 618.9 301.94 619.206 302.02L621.706 302.7C622.08 302.8 622.493 302.933 622.946 303.1C623.4 303.26 623.833 303.487 624.246 303.78C624.666 304.067 625.01 304.447 625.276 304.92C625.55 305.393 625.686 305.993 625.686 306.72C625.686 307.493 625.523 308.17 625.196 308.75C624.876 309.323 624.443 309.8 623.896 310.18C623.35 310.553 622.73 310.833 622.036 311.02C621.35 311.207 620.64 311.3 619.906 311.3ZM634.364 311C633.618 311.14 632.884 311.2 632.164 311.18C631.451 311.167 630.811 311.043 630.244 310.81C629.684 310.57 629.258 310.187 628.964 309.66C628.698 309.167 628.558 308.667 628.544 308.16C628.531 307.647 628.524 307.067 628.524 306.42V297.2H631.244V306.26C631.244 306.68 631.248 307.06 631.254 307.4C631.268 307.733 631.338 308 631.464 308.2C631.704 308.58 632.088 308.787 632.614 308.82C633.141 308.853 633.724 308.827 634.364 308.74V311ZM626.684 302.3V300.2H634.364V302.3H626.684ZM640.791 311.32C639.944 311.32 639.254 311.177 638.721 310.89C638.188 310.603 637.771 310.24 637.471 309.8C637.178 309.36 636.968 308.903 636.841 308.43C636.714 307.95 636.638 307.513 636.611 307.12C636.584 306.727 636.571 306.44 636.571 306.26V300.2H639.331V305.3C639.331 305.547 639.344 305.863 639.371 306.25C639.398 306.63 639.481 307.013 639.621 307.4C639.761 307.787 639.988 308.11 640.301 308.37C640.621 308.63 641.071 308.76 641.651 308.76C641.884 308.76 642.134 308.723 642.401 308.65C642.668 308.577 642.918 308.437 643.151 308.23C643.384 308.017 643.574 307.707 643.721 307.3C643.874 306.887 643.951 306.347 643.951 305.68L645.511 306.42C645.511 307.273 645.338 308.073 644.991 308.82C644.644 309.567 644.121 310.17 643.421 310.63C642.728 311.09 641.851 311.32 640.791 311.32ZM644.291 311V307.42H643.951V300.2H646.691V311H644.291ZM653.866 311.3C652.873 311.3 652.003 311.05 651.256 310.55C650.509 310.05 649.926 309.37 649.506 308.51C649.093 307.65 648.886 306.68 648.886 305.6C648.886 304.5 649.096 303.523 649.516 302.67C649.943 301.81 650.539 301.133 651.306 300.64C652.073 300.147 652.973 299.9 654.006 299.9C655.033 299.9 655.896 300.15 656.596 300.65C657.296 301.15 657.826 301.83 658.186 302.69C658.546 303.55 658.726 304.52 658.726 305.6C658.726 306.68 658.543 307.65 658.176 308.51C657.816 309.37 657.276 310.05 656.556 310.55C655.836 311.05 654.939 311.3 653.866 311.3ZM654.306 308.88C654.913 308.88 655.396 308.743 655.756 308.47C656.123 308.197 656.386 307.813 656.546 307.32C656.706 306.827 656.786 306.253 656.786 305.6C656.786 304.947 656.706 304.373 656.546 303.88C656.386 303.387 656.129 303.003 655.776 302.73C655.429 302.457 654.973 302.32 654.406 302.32C653.799 302.32 653.299 302.47 652.906 302.77C652.519 303.063 652.233 303.46 652.046 303.96C651.859 304.453 651.766 305 651.766 305.6C651.766 306.207 651.856 306.76 652.036 307.26C652.216 307.753 652.493 308.147 652.866 308.44C653.239 308.733 653.719 308.88 654.306 308.88ZM656.786 311V303.6H656.446V296.6H659.186V311H656.786ZM667.006 311.3C665.899 311.3 664.923 311.063 664.076 310.59C663.236 310.11 662.576 309.453 662.096 308.62C661.623 307.78 661.386 306.82 661.386 305.74C661.386 304.56 661.619 303.533 662.086 302.66C662.553 301.787 663.196 301.11 664.016 300.63C664.836 300.143 665.779 299.9 666.846 299.9C667.979 299.9 668.943 300.167 669.736 300.7C670.529 301.233 671.116 301.983 671.496 302.95C671.876 303.917 672.009 305.053 671.896 306.36H669.206V305.36C669.206 304.26 669.029 303.47 668.676 302.99C668.329 302.503 667.759 302.26 666.966 302.26C666.039 302.26 665.356 302.543 664.916 303.11C664.483 303.67 664.266 304.5 664.266 305.6C664.266 306.607 664.483 307.387 664.916 307.94C665.356 308.487 665.999 308.76 666.846 308.76C667.379 308.76 667.836 308.643 668.216 308.41C668.596 308.177 668.886 307.84 669.086 307.4L671.806 308.18C671.399 309.167 670.756 309.933 669.876 310.48C669.003 311.027 668.046 311.3 667.006 311.3ZM663.426 306.36V304.34H670.586V306.36H663.426ZM681.221 311V305.9C681.221 305.653 681.208 305.34 681.181 304.96C681.154 304.573 681.071 304.187 680.931 303.8C680.791 303.413 680.561 303.09 680.241 302.83C679.928 302.57 679.481 302.44 678.901 302.44C678.668 302.44 678.418 302.477 678.151 302.55C677.884 302.623 677.634 302.767 677.401 302.98C677.168 303.187 676.974 303.493 676.821 303.9C676.674 304.307 676.601 304.847 676.601 305.52L675.041 304.78C675.041 303.927 675.214 303.127 675.561 302.38C675.908 301.633 676.428 301.03 677.121 300.57C677.821 300.11 678.701 299.88 679.761 299.88C680.608 299.88 681.298 300.023 681.831 300.31C682.364 300.597 682.778 300.96 683.071 301.4C683.371 301.84 683.584 302.3 683.711 302.78C683.838 303.253 683.914 303.687 683.941 304.08C683.968 304.473 683.981 304.76 683.981 304.94V311H681.221ZM673.841 311V300.2H676.261V303.78H676.601V311H673.841ZM693.056 311C692.309 311.14 691.576 311.2 690.856 311.18C690.142 311.167 689.502 311.043 688.936 310.81C688.376 310.57 687.949 310.187 687.656 309.66C687.389 309.167 687.249 308.667 687.236 308.16C687.222 307.647 687.216 307.067 687.216 306.42V297.2H689.936V306.26C689.936 306.68 689.939 307.06 689.946 307.4C689.959 307.733 690.029 308 690.156 308.2C690.396 308.58 690.779 308.787 691.306 308.82C691.832 308.853 692.416 308.827 693.056 308.74V311ZM685.376 302.3V300.2H693.056V302.3H685.376ZM695.863 302.02L696.023 300.88C696.343 300.907 696.603 300.857 696.803 300.73C697.003 300.597 697.139 300.41 697.213 300.17C697.293 299.923 697.309 299.64 697.263 299.32H695.863V296.6H698.583V299.32C698.583 300.28 698.359 301.007 697.913 301.5C697.466 301.993 696.783 302.167 695.863 302.02ZM704.175 311.3C702.815 311.3 701.715 310.993 700.875 310.38C700.041 309.76 699.535 308.887 699.355 307.76L702.135 307.34C702.248 307.847 702.498 308.243 702.885 308.53C703.278 308.817 703.775 308.96 704.375 308.96C704.868 308.96 705.248 308.867 705.515 308.68C705.781 308.487 705.915 308.22 705.915 307.88C705.915 307.667 705.861 307.497 705.755 307.37C705.648 307.237 705.408 307.107 705.035 306.98C704.668 306.853 704.095 306.687 703.315 306.48C702.435 306.253 701.731 306 701.205 305.72C700.678 305.44 700.298 305.107 700.065 304.72C699.831 304.327 699.715 303.853 699.715 303.3C699.715 302.607 699.891 302.007 700.245 301.5C700.598 300.987 701.095 300.593 701.735 300.32C702.381 300.04 703.141 299.9 704.015 299.9C704.861 299.9 705.611 300.03 706.265 300.29C706.918 300.55 707.445 300.92 707.845 301.4C708.251 301.88 708.501 302.447 708.595 303.1L705.815 303.6C705.768 303.2 705.595 302.883 705.295 302.65C704.995 302.417 704.588 302.28 704.075 302.24C703.575 302.207 703.171 302.273 702.865 302.44C702.565 302.607 702.415 302.847 702.415 303.16C702.415 303.347 702.478 303.503 702.605 303.63C702.738 303.757 703.008 303.887 703.415 304.02C703.828 304.153 704.455 304.327 705.295 304.54C706.115 304.753 706.771 305.003 707.265 305.29C707.765 305.57 708.128 305.91 708.355 306.31C708.581 306.703 708.695 307.18 708.695 307.74C708.695 308.847 708.295 309.717 707.495 310.35C706.695 310.983 705.588 311.3 704.175 311.3ZM715.096 311V296.6H717.816V308.46H724.016V311H715.096ZM730.576 311.3C729.49 311.3 728.536 311.057 727.716 310.57C726.896 310.083 726.256 309.413 725.796 308.56C725.343 307.7 725.116 306.713 725.116 305.6C725.116 304.473 725.35 303.483 725.816 302.63C726.283 301.77 726.926 301.1 727.746 300.62C728.566 300.14 729.51 299.9 730.576 299.9C731.663 299.9 732.616 300.143 733.436 300.63C734.263 301.117 734.906 301.79 735.366 302.65C735.826 303.503 736.056 304.487 736.056 305.6C736.056 306.72 735.823 307.71 735.356 308.57C734.896 309.423 734.253 310.093 733.426 310.58C732.606 311.06 731.656 311.3 730.576 311.3ZM730.576 308.76C731.45 308.76 732.1 308.467 732.526 307.88C732.96 307.287 733.176 306.527 733.176 305.6C733.176 304.64 732.956 303.873 732.516 303.3C732.083 302.727 731.436 302.44 730.576 302.44C729.983 302.44 729.496 302.573 729.116 302.84C728.736 303.107 728.453 303.477 728.266 303.95C728.086 304.423 727.996 304.973 727.996 305.6C727.996 306.567 728.213 307.337 728.646 307.91C729.086 308.477 729.73 308.76 730.576 308.76ZM742.275 311.32C741.429 311.32 740.739 311.177 740.205 310.89C739.672 310.603 739.255 310.24 738.955 309.8C738.662 309.36 738.452 308.903 738.325 308.43C738.199 307.95 738.122 307.513 738.095 307.12C738.069 306.727 738.055 306.44 738.055 306.26V300.2H740.815V305.3C740.815 305.547 740.829 305.863 740.855 306.25C740.882 306.63 740.965 307.013 741.105 307.4C741.245 307.787 741.472 308.11 741.785 308.37C742.105 308.63 742.555 308.76 743.135 308.76C743.369 308.76 743.619 308.723 743.885 308.65C744.152 308.577 744.402 308.437 744.635 308.23C744.869 308.017 745.059 307.707 745.205 307.3C745.359 306.887 745.435 306.347 745.435 305.68L746.995 306.42C746.995 307.273 746.822 308.073 746.475 308.82C746.129 309.567 745.605 310.17 744.905 310.63C744.212 311.09 743.335 311.32 742.275 311.32ZM745.775 311V307.42H745.435V300.2H748.175V311H745.775ZM758.33 311V305.9C758.33 305.653 758.317 305.34 758.29 304.96C758.264 304.573 758.18 304.187 758.04 303.8C757.9 303.413 757.67 303.09 757.35 302.83C757.037 302.57 756.59 302.44 756.01 302.44C755.777 302.44 755.527 302.477 755.26 302.55C754.994 302.623 754.744 302.767 754.51 302.98C754.277 303.187 754.084 303.493 753.93 303.9C753.784 304.307 753.71 304.847 753.71 305.52L752.15 304.78C752.15 303.927 752.324 303.127 752.67 302.38C753.017 301.633 753.537 301.03 754.23 300.57C754.93 300.11 755.81 299.88 756.87 299.88C757.717 299.88 758.407 300.023 758.94 300.31C759.474 300.597 759.887 300.96 760.18 301.4C760.48 301.84 760.694 302.3 760.82 302.78C760.947 303.253 761.024 303.687 761.05 304.08C761.077 304.473 761.09 304.76 761.09 304.94V311H758.33ZM750.95 311V300.2H753.37V303.78H753.71V311H750.95ZM768.305 316.1C767.692 316.1 767.108 316 766.555 315.8C766.002 315.607 765.505 315.333 765.065 314.98C764.632 314.633 764.278 314.227 764.005 313.76L766.525 312.54C766.698 312.86 766.945 313.103 767.265 313.27C767.592 313.437 767.945 313.52 768.325 313.52C768.732 313.52 769.115 313.45 769.475 313.31C769.835 313.177 770.122 312.973 770.335 312.7C770.555 312.433 770.658 312.1 770.645 311.7V308.56H770.985V300.2H773.365V311.74C773.365 312.007 773.352 312.257 773.325 312.49C773.305 312.73 773.265 312.967 773.205 313.2C773.032 313.86 772.708 314.403 772.235 314.83C771.768 315.257 771.195 315.573 770.515 315.78C769.835 315.993 769.098 316.1 768.305 316.1ZM768.065 311.3C767.072 311.3 766.202 311.05 765.455 310.55C764.708 310.05 764.125 309.37 763.705 308.51C763.292 307.65 763.085 306.68 763.085 305.6C763.085 304.5 763.295 303.523 763.715 302.67C764.142 301.81 764.738 301.133 765.505 300.64C766.272 300.147 767.172 299.9 768.205 299.9C769.232 299.9 770.095 300.15 770.795 300.65C771.495 301.15 772.025 301.83 772.385 302.69C772.745 303.55 772.925 304.52 772.925 305.6C772.925 306.68 772.742 307.65 772.375 308.51C772.015 309.37 771.475 310.05 770.755 310.55C770.035 311.05 769.138 311.3 768.065 311.3ZM768.505 308.88C769.112 308.88 769.595 308.743 769.955 308.47C770.322 308.197 770.585 307.813 770.745 307.32C770.905 306.827 770.985 306.253 770.985 305.6C770.985 304.947 770.905 304.373 770.745 303.88C770.585 303.387 770.328 303.003 769.975 302.73C769.628 302.457 769.172 302.32 768.605 302.32C767.998 302.32 767.498 302.47 767.105 302.77C766.718 303.063 766.432 303.46 766.245 303.96C766.058 304.453 765.965 305 765.965 305.6C765.965 306.207 766.055 306.76 766.235 307.26C766.415 307.753 766.692 308.147 767.065 308.44C767.438 308.733 767.918 308.88 768.505 308.88ZM781.186 311.3C780.079 311.3 779.102 311.063 778.256 310.59C777.416 310.11 776.756 309.453 776.276 308.62C775.802 307.78 775.566 306.82 775.566 305.74C775.566 304.56 775.799 303.533 776.266 302.66C776.732 301.787 777.376 301.11 778.196 300.63C779.016 300.143 779.959 299.9 781.026 299.9C782.159 299.9 783.122 300.167 783.916 300.7C784.709 301.233 785.296 301.983 785.676 302.95C786.056 303.917 786.189 305.053 786.076 306.36H783.386V305.36C783.386 304.26 783.209 303.47 782.856 302.99C782.509 302.503 781.939 302.26 781.146 302.26C780.219 302.26 779.536 302.543 779.096 303.11C778.662 303.67 778.446 304.5 778.446 305.6C778.446 306.607 778.662 307.387 779.096 307.94C779.536 308.487 780.179 308.76 781.026 308.76C781.559 308.76 782.016 308.643 782.396 308.41C782.776 308.177 783.066 307.84 783.266 307.4L785.986 308.18C785.579 309.167 784.936 309.933 784.056 310.48C783.182 311.027 782.226 311.3 781.186 311.3ZM777.606 306.36V304.34H784.766V306.36H777.606Z"
                                    fill="black" />
                                <rect
                                    x="598"
                                    y="283"
                                    width="204"
                                    height="41"
                                    rx="5"
                                    stroke="#124DBA"
                                    stroke-width="2" />
                            </g>
                            <g id="conference-room-1-label">
                                <rect
                                    x="74"
                                    y="65"
                                    width="146"
                                    height="68"
                                    rx="5"
                                    fill="white" />
                                <path
                                    id="conference-room-1-text"
                                    d="M96.7577 93.3C95.3177 93.3 94.0744 92.9867 93.0277 92.36C91.9877 91.7333 91.1844 90.8567 90.6177 89.73C90.0577 88.6033 89.7777 87.2933 89.7777 85.8C89.7777 84.3067 90.0577 82.9967 90.6177 81.87C91.1844 80.7433 91.9877 79.8667 93.0277 79.24C94.0744 78.6133 95.3177 78.3 96.7577 78.3C98.4111 78.3 99.7977 78.71 100.918 79.53C102.044 80.35 102.838 81.46 103.298 82.86L100.558 83.62C100.291 82.7467 99.8411 82.07 99.2077 81.59C98.5744 81.1033 97.7577 80.86 96.7577 80.86C95.8444 80.86 95.0811 81.0633 94.4677 81.47C93.8611 81.8767 93.4044 82.45 93.0977 83.19C92.7911 83.93 92.6377 84.8 92.6377 85.8C92.6377 86.8 92.7911 87.67 93.0977 88.41C93.4044 89.15 93.8611 89.7233 94.4677 90.13C95.0811 90.5367 95.8444 90.74 96.7577 90.74C97.7577 90.74 98.5744 90.4967 99.2077 90.01C99.8411 89.5233 100.291 88.8467 100.558 87.98L103.298 88.74C102.838 90.14 102.044 91.25 100.918 92.07C99.7977 92.89 98.4111 93.3 96.7577 93.3ZM110.36 93.3C109.273 93.3 108.32 93.0567 107.5 92.57C106.68 92.0833 106.04 91.4133 105.58 90.56C105.126 89.7 104.9 88.7133 104.9 87.6C104.9 86.4733 105.133 85.4833 105.6 84.63C106.066 83.77 106.71 83.1 107.53 82.62C108.35 82.14 109.293 81.9 110.36 81.9C111.446 81.9 112.4 82.1433 113.22 82.63C114.046 83.1167 114.69 83.79 115.15 84.65C115.61 85.5033 115.84 86.4867 115.84 87.6C115.84 88.72 115.606 89.71 115.14 90.57C114.68 91.4233 114.036 92.0933 113.21 92.58C112.39 93.06 111.44 93.3 110.36 93.3ZM110.36 90.76C111.233 90.76 111.883 90.4667 112.31 89.88C112.743 89.2867 112.96 88.5267 112.96 87.6C112.96 86.64 112.74 85.8733 112.3 85.3C111.866 84.7267 111.22 84.44 110.36 84.44C109.766 84.44 109.28 84.5733 108.9 84.84C108.52 85.1067 108.236 85.4767 108.05 85.95C107.87 86.4233 107.78 86.9733 107.78 87.6C107.78 88.5667 107.996 89.3367 108.43 89.91C108.87 90.4767 109.513 90.76 110.36 90.76ZM125.399 93V87.9C125.399 87.6533 125.385 87.34 125.359 86.96C125.332 86.5733 125.249 86.1867 125.109 85.8C124.969 85.4133 124.739 85.09 124.419 84.83C124.105 84.57 123.659 84.44 123.079 84.44C122.845 84.44 122.595 84.4767 122.329 84.55C122.062 84.6233 121.812 84.7667 121.579 84.98C121.345 85.1867 121.152 85.4933 120.999 85.9C120.852 86.3067 120.779 86.8467 120.779 87.52L119.219 86.78C119.219 85.9267 119.392 85.1267 119.739 84.38C120.085 83.6333 120.605 83.03 121.299 82.57C121.999 82.11 122.879 81.88 123.939 81.88C124.785 81.88 125.475 82.0233 126.009 82.31C126.542 82.5967 126.955 82.96 127.249 83.4C127.549 83.84 127.762 84.3 127.889 84.78C128.015 85.2533 128.092 85.6867 128.119 86.08C128.145 86.4733 128.159 86.76 128.159 86.94V93H125.399ZM118.019 93V82.2H120.439V85.78H120.779V93H118.019ZM131.654 93V82.24C131.654 81.9667 131.66 81.6567 131.674 81.31C131.687 80.9633 131.74 80.6133 131.834 80.26C131.934 79.9067 132.114 79.5867 132.374 79.3C132.707 78.9267 133.067 78.6733 133.454 78.54C133.847 78.4 134.227 78.3267 134.594 78.32C134.96 78.3067 135.274 78.3 135.534 78.3H136.874V80.5H135.634C135.207 80.5 134.89 80.61 134.684 80.83C134.477 81.0433 134.374 81.3 134.374 81.6V93H131.654ZM129.954 84.3V82.2H136.874V84.3H129.954ZM143.098 93.3C141.991 93.3 141.014 93.0633 140.168 92.59C139.328 92.11 138.668 91.4533 138.188 90.62C137.714 89.78 137.478 88.82 137.478 87.74C137.478 86.56 137.711 85.5333 138.178 84.66C138.644 83.7867 139.288 83.11 140.108 82.63C140.928 82.1433 141.871 81.9 142.938 81.9C144.071 81.9 145.034 82.1667 145.828 82.7C146.621 83.2333 147.208 83.9833 147.588 84.95C147.968 85.9167 148.101 87.0533 147.988 88.36H145.298V87.36C145.298 86.26 145.121 85.47 144.768 84.99C144.421 84.5033 143.851 84.26 143.058 84.26C142.131 84.26 141.448 84.5433 141.008 85.11C140.574 85.67 140.358 86.5 140.358 87.6C140.358 88.6067 140.574 89.3867 141.008 89.94C141.448 90.4867 142.091 90.76 142.938 90.76C143.471 90.76 143.928 90.6433 144.308 90.41C144.688 90.1767 144.978 89.84 145.178 89.4L147.898 90.18C147.491 91.1667 146.848 91.9333 145.968 92.48C145.094 93.0267 144.138 93.3 143.098 93.3ZM139.518 88.36V86.34H146.678V88.36H139.518ZM150.246 93V82.2H152.646V84.84L152.386 84.5C152.526 84.1267 152.712 83.7867 152.946 83.48C153.179 83.1733 153.466 82.92 153.806 82.72C154.066 82.56 154.349 82.4367 154.656 82.35C154.962 82.2567 155.279 82.2 155.606 82.18C155.932 82.1533 156.259 82.16 156.586 82.2V84.74C156.286 84.6467 155.936 84.6167 155.536 84.65C155.142 84.6767 154.786 84.7667 154.466 84.92C154.146 85.0667 153.876 85.2633 153.656 85.51C153.436 85.75 153.269 86.0367 153.156 86.37C153.042 86.6967 152.986 87.0667 152.986 87.48V93H150.246ZM163.313 93.3C162.206 93.3 161.229 93.0633 160.383 92.59C159.543 92.11 158.883 91.4533 158.403 90.62C157.929 89.78 157.693 88.82 157.693 87.74C157.693 86.56 157.926 85.5333 158.393 84.66C158.859 83.7867 159.503 83.11 160.323 82.63C161.143 82.1433 162.086 81.9 163.153 81.9C164.286 81.9 165.249 82.1667 166.043 82.7C166.836 83.2333 167.423 83.9833 167.803 84.95C168.183 85.9167 168.316 87.0533 168.203 88.36H165.513V87.36C165.513 86.26 165.336 85.47 164.983 84.99C164.636 84.5033 164.066 84.26 163.273 84.26C162.346 84.26 161.663 84.5433 161.223 85.11C160.789 85.67 160.573 86.5 160.573 87.6C160.573 88.6067 160.789 89.3867 161.223 89.94C161.663 90.4867 162.306 90.76 163.153 90.76C163.686 90.76 164.143 90.6433 164.523 90.41C164.903 90.1767 165.193 89.84 165.393 89.4L168.113 90.18C167.706 91.1667 167.063 91.9333 166.183 92.48C165.309 93.0267 164.353 93.3 163.313 93.3ZM159.733 88.36V86.34H166.893V88.36H159.733ZM177.528 93V87.9C177.528 87.6533 177.514 87.34 177.488 86.96C177.461 86.5733 177.378 86.1867 177.238 85.8C177.098 85.4133 176.868 85.09 176.548 84.83C176.234 84.57 175.788 84.44 175.208 84.44C174.974 84.44 174.724 84.4767 174.458 84.55C174.191 84.6233 173.941 84.7667 173.708 84.98C173.474 85.1867 173.281 85.4933 173.128 85.9C172.981 86.3067 172.908 86.8467 172.908 87.52L171.348 86.78C171.348 85.9267 171.521 85.1267 171.868 84.38C172.214 83.6333 172.734 83.03 173.428 82.57C174.128 82.11 175.008 81.88 176.068 81.88C176.914 81.88 177.604 82.0233 178.138 82.31C178.671 82.5967 179.084 82.96 179.378 83.4C179.678 83.84 179.891 84.3 180.018 84.78C180.144 85.2533 180.221 85.6867 180.248 86.08C180.274 86.4733 180.288 86.76 180.288 86.94V93H177.528ZM170.148 93V82.2H172.568V85.78H172.908V93H170.148ZM187.447 93.3C186.327 93.3 185.367 93.05 184.567 92.55C183.767 92.05 183.154 91.37 182.727 90.51C182.3 89.65 182.087 88.68 182.087 87.6C182.087 86.5067 182.307 85.53 182.747 84.67C183.194 83.81 183.82 83.1333 184.627 82.64C185.434 82.1467 186.387 81.9 187.487 81.9C188.76 81.9 189.827 82.2233 190.687 82.87C191.554 83.51 192.107 84.3867 192.347 85.5L189.627 86.22C189.467 85.66 189.187 85.2233 188.787 84.91C188.394 84.5967 187.947 84.44 187.447 84.44C186.874 84.44 186.404 84.58 186.037 84.86C185.67 85.1333 185.4 85.51 185.227 85.99C185.054 86.4633 184.967 87 184.967 87.6C184.967 88.54 185.174 89.3033 185.587 89.89C186.007 90.47 186.627 90.76 187.447 90.76C188.06 90.76 188.527 90.62 188.847 90.34C189.167 90.06 189.407 89.66 189.567 89.14L192.347 89.72C192.04 90.8667 191.46 91.75 190.607 92.37C189.754 92.99 188.7 93.3 187.447 93.3ZM199.074 93.3C197.968 93.3 196.991 93.0633 196.144 92.59C195.304 92.11 194.644 91.4533 194.164 90.62C193.691 89.78 193.454 88.82 193.454 87.74C193.454 86.56 193.688 85.5333 194.154 84.66C194.621 83.7867 195.264 83.11 196.084 82.63C196.904 82.1433 197.848 81.9 198.914 81.9C200.048 81.9 201.011 82.1667 201.804 82.7C202.598 83.2333 203.184 83.9833 203.564 84.95C203.944 85.9167 204.078 87.0533 203.964 88.36H201.274V87.36C201.274 86.26 201.098 85.47 200.744 84.99C200.398 84.5033 199.828 84.26 199.034 84.26C198.108 84.26 197.424 84.5433 196.984 85.11C196.551 85.67 196.334 86.5 196.334 87.6C196.334 88.6067 196.551 89.3867 196.984 89.94C197.424 90.4867 198.068 90.76 198.914 90.76C199.448 90.76 199.904 90.6433 200.284 90.41C200.664 90.1767 200.954 89.84 201.154 89.4L203.874 90.18C203.468 91.1667 202.824 91.9333 201.944 92.48C201.071 93.0267 200.114 93.3 199.074 93.3ZM195.494 88.36V86.34H202.654V88.36H195.494ZM113.459 120V105.6H119.539C119.679 105.6 119.865 105.607 120.099 105.62C120.339 105.627 120.552 105.647 120.739 105.68C121.599 105.813 122.302 106.097 122.849 106.53C123.402 106.963 123.809 107.51 124.069 108.17C124.329 108.823 124.459 109.553 124.459 110.36C124.459 111.567 124.159 112.6 123.559 113.46C122.959 114.313 122.019 114.84 120.739 115.04L119.539 115.12H116.179V120H113.459ZM121.579 120L118.739 114.14L121.539 113.6L124.659 120H121.579ZM116.179 112.58H119.419C119.559 112.58 119.712 112.573 119.879 112.56C120.045 112.547 120.199 112.52 120.339 112.48C120.705 112.38 120.989 112.213 121.189 111.98C121.389 111.74 121.525 111.477 121.599 111.19C121.679 110.897 121.719 110.62 121.719 110.36C121.719 110.1 121.679 109.827 121.599 109.54C121.525 109.247 121.389 108.983 121.189 108.75C120.989 108.51 120.705 108.34 120.339 108.24C120.199 108.2 120.045 108.173 119.879 108.16C119.712 108.147 119.559 108.14 119.419 108.14H116.179V112.58ZM131.717 120.3C130.63 120.3 129.677 120.057 128.857 119.57C128.037 119.083 127.397 118.413 126.937 117.56C126.484 116.7 126.257 115.713 126.257 114.6C126.257 113.473 126.49 112.483 126.957 111.63C127.424 110.77 128.067 110.1 128.887 109.62C129.707 109.14 130.65 108.9 131.717 108.9C132.804 108.9 133.757 109.143 134.577 109.63C135.404 110.117 136.047 110.79 136.507 111.65C136.967 112.503 137.197 113.487 137.197 114.6C137.197 115.72 136.964 116.71 136.497 117.57C136.037 118.423 135.394 119.093 134.567 119.58C133.747 120.06 132.797 120.3 131.717 120.3ZM131.717 117.76C132.59 117.76 133.24 117.467 133.667 116.88C134.1 116.287 134.317 115.527 134.317 114.6C134.317 113.64 134.097 112.873 133.657 112.3C133.224 111.727 132.577 111.44 131.717 111.44C131.124 111.44 130.637 111.573 130.257 111.84C129.877 112.107 129.594 112.477 129.407 112.95C129.227 113.423 129.137 113.973 129.137 114.6C129.137 115.567 129.354 116.337 129.787 116.91C130.227 117.477 130.87 117.76 131.717 117.76ZM144.256 120.3C143.169 120.3 142.216 120.057 141.396 119.57C140.576 119.083 139.936 118.413 139.476 117.56C139.023 116.7 138.796 115.713 138.796 114.6C138.796 113.473 139.029 112.483 139.496 111.63C139.963 110.77 140.606 110.1 141.426 109.62C142.246 109.14 143.189 108.9 144.256 108.9C145.343 108.9 146.296 109.143 147.116 109.63C147.943 110.117 148.586 110.79 149.046 111.65C149.506 112.503 149.736 113.487 149.736 114.6C149.736 115.72 149.503 116.71 149.036 117.57C148.576 118.423 147.933 119.093 147.106 119.58C146.286 120.06 145.336 120.3 144.256 120.3ZM144.256 117.76C145.129 117.76 145.779 117.467 146.206 116.88C146.639 116.287 146.856 115.527 146.856 114.6C146.856 113.64 146.636 112.873 146.196 112.3C145.763 111.727 145.116 111.44 144.256 111.44C143.663 111.44 143.176 111.573 142.796 111.84C142.416 112.107 142.133 112.477 141.946 112.95C141.766 113.423 141.676 113.973 141.676 114.6C141.676 115.567 141.893 116.337 142.326 116.91C142.766 117.477 143.409 117.76 144.256 117.76ZM164.935 120V113.62C164.935 112.907 164.765 112.353 164.425 111.96C164.092 111.56 163.628 111.36 163.035 111.36C162.655 111.36 162.325 111.45 162.045 111.63C161.765 111.803 161.545 112.05 161.385 112.37C161.232 112.683 161.155 113.047 161.155 113.46L160.015 112.7C160.015 111.96 160.188 111.307 160.535 110.74C160.888 110.173 161.358 109.733 161.945 109.42C162.538 109.1 163.195 108.94 163.915 108.94C165.148 108.94 166.078 109.307 166.705 110.04C167.338 110.767 167.655 111.72 167.655 112.9V120H164.935ZM151.915 120V109.2H154.315V112.78H154.655V120H151.915ZM158.435 120V113.62C158.435 112.907 158.265 112.353 157.925 111.96C157.592 111.56 157.128 111.36 156.535 111.36C155.968 111.36 155.512 111.557 155.165 111.95C154.825 112.337 154.655 112.84 154.655 113.46L153.515 112.66C153.515 111.953 153.692 111.32 154.045 110.76C154.398 110.2 154.872 109.757 155.465 109.43C156.065 109.103 156.735 108.94 157.475 108.94C158.322 108.94 159.015 109.12 159.555 109.48C160.102 109.84 160.505 110.32 160.765 110.92C161.025 111.52 161.155 112.18 161.155 112.9V120H158.435ZM176.759 120V108.56L174.059 110.22V107.22L176.759 105.6H179.539V120H176.759Z"
                                    fill="black" />
                                <rect
                                    x="74"
                                    y="65"
                                    width="146"
                                    height="68"
                                    rx="5"
                                    stroke="#124DBA"
                                    stroke-width="2" />
                            </g>
                            <g id="conference-room-2-label">
                                <rect
                                    x="352"
                                    y="65"
                                    width="146"
                                    height="68"
                                    rx="5"
                                    fill="white" />
                                <path
                                    id="conference-room-2-text"
                                    d="M374.758 93.3C373.318 93.3 372.074 92.9867 371.028 92.36C369.988 91.7333 369.184 90.8567 368.618 89.73C368.058 88.6033 367.778 87.2933 367.778 85.8C367.778 84.3067 368.058 82.9967 368.618 81.87C369.184 80.7433 369.988 79.8667 371.028 79.24C372.074 78.6133 373.318 78.3 374.758 78.3C376.411 78.3 377.798 78.71 378.918 79.53C380.044 80.35 380.838 81.46 381.298 82.86L378.558 83.62C378.291 82.7467 377.841 82.07 377.208 81.59C376.574 81.1033 375.758 80.86 374.758 80.86C373.844 80.86 373.081 81.0633 372.468 81.47C371.861 81.8767 371.404 82.45 371.098 83.19C370.791 83.93 370.638 84.8 370.638 85.8C370.638 86.8 370.791 87.67 371.098 88.41C371.404 89.15 371.861 89.7233 372.468 90.13C373.081 90.5367 373.844 90.74 374.758 90.74C375.758 90.74 376.574 90.4967 377.208 90.01C377.841 89.5233 378.291 88.8467 378.558 87.98L381.298 88.74C380.838 90.14 380.044 91.25 378.918 92.07C377.798 92.89 376.411 93.3 374.758 93.3ZM388.36 93.3C387.273 93.3 386.32 93.0567 385.5 92.57C384.68 92.0833 384.04 91.4133 383.58 90.56C383.126 89.7 382.9 88.7133 382.9 87.6C382.9 86.4733 383.133 85.4833 383.6 84.63C384.066 83.77 384.71 83.1 385.53 82.62C386.35 82.14 387.293 81.9 388.36 81.9C389.446 81.9 390.4 82.1433 391.22 82.63C392.046 83.1167 392.69 83.79 393.15 84.65C393.61 85.5033 393.84 86.4867 393.84 87.6C393.84 88.72 393.606 89.71 393.14 90.57C392.68 91.4233 392.036 92.0933 391.21 92.58C390.39 93.06 389.44 93.3 388.36 93.3ZM388.36 90.76C389.233 90.76 389.883 90.4667 390.31 89.88C390.743 89.2867 390.96 88.5267 390.96 87.6C390.96 86.64 390.74 85.8733 390.3 85.3C389.866 84.7267 389.22 84.44 388.36 84.44C387.766 84.44 387.28 84.5733 386.9 84.84C386.52 85.1067 386.236 85.4767 386.05 85.95C385.87 86.4233 385.78 86.9733 385.78 87.6C385.78 88.5667 385.996 89.3367 386.43 89.91C386.87 90.4767 387.513 90.76 388.36 90.76ZM403.399 93V87.9C403.399 87.6533 403.385 87.34 403.359 86.96C403.332 86.5733 403.249 86.1867 403.109 85.8C402.969 85.4133 402.739 85.09 402.419 84.83C402.105 84.57 401.659 84.44 401.079 84.44C400.845 84.44 400.595 84.4767 400.329 84.55C400.062 84.6233 399.812 84.7667 399.579 84.98C399.345 85.1867 399.152 85.4933 398.999 85.9C398.852 86.3067 398.779 86.8467 398.779 87.52L397.219 86.78C397.219 85.9267 397.392 85.1267 397.739 84.38C398.085 83.6333 398.605 83.03 399.299 82.57C399.999 82.11 400.879 81.88 401.939 81.88C402.785 81.88 403.475 82.0233 404.009 82.31C404.542 82.5967 404.955 82.96 405.249 83.4C405.549 83.84 405.762 84.3 405.889 84.78C406.015 85.2533 406.092 85.6867 406.119 86.08C406.145 86.4733 406.159 86.76 406.159 86.94V93H403.399ZM396.019 93V82.2H398.439V85.78H398.779V93H396.019ZM409.654 93V82.24C409.654 81.9667 409.66 81.6567 409.674 81.31C409.687 80.9633 409.74 80.6133 409.834 80.26C409.934 79.9067 410.114 79.5867 410.374 79.3C410.707 78.9267 411.067 78.6733 411.454 78.54C411.847 78.4 412.227 78.3267 412.594 78.32C412.96 78.3067 413.274 78.3 413.534 78.3H414.874V80.5H413.634C413.207 80.5 412.89 80.61 412.684 80.83C412.477 81.0433 412.374 81.3 412.374 81.6V93H409.654ZM407.954 84.3V82.2H414.874V84.3H407.954ZM421.098 93.3C419.991 93.3 419.014 93.0633 418.168 92.59C417.328 92.11 416.668 91.4533 416.188 90.62C415.714 89.78 415.478 88.82 415.478 87.74C415.478 86.56 415.711 85.5333 416.178 84.66C416.644 83.7867 417.288 83.11 418.108 82.63C418.928 82.1433 419.871 81.9 420.938 81.9C422.071 81.9 423.034 82.1667 423.828 82.7C424.621 83.2333 425.208 83.9833 425.588 84.95C425.968 85.9167 426.101 87.0533 425.988 88.36H423.298V87.36C423.298 86.26 423.121 85.47 422.768 84.99C422.421 84.5033 421.851 84.26 421.058 84.26C420.131 84.26 419.448 84.5433 419.008 85.11C418.574 85.67 418.358 86.5 418.358 87.6C418.358 88.6067 418.574 89.3867 419.008 89.94C419.448 90.4867 420.091 90.76 420.938 90.76C421.471 90.76 421.928 90.6433 422.308 90.41C422.688 90.1767 422.978 89.84 423.178 89.4L425.898 90.18C425.491 91.1667 424.848 91.9333 423.968 92.48C423.094 93.0267 422.138 93.3 421.098 93.3ZM417.518 88.36V86.34H424.678V88.36H417.518ZM428.246 93V82.2H430.646V84.84L430.386 84.5C430.526 84.1267 430.712 83.7867 430.946 83.48C431.179 83.1733 431.466 82.92 431.806 82.72C432.066 82.56 432.349 82.4367 432.656 82.35C432.962 82.2567 433.279 82.2 433.606 82.18C433.932 82.1533 434.259 82.16 434.586 82.2V84.74C434.286 84.6467 433.936 84.6167 433.536 84.65C433.142 84.6767 432.786 84.7667 432.466 84.92C432.146 85.0667 431.876 85.2633 431.656 85.51C431.436 85.75 431.269 86.0367 431.156 86.37C431.042 86.6967 430.986 87.0667 430.986 87.48V93H428.246ZM441.313 93.3C440.206 93.3 439.229 93.0633 438.383 92.59C437.543 92.11 436.883 91.4533 436.403 90.62C435.929 89.78 435.693 88.82 435.693 87.74C435.693 86.56 435.926 85.5333 436.393 84.66C436.859 83.7867 437.503 83.11 438.323 82.63C439.143 82.1433 440.086 81.9 441.153 81.9C442.286 81.9 443.249 82.1667 444.043 82.7C444.836 83.2333 445.423 83.9833 445.803 84.95C446.183 85.9167 446.316 87.0533 446.203 88.36H443.513V87.36C443.513 86.26 443.336 85.47 442.983 84.99C442.636 84.5033 442.066 84.26 441.273 84.26C440.346 84.26 439.663 84.5433 439.223 85.11C438.789 85.67 438.573 86.5 438.573 87.6C438.573 88.6067 438.789 89.3867 439.223 89.94C439.663 90.4867 440.306 90.76 441.153 90.76C441.686 90.76 442.143 90.6433 442.523 90.41C442.903 90.1767 443.193 89.84 443.393 89.4L446.113 90.18C445.706 91.1667 445.063 91.9333 444.183 92.48C443.309 93.0267 442.353 93.3 441.313 93.3ZM437.733 88.36V86.34H444.893V88.36H437.733ZM455.528 93V87.9C455.528 87.6533 455.514 87.34 455.488 86.96C455.461 86.5733 455.378 86.1867 455.238 85.8C455.098 85.4133 454.868 85.09 454.548 84.83C454.234 84.57 453.788 84.44 453.208 84.44C452.974 84.44 452.724 84.4767 452.458 84.55C452.191 84.6233 451.941 84.7667 451.708 84.98C451.474 85.1867 451.281 85.4933 451.128 85.9C450.981 86.3067 450.908 86.8467 450.908 87.52L449.348 86.78C449.348 85.9267 449.521 85.1267 449.868 84.38C450.214 83.6333 450.734 83.03 451.428 82.57C452.128 82.11 453.008 81.88 454.068 81.88C454.914 81.88 455.604 82.0233 456.138 82.31C456.671 82.5967 457.084 82.96 457.378 83.4C457.678 83.84 457.891 84.3 458.018 84.78C458.144 85.2533 458.221 85.6867 458.248 86.08C458.274 86.4733 458.288 86.76 458.288 86.94V93H455.528ZM448.148 93V82.2H450.568V85.78H450.908V93H448.148ZM465.447 93.3C464.327 93.3 463.367 93.05 462.567 92.55C461.767 92.05 461.154 91.37 460.727 90.51C460.3 89.65 460.087 88.68 460.087 87.6C460.087 86.5067 460.307 85.53 460.747 84.67C461.194 83.81 461.82 83.1333 462.627 82.64C463.434 82.1467 464.387 81.9 465.487 81.9C466.76 81.9 467.827 82.2233 468.687 82.87C469.554 83.51 470.107 84.3867 470.347 85.5L467.627 86.22C467.467 85.66 467.187 85.2233 466.787 84.91C466.394 84.5967 465.947 84.44 465.447 84.44C464.874 84.44 464.404 84.58 464.037 84.86C463.67 85.1333 463.4 85.51 463.227 85.99C463.054 86.4633 462.967 87 462.967 87.6C462.967 88.54 463.174 89.3033 463.587 89.89C464.007 90.47 464.627 90.76 465.447 90.76C466.06 90.76 466.527 90.62 466.847 90.34C467.167 90.06 467.407 89.66 467.567 89.14L470.347 89.72C470.04 90.8667 469.46 91.75 468.607 92.37C467.754 92.99 466.7 93.3 465.447 93.3ZM477.074 93.3C475.968 93.3 474.991 93.0633 474.144 92.59C473.304 92.11 472.644 91.4533 472.164 90.62C471.691 89.78 471.454 88.82 471.454 87.74C471.454 86.56 471.688 85.5333 472.154 84.66C472.621 83.7867 473.264 83.11 474.084 82.63C474.904 82.1433 475.848 81.9 476.914 81.9C478.048 81.9 479.011 82.1667 479.804 82.7C480.598 83.2333 481.184 83.9833 481.564 84.95C481.944 85.9167 482.078 87.0533 481.964 88.36H479.274V87.36C479.274 86.26 479.098 85.47 478.744 84.99C478.398 84.5033 477.828 84.26 477.034 84.26C476.108 84.26 475.424 84.5433 474.984 85.11C474.551 85.67 474.334 86.5 474.334 87.6C474.334 88.6067 474.551 89.3867 474.984 89.94C475.424 90.4867 476.068 90.76 476.914 90.76C477.448 90.76 477.904 90.6433 478.284 90.41C478.664 90.1767 478.954 89.84 479.154 89.4L481.874 90.18C481.468 91.1667 480.824 91.9333 479.944 92.48C479.071 93.0267 478.114 93.3 477.074 93.3ZM473.494 88.36V86.34H480.654V88.36H473.494ZM389.964 120V105.6H396.044C396.184 105.6 396.371 105.607 396.604 105.62C396.844 105.627 397.058 105.647 397.244 105.68C398.104 105.813 398.808 106.097 399.354 106.53C399.908 106.963 400.314 107.51 400.574 108.17C400.834 108.823 400.964 109.553 400.964 110.36C400.964 111.567 400.664 112.6 400.064 113.46C399.464 114.313 398.524 114.84 397.244 115.04L396.044 115.12H392.684V120H389.964ZM398.084 120L395.244 114.14L398.044 113.6L401.164 120H398.084ZM392.684 112.58H395.924C396.064 112.58 396.218 112.573 396.384 112.56C396.551 112.547 396.704 112.52 396.844 112.48C397.211 112.38 397.494 112.213 397.694 111.98C397.894 111.74 398.031 111.477 398.104 111.19C398.184 110.897 398.224 110.62 398.224 110.36C398.224 110.1 398.184 109.827 398.104 109.54C398.031 109.247 397.894 108.983 397.694 108.75C397.494 108.51 397.211 108.34 396.844 108.24C396.704 108.2 396.551 108.173 396.384 108.16C396.218 108.147 396.064 108.14 395.924 108.14H392.684V112.58ZM408.223 120.3C407.136 120.3 406.183 120.057 405.363 119.57C404.543 119.083 403.903 118.413 403.443 117.56C402.99 116.7 402.763 115.713 402.763 114.6C402.763 113.473 402.996 112.483 403.463 111.63C403.93 110.77 404.573 110.1 405.393 109.62C406.213 109.14 407.156 108.9 408.223 108.9C409.31 108.9 410.263 109.143 411.083 109.63C411.91 110.117 412.553 110.79 413.013 111.65C413.473 112.503 413.703 113.487 413.703 114.6C413.703 115.72 413.47 116.71 413.003 117.57C412.543 118.423 411.9 119.093 411.073 119.58C410.253 120.06 409.303 120.3 408.223 120.3ZM408.223 117.76C409.096 117.76 409.746 117.467 410.173 116.88C410.606 116.287 410.823 115.527 410.823 114.6C410.823 113.64 410.603 112.873 410.163 112.3C409.73 111.727 409.083 111.44 408.223 111.44C407.63 111.44 407.143 111.573 406.763 111.84C406.383 112.107 406.1 112.477 405.913 112.95C405.733 113.423 405.643 113.973 405.643 114.6C405.643 115.567 405.86 116.337 406.293 116.91C406.733 117.477 407.376 117.76 408.223 117.76ZM420.762 120.3C419.675 120.3 418.722 120.057 417.902 119.57C417.082 119.083 416.442 118.413 415.982 117.56C415.529 116.7 415.302 115.713 415.302 114.6C415.302 113.473 415.535 112.483 416.002 111.63C416.469 110.77 417.112 110.1 417.932 109.62C418.752 109.14 419.695 108.9 420.762 108.9C421.849 108.9 422.802 109.143 423.622 109.63C424.449 110.117 425.092 110.79 425.552 111.65C426.012 112.503 426.242 113.487 426.242 114.6C426.242 115.72 426.009 116.71 425.542 117.57C425.082 118.423 424.439 119.093 423.612 119.58C422.792 120.06 421.842 120.3 420.762 120.3ZM420.762 117.76C421.635 117.76 422.285 117.467 422.712 116.88C423.145 116.287 423.362 115.527 423.362 114.6C423.362 113.64 423.142 112.873 422.702 112.3C422.269 111.727 421.622 111.44 420.762 111.44C420.169 111.44 419.682 111.573 419.302 111.84C418.922 112.107 418.639 112.477 418.452 112.95C418.272 113.423 418.182 113.973 418.182 114.6C418.182 115.567 418.399 116.337 418.832 116.91C419.272 117.477 419.915 117.76 420.762 117.76ZM441.441 120V113.62C441.441 112.907 441.271 112.353 440.931 111.96C440.598 111.56 440.134 111.36 439.541 111.36C439.161 111.36 438.831 111.45 438.551 111.63C438.271 111.803 438.051 112.05 437.891 112.37C437.738 112.683 437.661 113.047 437.661 113.46L436.521 112.7C436.521 111.96 436.694 111.307 437.041 110.74C437.394 110.173 437.864 109.733 438.451 109.42C439.044 109.1 439.701 108.94 440.421 108.94C441.654 108.94 442.584 109.307 443.211 110.04C443.844 110.767 444.161 111.72 444.161 112.9V120H441.441ZM428.421 120V109.2H430.821V112.78H431.161V120H428.421ZM434.941 120V113.62C434.941 112.907 434.771 112.353 434.431 111.96C434.098 111.56 433.634 111.36 433.041 111.36C432.474 111.36 432.018 111.557 431.671 111.95C431.331 112.337 431.161 112.84 431.161 113.46L430.021 112.66C430.021 111.953 430.198 111.32 430.551 110.76C430.904 110.2 431.378 109.757 431.971 109.43C432.571 109.103 433.241 108.94 433.981 108.94C434.828 108.94 435.521 109.12 436.061 109.48C436.608 109.84 437.011 110.32 437.271 110.92C437.531 111.52 437.661 112.18 437.661 112.9V120H434.941ZM450.365 119.98V117.62L456.405 112.26C456.859 111.86 457.179 111.483 457.365 111.13C457.552 110.777 457.645 110.447 457.645 110.14C457.645 109.7 457.555 109.31 457.375 108.97C457.195 108.623 456.942 108.353 456.615 108.16C456.289 107.96 455.905 107.86 455.465 107.86C455.005 107.86 454.599 107.967 454.245 108.18C453.899 108.387 453.629 108.663 453.435 109.01C453.242 109.35 453.152 109.72 453.165 110.12H450.365C450.365 109.133 450.582 108.28 451.015 107.56C451.449 106.84 452.052 106.283 452.825 105.89C453.599 105.497 454.499 105.3 455.525 105.3C456.465 105.3 457.305 105.507 458.045 105.92C458.792 106.327 459.379 106.897 459.805 107.63C460.232 108.363 460.445 109.213 460.445 110.18C460.445 110.893 460.345 111.487 460.145 111.96C459.945 112.427 459.649 112.86 459.255 113.26C458.862 113.653 458.379 114.1 457.805 114.6L453.905 118.02L453.685 117.42H460.445V119.98H450.365Z"
                                    fill="black" />
                                <rect
                                    x="352"
                                    y="65"
                                    width="146"
                                    height="68"
                                    rx="5"
                                    stroke="#124DBA"
                                    stroke-width="2" />
                            </g>
                            <g id="university-president-label">
                                <rect
                                    x="640"
                                    y="65"
                                    width="131"
                                    height="68"
                                    rx="5"
                                    fill="white" />
                                <path
                                    id="university-president-text"
                                    d="M662.262 93.3C661.102 93.3 660.082 93.0667 659.202 92.6C658.322 92.1267 657.635 91.4633 657.142 90.61C656.649 89.7567 656.402 88.7533 656.402 87.6V78.62L659.162 78.6V87.58C659.162 88.0533 659.242 88.4833 659.402 88.87C659.562 89.2567 659.782 89.59 660.062 89.87C660.349 90.15 660.679 90.3667 661.052 90.52C661.432 90.6667 661.835 90.74 662.262 90.74C662.702 90.74 663.109 90.6633 663.482 90.51C663.862 90.3567 664.192 90.14 664.472 89.86C664.752 89.58 664.969 89.2467 665.122 88.86C665.282 88.4733 665.362 88.0467 665.362 87.58V78.6H668.122V87.6C668.122 88.7533 667.875 89.7567 667.382 90.61C666.889 91.4633 666.202 92.1267 665.322 92.6C664.442 93.0667 663.422 93.3 662.262 93.3ZM678.274 93V87.9C678.274 87.6533 678.26 87.34 678.234 86.96C678.207 86.5733 678.124 86.1867 677.984 85.8C677.844 85.4133 677.614 85.09 677.294 84.83C676.98 84.57 676.534 84.44 675.954 84.44C675.72 84.44 675.47 84.4767 675.204 84.55C674.937 84.6233 674.687 84.7667 674.454 84.98C674.22 85.1867 674.027 85.4933 673.874 85.9C673.727 86.3067 673.654 86.8467 673.654 87.52L672.094 86.78C672.094 85.9267 672.267 85.1267 672.614 84.38C672.96 83.6333 673.48 83.03 674.174 82.57C674.874 82.11 675.754 81.88 676.814 81.88C677.66 81.88 678.35 82.0233 678.884 82.31C679.417 82.5967 679.83 82.96 680.124 83.4C680.424 83.84 680.637 84.3 680.764 84.78C680.89 85.2533 680.967 85.6867 680.994 86.08C681.02 86.4733 681.034 86.76 681.034 86.94V93H678.274ZM670.894 93V82.2H673.314V85.78H673.654V93H670.894ZM683.829 80.7V78.3H686.549V80.7H683.829ZM683.829 93V82.2H686.549V93H683.829ZM692.466 93L688.546 82.2H691.266L693.826 89.68L696.386 82.2H699.106L695.186 93H692.466ZM705.543 93.3C704.436 93.3 703.46 93.0633 702.613 92.59C701.773 92.11 701.113 91.4533 700.633 90.62C700.16 89.78 699.923 88.82 699.923 87.74C699.923 86.56 700.156 85.5333 700.623 84.66C701.09 83.7867 701.733 83.11 702.553 82.63C703.373 82.1433 704.316 81.9 705.383 81.9C706.516 81.9 707.48 82.1667 708.273 82.7C709.066 83.2333 709.653 83.9833 710.033 84.95C710.413 85.9167 710.546 87.0533 710.433 88.36H707.743V87.36C707.743 86.26 707.566 85.47 707.213 84.99C706.866 84.5033 706.296 84.26 705.503 84.26C704.576 84.26 703.893 84.5433 703.453 85.11C703.02 85.67 702.803 86.5 702.803 87.6C702.803 88.6067 703.02 89.3867 703.453 89.94C703.893 90.4867 704.536 90.76 705.383 90.76C705.916 90.76 706.373 90.6433 706.753 90.41C707.133 90.1767 707.423 89.84 707.623 89.4L710.343 90.18C709.936 91.1667 709.293 91.9333 708.413 92.48C707.54 93.0267 706.583 93.3 705.543 93.3ZM701.963 88.36V86.34H709.123V88.36H701.963ZM712.691 93V82.2H715.091V84.84L714.831 84.5C714.971 84.1267 715.158 83.7867 715.391 83.48C715.624 83.1733 715.911 82.92 716.251 82.72C716.511 82.56 716.794 82.4367 717.101 82.35C717.408 82.2567 717.724 82.2 718.051 82.18C718.378 82.1533 718.704 82.16 719.031 82.2V84.74C718.731 84.6467 718.381 84.6167 717.981 84.65C717.588 84.6767 717.231 84.7667 716.911 84.92C716.591 85.0667 716.321 85.2633 716.101 85.51C715.881 85.75 715.714 86.0367 715.601 86.37C715.488 86.6967 715.431 87.0667 715.431 87.48V93H712.691ZM724.763 93.3C723.403 93.3 722.303 92.9933 721.463 92.38C720.629 91.76 720.123 90.8867 719.943 89.76L722.723 89.34C722.836 89.8467 723.086 90.2433 723.473 90.53C723.866 90.8167 724.363 90.96 724.963 90.96C725.456 90.96 725.836 90.8667 726.103 90.68C726.369 90.4867 726.503 90.22 726.503 89.88C726.503 89.6667 726.449 89.4967 726.343 89.37C726.236 89.2367 725.996 89.1067 725.623 88.98C725.256 88.8533 724.683 88.6867 723.903 88.48C723.023 88.2533 722.319 88 721.793 87.72C721.266 87.44 720.886 87.1067 720.653 86.72C720.419 86.3267 720.303 85.8533 720.303 85.3C720.303 84.6067 720.479 84.0067 720.833 83.5C721.186 82.9867 721.683 82.5933 722.323 82.32C722.969 82.04 723.729 81.9 724.603 81.9C725.449 81.9 726.199 82.03 726.853 82.29C727.506 82.55 728.033 82.92 728.433 83.4C728.839 83.88 729.089 84.4467 729.183 85.1L726.403 85.6C726.356 85.2 726.183 84.8833 725.883 84.65C725.583 84.4167 725.176 84.28 724.663 84.24C724.163 84.2067 723.759 84.2733 723.453 84.44C723.153 84.6067 723.003 84.8467 723.003 85.16C723.003 85.3467 723.066 85.5033 723.193 85.63C723.326 85.7567 723.596 85.8867 724.003 86.02C724.416 86.1533 725.043 86.3267 725.883 86.54C726.703 86.7533 727.359 87.0033 727.853 87.29C728.353 87.57 728.716 87.91 728.943 88.31C729.169 88.7033 729.283 89.18 729.283 89.74C729.283 90.8467 728.883 91.7167 728.083 92.35C727.283 92.9833 726.176 93.3 724.763 93.3ZM731.68 80.7V78.3H734.4V80.7H731.68ZM731.68 93V82.2H734.4V93H731.68ZM743.878 93C743.131 93.14 742.398 93.2 741.678 93.18C740.965 93.1667 740.325 93.0433 739.758 92.81C739.198 92.57 738.771 92.1867 738.478 91.66C738.211 91.1667 738.071 90.6667 738.058 90.16C738.045 89.6467 738.038 89.0667 738.038 88.42V79.2H740.758V88.26C740.758 88.68 740.761 89.06 740.768 89.4C740.781 89.7333 740.851 90 740.978 90.2C741.218 90.58 741.601 90.7867 742.128 90.82C742.655 90.8533 743.238 90.8267 743.878 90.74V93ZM736.198 84.3V82.2H743.878V84.3H736.198ZM747.372 97.8L749.452 92.08L749.492 93.76L744.792 82.2H747.612L750.772 90.38H750.132L753.272 82.2H755.992L749.892 97.8H747.372ZM658.873 120V105.6H664.953C665.093 105.6 665.279 105.607 665.513 105.62C665.753 105.627 665.966 105.647 666.153 105.68C667.013 105.813 667.716 106.097 668.263 106.53C668.816 106.963 669.223 107.51 669.483 108.17C669.743 108.823 669.873 109.553 669.873 110.36C669.873 111.167 669.739 111.9 669.473 112.56C669.213 113.213 668.806 113.757 668.253 114.19C667.706 114.623 667.006 114.907 666.153 115.04C665.966 115.067 665.753 115.087 665.513 115.1C665.273 115.113 665.086 115.12 664.953 115.12H661.593V120H658.873ZM661.593 112.58H664.833C664.973 112.58 665.126 112.573 665.293 112.56C665.459 112.547 665.613 112.52 665.753 112.48C666.119 112.38 666.403 112.213 666.603 111.98C666.803 111.74 666.939 111.477 667.013 111.19C667.093 110.897 667.133 110.62 667.133 110.36C667.133 110.1 667.093 109.827 667.013 109.54C666.939 109.247 666.803 108.983 666.603 108.75C666.403 108.51 666.119 108.34 665.753 108.24C665.613 108.2 665.459 108.173 665.293 108.16C665.126 108.147 664.973 108.14 664.833 108.14H661.593V112.58ZM671.88 120V109.2H674.28V111.84L674.02 111.5C674.16 111.127 674.347 110.787 674.58 110.48C674.814 110.173 675.1 109.92 675.44 109.72C675.7 109.56 675.984 109.437 676.29 109.35C676.597 109.257 676.914 109.2 677.24 109.18C677.567 109.153 677.894 109.16 678.22 109.2V111.74C677.92 111.647 677.57 111.617 677.17 111.65C676.777 111.677 676.42 111.767 676.1 111.92C675.78 112.067 675.51 112.263 675.29 112.51C675.07 112.75 674.904 113.037 674.79 113.37C674.677 113.697 674.62 114.067 674.62 114.48V120H671.88ZM684.947 120.3C683.841 120.3 682.864 120.063 682.017 119.59C681.177 119.11 680.517 118.453 680.037 117.62C679.564 116.78 679.327 115.82 679.327 114.74C679.327 113.56 679.561 112.533 680.027 111.66C680.494 110.787 681.137 110.11 681.957 109.63C682.777 109.143 683.721 108.9 684.787 108.9C685.921 108.9 686.884 109.167 687.677 109.7C688.471 110.233 689.057 110.983 689.437 111.95C689.817 112.917 689.951 114.053 689.837 115.36H687.147V114.36C687.147 113.26 686.971 112.47 686.617 111.99C686.271 111.503 685.701 111.26 684.907 111.26C683.981 111.26 683.297 111.543 682.857 112.11C682.424 112.67 682.207 113.5 682.207 114.6C682.207 115.607 682.424 116.387 682.857 116.94C683.297 117.487 683.941 117.76 684.787 117.76C685.321 117.76 685.777 117.643 686.157 117.41C686.537 117.177 686.827 116.84 687.027 116.4L689.747 117.18C689.341 118.167 688.697 118.933 687.817 119.48C686.944 120.027 685.987 120.3 684.947 120.3ZM681.367 115.36V113.34H688.527V115.36H681.367ZM696.315 120.3C694.955 120.3 693.855 119.993 693.015 119.38C692.182 118.76 691.675 117.887 691.495 116.76L694.275 116.34C694.389 116.847 694.639 117.243 695.025 117.53C695.419 117.817 695.915 117.96 696.515 117.96C697.009 117.96 697.389 117.867 697.655 117.68C697.922 117.487 698.055 117.22 698.055 116.88C698.055 116.667 698.002 116.497 697.895 116.37C697.789 116.237 697.549 116.107 697.175 115.98C696.809 115.853 696.235 115.687 695.455 115.48C694.575 115.253 693.872 115 693.345 114.72C692.819 114.44 692.439 114.107 692.205 113.72C691.972 113.327 691.855 112.853 691.855 112.3C691.855 111.607 692.032 111.007 692.385 110.5C692.739 109.987 693.235 109.593 693.875 109.32C694.522 109.04 695.282 108.9 696.155 108.9C697.002 108.9 697.752 109.03 698.405 109.29C699.059 109.55 699.585 109.92 699.985 110.4C700.392 110.88 700.642 111.447 700.735 112.1L697.955 112.6C697.909 112.2 697.735 111.883 697.435 111.65C697.135 111.417 696.729 111.28 696.215 111.24C695.715 111.207 695.312 111.273 695.005 111.44C694.705 111.607 694.555 111.847 694.555 112.16C694.555 112.347 694.619 112.503 694.745 112.63C694.879 112.757 695.149 112.887 695.555 113.02C695.969 113.153 696.595 113.327 697.435 113.54C698.255 113.753 698.912 114.003 699.405 114.29C699.905 114.57 700.269 114.91 700.495 115.31C700.722 115.703 700.835 116.18 700.835 116.74C700.835 117.847 700.435 118.717 699.635 119.35C698.835 119.983 697.729 120.3 696.315 120.3ZM703.233 107.7V105.3H705.953V107.7H703.233ZM703.233 120V109.2H705.953V120H703.233ZM713.331 120.3C712.337 120.3 711.467 120.05 710.721 119.55C709.974 119.05 709.391 118.37 708.971 117.51C708.557 116.65 708.351 115.68 708.351 114.6C708.351 113.5 708.561 112.523 708.981 111.67C709.407 110.81 710.004 110.133 710.771 109.64C711.537 109.147 712.437 108.9 713.471 108.9C714.497 108.9 715.361 109.15 716.061 109.65C716.761 110.15 717.291 110.83 717.651 111.69C718.011 112.55 718.191 113.52 718.191 114.6C718.191 115.68 718.007 116.65 717.641 117.51C717.281 118.37 716.741 119.05 716.021 119.55C715.301 120.05 714.404 120.3 713.331 120.3ZM713.771 117.88C714.377 117.88 714.861 117.743 715.221 117.47C715.587 117.197 715.851 116.813 716.011 116.32C716.171 115.827 716.251 115.253 716.251 114.6C716.251 113.947 716.171 113.373 716.011 112.88C715.851 112.387 715.594 112.003 715.241 111.73C714.894 111.457 714.437 111.32 713.871 111.32C713.264 111.32 712.764 111.47 712.371 111.77C711.984 112.063 711.697 112.46 711.511 112.96C711.324 113.453 711.231 114 711.231 114.6C711.231 115.207 711.321 115.76 711.501 116.26C711.681 116.753 711.957 117.147 712.331 117.44C712.704 117.733 713.184 117.88 713.771 117.88ZM716.251 120V112.6H715.911V105.6H718.651V120H716.251ZM726.471 120.3C725.364 120.3 724.387 120.063 723.541 119.59C722.701 119.11 722.041 118.453 721.561 117.62C721.087 116.78 720.851 115.82 720.851 114.74C720.851 113.56 721.084 112.533 721.551 111.66C722.017 110.787 722.661 110.11 723.481 109.63C724.301 109.143 725.244 108.9 726.311 108.9C727.444 108.9 728.407 109.167 729.201 109.7C729.994 110.233 730.581 110.983 730.961 111.95C731.341 112.917 731.474 114.053 731.361 115.36H728.671V114.36C728.671 113.26 728.494 112.47 728.141 111.99C727.794 111.503 727.224 111.26 726.431 111.26C725.504 111.26 724.821 111.543 724.381 112.11C723.947 112.67 723.731 113.5 723.731 114.6C723.731 115.607 723.947 116.387 724.381 116.94C724.821 117.487 725.464 117.76 726.311 117.76C726.844 117.76 727.301 117.643 727.681 117.41C728.061 117.177 728.351 116.84 728.551 116.4L731.271 117.18C730.864 118.167 730.221 118.933 729.341 119.48C728.467 120.027 727.511 120.3 726.471 120.3ZM722.891 115.36V113.34H730.051V115.36H722.891ZM740.686 120V114.9C740.686 114.653 740.672 114.34 740.646 113.96C740.619 113.573 740.536 113.187 740.396 112.8C740.256 112.413 740.026 112.09 739.706 111.83C739.392 111.57 738.946 111.44 738.366 111.44C738.132 111.44 737.882 111.477 737.616 111.55C737.349 111.623 737.099 111.767 736.866 111.98C736.632 112.187 736.439 112.493 736.286 112.9C736.139 113.307 736.066 113.847 736.066 114.52L734.506 113.78C734.506 112.927 734.679 112.127 735.026 111.38C735.372 110.633 735.892 110.03 736.586 109.57C737.286 109.11 738.166 108.88 739.226 108.88C740.072 108.88 740.762 109.023 741.296 109.31C741.829 109.597 742.242 109.96 742.536 110.4C742.836 110.84 743.049 111.3 743.176 111.78C743.302 112.253 743.379 112.687 743.406 113.08C743.432 113.473 743.446 113.76 743.446 113.94V120H740.686ZM733.306 120V109.2H735.726V112.78H736.066V120H733.306ZM752.521 120C751.774 120.14 751.041 120.2 750.321 120.18C749.607 120.167 748.967 120.043 748.401 119.81C747.841 119.57 747.414 119.187 747.121 118.66C746.854 118.167 746.714 117.667 746.701 117.16C746.687 116.647 746.681 116.067 746.681 115.42V106.2H749.401V115.26C749.401 115.68 749.404 116.06 749.411 116.4C749.424 116.733 749.494 117 749.621 117.2C749.861 117.58 750.244 117.787 750.771 117.82C751.297 117.853 751.881 117.827 752.521 117.74V120ZM744.841 111.3V109.2H752.521V111.3H744.841Z"
                                    fill="black" />
                                <rect
                                    x="640"
                                    y="65"
                                    width="131"
                                    height="68"
                                    rx="5"
                                    stroke="#124DBA"
                                    stroke-width="2" />
                            </g>
                            <g id="admin-label">
                                <rect
                                    x="939"
                                    y="78"
                                    width="94"
                                    height="41"
                                    rx="5"
                                    fill="white" />
                                <path
                                    id="admin-text"
                                    d="M954.847 106L959.247 91.6H963.307L967.707 106H964.907L960.987 93.3H961.507L957.647 106H954.847ZM957.487 103V100.46H965.087V103H957.487ZM973.88 106.3C972.886 106.3 972.016 106.05 971.27 105.55C970.523 105.05 969.94 104.37 969.52 103.51C969.106 102.65 968.9 101.68 968.9 100.6C968.9 99.5 969.11 98.5233 969.53 97.67C969.956 96.81 970.553 96.1333 971.32 95.64C972.086 95.1467 972.986 94.9 974.02 94.9C975.046 94.9 975.91 95.15 976.61 95.65C977.31 96.15 977.84 96.83 978.2 97.69C978.56 98.55 978.74 99.52 978.74 100.6C978.74 101.68 978.556 102.65 978.19 103.51C977.83 104.37 977.29 105.05 976.57 105.55C975.85 106.05 974.953 106.3 973.88 106.3ZM974.32 103.88C974.926 103.88 975.41 103.743 975.77 103.47C976.136 103.197 976.4 102.813 976.56 102.32C976.72 101.827 976.8 101.253 976.8 100.6C976.8 99.9467 976.72 99.3733 976.56 98.88C976.4 98.3867 976.143 98.0033 975.79 97.73C975.443 97.4567 974.986 97.32 974.42 97.32C973.813 97.32 973.313 97.47 972.92 97.77C972.533 98.0633 972.246 98.46 972.06 98.96C971.873 99.4533 971.78 100 971.78 100.6C971.78 101.207 971.87 101.76 972.05 102.26C972.23 102.753 972.506 103.147 972.88 103.44C973.253 103.733 973.733 103.88 974.32 103.88ZM976.8 106V98.6H976.46V91.6H979.2V106H976.8ZM995 106V99.62C995 98.9067 994.83 98.3533 994.49 97.96C994.156 97.56 993.693 97.36 993.1 97.36C992.72 97.36 992.39 97.45 992.11 97.63C991.83 97.8033 991.61 98.05 991.45 98.37C991.296 98.6833 991.22 99.0467 991.22 99.46L990.08 98.7C990.08 97.96 990.253 97.3067 990.6 96.74C990.953 96.1733 991.423 95.7333 992.01 95.42C992.603 95.1 993.26 94.94 993.98 94.94C995.213 94.94 996.143 95.3067 996.77 96.04C997.403 96.7667 997.72 97.72 997.72 98.9V106H995ZM981.98 106V95.2H984.38V98.78H984.72V106H981.98ZM988.5 106V99.62C988.5 98.9067 988.33 98.3533 987.99 97.96C987.656 97.56 987.193 97.36 986.6 97.36C986.033 97.36 985.576 97.5567 985.23 97.95C984.89 98.3367 984.72 98.84 984.72 99.46L983.58 98.66C983.58 97.9533 983.756 97.32 984.11 96.76C984.463 96.2 984.936 95.7567 985.53 95.43C986.13 95.1033 986.8 94.94 987.54 94.94C988.386 94.94 989.08 95.12 989.62 95.48C990.166 95.84 990.57 96.32 990.83 96.92C991.09 97.52 991.22 98.18 991.22 98.9V106H988.5ZM1000.52 93.7V91.3H1003.24V93.7H1000.52ZM1000.52 106V95.2H1003.24V106H1000.52ZM1013.6 106V100.9C1013.6 100.653 1013.58 100.34 1013.56 99.96C1013.53 99.5733 1013.45 99.1867 1013.31 98.8C1013.17 98.4133 1012.94 98.09 1012.62 97.83C1012.3 97.57 1011.86 97.44 1011.28 97.44C1011.04 97.44 1010.79 97.4767 1010.53 97.55C1010.26 97.6233 1010.01 97.7667 1009.78 97.98C1009.54 98.1867 1009.35 98.4933 1009.2 98.9C1009.05 99.3067 1008.98 99.8467 1008.98 100.52L1007.42 99.78C1007.42 98.9267 1007.59 98.1267 1007.94 97.38C1008.28 96.6333 1008.8 96.03 1009.5 95.57C1010.2 95.11 1011.08 94.88 1012.14 94.88C1012.98 94.88 1013.67 95.0233 1014.21 95.31C1014.74 95.5967 1015.15 95.96 1015.45 96.4C1015.75 96.84 1015.96 97.3 1016.09 97.78C1016.21 98.2533 1016.29 98.6867 1016.32 99.08C1016.34 99.4733 1016.36 99.76 1016.36 99.94V106H1013.6ZM1006.22 106V95.2H1008.64V98.78H1008.98V106H1006.22Z"
                                    fill="black" />
                                <rect
                                    x="939"
                                    y="78"
                                    width="94"
                                    height="41"
                                    rx="5"
                                    stroke="#124DBA"
                                    stroke-width="2" />
                            </g>
                            <g id="deans-office">
                                <rect
                                    x="1219"
                                    y="65"
                                    width="96"
                                    height="68"
                                    rx="5"
                                    fill="white" />
                                <path
                                    id="deans-office"
                                    d="M1235.81 93V78.6H1240.47C1240.59 78.6 1240.82 78.6033 1241.17 78.61C1241.53 78.6167 1241.87 78.64 1242.19 78.68C1243.35 78.82 1244.34 79.2233 1245.14 79.89C1245.95 80.5567 1246.56 81.4033 1246.98 82.43C1247.4 83.4567 1247.61 84.58 1247.61 85.8C1247.61 87.02 1247.4 88.1433 1246.98 89.17C1246.56 90.1967 1245.95 91.0433 1245.14 91.71C1244.34 92.3767 1243.35 92.78 1242.19 92.92C1241.87 92.96 1241.53 92.9833 1241.17 92.99C1240.82 92.9967 1240.59 93 1240.47 93H1235.81ZM1238.57 90.44H1240.47C1240.65 90.44 1240.9 90.4367 1241.2 90.43C1241.51 90.4167 1241.79 90.3867 1242.03 90.34C1242.66 90.2133 1243.17 89.92 1243.56 89.46C1243.96 89 1244.26 88.4467 1244.44 87.8C1244.64 87.1533 1244.73 86.4867 1244.73 85.8C1244.73 85.08 1244.63 84.3967 1244.43 83.75C1244.24 83.1033 1243.94 82.5567 1243.54 82.11C1243.14 81.6633 1242.64 81.38 1242.03 81.26C1241.79 81.2067 1241.51 81.1767 1241.2 81.17C1240.9 81.1633 1240.65 81.16 1240.47 81.16H1238.57V90.44ZM1255.03 93.3C1253.92 93.3 1252.95 93.0633 1252.1 92.59C1251.26 92.11 1250.6 91.4533 1250.12 90.62C1249.65 89.78 1249.41 88.82 1249.41 87.74C1249.41 86.56 1249.64 85.5333 1250.11 84.66C1250.58 83.7867 1251.22 83.11 1252.04 82.63C1252.86 82.1433 1253.8 81.9 1254.87 81.9C1256 81.9 1256.97 82.1667 1257.76 82.7C1258.55 83.2333 1259.14 83.9833 1259.52 84.95C1259.9 85.9167 1260.03 87.0533 1259.92 88.36H1257.23V87.36C1257.23 86.26 1257.05 85.47 1256.7 84.99C1256.35 84.5033 1255.78 84.26 1254.99 84.26C1254.06 84.26 1253.38 84.5433 1252.94 85.11C1252.51 85.67 1252.29 86.5 1252.29 87.6C1252.29 88.6067 1252.51 89.3867 1252.94 89.94C1253.38 90.4867 1254.02 90.76 1254.87 90.76C1255.4 90.76 1255.86 90.6433 1256.24 90.41C1256.62 90.1767 1256.91 89.84 1257.11 89.4L1259.83 90.18C1259.42 91.1667 1258.78 91.9333 1257.9 92.48C1257.03 93.0267 1256.07 93.3 1255.03 93.3ZM1251.45 88.36V86.34H1258.61V88.36H1251.45ZM1264.98 93.3C1264.21 93.3 1263.55 93.1533 1263.01 92.86C1262.48 92.56 1262.07 92.1633 1261.79 91.67C1261.52 91.17 1261.38 90.62 1261.38 90.02C1261.38 89.52 1261.46 89.0633 1261.61 88.65C1261.77 88.2367 1262.01 87.8733 1262.35 87.56C1262.7 87.24 1263.16 86.9733 1263.74 86.76C1264.14 86.6133 1264.62 86.4833 1265.17 86.37C1265.73 86.2567 1266.35 86.15 1267.05 86.05C1267.75 85.9433 1268.52 85.8267 1269.36 85.7L1268.38 86.24C1268.38 85.6 1268.23 85.13 1267.92 84.83C1267.62 84.53 1267.1 84.38 1266.38 84.38C1265.98 84.38 1265.57 84.4767 1265.13 84.67C1264.7 84.8633 1264.4 85.2067 1264.22 85.7L1261.76 84.92C1262.04 84.0267 1262.55 83.3 1263.3 82.74C1264.06 82.18 1265.08 81.9 1266.38 81.9C1267.34 81.9 1268.18 82.0467 1268.92 82.34C1269.66 82.6333 1270.22 83.14 1270.6 83.86C1270.82 84.26 1270.94 84.66 1270.98 85.06C1271.02 85.46 1271.04 85.9067 1271.04 86.4V93H1268.66V90.78L1269 91.24C1268.48 91.9667 1267.91 92.4933 1267.29 92.82C1266.69 93.14 1265.92 93.3 1264.98 93.3ZM1265.56 91.16C1266.06 91.16 1266.48 91.0733 1266.82 90.9C1267.17 90.72 1267.44 90.5167 1267.64 90.29C1267.85 90.0633 1267.99 89.8733 1268.06 89.72C1268.2 89.4267 1268.28 89.0867 1268.3 88.7C1268.33 88.3067 1268.34 87.98 1268.34 87.72L1269.14 87.92C1268.34 88.0533 1267.68 88.1667 1267.18 88.26C1266.68 88.3467 1266.28 88.4267 1265.97 88.5C1265.67 88.5733 1265.4 88.6533 1265.16 88.74C1264.9 88.8467 1264.68 88.9633 1264.51 89.09C1264.35 89.21 1264.23 89.3433 1264.15 89.49C1264.08 89.6367 1264.04 89.8 1264.04 89.98C1264.04 90.2267 1264.1 90.44 1264.22 90.62C1264.35 90.7933 1264.53 90.9267 1264.75 91.02C1264.98 91.1133 1265.25 91.16 1265.56 91.16ZM1281 93V87.9C1281 87.6533 1280.99 87.34 1280.96 86.96C1280.94 86.5733 1280.85 86.1867 1280.71 85.8C1280.57 85.4133 1280.34 85.09 1280.02 84.83C1279.71 84.57 1279.26 84.44 1278.68 84.44C1278.45 84.44 1278.2 84.4767 1277.93 84.55C1277.67 84.6233 1277.42 84.7667 1277.18 84.98C1276.95 85.1867 1276.76 85.4933 1276.6 85.9C1276.46 86.3067 1276.38 86.8467 1276.38 87.52L1274.82 86.78C1274.82 85.9267 1275 85.1267 1275.34 84.38C1275.69 83.6333 1276.21 83.03 1276.9 82.57C1277.6 82.11 1278.48 81.88 1279.54 81.88C1280.39 81.88 1281.08 82.0233 1281.61 82.31C1282.15 82.5967 1282.56 82.96 1282.85 83.4C1283.15 83.84 1283.37 84.3 1283.49 84.78C1283.62 85.2533 1283.7 85.6867 1283.72 86.08C1283.75 86.4733 1283.76 86.76 1283.76 86.94V93H1281ZM1273.62 93V82.2H1276.04V85.78H1276.38V93H1273.62ZM1285.96 84.02L1286.12 82.88C1286.44 82.9067 1286.7 82.8567 1286.9 82.73C1287.1 82.5967 1287.23 82.41 1287.31 82.17C1287.39 81.9233 1287.4 81.64 1287.36 81.32H1285.96V78.6H1288.68V81.32C1288.68 82.28 1288.45 83.0067 1288.01 83.5C1287.56 83.9933 1286.88 84.1667 1285.96 84.02ZM1294.27 93.3C1292.91 93.3 1291.81 92.9933 1290.97 92.38C1290.14 91.76 1289.63 90.8867 1289.45 89.76L1292.23 89.34C1292.34 89.8467 1292.59 90.2433 1292.98 90.53C1293.37 90.8167 1293.87 90.96 1294.47 90.96C1294.96 90.96 1295.34 90.8667 1295.61 90.68C1295.88 90.4867 1296.01 90.22 1296.01 89.88C1296.01 89.6667 1295.96 89.4967 1295.85 89.37C1295.74 89.2367 1295.5 89.1067 1295.13 88.98C1294.76 88.8533 1294.19 88.6867 1293.41 88.48C1292.53 88.2533 1291.83 88 1291.3 87.72C1290.77 87.44 1290.39 87.1067 1290.16 86.72C1289.93 86.3267 1289.81 85.8533 1289.81 85.3C1289.81 84.6067 1289.99 84.0067 1290.34 83.5C1290.69 82.9867 1291.19 82.5933 1291.83 82.32C1292.48 82.04 1293.24 81.9 1294.11 81.9C1294.96 81.9 1295.71 82.03 1296.36 82.29C1297.01 82.55 1297.54 82.92 1297.94 83.4C1298.35 83.88 1298.6 84.4467 1298.69 85.1L1295.91 85.6C1295.86 85.2 1295.69 84.8833 1295.39 84.65C1295.09 84.4167 1294.68 84.28 1294.17 84.24C1293.67 84.2067 1293.27 84.2733 1292.96 84.44C1292.66 84.6067 1292.51 84.8467 1292.51 85.16C1292.51 85.3467 1292.57 85.5033 1292.7 85.63C1292.83 85.7567 1293.1 85.8867 1293.51 86.02C1293.92 86.1533 1294.55 86.3267 1295.39 86.54C1296.21 86.7533 1296.87 87.0033 1297.36 87.29C1297.86 87.57 1298.22 87.91 1298.45 88.31C1298.68 88.7033 1298.79 89.18 1298.79 89.74C1298.79 90.8467 1298.39 91.7167 1297.59 92.35C1296.79 92.9833 1295.68 93.3 1294.27 93.3ZM1244.8 120.3C1243.36 120.3 1242.12 119.987 1241.07 119.36C1240.03 118.733 1239.23 117.857 1238.66 116.73C1238.1 115.603 1237.82 114.293 1237.82 112.8C1237.82 111.307 1238.1 109.997 1238.66 108.87C1239.23 107.743 1240.03 106.867 1241.07 106.24C1242.12 105.613 1243.36 105.3 1244.8 105.3C1246.24 105.3 1247.48 105.613 1248.52 106.24C1249.57 106.867 1250.37 107.743 1250.93 108.87C1251.5 109.997 1251.78 111.307 1251.78 112.8C1251.78 114.293 1251.5 115.603 1250.93 116.73C1250.37 117.857 1249.57 118.733 1248.52 119.36C1247.48 119.987 1246.24 120.3 1244.8 120.3ZM1244.8 117.74C1245.72 117.753 1246.48 117.557 1247.08 117.15C1247.69 116.743 1248.14 116.167 1248.44 115.42C1248.75 114.673 1248.9 113.8 1248.9 112.8C1248.9 111.8 1248.75 110.933 1248.44 110.2C1248.14 109.467 1247.69 108.897 1247.08 108.49C1246.48 108.083 1245.72 107.873 1244.8 107.86C1243.89 107.847 1243.13 108.043 1242.52 108.45C1241.92 108.857 1241.46 109.433 1241.15 110.18C1240.85 110.927 1240.7 111.8 1240.7 112.8C1240.7 113.8 1240.85 114.667 1241.15 115.4C1241.46 116.133 1241.92 116.703 1242.52 117.11C1243.13 117.517 1243.89 117.727 1244.8 117.74ZM1254.68 120V109.24C1254.68 108.967 1254.69 108.657 1254.7 108.31C1254.71 107.963 1254.77 107.613 1254.86 107.26C1254.96 106.907 1255.14 106.587 1255.4 106.3C1255.73 105.927 1256.09 105.673 1256.48 105.54C1256.87 105.4 1257.25 105.327 1257.62 105.32C1257.99 105.307 1258.3 105.3 1258.56 105.3H1259.9V107.5H1258.66C1258.23 107.5 1257.92 107.61 1257.71 107.83C1257.5 108.043 1257.4 108.3 1257.4 108.6V120H1254.68ZM1252.98 111.3V109.2H1259.9V111.3H1252.98ZM1261.6 120V109.24C1261.6 108.967 1261.61 108.657 1261.62 108.31C1261.63 107.963 1261.69 107.613 1261.78 107.26C1261.88 106.907 1262.06 106.587 1262.32 106.3C1262.65 105.927 1263.01 105.673 1263.4 105.54C1263.79 105.4 1264.17 105.327 1264.54 105.32C1264.91 105.307 1265.22 105.3 1265.48 105.3H1266.82V107.5H1265.58C1265.15 107.5 1264.84 107.61 1264.63 107.83C1264.42 108.043 1264.32 108.3 1264.32 108.6V120H1261.6ZM1259.9 111.3V109.2H1266.82V111.3H1259.9ZM1268.92 107.7V105.3H1271.64V107.7H1268.92ZM1268.92 120V109.2H1271.64V120H1268.92ZM1279.4 120.3C1278.28 120.3 1277.32 120.05 1276.52 119.55C1275.72 119.05 1275.11 118.37 1274.68 117.51C1274.25 116.65 1274.04 115.68 1274.04 114.6C1274.04 113.507 1274.26 112.53 1274.7 111.67C1275.15 110.81 1275.77 110.133 1276.58 109.64C1277.39 109.147 1278.34 108.9 1279.44 108.9C1280.71 108.9 1281.78 109.223 1282.64 109.87C1283.51 110.51 1284.06 111.387 1284.3 112.5L1281.58 113.22C1281.42 112.66 1281.14 112.223 1280.74 111.91C1280.35 111.597 1279.9 111.44 1279.4 111.44C1278.83 111.44 1278.36 111.58 1277.99 111.86C1277.62 112.133 1277.35 112.51 1277.18 112.99C1277.01 113.463 1276.92 114 1276.92 114.6C1276.92 115.54 1277.13 116.303 1277.54 116.89C1277.96 117.47 1278.58 117.76 1279.4 117.76C1280.01 117.76 1280.48 117.62 1280.8 117.34C1281.12 117.06 1281.36 116.66 1281.52 116.14L1284.3 116.72C1283.99 117.867 1283.41 118.75 1282.56 119.37C1281.71 119.99 1280.65 120.3 1279.4 120.3ZM1291.03 120.3C1289.92 120.3 1288.94 120.063 1288.1 119.59C1287.26 119.11 1286.6 118.453 1286.12 117.62C1285.64 116.78 1285.41 115.82 1285.41 114.74C1285.41 113.56 1285.64 112.533 1286.11 111.66C1286.57 110.787 1287.22 110.11 1288.04 109.63C1288.86 109.143 1289.8 108.9 1290.87 108.9C1292 108.9 1292.96 109.167 1293.76 109.7C1294.55 110.233 1295.14 110.983 1295.52 111.95C1295.9 112.917 1296.03 114.053 1295.92 115.36H1293.23V114.36C1293.23 113.26 1293.05 112.47 1292.7 111.99C1292.35 111.503 1291.78 111.26 1290.99 111.26C1290.06 111.26 1289.38 111.543 1288.94 112.11C1288.5 112.67 1288.29 113.5 1288.29 114.6C1288.29 115.607 1288.5 116.387 1288.94 116.94C1289.38 117.487 1290.02 117.76 1290.87 117.76C1291.4 117.76 1291.86 117.643 1292.24 117.41C1292.62 117.177 1292.91 116.84 1293.11 116.4L1295.83 117.18C1295.42 118.167 1294.78 118.933 1293.9 119.48C1293.02 120.027 1292.07 120.3 1291.03 120.3ZM1287.45 115.36V113.34H1294.61V115.36H1287.45Z"
                                    fill="black" />
                                <rect
                                    x="1219"
                                    y="65"
                                    width="96"
                                    height="68"
                                    rx="5"
                                    stroke="#124DBA"
                                    stroke-width="2" />
                            </g>
                            <g id="stairs-2-label">
                                <rect
                                    x="1284"
                                    y="443"
                                    width="105"
                                    height="41"
                                    rx="5"
                                    fill="white" />
                                <path
                                    id="stairs-2-text"
                                    d="M1305.97 471.3C1304.9 471.3 1303.94 471.113 1303.08 470.74C1302.22 470.36 1301.52 469.82 1300.97 469.12C1300.42 468.413 1300.07 467.573 1299.93 466.6L1302.77 466.18C1302.97 467.007 1303.38 467.643 1304.01 468.09C1304.63 468.537 1305.35 468.76 1306.15 468.76C1306.59 468.76 1307.03 468.69 1307.45 468.55C1307.87 468.41 1308.21 468.203 1308.48 467.93C1308.75 467.657 1308.89 467.32 1308.89 466.92C1308.89 466.773 1308.86 466.633 1308.82 466.5C1308.78 466.36 1308.71 466.23 1308.61 466.11C1308.51 465.99 1308.36 465.877 1308.18 465.77C1308 465.663 1307.77 465.567 1307.49 465.48L1303.75 464.38C1303.47 464.3 1303.14 464.187 1302.77 464.04C1302.4 463.893 1302.04 463.683 1301.7 463.41C1301.35 463.137 1301.06 462.777 1300.83 462.33C1300.6 461.877 1300.49 461.307 1300.49 460.62C1300.49 459.653 1300.73 458.85 1301.22 458.21C1301.7 457.57 1302.35 457.093 1303.17 456.78C1303.98 456.467 1304.88 456.313 1305.87 456.32C1306.86 456.333 1307.75 456.503 1308.53 456.83C1309.31 457.157 1309.96 457.633 1310.49 458.26C1311.01 458.88 1311.39 459.64 1311.63 460.54L1308.69 461.04C1308.58 460.573 1308.38 460.18 1308.1 459.86C1307.81 459.54 1307.47 459.297 1307.07 459.13C1306.67 458.963 1306.26 458.873 1305.83 458.86C1305.4 458.847 1305 458.907 1304.62 459.04C1304.24 459.167 1303.94 459.353 1303.7 459.6C1303.46 459.847 1303.35 460.14 1303.35 460.48C1303.35 460.793 1303.44 461.05 1303.64 461.25C1303.83 461.443 1304.07 461.6 1304.37 461.72C1304.66 461.84 1304.96 461.94 1305.27 462.02L1307.77 462.7C1308.14 462.8 1308.55 462.933 1309.01 463.1C1309.46 463.26 1309.89 463.487 1310.31 463.78C1310.73 464.067 1311.07 464.447 1311.34 464.92C1311.61 465.393 1311.75 465.993 1311.75 466.72C1311.75 467.493 1311.58 468.17 1311.26 468.75C1310.94 469.323 1310.5 469.8 1309.96 470.18C1309.41 470.553 1308.79 470.833 1308.1 471.02C1307.41 471.207 1306.7 471.3 1305.97 471.3ZM1320.42 471C1319.68 471.14 1318.94 471.2 1318.22 471.18C1317.51 471.167 1316.87 471.043 1316.3 470.81C1315.74 470.57 1315.32 470.187 1315.02 469.66C1314.76 469.167 1314.62 468.667 1314.6 468.16C1314.59 467.647 1314.58 467.067 1314.58 466.42V457.2H1317.3V466.26C1317.3 466.68 1317.31 467.06 1317.31 467.4C1317.33 467.733 1317.4 468 1317.52 468.2C1317.76 468.58 1318.15 468.787 1318.67 468.82C1319.2 468.853 1319.78 468.827 1320.42 468.74V471ZM1312.74 462.3V460.2H1320.42V462.3H1312.74ZM1325.83 471.3C1325.06 471.3 1324.4 471.153 1323.86 470.86C1323.33 470.56 1322.92 470.163 1322.64 469.67C1322.37 469.17 1322.23 468.62 1322.23 468.02C1322.23 467.52 1322.31 467.063 1322.46 466.65C1322.61 466.237 1322.86 465.873 1323.2 465.56C1323.55 465.24 1324.01 464.973 1324.59 464.76C1324.99 464.613 1325.47 464.483 1326.02 464.37C1326.57 464.257 1327.2 464.15 1327.9 464.05C1328.6 463.943 1329.37 463.827 1330.21 463.7L1329.23 464.24C1329.23 463.6 1329.08 463.13 1328.77 462.83C1328.46 462.53 1327.95 462.38 1327.23 462.38C1326.83 462.38 1326.41 462.477 1325.98 462.67C1325.55 462.863 1325.24 463.207 1325.07 463.7L1322.61 462.92C1322.88 462.027 1323.4 461.3 1324.15 460.74C1324.9 460.18 1325.93 459.9 1327.23 459.9C1328.18 459.9 1329.03 460.047 1329.77 460.34C1330.51 460.633 1331.07 461.14 1331.45 461.86C1331.66 462.26 1331.79 462.66 1331.83 463.06C1331.87 463.46 1331.89 463.907 1331.89 464.4V471H1329.51V468.78L1329.85 469.24C1329.32 469.967 1328.75 470.493 1328.14 470.82C1327.53 471.14 1326.76 471.3 1325.83 471.3ZM1326.41 469.16C1326.91 469.16 1327.33 469.073 1327.67 468.9C1328.02 468.72 1328.29 468.517 1328.49 468.29C1328.7 468.063 1328.84 467.873 1328.91 467.72C1329.05 467.427 1329.13 467.087 1329.15 466.7C1329.18 466.307 1329.19 465.98 1329.19 465.72L1329.99 465.92C1329.18 466.053 1328.53 466.167 1328.03 466.26C1327.53 466.347 1327.13 466.427 1326.82 466.5C1326.51 466.573 1326.24 466.653 1326.01 466.74C1325.74 466.847 1325.53 466.963 1325.36 467.09C1325.2 467.21 1325.08 467.343 1325 467.49C1324.93 467.637 1324.89 467.8 1324.89 467.98C1324.89 468.227 1324.95 468.44 1325.07 468.62C1325.2 468.793 1325.37 468.927 1325.6 469.02C1325.83 469.113 1326.1 469.16 1326.41 469.16ZM1334.69 458.7V456.3H1337.41V458.7H1334.69ZM1334.69 471V460.2H1337.41V471H1334.69ZM1340.41 471V460.2H1342.81V462.84L1342.55 462.5C1342.69 462.127 1342.88 461.787 1343.11 461.48C1343.34 461.173 1343.63 460.92 1343.97 460.72C1344.23 460.56 1344.51 460.437 1344.82 460.35C1345.13 460.257 1345.44 460.2 1345.77 460.18C1346.1 460.153 1346.42 460.16 1346.75 460.2V462.74C1346.45 462.647 1346.1 462.617 1345.7 462.65C1345.31 462.677 1344.95 462.767 1344.63 462.92C1344.31 463.067 1344.04 463.263 1343.82 463.51C1343.6 463.75 1343.43 464.037 1343.32 464.37C1343.21 464.697 1343.15 465.067 1343.15 465.48V471H1340.41ZM1352.48 471.3C1351.12 471.3 1350.02 470.993 1349.18 470.38C1348.35 469.76 1347.84 468.887 1347.66 467.76L1350.44 467.34C1350.55 467.847 1350.8 468.243 1351.19 468.53C1351.58 468.817 1352.08 468.96 1352.68 468.96C1353.17 468.96 1353.55 468.867 1353.82 468.68C1354.09 468.487 1354.22 468.22 1354.22 467.88C1354.22 467.667 1354.17 467.497 1354.06 467.37C1353.95 467.237 1353.71 467.107 1353.34 466.98C1352.97 466.853 1352.4 466.687 1351.62 466.48C1350.74 466.253 1350.04 466 1349.51 465.72C1348.98 465.44 1348.6 465.107 1348.37 464.72C1348.14 464.327 1348.02 463.853 1348.02 463.3C1348.02 462.607 1348.2 462.007 1348.55 461.5C1348.9 460.987 1349.4 460.593 1350.04 460.32C1350.69 460.04 1351.45 459.9 1352.32 459.9C1353.17 459.9 1353.92 460.03 1354.57 460.29C1355.22 460.55 1355.75 460.92 1356.15 461.4C1356.56 461.88 1356.81 462.447 1356.9 463.1L1354.12 463.6C1354.07 463.2 1353.9 462.883 1353.6 462.65C1353.3 462.417 1352.89 462.28 1352.38 462.24C1351.88 462.207 1351.48 462.273 1351.17 462.44C1350.87 462.607 1350.72 462.847 1350.72 463.16C1350.72 463.347 1350.78 463.503 1350.91 463.63C1351.04 463.757 1351.31 463.887 1351.72 464.02C1352.13 464.153 1352.76 464.327 1353.6 464.54C1354.42 464.753 1355.08 465.003 1355.57 465.29C1356.07 465.57 1356.43 465.91 1356.66 466.31C1356.89 466.703 1357 467.18 1357 467.74C1357 468.847 1356.6 469.717 1355.8 470.35C1355 470.983 1353.89 471.3 1352.48 471.3ZM1362.8 470.98V468.62L1368.84 463.26C1369.3 462.86 1369.62 462.483 1369.8 462.13C1369.99 461.777 1370.08 461.447 1370.08 461.14C1370.08 460.7 1369.99 460.31 1369.81 459.97C1369.63 459.623 1369.38 459.353 1369.05 459.16C1368.73 458.96 1368.34 458.86 1367.9 458.86C1367.44 458.86 1367.04 458.967 1366.68 459.18C1366.34 459.387 1366.07 459.663 1365.87 460.01C1365.68 460.35 1365.59 460.72 1365.6 461.12H1362.8C1362.8 460.133 1363.02 459.28 1363.45 458.56C1363.89 457.84 1364.49 457.283 1365.26 456.89C1366.04 456.497 1366.94 456.3 1367.96 456.3C1368.9 456.3 1369.74 456.507 1370.48 456.92C1371.23 457.327 1371.82 457.897 1372.24 458.63C1372.67 459.363 1372.88 460.213 1372.88 461.18C1372.88 461.893 1372.78 462.487 1372.58 462.96C1372.38 463.427 1372.09 463.86 1371.69 464.26C1371.3 464.653 1370.82 465.1 1370.24 465.6L1366.34 469.02L1366.12 468.42H1372.88V470.98H1362.8Z"
                                    fill="black" />
                                <rect
                                    x="1284"
                                    y="443"
                                    width="105"
                                    height="41"
                                    rx="5"
                                    stroke="#124DBA"
                                    stroke-width="2" />
                            </g>
                            <g id="stairs-1-label">
                                <rect
                                    x="25"
                                    y="443"
                                    width="102"
                                    height="41"
                                    rx="5"
                                    fill="white" />
                                <path
                                    id="stairs-1-text"
                                    d="M46.9611 471.3C45.8944 471.3 44.9311 471.113 44.0711 470.74C43.2178 470.36 42.5144 469.82 41.9611 469.12C41.4144 468.413 41.0678 467.573 40.9211 466.6L43.7611 466.18C43.9611 467.007 44.3744 467.643 45.0011 468.09C45.6278 468.537 46.3411 468.76 47.1411 468.76C47.5878 468.76 48.0211 468.69 48.4411 468.55C48.8611 468.41 49.2044 468.203 49.4711 467.93C49.7444 467.657 49.8811 467.32 49.8811 466.92C49.8811 466.773 49.8578 466.633 49.8111 466.5C49.7711 466.36 49.7011 466.23 49.6011 466.11C49.5011 465.99 49.3578 465.877 49.1711 465.77C48.9911 465.663 48.7611 465.567 48.4811 465.48L44.7411 464.38C44.4611 464.3 44.1344 464.187 43.7611 464.04C43.3944 463.893 43.0378 463.683 42.6911 463.41C42.3444 463.137 42.0544 462.777 41.8211 462.33C41.5944 461.877 41.4811 461.307 41.4811 460.62C41.4811 459.653 41.7244 458.85 42.2111 458.21C42.6978 457.57 43.3478 457.093 44.1611 456.78C44.9744 456.467 45.8744 456.313 46.8611 456.32C47.8544 456.333 48.7411 456.503 49.5211 456.83C50.3011 457.157 50.9544 457.633 51.4811 458.26C52.0078 458.88 52.3878 459.64 52.6211 460.54L49.6811 461.04C49.5744 460.573 49.3778 460.18 49.0911 459.86C48.8044 459.54 48.4611 459.297 48.0611 459.13C47.6678 458.963 47.2544 458.873 46.8211 458.86C46.3944 458.847 45.9911 458.907 45.6111 459.04C45.2378 459.167 44.9311 459.353 44.6911 459.6C44.4578 459.847 44.3411 460.14 44.3411 460.48C44.3411 460.793 44.4378 461.05 44.6311 461.25C44.8244 461.443 45.0678 461.6 45.3611 461.72C45.6544 461.84 45.9544 461.94 46.2611 462.02L48.7611 462.7C49.1344 462.8 49.5478 462.933 50.0011 463.1C50.4544 463.26 50.8878 463.487 51.3011 463.78C51.7211 464.067 52.0644 464.447 52.3311 464.92C52.6044 465.393 52.7411 465.993 52.7411 466.72C52.7411 467.493 52.5778 468.17 52.2511 468.75C51.9311 469.323 51.4978 469.8 50.9511 470.18C50.4044 470.553 49.7844 470.833 49.0911 471.02C48.4044 471.207 47.6944 471.3 46.9611 471.3ZM61.4191 471C60.6724 471.14 59.9391 471.2 59.2191 471.18C58.5057 471.167 57.8657 471.043 57.2991 470.81C56.7391 470.57 56.3124 470.187 56.0191 469.66C55.7524 469.167 55.6124 468.667 55.5991 468.16C55.5857 467.647 55.5791 467.067 55.5791 466.42V457.2H58.2991V466.26C58.2991 466.68 58.3024 467.06 58.3091 467.4C58.3224 467.733 58.3924 468 58.5191 468.2C58.7591 468.58 59.1424 468.787 59.6691 468.82C60.1957 468.853 60.7791 468.827 61.4191 468.74V471ZM53.7391 462.3V460.2H61.4191V462.3H53.7391ZM66.8258 471.3C66.0524 471.3 65.3958 471.153 64.8558 470.86C64.3224 470.56 63.9158 470.163 63.6358 469.67C63.3624 469.17 63.2258 468.62 63.2258 468.02C63.2258 467.52 63.3024 467.063 63.4558 466.65C63.6091 466.237 63.8558 465.873 64.1958 465.56C64.5424 465.24 65.0058 464.973 65.5858 464.76C65.9858 464.613 66.4624 464.483 67.0158 464.37C67.5691 464.257 68.1958 464.15 68.8958 464.05C69.5958 463.943 70.3658 463.827 71.2058 463.7L70.2258 464.24C70.2258 463.6 70.0724 463.13 69.7658 462.83C69.4591 462.53 68.9458 462.38 68.2258 462.38C67.8258 462.38 67.4091 462.477 66.9758 462.67C66.5424 462.863 66.2391 463.207 66.0658 463.7L63.6058 462.92C63.8791 462.027 64.3924 461.3 65.1458 460.74C65.8991 460.18 66.9258 459.9 68.2258 459.9C69.1791 459.9 70.0258 460.047 70.7658 460.34C71.5058 460.633 72.0658 461.14 72.4458 461.86C72.6591 462.26 72.7858 462.66 72.8258 463.06C72.8658 463.46 72.8858 463.907 72.8858 464.4V471H70.5058V468.78L70.8458 469.24C70.3191 469.967 69.7491 470.493 69.1358 470.82C68.5291 471.14 67.7591 471.3 66.8258 471.3ZM67.4058 469.16C67.9058 469.16 68.3258 469.073 68.6658 468.9C69.0124 468.72 69.2858 468.517 69.4858 468.29C69.6924 468.063 69.8324 467.873 69.9058 467.72C70.0458 467.427 70.1258 467.087 70.1458 466.7C70.1724 466.307 70.1858 465.98 70.1858 465.72L70.9858 465.92C70.1791 466.053 69.5258 466.167 69.0258 466.26C68.5258 466.347 68.1224 466.427 67.8158 466.5C67.5091 466.573 67.2391 466.653 67.0058 466.74C66.7391 466.847 66.5224 466.963 66.3558 467.09C66.1958 467.21 66.0758 467.343 65.9958 467.49C65.9224 467.637 65.8858 467.8 65.8858 467.98C65.8858 468.227 65.9458 468.44 66.0658 468.62C66.1924 468.793 66.3691 468.927 66.5958 469.02C66.8224 469.113 67.0924 469.16 67.4058 469.16ZM75.6859 458.7V456.3H78.4059V458.7H75.6859ZM75.6859 471V460.2H78.4059V471H75.6859ZM81.4039 471V460.2H83.8039V462.84L83.5439 462.5C83.6839 462.127 83.8706 461.787 84.1039 461.48C84.3372 461.173 84.6239 460.92 84.9639 460.72C85.2239 460.56 85.5072 460.437 85.8139 460.35C86.1206 460.257 86.4372 460.2 86.7639 460.18C87.0906 460.153 87.4172 460.16 87.7439 460.2V462.74C87.4439 462.647 87.0939 462.617 86.6939 462.65C86.3006 462.677 85.9439 462.767 85.6239 462.92C85.3039 463.067 85.0339 463.263 84.8139 463.51C84.5939 463.75 84.4272 464.037 84.3139 464.37C84.2006 464.697 84.1439 465.067 84.1439 465.48V471H81.4039ZM93.4755 471.3C92.1155 471.3 91.0155 470.993 90.1755 470.38C89.3421 469.76 88.8355 468.887 88.6555 467.76L91.4355 467.34C91.5488 467.847 91.7988 468.243 92.1855 468.53C92.5788 468.817 93.0755 468.96 93.6755 468.96C94.1688 468.96 94.5488 468.867 94.8155 468.68C95.0821 468.487 95.2155 468.22 95.2155 467.88C95.2155 467.667 95.1621 467.497 95.0555 467.37C94.9488 467.237 94.7088 467.107 94.3355 466.98C93.9688 466.853 93.3955 466.687 92.6155 466.48C91.7355 466.253 91.0321 466 90.5055 465.72C89.9788 465.44 89.5988 465.107 89.3655 464.72C89.1321 464.327 89.0155 463.853 89.0155 463.3C89.0155 462.607 89.1921 462.007 89.5455 461.5C89.8988 460.987 90.3955 460.593 91.0355 460.32C91.6821 460.04 92.4421 459.9 93.3155 459.9C94.1621 459.9 94.9121 460.03 95.5655 460.29C96.2188 460.55 96.7455 460.92 97.1455 461.4C97.5521 461.88 97.8021 462.447 97.8955 463.1L95.1155 463.6C95.0688 463.2 94.8955 462.883 94.5955 462.65C94.2955 462.417 93.8888 462.28 93.3755 462.24C92.8755 462.207 92.4721 462.273 92.1655 462.44C91.8655 462.607 91.7155 462.847 91.7155 463.16C91.7155 463.347 91.7788 463.503 91.9055 463.63C92.0388 463.757 92.3088 463.887 92.7155 464.02C93.1288 464.153 93.7555 464.327 94.5955 464.54C95.4155 464.753 96.0721 465.003 96.5655 465.29C97.0655 465.57 97.4288 465.91 97.6555 466.31C97.8821 466.703 97.9955 467.18 97.9955 467.74C97.9955 468.847 97.5955 469.717 96.7955 470.35C95.9955 470.983 94.8888 471.3 93.4755 471.3ZM106.697 471V459.56L103.997 461.22V458.22L106.697 456.6H109.477V471H106.697Z"
                                    fill="black" />
                                <rect
                                    x="25"
                                    y="443"
                                    width="102"
                                    height="41"
                                    rx="5"
                                    stroke="#124DBA"
                                    stroke-width="2" />
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
        <div class="basis-96 h-full">
            <div class="h-full">
                <h3 class="mb-8 border-b-2 mr-20 pb-2">Schedules</h3>
                <div class="h-full overflow-x-hidden pr-20 pb-48 overflow-y-auto">
                    {#if !selectedRoom}
                        <p class="mb-4">Click a room to show an event.</p>
                    {:else}
                        <h4 class="mb-4">
                            {#each dataMap as [id, name]}
                                {id == roomEvents.name ? name : ""}
                            {/each}
                        </h4>
                        {#each roomEvents.schedules as [day, scheds]}
                            <div class="mb-4">
                                <h5 class="mt-6">{day}</h5>
                                {#each scheds as { event, start, end }}
                                    <div class="my-4">
                                        <p><strong>{start} to {end}</strong></p>
                                        <p>{event}</p>
                                    </div>
                                {/each}
                                {#each scheds as { event, start, end }}
                                    <div class="my-4">
                                        <p><strong>{start} to {end}</strong></p>
                                        <p>{event}</p>
                                    </div>
                                {/each}
                            </div>
                        {/each}
                    {/if}
                </div>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
</style>
