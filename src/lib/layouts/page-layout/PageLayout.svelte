<script lang="ts">
    // Slots
    /** @slot header - Insert fixed header content, such as Skeleton's App Bar component.
     * @slot sidebarLeft - Hidden when empty. Allows you to set fixed left sidebar content.
     * @slot pageHeader - Insert content that resides above your page content. Great for global alerts.
     * @slot pageFooter - Insert content that resides below your page content. Recommended for most layouts.
     */

    // Props (regions)
    /** Apply arbitrary clases to the entire `#page` region. */
    export let regionPage: string = "";
    /** Apply arbitrary clases to the `header` slot container element */
    export let slotHeader: string = "z-10";
    /** Apply arbitrary clases to the `sidebarLeft` slot container element */
    export let slotSidebarLeft: string = "w-auto";
    /** Apply arbitrary clases to the `pageHeader` slot container element */
    export let slotPageHeader: string = "";
    /** Apply arbitrary clases to the `pageContent` slot container element */
    export let slotPageContent: string = "";
    /** Apply arbitrary clases to the `pageFooter` slot container element */
    export let slotPageFooter: string = "";

    // Base Classes
    const cBaseAppShell = "w-full h-full flex overflow-hidden";
    const cContentArea = "w-full h-full flex flex-col overflow-hidden";
    const cPage = "flex-1 overflow-x-hidden flex flex-col";
    const cSidebarLeft = "flex-none overflow-x-hidden overflow-y-auto";

    // Reactive Classes
    $: classesBase = `${cBaseAppShell} ${$$props.class ?? ""}`;
    $: classesHeader = `${slotHeader}`;
    $: classesSidebarLeft = `${cSidebarLeft} ${slotSidebarLeft}`;
    $: classesPageHeader = `${slotPageHeader}`;
    $: classesPageContent = `${slotPageContent}`;
    $: classesPageFooter = `${slotPageFooter}`;
</script>

<div id="page-layout" class={classesBase} on:contextmenu|preventDefault>
    {#if $$slots.sidebarLeft}
        <aside id="sidebar-left" class={classesSidebarLeft}>
            <slot name="sidebarLeft" />
        </aside>
    {/if}

    <!-- Content Area -->
    <div class="flex-auto {cContentArea}">
        <!-- Slot: Header -->
        {#if $$slots.header}
            <header id="shell-header" class="flex-none {classesHeader}">
                <slot name="header" />
            </header>
        {/if}

        <!-- Page -->
        <div id="page" class="{regionPage} {cPage}" on:scroll>
            {#if $$slots.pageHeader}
                <header id="page-header" class="flex-none {classesPageHeader}">
                    <slot name="pageHeader">(slot:header)</slot>
                </header>
            {/if}

            <!-- Slot: Page Content (default) -->
            <main id="page-content" class="flex-auto {classesPageContent}">
                <slot />
            </main>

            <!-- Slot: Page Footer -->
            {#if $$slots.pageFooter}
                <footer id="page-footer" class="flex-none {classesPageFooter}">
                    <slot name="pageFooter">(slot:footer)</slot>
                </footer>
            {/if}
        </div>
    </div>
</div>
