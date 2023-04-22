<script lang="ts">
    import { Lightbulb } from "lucide-svelte";

    export let icon = true;
    export let title = true;
    export let content = true;
</script>

<div
    class="callout my-4 rounded-xl pt-4 pr-5 pb-6 pl-4 flex bg-warning-300 dark:bg-warning-600 dark:text-surface-900">
    {#if icon}
        <div class="callout-icon pr-3">
            <slot name="icon">
                <div class="icon">
                    <Lightbulb />
                </div>
            </slot>
        </div>
    {/if}
    <div class="callout-body">
        {#if title}
            <div class="callout-title">
                <div class="title-text mb-4">
                    <slot name="title">
                        <h4>Callout title</h4>
                    </slot>
                </div>
            </div>
        {/if}
        {#if content}
            <div class="callout-content">
                <div class="content">
                    <slot name="content">
                        <p>
                            <strong>Callout content</strong> lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Aspernatur inventore explicabo nulla vel, repellat
                            reiciendis consectetur minus harum vero non blanditiis hic tempora eligendi
                            quo iste cum ex deserunt modi.
                        </p>
                    </slot>
                </div>
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
</style>
