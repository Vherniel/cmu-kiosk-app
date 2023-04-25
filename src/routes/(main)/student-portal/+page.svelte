<script lang="ts">
    import { browser } from "$app/environment";
    import { enhance } from "$app/forms";
    import { afterUpdate, onMount } from "svelte";
    import lazyload from "vanilla-lazyload";

    let lazyloadInstance;

    if (browser) lazyloadInstance = new lazyload();
</script>

<section>
    <div class="container">
        <div class="mb-8">
            <h1>Student Portal</h1>
        </div>
        <!-- TODO: call-out component || blockquote component -->
        <figure>
            <blockquote cite="">
                <p><span style="color: #FFCD2E;">⚠️</span> Under legal issues</p>
            </blockquote>
            <figcaption>
                —Ezekiel Borja, <cite>City of Malabon University, MIS</cite>
            </figcaption>
        </figure>

        <iframe
            id="iframe"
            class="lazy"
            src="http://portal-bypass.cityofmalabonuniversity.edu.ph/"
            title="City of Malabon University Student Portal"
            loading="lazy"
            frameborder="0" />
    </div>
</section>

<style lang="scss">
    figure {
        border-left: solid 4px grey;
        padding-left: 1rem;
        padding-bottom: 0.25rem;
        margin-bottom: 1.5rem;
        p {
            margin-bottom: 0.5rem;
        }
    }
    iframe {
        width: 100%;
        height: 44rem;
        border: solid 1px #d9d9d9;
        border-radius: 1rem;
    }
</style>
