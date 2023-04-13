<script lang="ts">
    import { Search } from "lucide-svelte";
</script>

<!-- https://github.com/metonym/svelte-typeahead -->
<label>
    <div
        class="input-group grid-cols-[auto_1fr_auto] bg-transparent border-2 border-surface-50 focus-within:border-primary-500 dark:border-surface-500 dark:bg-surface-800 dark:focus-within:border-primary-500">
        <div><Search /></div>
        <input
            type="search"
            class="input bg-transparent dark:bg-transparent px-0 h-14"
            placeholder="Search…" />
    </div>
</label>

<style lang="scss">
</style>
