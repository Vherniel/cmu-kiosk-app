<script lang="ts" context="module">
</script>

<script lang="ts">
    import { Search } from "lucide-svelte";
</script>

<!-- https://github.com/metonym/svelte-typeahead -->
<label class="search">
    <Search />
    <input type="search" placeholder="Search…" aria-placeholder="Search…" />
</label>

<style lang="scss">
    .search {
        display: flex;
        align-items: center;
        border-radius: 0.75rem;
        padding-left: 1rem;
        padding-right: 1rem;
        background-color: #f5f5f5;
        width: 32rem;
    }
    input {
        flex: 1;
        background: none;
        margin-left: 0.75rem;
        border: 0;
        padding: 0;
        height: 3.5rem;
        &::placeholder {
            color: #a3a3a3;
        }
    }
</style>
