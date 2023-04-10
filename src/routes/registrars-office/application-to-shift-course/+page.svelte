<script lang="ts">
    import type { PageData } from "./$types";
    import { superForm } from "sveltekit-superforms/client";
    import {
        MultiStep,
        StepTabList,
        StepTab,
        StepPanel,
        StepNavigation,
    } from "$lib/components/multi-step";
    import { Info } from "lucide-svelte";
    import Callout from "$lib/components/callout/Callout.svelte";
    import InputText from "$lib/components/input/InputText.svelte";
    import { SVGPathPencil } from "$lib/components/svg-path-pencil";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    export let data: PageData;

    let formRecordsId: number;

    let submitStatus: "submitting" | "submitted" | false = false;

    let summary;

    if ($page.url.searchParams.get("formRecordsId")) {
        summary = data.summary[0].form_values;
    }

    const superform = superForm(data.submitForm, {
        id: "submitForm",
        multipleSubmits: "prevent",
        onSubmit({ data, submitter }) {
            submitter.disabled = true;
            submitStatus = "submitting";

            // submit values from $form instead of the default form action
            Object.entries($form).forEach(([key, value]) => {
                // prettier-ignore
                key == "Signature"
                    ? data.set(key, svg)
                    : data.set(key, value.toString());
            });
        },
        onResult({ result }) {
            formRecordsId = result.data.formId;
        },
        onUpdate() {
            $page.url.searchParams.set("step", "payment");
            submitStatus = "submitted";
        },
    });

    const { form, enhance, capture, restore } = superform;

    const paymentSuperform = superForm(data.payment, {
        id: "payment",
        multipleSubmits: "prevent",
        onSubmit({ data, submitter }) {
            data.set("formRecordsId", formRecordsId.toString());

            if (submitter?.className?.includes("gcash")) {
                return data.set("Method", "gcash");
            }

            data.set("Method", "cash");
        },
    });

    const { form: paymentForm, enhance: paymentEnhance } = paymentSuperform;

    export const snapshot = { capture, restore };

    let svg: string;
    let paymentRedirecting = false;
</script>

<section>
    <div class="heading">
        <h1>Application to Shift Course</h1>
        <p>Lorem ipsum dolor sit amet consectetur</p>
    </div>

    <MultiStep>
        <div class="flex">
            <div class="page-steps">
                <h4>Steps</h4>
                <StepTabList>
                    <div><StepTab name="intro">Introduction</StepTab></div>
                    <div><StepTab name="form">Fill-out Form</StepTab></div>
                    <div><StepTab name="sign">Signature Signing</StepTab></div>
                    <div><StepTab name="payment">Choose Payment Method</StepTab></div>
                    <div><StepTab name="summary">Summary</StepTab></div>
                </StepTabList>
            </div>
            <div class="page-content">
                <div class="page-container">
                    <StepPanel>
                        <div id="dropin-container" />
                        <h2>What is Course Shifting?</h2>
                        <Callout>
                            <h3 slot="title">Important Notice</h3>
                            <p slot="content">
                                The growing number of irregular students’ population in the
                                University was a consequence of the absence of policy on the
                                Shifting, Withdrawal and Leave of Absence of Students. This
                                policy is being implemented to reduce the number of irregular
                                students and to also assist the students in completing their
                                course of study at the soonest possible time. By reducing the
                                number of irregular students, we also enhance their academic
                                experience.
                            </p>
                        </Callout>
                        <p>
                            Course shifting refers to a transfer from one program to another of
                            the same level. A level may be undergraduate, masters or doctoral. A
                            student may shift from one course to another only once; provided
                            that the student completes the course within the maximum residency
                            period allotted for each student (5 years for a 4-year course and 6
                            years for a 5-year course).
                        </p>
                        <h4>Shifting Procedures</h4>
                        <ul>
                            <li>
                                All courses taken at the City of Malabon University are
                                reflected in the transcript of records, these grades shall be
                                included in the calculation of GPA.
                            </li>
                            <li>
                                College Deans may impose conditions and requirements for
                                approval of shifting.
                            </li>
                            <li>
                                Honors and awards will be based on the entire academic
                                performance of the student at City of Malabon University,
                                regardless of shifting.
                            </li>
                            <li>
                                Shifting is only allowed until SECOND (2nd) Year level to avoid
                                delay to the “shiftee”.
                            </li>
                            <li>
                                The School Calendar shall reflect the shifting period, the Vice
                                President for Academic Affairs, may choose to deferred this if
                                the number of IRREGULAR STUDENTS exceed 250.
                            </li>
                            <li>
                                If a student has intention to shift, he/she must submit the
                                following at the office of Academic Affairs with the prescribed
                                period of shifting indicated in the school calendar.
                            </li>
                            <li>
                                Latest transcript of records (maybe printed out from University
                                Management System)
                            </li>
                            <li>
                                Filled Out Shifting Form and signed by student and co-signed by
                                guardian/parent if below 21 years old.
                            </li>
                            <li>
                                The College Dean or program Coordinator will evaluate the
                                students if they are ideal to transfer. (College they intend to
                                go will evaluate)
                            </li>
                            <li>
                                Secure the signature of College Dean and Program Coordinator
                            </li>
                            <li>
                                Place all the above documents in a brown with name of student
                                clearly indicated at the UPPER RIGHT corner and submit to the
                                office of the UNIVERSITY REGISTRAR HEAD.
                            </li>
                            <li>
                                After 2-4 days, the student will get results if the shifting
                                appeal is approved or disapproved.
                            </li>
                            <li>
                                As we are limiting the number of irregular students, there will
                                be limited slots of “shifters” per academic year, the VP for
                                Academic Affairs shall determine this number.
                            </li>
                            <li>A student may only shift ONE (1) time.</li>
                        </ul>
                    </StepPanel>
                    <!-- <SuperDebug data={$form} /> -->
                    <form method="POST" action="?/submitForm" use:enhance>
                        <StepPanel>
                            <h2>Fill-out Form</h2>
                            <InputText
                                label="First name"
                                name="First name"
                                id="first-name"
                                required
                                {superform} />
                            <InputText
                                label="Middle name"
                                name="Middle name"
                                id="middle-name"
                                required
                                {superform} />
                            <InputText
                                label="Last name"
                                name="Last name"
                                id="last-name"
                                required
                                {superform} />
                            <InputText
                                label="Student ID"
                                name="Student ID"
                                id="student-id"
                                required
                                {superform} />
                        </StepPanel>
                        <StepPanel>
                            <h2>Signature Signing</h2>
                            <p>Write your signature inside the box</p>
                            <div class="box">
                                <!-- TODO: https://www.npmjs.com/package/svgo -->
                                <SVGPathPencil bind:dataPaths={svg} />
                            </div>
                            <input type="submit" value="Submit" />
                            {#if submitStatus == "submitted"}
                                <p>Form submitted. Click <strong>next to continue.</strong></p>
                            {/if}
                            {#if submitStatus == "submitting"}
                                <p>Submitting</p>
                            {/if}
                            <p>
                                Submitting this form will only make it as a draft. A transaction
                                must be made to complete this form.
                            </p>
                        </StepPanel>
                    </form>
                    <StepPanel>
                        <h2>Choose Payment Method</h2>
                        <form method="post" action="?/payment" use:paymentEnhance>
                            <button type="submit" class="cash" name="Pay cash">
                                Pay cash
                            </button>
                            <button
                                type="submit"
                                class="gcash"
                                name="Pay with GCash"
                                on:click={() => (paymentRedirecting = !paymentRedirecting)}>
                                Pay with GCash
                            </button>
                            <p>
                                Paying with cash will automatically queue your request and it
                                will generate a unique QR Code to be presented to the registrar
                                staff.
                            </p>
                            {#if paymentRedirecting}
                                <h2>Redirecting</h2>
                            {/if}
                        </form>
                    </StepPanel>
                    <StepPanel>
                        <h2>Summary</h2>
                        <h4>
                            {#if $page.url.searchParams.get("formRecordsId")}
                                <p>{summary.metadata.done ? "Completed" : "Draft"}</p>
                                <p>
                                    {summary.superform.data["Last name"]}, {summary.superform
                                        .data["First name"]}
                                    {summary.superform.data["Middle name"]}: {summary.superform
                                        .data["Student ID"]}
                                </p>
                                <svg>
                                    {#each JSON.parse(summary.superform.data["Signature"]) as p}
                                        <path
                                            stroke-width={4}
                                            d={p.strPath}
                                            stroke={p.color}
                                            fill="transparent" />
                                    {/each}
                                </svg>
                            {/if}
                            <a href="/">Back to main dashboard</a>
                        </h4>
                    </StepPanel>
                </div>
                <StepNavigation />
            </div>

            <div class="information">
                <div class="info">
                    <div class="info-heading">
                        <div class="info-icon">
                            <Info size={24} />
                        </div>
                        <div>
                            <h4 class="info-name">Information & Status</h4>
                        </div>
                    </div>
                    <p class="info-description">
                        A helpful description when focusing an input will appear in here and a
                        current status to the whole process.
                    </p>
                </div>
            </div>
        </div>
    </MultiStep>
</section>

<style lang="scss">
    .heading {
        p {
            margin-top: 1rem;
        }
        margin-bottom: 4rem;
    }
    .flex {
        display: flex;
        position: relative;
    }
    .page-steps {
        align-self: flex-start;
        position: sticky;
        top: 12rem;
        h4 {
            margin-bottom: 1rem;
        }
        flex-basis: 16rem;
    }
    .page-content {
        flex: 1;
        .page-container {
            max-width: 40rem;
            margin-left: 2rem;
        }
        h2 {
            margin-bottom: 1em;
        }
        h4 {
            margin-top: 1em;
            margin-bottom: 1em;
        }
    }
    .information {
        align-self: flex-start;
        position: sticky;
        top: 12rem;
        .info {
            background-color: hsla(0, 0%, 96%, 100);
            border-radius: 0.75rem;
            padding: 1.25rem;
            .info-heading {
                display: flex;
                align-items: center;
                .info-name {
                    margin-left: 0.75em;
                }
            }
            .info-description {
                margin-top: 1rem;
            }
        }
        flex-basis: 24rem;
    }
    .box {
        border: dashed 2px black;
        height: 36rem;
    }
</style>
