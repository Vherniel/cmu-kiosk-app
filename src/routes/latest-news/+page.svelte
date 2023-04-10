<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<section>
    <h1>Latest News</h1>
    <h2>From the official website: The CMU Post</h2>
    <div class="flex">
        {#each data.news as post}
            <div class="flex-item-1-4">
                <div class="item">
                    <img src={post.yoast_head_json.og_image[0].url} alt="" />
                    <h4>{@html post.yoast_head_json.title}</h4>
                    <p>{@html post.yoast_head_json.og_description}</p>
                </div>
            </div>
        {/each}
    </div>
    <!-- {@html rendered} -->
</section>

<style lang="scss">
    /* 3:2 */
    .flex {
        display: flex;
        flex-flow: row wrap;
        margin: -0.5rem;
        .flex-item-1-4 {
            flex-basis: calc(100% / 4);
            padding: 0.5rem;
        }
        .item {
            img {
                max-width: 100%;
                aspect-ratio: 3 / 2;
                object-fit: contain;
            }
            h4 {
                margin-top: 0.25rem;
                margin-bottom: 1rem;
                /* experimental */
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            p {
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }
    }
</style>
