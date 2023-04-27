<script lang="ts">
    import { PUBLIC_KIOSK_GUEST_EMAIL } from "$env/static/public";
    import { Building2, DoorOpen, Edit, RefreshCw } from "lucide-svelte";
    import CardButton from "$lib/components/card-button/CardButton.svelte";

    export let data;

    $: ({ session, user, news } = data);

    $: fullName = `${user?.first_name} ${user?.last_name}`;

    // prettier-ignore
    const forms = [{
            href: "/registrars-office/application-to-shift-course",
            label: "Application to Shift Course",
            icon: RefreshCw,
        }, {
            href: "/registrars-office/admission",
            label: "CMU Admission",
            icon: Building2,
        }, {
            href: "/registrars-office/leave-of-absence",
            label: "Leave of Absence",
            icon: DoorOpen,
            disabled: true,
        }, {
            href: "/registrars-office/request-form",
            label: "Request Form",
            icon: Edit,
            disabled: true,
    }];
</script>

<svelte:head>
    <title>CMU Kiosk</title>
    <meta
        name="description"
        content="CMU Kiosk is a Self-Service Kiosk for speeding up the services and activities conducted in the campus, especially the university registrar." />
</svelte:head>

<section class="pb-48">
    <div class="container">
        <div class="mb-16">
            {#if !session || session.user.email == PUBLIC_KIOSK_GUEST_EMAIL}
                <h1>Welcome Guest</h1>
            {:else}
                <h1>
                    Welcome {user?.is_admin ? `${fullName}` : fullName}
                </h1>
            {/if}
        </div>

        <div class="flex -m-4 mb-16">
            <div class="basis-8/12 p-4">
                <div class="mb-8">
                    <div class="flex items-center">
                        <div class="flex-auto">
                            <h2>Registrar Forms</h2>
                        </div>
                        <div>
                            <a
                                href="/registrars-office"
                                class="btn font-extrabold variant-filled-primary"
                                >All Registrar Forms</a>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap -m-2">
                    {#each forms as { href, ...form }}
                        <div class="basis-1/2 p-2">
                            <CardButton
                                class=""
                                href={!session ||
                                session?.user?.email == PUBLIC_KIOSK_GUEST_EMAIL
                                    ? "/sign-in?redirect=" + encodeURIComponent(href)
                                    : href}
                                {...form} />
                        </div>
                    {/each}
                </div>
            </div>
            <div class="basis-4/12 p-4">
                <div class="mb-8">
                    <div class="flex items-center">
                        <div class="flex-auto">
                            <h2>The CMU Post</h2>
                        </div>
                        <div>
                            <a
                                href="/latest-news"
                                class="btn font-extrabold variant-filled-primary"
                                >All Latest News</a>
                        </div>
                    </div>
                </div>
                {#if news}
                    {#each news as { id, yoast_head_json: post }}
                        <div class="news-item">
                            <a
                                href="/latest-news/{id}"
                                class="btn card bg-transparent ring-surface-100 overflow-hidden mb-4 p-0 flex items-center text-left">
                                <div class="mr-2">
                                    <img
                                        src={post.og_image[0].url}
                                        alt={post.title}
                                        class="aspect-[4/3] max-w-[160px] object-contain" />
                                </div>
                                <div class="px-4 pr-4">
                                    <h4 class="whitespace-break-spaces">
                                        {@html post.title}
                                    </h4>
                                    <p class="whitespace-break-spaces">
                                        {@html post.og_description}
                                    </p>
                                </div>
                            </a>
                        </div>
                    {/each}
                {:else}
                    <div class="basis-full">
                        <p class="mt-8 text-4xl font-extrabold">No data was found.</p>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</section>

<style lang="scss">
    .news-item {
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
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    }
</style>
