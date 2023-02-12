<script>
    import Header from "./Header.svelte";
    import "$lib/styles/styles.scss";
</script>

<div class="app">
    <Header />

    <main>
        <slot />
    </main>
</div>

<style lang="scss">
</style>
