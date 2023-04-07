<script lang="ts">
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
    
        import { Info } from "lucide-svelte";
        import Callout from "$lib/components/callout/Callout.svelte";
        import InputText from "$lib/components/input/InputText.svelte";
    </script>
    
    <section>
        <div class="heading">
            <h1>Acknowledgement Receipt</h1>
            <p>Lorem ipsum dolor sit amet consectetur</p>
        </div>
    
        <MultiStep>
            <div class="flex">
                <div class="page-steps">
                    <h4>Steps</h4>
                     <StepTabList>
                        <div><StepTab>Introduction</StepTab></div>
                        <div><StepTab>Fill-out Form</StepTab></div>
                        <div><StepTab>Signature Signing</StepTab></div>
                        <div><StepTab>Choose Payment Method</StepTab></div>
                        <div><StepTab>Summary</StepTab></div>
                     </StepTabList>
                </div>
                <div class="page-content">
                    <div class="page-container">
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
                        <form method="POST" use:enhance>
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
    </style>