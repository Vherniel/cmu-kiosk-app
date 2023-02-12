<script>
    import { page } from "$app/stores";
</script>

<header>
    Header Component

    <nav>
        <ul>
            <li aria-current={$page.url.pathname === "/" ? "page" : null}>
                <a href="/">Home</a>
            </li>
            <li aria-current={$page.url.pathname === "/components" ? "page" : null}>
                <a href="/components">Components</a>
            </li>
            <li aria-current={$page.url.pathname === "/about" ? "page" : null}>
                <a href="/about">About</a>
            </li>
        </ul>
    </nav>
</header>

<style lang="scss">
</style>
