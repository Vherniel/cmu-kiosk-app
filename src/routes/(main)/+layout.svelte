<script lang="ts">
    // Framework specific
    import { onMount } from "svelte";
    import { invalidate } from "$app/navigation";
    import { page } from "$app/stores";

    // Components
    import PageLayout from "$lib/layouts/page-layout/PageLayout.svelte";
    import Header from "$lib/layouts/header/Header.svelte";
    import Sidebar from "$lib/layouts/sidebar/Sidebar.svelte";
    import SidebarNavigation from "$lib/layouts/sidebar/SidebarNavigation.svelte";
    import SidebarItem from "$lib/layouts/sidebar/SidebarItem.svelte";
    import Logo from "$lib/components/logo/Logo.svelte";
    import Clock from "$lib/components/clock/Clock.svelte";
    import Search from "$lib/components/search/Search.svelte";
    import Account from "$lib/components/account/Account.svelte";

    // Icons
    import {
        LayoutDashboard,
        Newspaper,
        ClipboardList,
        MapPin,
        GraduationCap,
        ListPlus,
    } from "lucide-svelte";

    // Styles (order matters)
    import "../../theme.postcss";
    import "@skeletonlabs/skeleton/styles/all.css";
    import "../../app.postcss";

    import type { LayoutData } from "./$types";
    import ThemeSwitcher from "$lib/components/theme-switcher/ThemeSwitcher.svelte";

    export let data: LayoutData;
    $: ({ supabase, session } = data);

    onMount(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(() => {
            invalidate("supabase:auth");
        });

        return () => subscription.unsubscribe();
    });
</script>

<PageLayout slotSidebarLeft="border-r-[1px] border-surface-50 dark:border-secondary-900 w-80">
    <svelte:fragment slot="header">
        <Header class="px-20 py-8 z-10">
            <svelte:fragment slot="left">
                <Search />
            </svelte:fragment>
            <svelte:fragment slot="right">
                <Clock
                    temperature={data?.weather?.condition.text}
                    weatherCondition={data?.weather?.heatindex_c} />
            </svelte:fragment>
        </Header>
    </svelte:fragment>
    <svelte:fragment slot="sidebarLeft">
        <Sidebar class="px-6" slotTop="text-center py-6" slotBottom="mt-auto px-6 pb-12">
            <svelte:fragment slot="top">
                <Logo href="/" size={4.5} class="mb-4" />
                <Account {data} />
            </svelte:fragment>
            <svelte:fragment slot="middle">
                <SidebarNavigation>
                    <SidebarItem
                        name={"Dashboard"}
                        href={"/"}
                        icon={LayoutDashboard}
                        selected={$page.url.pathname == "/"} />
                    <SidebarItem
                        name={"Latest News"}
                        href={"/latest-news"}
                        icon={Newspaper}
                        selected={$page.route.id?.includes("/latest-news")} />
                    <SidebarItem
                        name={"Registrar’s Office"}
                        href={"/registrars-office"}
                        icon={ClipboardList}
                        selected={$page.route.id?.includes("/registrars-office")} />
                    <SidebarItem
                        name={"Wayfinder"}
                        href={"/wayfinder"}
                        icon={MapPin}
                        selected={$page.route.id?.includes("/wayfinder")} />
                    <SidebarItem
                        name={"Student Portal"}
                        href={"/student-portal"}
                        icon={GraduationCap}
                        selected={$page.route.id?.includes("/student-portal")} />
                    <SidebarItem
                        name={"Additional Services"}
                        href={"/additional-services"}
                        icon={ListPlus}
                        selected={$page.route.id?.includes("/additional-services")} />
                </SidebarNavigation>
            </svelte:fragment>
            <svelte:fragment slot="bottom">
                <ThemeSwitcher />
            </svelte:fragment>
        </Sidebar>
    </svelte:fragment>
    <!-- main content -->
    <slot />
    <!-- main content -->
</PageLayout>

<style lang="scss">
</style>
