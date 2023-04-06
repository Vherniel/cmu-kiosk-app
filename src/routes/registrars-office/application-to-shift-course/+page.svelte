<!-- TODO: in signature section,  -->
<!-- TODO: Multi-page form https://svelte.dev/repl/8eb738732cf74edd86f680c53e6ba253?version=3.44.2 -->
<!-- TODO: PoC: step-1.svelte, step-2.svelte, etc. -->
<script lang="ts">
    /**
     * Page steps options:
     *      1. Page routing -- can't because we can't easily persist data. doable but may require context and stores
     *      2. Query routing -- not ideal
     *      3. Hash routing -- not ideal specially I might need hash data
     *      4. <svelte:component /> routing (show and remove) -- could be great but how do I persist data? through bindings?
     *      5. Show and hide -- easy but not performant
     *      6. Plain markup -- easy but messy
     */

    /**
     * Information
     *      Description -- what is {the form that the use is taking} and how much is it {hasPricing}
     *      Requirements/Dependencies -- what are the {requirements before taking this}
     *          note: this form will be INVALIDATED if the above requirements aren't met. It is highly suggest to take these forms first before proceeding.
     *                {list of forms to be taken}
     *                ...by continuing this form, you agreed that you already have these in hand
     *      Accept Terms & Conditions and Privacy Policy
     *
     * Fill-out Form
     *      Step 1 -- Basic info
     *      Step 2 -- Advanced info
     *      Step 3 -- Signature signing
     *      Form summary -- Please confirm that ALL FIELDS are accurate and correct.
     *
     * Transaction
     *      Choose payment method
     *      Transaction summary: Paid
     *
     * Completion
     *      Display: Transaction done, the details has been submitted, etc.
     *      Print receipt
     *      Take another form|Back to registrar|Back to home|Exit (sign-out)
     */
    // import { page } from "$app/stores";
    // import Input from "./Input.svelte";
    // import MultiStepComponent from "./MultiStepComponent.svelte";
    // import Step from "./Step.svelte";
    // Form steps
    // import Step1 from "./step1.svelte";
    // import Step2 from "./step2.svelte";
    // import Step3 from "./step3.svelte";
    // import Submit from "./submit.svelte";

    // let activeStep = 1;

    import type { PageData } from "./$types";
    import { superForm } from "sveltekit-superforms/client";
    import {
        MultiStep,
        StepTabList,
        StepPanelList,
        StepTab,
        StepPanel,
        StepNavigation,
    } from "$lib/components/multi-step";

    export let data: PageData;

    // const formData = writable(data.form);

    // formData.update(data.form)

    // Client API:
    const superform = superForm(data.form, {
        multipleSubmits: "prevent",
        onSubmit({ data }) {
            // submit values from $form instead of the default form action
            Object.entries($form).forEach(([key, value]) => {
                data.set(key, value.toString());
            });
        },
    });

    const { form, enhance, capture, restore, errors, constraints } = superform;

    export const snapshot = { capture, restore };

    import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";
    import { Info } from "lucide-svelte";
    import Callout from "$lib/components/callout/Callout.svelte";
    import Portal from "$lib/components/portal/Portal.svelte";
    import Account from "$lib/components/account/Account.svelte";
    import InputText from "$lib/components/input/InputText.svelte";

    let hidden = true;

    // export let steps = [];
</script>

<MultiStep>
    <div class="step-tab-list">
        <h4>Steps</h4>
        <StepTab>Step 1</StepTab>
        <StepTab>Step 2</StepTab>
        <StepTab>Step 3</StepTab>
    </div>

    <div class="step-panel-list">
        <h4>Info</h4>
        <StepPanel>
            <h2>Panel 1</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa, sit. Quibusdam
                nobis beatae mollitia magnam aliquam rem, neque eius maiores consequuntur dolor
                assumenda soluta eligendi porro, eos distinctio. Modi, dolorum.
            </p>
        </StepPanel>
        <StepPanel>
            <h2>Panel 2</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa, sit. Quibusdam
                nobis beatae mollitia magnam aliquam rem, neque eius maiores consequuntur dolor
                assumenda soluta eligendi porro, eos distinctio. Modi, dolorum.
            </p>
        </StepPanel>
        <StepPanel>
            <h2>Panel 3</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa, sit. Quibusdam
                nobis beatae mollitia magnam aliquam rem, neque eius maiores consequuntur dolor
                assumenda soluta eligendi porro, eos distinctio. Modi, dolorum.
            </p>
        </StepPanel>
    </div>

    <StepNavigation />
</MultiStep>

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
                    <!-- Terms and condition included in introduction -->
                    <div><StepTab>Introduction</StepTab></div>
                    <div><StepTab>Fill-out Form</StepTab></div>
                    <div><StepTab>Signature Signing</StepTab></div>
                    <!-- Complete transactiion is included -->
                    <div><StepTab>Choose Payment Method</StepTab></div>
                    <div><StepTab>Summary</StepTab></div>
                </StepTabList>
            </div>
            <div class="page-content">
                <StepPanelList class="page-container">
                    <StepPanel>
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
                    <form method="POST" on:submit={(event) => (hidden = !hidden)} use:enhance>
                        <StepPanel>
                            <h2>Fill-out Form</h2>
                            <InputText
                                label="First name"
                                name="First name"
                                id="first-name"
                                required
                                on:focus={(event) => {
                                    // const info = document.querySelector('.info');
                                    // const name = document.querySelector(".info-name");
                                    // // const description = document.querySelector(".info-description");
                                    // @ts-ignore
                                    // description.innerHTML = "Your full name";
                                    // @ts-ignore
                                    // name.innerHTML = "Name";
                                }}
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
                            <!-- TODO: InputText -->
                            <InputText
                                label="Student ID"
                                name="Student ID"
                                id="student-id"
                                required
                                {superform} />
                            <input type="submit" value="Submit" />
                        </StepPanel>
                    </form>
                    <StepPanel>
                        <h2>Signature Signing</h2>
                    </StepPanel>
                    <StepPanel>
                        <h2>Choose Payment Method</h2>
                    </StepPanel>
                    <StepPanel>
                        <h2>Summary</h2>
                        <h4>
                            {JSON.stringify($form)}
                            <!-- Submitted test data to the server (no database interactions yet): -->
                        </h4>
                        <!-- {#if !hidden}
                            {#each Object.entries(JSON.stringify($form)) as [key, value]}
                                <div><span>{key}: </span></div>
                                <div><span>{value}</span></div>
                            {/each}
                        {/if} -->
                    </StepPanel>
                </StepPanelList>
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

    <div>
        <!-- PageSteps -->
    </div>

    <div>
        <!-- <form method="POST" use:enhance /> -->
        <!-- <MultiStepComponent element="form" method="POST" {activeStep}>
            <Step name="Step 1">
                <Input label="Student name" id="student-name" />
            </Step>
            <Step name="Step 2">
                <Input label="Student number" id="student-number" />
            </Step>
            <Step name="Step 3">
                <Input label="Year" id="year" />
            </Step>
            <Step name="Step 4">
                <Input label="Section" id="section" />
                <button type="submit">Submit</button>
            </Step>
        </MultiStepComponent>
        <div>
            <button on:click={(e) => activeStep--}>Previous</button>
            <button on:click={(e) => activeStep++}>Next</button>
        </div> -->
        <!-- 

            <MultiStepComponent activeStep={1}>
                <Step name="Step one">
                    <p class="form-control">
                        <span style="display: block;">
                            <label for="student-name">Student name: </label>
                        </span>
                        <input type="text" name="student-name" id="student-name" required />
                    </p>
                </Step>
                <Step>
                    <p class="form-control">
                        <span style="display: block;">
                            <label for="student-number">Student number: </label>
                        </span>
                        <input type="number" name="student-number" id="student-number" required />
                    </p>
                </Step>
            </MultiStepComponent>

         -->
        <!-- <form method="post">
            <p class="form-control">
                <span style="display: block;">
                    <label for="student-name">Student name: </label>
                </span>
                <input type="text" name="student-name" id="student-name" required />
            </p>
            <p class="form-control">
                <span style="display: block;">
                    <label for="student-number">Student number: </label>
                </span>
                <input type="number" name="student-number" id="student-number" required />
            </p>
            <p class="form-control">
                <span style="display: block;">
                    <label for="year">Year: </label>
                </span>
                <input type="number" name="year" id="year" required />
            </p>
            <p class="form-control">
                <span style="display: block;">
                    <label for="section">Section: </label>
                </span>
                <input type="number" name="section" id="section" required />
            </p>
            <button type="submit">Submit</button>
        </form> -->
        <!-- <MultiStepComponent
            steps={[
                { name: "Step one", done: true, Component: Step1 },
                { name: "Step two", done: "indeterminate", Component: Step2 },
                { name: "Step three", done: false, Component: Step3 },
            ]}
            {activeStep}>
            <div slot="navigation">
                <button on:click={(e) => activeStep--}>Previous</button>
                <button on:click={(e) => activeStep++}>Next</button>
            </div>
        </MultiStepComponent> -->
        <!-- <MultiStepComponent> -->
        <!-- <div slot="steps">
                <p>test 1</p>
                <p>test 2</p>
                <p>test 3</p>
            </div> -->
        <!-- </MultiStepComponent> -->
    </div>

    <!-- <div class="container-sm">
        <form method="POST">
            <label for="name">name</label>
            <input type="text" name="name" required />
            <input type="submit" value="Submit" />
        </form>
        <h2>What is course shifting?</h2>
        

        <hr />
        <h2>Form fields</h2>
        <p>Student name</p>
        <p>Student number</p>
        <p>Year and section</p>
        <p>School year</p>
        <hr />
        <p>Former course</p>
        <p>Major in</p>
        <hr />
        <p>To shift of new course in</p>
        <p>Major in</p>
        <hr />
        <p>Date</p>
        <hr />
        <p>Reasons for shifting (narrative to be filled up by student)</p>
        <p>By signing this form, the student understands the following:</p>
        <ol>
            <li>
                Student may only shift ONE TIME in his/her whole study at City of Malabon
                University
            </li>
            <li>All courses/class taken shall appear in the transcript of records</li>
            <li>
                College Deans have the right to ask for additional requriements & conditions
            </li>
            <li>
                The VPAA have the right to refuse the shift even if the college deans have
                recommended it with valid reasons
            </li>
        </ol>
        <p>STUDENT'S SIGNATURE OVER PRINTED NAME</p>
        <hr />
        <p>comments of Program Evaluator:</p>
        <p>Printed name & signature of evalator</p>
        <hr />
        <p>Recommending approval for release:</p>
        <p>College Dean Printed Name & Signature</p>
        <p>Former Dean</p>
        <hr />
        <p>Recommending approval for acceptance:</p>
        <p>College Dean Printed Name & Signature</p>
        <p>New Course Dean</p>
        <hr />
        <p>Approved</p>
        <p>Disapproved</p>
        <p>Reasons of VPAA</p>
        <p>VPAA'S SIGNATURE OVER PRINTED NAME</p>
    </div> -->
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
</style>
