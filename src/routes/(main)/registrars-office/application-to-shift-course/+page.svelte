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
    import { Info, LayoutDashboard, Receipt, RotateCcw, Wallet } from "lucide-svelte";
    import Callout from "$lib/components/callout/Callout.svelte";
    import InputText from "$lib/components/input/InputText.svelte";
    import { SVGPathPencil } from "$lib/components/svg-path-pencil";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { afterUpdate } from "svelte";
    import InputTextArea from "$lib/components/input/InputTextArea.svelte";

    export let data: PageData;

    let formRecordsId: number;

    let submitStatus: "submitting" | "submitted" | false = false;

    let summary;

    function addInfo(name: string, description: string) {
        document.getElementsByClassName("info-name")[0].innerHTML = name;
        document.getElementsByClassName("info-description")[0].innerHTML = description;
    }

    if ($page.url.searchParams.get("formRecordsId")) {
        // @ts-ignore
        summary = data.summary[0].form_values;
    }

    const superform = superForm(data.submitForm, {
        id: "submitForm",
        multipleSubmits: "prevent",
        onSubmit({ data, submitter }) {
            // @ts-ignore
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
            // @ts-ignore
            formRecordsId = result.data.formId;
        },
        onUpdate() {
            $page.url.searchParams.set("step", "payment");
            submitStatus = "submitted";
        },
    });

    const { form, enhance, capture, restore, fields } = superform;

    const paymentSuperform = superForm(data.payment, {
        id: "payment",
        multipleSubmits: "prevent",
        onSubmit({ data, submitter }) {
            data.set("formRecordsId", formRecordsId.toString());

            if (submitter?.className?.includes("gcash")) {
                paymentRedirecting = true;
                return data.set("Method", "gcash");
            }

            data.set("Method", "cash");
        },
    });

    const { form: paymentForm, enhance: paymentEnhance } = paymentSuperform;

    export const snapshot = { capture, restore };

    $: requiredValuesAreFilled = false;

    afterUpdate(() => {
        // console.log($form);
        // this compiles the input whether it has values in fill-out form into a boolean
        requiredValuesAreFilled = Object.entries($form)
            .map(([key, value]) => {
                if (key != "Signature") return value.toString().length > 0;
                return true;
            })
            .reduce((prev, current) => {
                return prev && current;
            });

        // console.log(requiredValuesAreFilled);
    });

    let svg: string;
    let paymentRedirecting = false;
</script>

<section>
    <div class="container">
        <div class="mb-20">
            <h1>Application to Shift Course</h1>
        </div>

        <MultiStep>
            <div class="flex">
                <div class="page-steps">
                    <h4>Steps</h4>
                    <StepTabList>
                        <StepTab previous={false} next={true} name="intro">
                            Introduction
                        </StepTab>
                        <StepTab previous={true} next={requiredValuesAreFilled} name="form"
                            >Fill-out Form</StepTab>
                        <StepTab previous={true} next={false} name="sign">
                            Signature Signing
                        </StepTab>
                        <StepTab previous={false} next={false} name="payment">
                            Choose Payment
                        </StepTab>
                        <StepTab previous={false} next={false} name="summary">Summary</StepTab>
                        <div
                            class="mt-8 border-t-2 border-surface-200/30 dark:border-surface-400/30">
                            <button
                                class="btn w-full mt-8 py-4 font-bold ring-2 text-secondary-700 dark:text-secondary-200 variant-ringed-secondary active:bg-secondary-500 active:text-white"
                                on:click={(event) => {
                                    goto("?step=intro");
                                }}>
                                <div><RotateCcw /></div>
                                <div>Start over</div>
                            </button>
                        </div>
                    </StepTabList>
                </div>
                <div class="page-content">
                    <div class="page-container">
                        <StepPanel name="intro">
                            <h2>What is Course Shifting?</h2>
                            <Callout>
                                <h3 slot="title">Important Notice</h3>
                                <p slot="content">
                                    The growing number of irregular students’ population in the
                                    University was a consequence of the absence of policy on the
                                    Shifting, Withdrawal and Leave of Absence of Students. This
                                    policy is being implemented to reduce the number of
                                    irregular students and to also assist the students in
                                    completing their course of study at the soonest possible
                                    time. By reducing the number of irregular students, we also
                                    enhance their academic experience.
                                </p>
                            </Callout>
                            <p>
                                Course shifting refers to a transfer from one program to another
                                of the same level. A level may be undergraduate, masters or
                                doctoral. A student may shift from one course to another only
                                once; provided that the student completes the course within the
                                maximum residency period allotted for each student (5 years for
                                a 4-year course and 6 years for a 5-year course).
                            </p>
                            <h4>Shifting Procedures</h4>
                            <ul>
                                <li>
                                    All courses taken at the City of Malabon University are
                                    reflected in the transcript of records, these grades shall
                                    be included in the calculation of GPA.
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
                                    Shifting is only allowed until SECOND (2nd) Year level to
                                    avoid delay to the “shiftee”.
                                </li>
                                <li>
                                    The School Calendar shall reflect the shifting period, the
                                    Vice President for Academic Affairs, may choose to deferred
                                    this if the number of IRREGULAR STUDENTS exceed 250.
                                </li>
                                <li>
                                    If a student has intention to shift, he/she must submit the
                                    following at the office of Academic Affairs with the
                                    prescribed period of shifting indicated in the school
                                    calendar.
                                </li>
                                <li>
                                    Latest transcript of records (maybe printed out from
                                    University Management System)
                                </li>
                                <li>
                                    Filled Out Shifting Form and signed by student and co-signed
                                    by guardian/parent if below 21 years old.
                                </li>
                                <li>
                                    The College Dean or program Coordinator will evaluate the
                                    students if they are ideal to transfer. (College they intend
                                    to go will evaluate)
                                </li>
                                <li>
                                    Secure the signature of College Dean and Program Coordinator
                                </li>
                                <li>
                                    Place all the above documents in a brown with name of
                                    student clearly indicated at the UPPER RIGHT corner and
                                    submit to the office of the UNIVERSITY REGISTRAR HEAD.
                                </li>
                                <li>
                                    After 2-4 days, the student will get results if the shifting
                                    appeal is approved or disapproved.
                                </li>
                                <li>
                                    As we are limiting the number of irregular students, there
                                    will be limited slots of “shifters” per academic year, the
                                    VP for Academic Affairs shall determine this number.
                                </li>
                                <li>A student may only shift ONE (1) time.</li>
                            </ul>
                        </StepPanel>
                        <!-- <SuperDebug data={$form} /> -->
                        <form method="POST" action="?/submitForm" use:enhance>
                            <StepPanel name="form">
                                <h2>Fill-out Form</h2>
                                <InputText
                                    on:focus={() => {
                                        addInfo("First Name", "Your first name or given name.");
                                    }}
                                    label="First name"
                                    name="First name"
                                    id="first-name"
                                    required
                                    {superform}>
                                    <LayoutDashboard slot="prefix" />
                                </InputText>
                                <InputText
                                    on:focus={() => {
                                        addInfo(
                                            "Middle name",
                                            "Your middle name or middle initial."
                                        );
                                    }}
                                    label="Middle name"
                                    name="Middle name"
                                    id="middle-name"
                                    required
                                    {superform} />
                                <InputText
                                    on:focus={() => {
                                        addInfo("Last name", "Your last name or surname.");
                                    }}
                                    label="Last name"
                                    name="Last name"
                                    id="last-name"
                                    required
                                    {superform} />
                                <InputText
                                    on:focus={() => {
                                        addInfo(
                                            "Student ID",
                                            "Your Student ID or Student Number."
                                        );
                                    }}
                                    label="Student ID"
                                    name="Student ID"
                                    id="student-id"
                                    required
                                    {superform} />
                                <InputText
                                    on:focus={() => {
                                        addInfo("Year level", "Your current year level.");
                                    }}
                                    label="Year"
                                    name="Year"
                                    id="year"
                                    required
                                    {superform} />
                                <InputText
                                    on:focus={() => {
                                        addInfo("Section", "Your current year level.");
                                    }}
                                    label="Section"
                                    name="Section"
                                    id="section"
                                    required
                                    {superform} />
                                <InputText
                                    on:focus={() => {
                                        addInfo(
                                            "School year",
                                            "Also known as academic year. The current period of year from start to finish."
                                        );
                                    }}
                                    label="School year"
                                    name="School year"
                                    id="school-year"
                                    required
                                    {superform} />
                                <InputText
                                    on:focus={() => {
                                        addInfo(
                                            "Former course",
                                            "The current course you are currently in."
                                        );
                                    }}
                                    label="Former course"
                                    name="Former course"
                                    id="former-course"
                                    required
                                    {superform} />
                                <InputText
                                    on:focus={() => {
                                        addInfo(
                                            "Former course major",
                                            "The current course major you are currently in."
                                        );
                                    }}
                                    label="Former course major"
                                    name="Former course major"
                                    id="former-course-major"
                                    required
                                    {superform} />
                                <InputText
                                    on:focus={() => {
                                        addInfo(
                                            "New course",
                                            "The new course you want to shift."
                                        );
                                    }}
                                    label="New course"
                                    name="New course"
                                    id="new-course"
                                    required
                                    {superform} />
                                <InputText
                                    on:focus={() => {
                                        addInfo(
                                            "New course major",
                                            "The new course major you want to shift."
                                        );
                                    }}
                                    label="New course major"
                                    name="New course major"
                                    id="new-course-major"
                                    required
                                    {superform} />
                                <InputTextArea
                                    on:focus={() => {
                                        addInfo(
                                            "Reason for shifting",
                                            "The reasons/s for shifting to your desired new course. Should be 1-3 paragraph/s."
                                        );
                                    }}
                                    rows="4"
                                    label="Reason for shifting"
                                    name="Reason for shifting"
                                    id="reason-for-shifting"
                                    required
                                    {superform} />
                            </StepPanel>
                            <StepPanel name="sign">
                                <h2>Signature Signing</h2>
                                <SVGPathPencil bind:dataPaths={svg} />
                                <button
                                    class="btn w-full mt-4 py-6 variant-filled-primary font-bold"
                                    type="submit">
                                    Submit
                                </button>
                                {#if submitStatus == "submitted"}
                                    <p>
                                        Form submitted. Click <strong>next to continue.</strong>
                                    </p>
                                {/if}
                                {#if submitStatus == "submitting"}
                                    <p>Submitting</p>
                                {/if}
                                <p class="mt-4">
                                    Submitting this form will only make it as a draft. A
                                    transaction must be made to complete this form.
                                </p>
                            </StepPanel>
                        </form>
                        <StepPanel name="payment">
                            <h2>Choose Payment</h2>
                            <form method="post" action="?/payment" use:paymentEnhance>
                                <div>
                                    <div class="-mx-4 flex">
                                        <div class="card mx-4 flex-1">
                                            <button
                                                type="submit"
                                                name="Pay cash"
                                                class="cash p-5 text-left flex flex-col h-full">
                                                <div class="flex items-center">
                                                    <div><Receipt size="42" /></div>
                                                    <div class="ml-4 text-xl font-extrabold">
                                                        Pay with cash
                                                    </div>
                                                </div>
                                                <div class="mt-4 mb-1 text-surface-400">
                                                    Price
                                                </div>
                                                <div class="font-extrabold text-2xl">
                                                    ₱100.00
                                                </div>
                                                <div class="mt-6 mb-10">
                                                    By paying with cash, your request will NOT
                                                    automatically queue. A payment to the
                                                    cashier must be settled before processing.
                                                </div>
                                                <div
                                                    class="text-surface-300 text-sm border-t-2 border-surface-200 w-full mt-auto pt-4">
                                                    <div>For demonstration purposes only*</div>
                                                </div>
                                            </button>
                                        </div>
                                        <div class="card mx-4 flex-1">
                                            <button
                                                type="submit"
                                                name="Pay with GCash"
                                                class="gcash p-5 text-left flex flex-col h-full">
                                                <div class="flex items-center">
                                                    <div><Wallet size="42" /></div>
                                                    <div class="ml-4 text-xl font-extrabold">
                                                        Pay with GCash
                                                    </div>
                                                </div>
                                                <div class="mt-4 mb-1 text-surface-400">
                                                    Price
                                                </div>
                                                <div class="font-extrabold text-2xl">
                                                    ₱100.00
                                                </div>
                                                <div class="mt-6 mb-10">
                                                    By paying with GCash, your request will
                                                    automatically queue for processing.
                                                </div>
                                                <div
                                                    class="text-surface-300 text-sm border-t-2 border-surface-200 w-full mt-auto pt-4">
                                                    <div>For demonstration purposes only*</div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    {#if paymentRedirecting}
                                        <h2 class="text-center my-4">Redirecting</h2>
                                    {/if}
                                </div>
                            </form>
                        </StepPanel>
                        <StepPanel name="summary">
                            <h2>Summary</h2>
                            <h4>
                                {#if $page.url.searchParams.get("formRecordsId")}
                                    <p>{summary.metadata.done ? "Completed" : "Draft"}</p>
                                    <p>
                                        {summary.superform.data["Last name"]}, {summary
                                            .superform.data["First name"]}
                                        {summary.superform.data["Middle name"]}: {summary
                                            .superform.data["Student ID"]}
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
                        <StepNavigation />
                    </div>
                </div>

                <div class="information">
                    <div
                        class="info border-2 bg-secondary-50 border-secondary-300 dark:bg-secondary-900 dark:border-secondary-700">
                        <div class="info-heading">
                            <div class="info-icon">
                                <Info size={24} />
                            </div>
                            <div>
                                <h4 class="info-name">Information & Status</h4>
                            </div>
                        </div>
                        <p class="info-description">
                            A helpful description when focusing an input will appear in here and
                            a current status to the whole process.
                        </p>
                    </div>
                </div>
            </div>
        </MultiStep>
    </div>
</section>

<style lang="scss">
    p {
        margin-top: 1rem;
    }
    ul {
        margin-left: 1.5rem;
        li {
            list-style-type: disc;
            margin-bottom: 1rem;
        }
    }
    .page-steps {
        align-self: flex-start;
        position: sticky;
        top: 5rem;
        h4 {
            margin-bottom: 1rem;
        }
        flex-basis: 16rem;
    }
    .page-content {
        flex: 1;
        .page-container {
            max-width: 40rem;
            margin-left: 5rem;
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
        top: 5rem;
        .info {
            /* background-color: hsla(0, 0%, 96%, 100); */
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
</style>
