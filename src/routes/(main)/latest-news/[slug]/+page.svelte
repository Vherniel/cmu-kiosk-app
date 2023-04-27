<script lang="ts">
    import { onMount } from "svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    $: ({ post } = data);

    onMount(() => {
        console.log(post);
    });
</script>

<section class="mb-36">
    <div class="container">
        <div class="mb-16">
            <h1>{post.title.rendered}</h1>
        </div>
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src={post.yoast_head_json.og_image[0].url} class="w-[50%]" />
        {@html post.content.rendered}
    </div>
</section>

<style lang="scss">
    :global([class*="wp-image"]) {
        display: inline-block;
    }
    :global([dir*="auto"]) {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
</style>
