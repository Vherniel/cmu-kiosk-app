<script lang="ts">
</script>

<svelte:head>
    <meta name="csrf-token" content="57XB6za7Vlmz3DPnsWZYegNdaIIV3J6fXWDNlLXD" />
</svelte:head>

<section>
    <h1>Student Portal</h1>
    <figure>
        <blockquote cite="">
            <p><span style="color: #FFCD2E;">⚠️</span> Under legal issues</p>
        </blockquote>
        <figcaption>
            —Ezekiel Borja, <cite>City of Malabon University, MIS</cite>
        </figcaption>
    </figure>
    <iframe
        src="https://portal.cityofmalabonuniversity.edu.ph"
        title="City of Malabon University Student Portal"
        frameborder="0"
    />
</section>

<style lang="scss">
    figure {
        border-left: solid 4px grey;
        padding-left: 1rem;
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
        /* remove */
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
        /* remove */
        p {
            margin-bottom: 0.5rem;
        }
    }
    iframe {
        width: 100%;
        height: 44rem;
        border: solid 1px #d9d9d9;
        border-radius: 1rem;
    }
</style>
