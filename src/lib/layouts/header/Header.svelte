<script lang="ts">
</script>

<header on:wheel|preventDefault|stopPropagation|nonpassive>
    <slot />
</header>

<style lang="scss">
    header {
        position: sticky;
        top: 0;
        left: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        background-color: #fff;
        padding-top: 3rem;
        padding-bottom: 3rem;
        padding-left: 5.125rem;
        padding-right: 5.125rem;
    }
</style>
