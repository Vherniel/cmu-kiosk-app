<script lang="ts">
    import CardButton from "$lib/components/card-button/CardButton.svelte";
    import { Building2, RefreshCw } from "lucide-svelte";
</script>

<section>
    <h1>Registrar’s Office</h1>
    <p>Select a form to continue</p>
    <div class="contents">
        <div class="flex">
            <div class="flex-item">
                <CardButton
                    href="/registrars-office/admission"
                    label="CMU Admission"
                    icon={Building2} />
            </div>
            <div class="flex-item">
                <CardButton
                    href="/registrars-office/application-to-shift-course"
                    label="Application to Shift Course"
                    icon={RefreshCw} />
            </div>
            <div class="flex-item">
                <CardButton href="/" />
            </div>
            <div class="flex-item">
                <CardButton href="/" />
            </div>
            <div class="flex-item">
                <CardButton href="/" />
            </div>
            <div class="flex-item">
                <CardButton href="/" />
            </div>
            <div class="flex-item">
                <CardButton href="/" />
            </div>
        </div>
    </div>
</section>

<style lang="scss">
    .contents {
        .flex {
            display: flex;
            flex-flow: row wrap;
            margin: -0.5rem;
            .flex-item {
                flex-basis: calc(100% / 4);
                padding: 0.5rem;
            }
        }
    }
</style>
