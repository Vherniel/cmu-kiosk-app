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

    /** @type {import('./$types').LayoutData} */
    export let data;

    $: ({ supabase } = data);

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
        <div class="sidebar-logo">
            <a class="logo" href="/"> <Logo /></a>
        </div>
        <!-- <SidebarUserAccount /> -->
        <SidebarNavigation>
            <SidebarItem
                name={"Latest News"}
                href="/latest-news"
                icon={Newspaper}
                selected={$page.route.id == "/latest-news"}
            />
            <SidebarItem
                name={"Registrar’s Office"}
                href="/registrars-office"
                icon={ClipboardList}
                selected={$page.route.id == "/registrars-office"}
            />
            <SidebarItem
                name={"Wayfinder"}
                href="/wayfinder"
                icon={MapPin}
                selected={$page.route.id == "/wayfinder"}
            />
            <SidebarItem
                name={"Student Portal"}
                href="/student-portal"
                icon={GraduationCap}
                selected={$page.route.id == "/student-portal"}
            />
            <SidebarItem
                name={"Additional Services"}
                href="/additional-services"
                icon={ListPlus}
                selected={$page.route.id == "/additional-services"}
            />
        </SidebarNavigation>
    </Sidebar>
    <div class="main-content">
        <Header>
            <div class="search">
                <Search />
            </div>
            <div class="weather">
                <Clock
                    temperature={data.weather.condition.text}
                    weatherCondition={data.weather.heatindex_c}
                />
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
    }
    .sidebar-logo {
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .logo {
            color: black;
            text-decoration: none;
        }
    }
    .main-content {
        flex: 1;
        padding-left: 5.125rem;
        padding-right: 5.125rem;
    }
    .search {
        margin-right: auto;
    }
    main {
        padding-top: 3rem;
        padding-bottom: 3rem;
    }
</style>
