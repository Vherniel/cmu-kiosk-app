<script lang="ts">
</script>

<header class={`flex items-center ${$$props.class}`.trim()}>
    <div class="mr-auto">
        <slot name="left" />
    </div>
    <div>
        <slot name="right" />
    </div>
</header>

<style lang="scss">
</style>
