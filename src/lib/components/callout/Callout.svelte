<script lang="ts">
    import type { ComponentType } from "svelte";
    import { type Icon, Lightbulb } from "lucide-svelte";

    export let icon = true;
    export let title = true;
    export let content = true;
</script>

<div class="callout">
    {#if icon}
        <div class="callout-icon">
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
                <div class="title-text">
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
    .callout {
        background-color: hsla(64, 80%, 92%, 100%);
        margin-top: 1rem;
        margin-bottom: 1rem;
        border-radius: 0.75rem;
        padding-top: 1rem;
        padding-bottom: 1.25rem;
        padding-left: 1rem;
        padding-right: 1.5rem;
        display: flex;
        .callout-icon {
            padding-right: 0.75rem;
        }
        .callout-body {
            .callout-title {
                .title-text {
                    margin-bottom: 1rem;
                }
            }
            /* .callout-content {
                .content {
                }
            } */
        }
    }
</style>
