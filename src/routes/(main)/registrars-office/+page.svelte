<script lang="ts">
    import CardButton from "$lib/components/card-button/CardButton.svelte";
    import { Building2, DoorOpen, Edit, RefreshCw } from "lucide-svelte";
    import type { PageData } from "./$types";
    import { PUBLIC_KIOSK_GUEST_EMAIL } from "$env/static/public";

    export let data: PageData;

    $: ({ session, formRecords } = data);

    // TODO: icon props
    // prettier-ignore
    const forms = [{
            href: "/registrars-office/admission",
            label: "CMU Admission",
            icon: Building2,
        }, {
            href: "/registrars-office/application-to-shift-course",
            label: "Application to Shift Course",
            icon: RefreshCw,
        }, {
            href: "/registrars-office/leave-of-absence",
            label: "Leave of Absence",
            icon: DoorOpen,
            disabled: true,
        }, {
            href: "/registrars-office/request-form",
            label: "Request Form",
            icon: Edit,
            disabled: true,
        }, {
            href: "/registrars-office/application-form-for-graduation",
            label: "Application Form for Graduation",
            icon: RefreshCw,
            disabled: true,
        }, {
            href: "/registrars-office/request-for-transcript-of-records-or-f137-from-former-school",
            label: "Request for Transcript of Records or F137 from Former School",
            icon: Building2,
            disabled: true,
        }, {
            href: "/registrars-office/entrance-examination-permit",
            label: "Entrance Examination Permit",
            icon: Building2,
            disabled: true,
        }, {
            href: "/registrars-office/requirement-to-enrolled",
            label: "Requirement to Enrolled",
            icon: Building2,
            disabled: true,
        }, {
            href: "/registrars-office/acknowledgement-receipt",
            label: "Acknowledgement Receipt",
            icon: Building2,
            disabled: true,
        }, {
            href: "/registrars-office/adding-form",
            label: "Adding Form",
            icon: Building2,
            disabled: true,
        }, {
            href: "/registrars-office/completion-form",
            label: "Completion Form",
            icon: Building2,
            disabled: true,
        }, {
            href: "/registrars-office/dropping-form",
            label: "Dropping Form",
            icon: Building2,
            disabled: true,
        },
    ];
</script>

<section class="pb-48">
    <div class="container">
        <div class="mb-16">
            <h1>Registrar’s Office</h1>
        </div>
        <p>Select a form to continue</p>
        <div class="contents">
            <div class="flex">
                <div class="flex-item-1-2">
                    <h3>
                        Draft forms: {formRecords?.filter(
                            ({ form_values }) => form_values.metadata.draft
                        ).length}
                    </h3>
                </div>
                <div class="flex-item-1-2">
                    <h3>
                        Completed forms: {formRecords?.filter(
                            ({ form_values }) => form_values.metadata.done
                        ).length}
                    </h3>
                </div>
                {#each forms as { href, ...form }}
                    <div class="flex-item-1-4">
                        <CardButton
                            class=""
                            href={!session || session?.user?.email == PUBLIC_KIOSK_GUEST_EMAIL
                                ? "/sign-in?redirect=" + encodeURIComponent(href)
                                : href}
                            {...form} />
                    </div>
                {/each}
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
            .flex-item-1-4 {
                flex-basis: calc(100% / 4);
                padding: 0.5rem;
            }
            .flex-item-1-2 {
                flex-basis: calc(50%);
                padding: 0.5rem;
            }
        }
    }
</style>
