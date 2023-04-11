<script lang="ts"></script>

<aside>
    <slot />
</aside>

<style lang="scss">
    aside {
        background-color: #fafafa;
        flex-shrink: 0;
        flex-basis: 20rem;
        padding-top: 2rem;
        padding-bottom: 2rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }
</style>
