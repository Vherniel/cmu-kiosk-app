<script>
    // Framework specific
    import { onMount } from "svelte";
    import { invalidate } from "$app/navigation";
    import { page } from "$app/stores";
    // Components
    import Header from "$lib/layouts/header/Header.svelte";
    import Logo from "$lib/components/logo/Logo.svelte";
    import Sidebar from "$lib/layouts/sidebar/Sidebar.svelte";
    import SidebarNavigation from "$lib/layouts/sidebar/SidebarNavigation.svelte";
    import SidebarItem from "$lib/layouts/sidebar/SidebarItem.svelte";
    import Clock from "$lib/components/clock/Clock.svelte";
    import Search from "$lib/components/search/Search.svelte";
    // Icons
    import { Newspaper, ClipboardList, MapPin, GraduationCap, ListPlus } from "lucide-svelte";
    // Styles
    import "$lib/styles/styles.scss";
    import Account from "$lib/components/account/Account.svelte";

    /** @type {import('./$types').LayoutData} */
    export let data;
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

<div class="app">
    <Sidebar>
        <div class="sidebar__logo">
            <a class="logo" href="/"> <Logo /></a>
        </div>
        <div class="sidebar__account">
            <!-- TODO: avoid prop drilling -->
            <Account {data} />
        </div>
        <div class="sidebar__navigation">
            <SidebarNavigation>
                <SidebarItem
                    name={"Latest News"}
                    href="/latest-news"
                    icon={Newspaper}
                    selected={$page.route.id?.includes("/latest-news")} />
                <SidebarItem
                    name={"Registrar’s Office"}
                    href="/registrars-office"
                    icon={ClipboardList}
                    selected={$page.route.id?.includes("/registrars-office")} />
                <SidebarItem
                    name={"Wayfinder"}
                    href="/wayfinder"
                    icon={MapPin}
                    selected={$page.route.id?.includes("/wayfinder")} />
                <SidebarItem
                    name={"Student Portal"}
                    href="/student-portal"
                    icon={GraduationCap}
                    selected={$page.route.id?.includes("/student-portal")} />
                <SidebarItem
                    name={"Additional Services"}
                    href="/additional-services"
                    icon={ListPlus}
                    selected={$page.route.id?.includes("/additional-services")} />
            </SidebarNavigation>
        </div>
    </Sidebar>
    <div class="main-content">
        <Header>
            <div class="search">
                <Search />
            </div>
            <div class="weather">
                <Clock
                    temperature={data.weather.condition.text}
                    weatherCondition={data.weather.heatindex_c} />
            </div>
        </Header>
        <main>
            <slot />
        </main>
    </div>
</div>

<style lang="scss">
    .app {
        display: flex;
        height: 100%;
    }
    .sidebar__account {
        margin-top: 1.5rem;
        margin-bottom: 1rem;
    }
    .sidebar__logo {
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .logo {
            color: black;
            text-decoration: none;
        }
    }
    .sidebar__navigation {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .main-content {
        flex: 1;
        overflow-x: hidden;
        overflow-y: scroll;
        height: 100%;
    }
    .search {
        margin-right: auto;
    }
    main {
        padding-top: 2rem;
        padding-bottom: 2rem;
        padding-left: 5.125rem;
        padding-right: 5.125rem;
    }
</style>
