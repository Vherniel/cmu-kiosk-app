<script lang="ts">
    import { page } from "$app/stores";
    import { ArrowLeft, ArrowRight } from "lucide-svelte";
    import type { PageData } from "./$types";
    import { beforeUpdate, onMount } from "svelte";

    export let data: PageData;

    $: ({ news } = data);
    $: pageNumber = $page.url.searchParams.get("page");
    $: currentPage = pageNumber || 1;
    $: previousPage = +currentPage - 1;
    $: nextPage = +currentPage + 1;

    let previousDisabled: boolean;
    let nextDisabled: boolean;

    beforeUpdate(() => {
        previousDisabled = +currentPage <= 1;
        nextDisabled = +currentPage >= news.totalPages;
        console.log("previousDisabled", previousDisabled);
    });
</script>

<section>
    <div class="container">
        <div class="mb-16">
            <h1>Latest News</h1>
        </div>
        <div class="mb-8">
            <h2>From the official website: The CMU Post</h2>
        </div>
        <div class="flex flex-wrap -m-2">
            {#if news}
                {#each news.data as { id, yoast_head_json: post }}
                    <div class="basis-1/3 w-1/3 p-2">
                        <a
                            href="/latest-news/{id}"
                            class="btn card p-0 m-0 whitespace-break-spaces w-full flex flex-col text-left overflow-hidden">
                            <div
                                class="bg-center w-full h-full"
                                style:background-image="url('{post.og_image[0].url}')">
                                <img
                                    src={post.og_image[0].url}
                                    alt={post.title}
                                    class="block w-full h-64 object-contain" />
                            </div>
                            <div class="!m-0 p-4 w-full">
                                <h4 class="w-full">{@html post.title}</h4>
                                <p class="w-full">{@html post.og_description}</p>
                            </div>
                        </a>
                    </div>
                {/each}
                <div class="flex items-center pt-8 pb-32 w-full">
                    <a
                        href={previousDisabled ? "#" : `?page=${previousPage}`}
                        class="previous btn p-8 flex-1 m-2 text-2xl{previousDisabled
                            ? ' text-surface-300 cursor-not-allowed'
                            : ''}">
                        <div class="flex justify-center items-center ml-auto pl-8">
                            <span class="mx-1"><ArrowLeft /></span>
                            <span class="mx-1">Previous</span>
                        </div>
                    </a>
                    <a
                        href={nextDisabled ? "#" : `?page=${nextPage}`}
                        class="next btn p-8 flex-1 m-2 text-2xl{nextDisabled
                            ? ' text-surface-300 cursor-not-allowed'
                            : ''}">
                        <div class="flex items-center mr-auto pr-8">
                            <span class="mx-1">Next</span>
                            <span class="mx-1"><ArrowRight /></span>
                        </div>
                    </a>
                </div>
            {:else}
                <div class="basis-full">
                    <p class="mt-8 text-4xl font-extrabold">No data was found.</p>
                </div>
            {/if}
        </div>
    </div>
</section>

<style lang="scss">
    /* 3:2 */
    .btn {
        h4 {
            margin-top: 0.25rem;
            min-height: 3.5rem;
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
</style>
