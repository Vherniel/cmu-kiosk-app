<script lang="ts">
    import CardButton from "$lib/components/card-button/CardButton.svelte";
    import { Building2, RefreshCw } from "lucide-svelte";
    import { prevent_default } from "svelte/internal";

    // TODO: icon props

    const forms = [
        {
            href: "/registrars-office/admission",
            label: "CMU Admission",
            icon: Building2,
        },
        {
            href: "/registrars-office/application-to-shift-course",
            label: "Application to Shift Course",
            icon: RefreshCw,
        },
        {
            href: "/registrars-office/leave-of-absence",
            label: "Leave of Absence",
            icon: RefreshCw,
        },
        {
            href: "/registrars-office/request-form",
            label: "Request Form",
            icon: RefreshCw,
        },
        {
            href: "/registrars-office/application-form-for-graduation",
            label: "Application Form for Graduation",
            icon: RefreshCw,
        },
        {
            href: "/registrars-office/request-for-transcript-of-records-or-f137-from-former-school",
            label: "Request for Transcript of Records or F137 from Former School",
            icon: Building2,
        },
        {
            href: "/registrars-office/entrance-examination-permit",
            label: "Entrance Examination Permit",
            icon: Building2,
        },
        {
            href: "/registrars-office/requirement-to-enrolled",
            label: "Requirement to Enrolled",
            icon: Building2,
        },
        {
            href: "/registrars-office/acknowledgement-receipt",
            label: "Acknowledgement Receipt",
            icon: Building2,
        },
        {
            href: "/registrars-office/adding-form",
            label: "Adding Form",
            icon: Building2,
        },
        {
            href: "/registrars-office/completion-form",
            label: "Completion Form",
            icon: Building2,
        },
        {
            href: "/registrars-office/dropping-form",
            label: "Dropping Form",
            icon: Building2,
        },
    ];
</script>

<section>
    <h1>Registrar’s Office</h1>
    <p>Select a form to continue</p>
    <div class="contents">
        <div class="flex">
            {#each forms as form}
                <div class="flex-item">
                    <CardButton {...form} on:click={() => {}} />
                </div>
            {/each}
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
