<script lang="ts">
    import CardButton from "$lib/components/card-button/CardButton.svelte";
    import { Feather } from "lucide-svelte";

    const services = [
        {
            href: "/additional-services/hemmingway-app",
            label: "Hemmingway App",
            icon: Feather,
        },
    ];
</script>

<section>
    <h1>Additional Services</h1>
    <p>Select a service to continue</p>

    <div class="contents">
        <div class="flex">
            {#each services as { ...service }}
                <div class="flex-item-1-4">
                    <CardButton {...service} />
                </div>
            {/each}
        </div>
    </div>
</section>

<style lang="scss">
    .flex {
        display: flex;
        flex-flow: row wrap;
        margin: -0.5rem;
        .flex-item-1-4 {
            flex-basis: calc(100% / 4);
            padding: 0.5rem;
        }
    }
</style>
