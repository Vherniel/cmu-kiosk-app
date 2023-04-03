<!-- TODO: in signature section,  -->
<!-- TODO: Multi-page form https://svelte.dev/repl/8eb738732cf74edd86f680c53e6ba253?version=3.44.2 -->
<!-- TODO: PoC: step-1.svelte, step-2.svelte, etc. -->
<script lang="ts">
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
    import { Tabs, TabList, TabPanel, Tab } from "./tabs.js";

    export let data: PageData;

    // const formData = writable(data.form);

    // formData.update(data.form)

    // Client API:
    const { form, enhance, capture, restore, errors, constraints } = superForm(data.form, {
        multipleSubmits: "prevent",
        onSubmit({ data }) {
            // submit values from $form instead of the default form action
            Object.entries($form).forEach(([key, value]) => {
                data.set(key, value.toString());
            });
        },
    });

    export const snapshot = { capture, restore };

    import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";
    import { Info } from "lucide-svelte";

    let hidden = true;
</script>

<section>
    <div class="heading">
        <h1>Application to Shift Course</h1>
        <p>Lorem ipsum dolor sit amet consectetur</p>
    </div>
    <div class="flex">
        <div class="page-steps">
            <h4>Steps</h4>
            <p>Step 1</p>
            <p>Step 2</p>
            <p>Step 3</p>
            <p>Step 4</p>
        </div>
        <div class="page-content">
            <div class="page-container">
                <h2>Lorem ipsum dolor sit amet</h2>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam odit,
                    quibusdam reiciendis expedita possimus, ab debitis iure impedit illum
                    ducimus sapiente ipsam qui, adipisci facere numquam modi explicabo
                    dignissimos quis. Fugit nisi temporibus distinctio aspernatur culpa
                    voluptatum, ratione dolores repellendus ullam odit saepe fuga totam beatae
                    unde nihil expedita magnam eum ipsum. Aspernatur vitae alias et impedit
                    dolor sit possimus rem in ratione, odit earum repudiandae, placeat eaque
                    unde veritatis qui illum cupiditate id.
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, enim,
                    quos architecto adipisci amet maiores expedita eius deserunt inventore quia,
                    dolor harum beatae modi accusantium. Modi facilis quos dolor dicta! Lorem
                    ipsum dolor sit amet consectetur adipisicing elit. Quod architecto
                    consequatur deserunt, repudiandae vero quibusdam. Perferendis reiciendis
                    dolorum ea! Ducimus officiis libero corrupti numquam ut illum, veritatis
                    architecto nulla fuga! Lorem ipsum dolor sit amet consectetur, adipisicing
                    elit. At minima neque voluptatibus mollitia eum ut, facilis ab unde? Illo,
                    nemo assumenda voluptatem ad accusamus eum enim iusto et ut quos? Lorem
                    ipsum dolor sit amet consectetur adipisicing elit. Sunt, voluptatibus
                    repellendus possimus vero temporibus consectetur nulla blanditiis, sequi
                    delectus aperiam odio dolores debitis voluptate id molestiae perspiciatis.
                    Laudantium, officia recusandae. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Dignissimos optio animi dolore minima voluptatem corrupti
                    corporis asperiores natus eveniet. Quis obcaecati atque dolor optio maiores.
                    Natus distinctio quia ullam error.
                </p>
            </div>
        </div>
        <div class="information">
            <div class="info">
                <div class="info-heading">
                    <div class="info-icon">
                        <Info size={24} />
                    </div>
                    <div>
                        <h4 class="info-name">Information</h4>
                    </div>
                </div>
                <p class="info-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
                    dignissimos totam commodi, fugiat, molestiae voluptas nobis quo ducimus iure
                    omnis repellat harum. Reiciendis aperiam magni atque excepturi debitis
                    ducimus adipisci?
                </p>
            </div>
        </div>
    </div>

    <div>
        <!-- PageSteps -->
    </div>
    <div>
        <Tabs>
            <TabList>
                <Tab>one</Tab>
                <Tab>two</Tab>
                <Tab>three</Tab>
            </TabList>
            <SuperDebug data={$form} />
            <form
                method="POST"
                on:submit={(event) => {
                    hidden = !hidden;
                }}
                use:enhance>
                <TabPanel>
                    <h2>First panel</h2>
                    <p class="form-control">
                        <span style:display="block">
                            <label for="name">Name</label>
                        </span>
                        <input
                            type="text"
                            name="Name"
                            id="name"
                            data-invalid={$errors["Name"]}
                            bind:value={$form["Name"]}
                            {...$constraints["Name"]} />
                        {#if $errors["Name"]}<span class="invalid">{$errors["Name"]}</span>{/if}
                    </p>
                </TabPanel>

                <TabPanel>
                    <h2>First panel</h2>
                    <p class="form-control">
                        <span style:display="block">
                            <label for="age">Age</label>
                        </span>
                        <input
                            type="number"
                            name="Age"
                            id="age"
                            data-invalid={$errors["Age"]}
                            bind:value={$form["Age"]}
                            {...$constraints["Age"]} />
                        {#if $errors["Age"]}<span class="invalid">{$errors["Age"]}</span>{/if}
                    </p>
                </TabPanel>

                <TabPanel>
                    <p class="form-control">
                        <span style:display="block">
                            <label for="email">E-mail</label>
                        </span>
                        <input
                            type="email"
                            name="E-mail"
                            id="email"
                            data-invalid={$errors["E-mail"]}
                            bind:value={$form["E-mail"]}
                            {...$constraints["E-mail"]} />
                        {#if $errors["E-mail"]}<span class="invalid">{$errors["E-mail"]}</span
                            >{/if}
                    </p>
                    <div><button disabled={!hidden}>Submit</button></div>
                </TabPanel>
            </form>
        </Tabs>

        <h4>Submitted test data to the server (no database interactions yet):</h4>
        {#if !hidden}
            {JSON.stringify($form)}
        {/if}

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
    <div>
        <!-- InputInfo -->
    </div>
    <!-- <div class="container-sm">
        <form method="POST">
            <label for="name">name</label>
            <input type="text" name="name" required />
            <input type="submit" value="Submit" />
        </form>
        <h2>What is course shifting?</h2>
        <p>
            Course shifting refers to a transfer from one program to another of the same level.
            A level may be undergraduate, masters or doctoral. A student may shift from one
            course to another only once; provided that the student completes the course within
            the maximum residency period allotted for each student (<strong>5 years</strong> for
            a <strong>4-year course</strong> and <strong>6 years</strong> for a
            <strong>5-year course</strong>).
        </p>
        <p>Shifting Procedures</p>
        <ul>
            <li>
                All courses taken at the City of Malabon University are reflected in the
                transcript of records, these grades shall be included in the calculation of GPA.
            </li>
            <li>
                College Deans may impose conditions and requirements for approval of shifting.
            </li>
            <li>
                Honors and awards will be based on the entire academic performance of the
                student at City of Malabon University, regardless of shifting.
            </li>
            <li>
                Shifting is only allowed until SECOND (2nd) Year level to avoid delay to the
                “shiftee”.
            </li>
            <li>
                The School Calendar shall reflect the shifting period, the Vice President for
                Academic Affairs, may choose to deferred this if the number of IRREGULAR
                STUDENTS exceed 250.
            </li>
            <li>
                If a student has intention to shift, he/she must submit the following at the
                office of Academic Affairs with the prescribed period of shifting indicated in
                the school calendar.
            </li>
            <li>
                Latest transcript of records (maybe printed out from University Management
                System)
            </li>
            <li>
                Filled Out Shifting Form and signed by student and co-signed by guardian/parent
                if below 21 years old.
            </li>
            <li>
                The College Dean or program Coordinator will evaluate the students if they are
                ideal to transfer. (College they intend to go will evaluate)
            </li>
            <li>Secure the signature of College Dean and Program Coordinator</li>
            <li>
                Place all the above documents in a brown with name of student clearly indicated
                at the UPPER RIGHT corner and submit to the office of the UNIVERSITY REGISTRAR
                HEAD.
            </li>
            <li>
                After 2-4 days, the student will get results if the shifting appeal is approved
                or disapproved.
            </li>
            <li>
                As we are limiting the number of irregular students, there will be limited slots
                of “shifters” per academic year, the VP for Academic Affairs shall determine
                this number.
            </li>
            <li>A student may only shift ONE (1) time.</li>
        </ul>

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
    }
    .page-steps {
        h4 {
            margin-bottom: 1rem;
        }
        flex-basis: 16rem;
    }
    .page-content {
        flex: 1;
        .page-container {
            max-width: 48rem;
            margin-left: 1rem;
        }
        h2 {
            margin-bottom: 1rem;
        }
    }
    .information {
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
        flex-basis: 16rem;
    }
</style>
