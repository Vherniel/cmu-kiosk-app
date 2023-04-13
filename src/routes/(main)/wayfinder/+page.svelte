<script lang="ts">
    import Callout from "$lib/components/callout/Callout.svelte";
    import { AlertTriangle } from "lucide-svelte";
</script>

<section>
    <div class="container">
        <h1>Wayfinder</h1>
        <Callout>
            <AlertTriangle slot="icon" />
            <h3 slot="title">Attention: An important notice</h3>
            <div slot="content">
                <p>
                    The following blueprints in this sections is <em>non-standard.</em> Actual
                    blueprints should be acquired from the university for more accurate
                    representation of the building. The researchers requested the floorplan
                    blueprints but it is
                    <em>currently unavailable due to legal concerns.</em>
                </p>
                <p>
                    The floorplan below is just an example and a rough estimation of the faculty
                    building.
                </p>
            </div>
        </Callout>
    </div>
</section>

<style lang="scss"></style>
