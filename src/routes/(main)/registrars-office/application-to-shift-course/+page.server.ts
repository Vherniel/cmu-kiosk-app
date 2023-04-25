import { z } from "zod";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import type { Actions, PageServerLoad } from "./$types";

// TODO: Validation
const formSchema = z.object({
    "First name": z.string(),
    "Middle name": z.string(),
    "Last name": z.string(),
    "Student ID": z.string(),
    Year: z.string(),
    Section: z.string(),
    "School year": z.string(),
    "Former course": z.string(),
    "Former course major": z.string(),
    "New course": z.string(),
    "New course major": z.string(),
    "Reason for shifting": z.string(),
    Signature: z.string(),
});

const paymentSchema = z.object({
    Method: z.enum(["cash", "gcash"]),
    formRecordsId: z.number(),
});

export const load = (async (event) => {
    const submitForm = await superValidate(event, formSchema, { id: "submitForm" });
    const payment = await superValidate(event, paymentSchema, { id: "payment" });

    // when the user finished the transaction, fetch the submitted data and redirect to ?step=summary page
    // while displaying the results
    if (event.url.searchParams.get("step") == "summary") {
        const formRecordsId = event.url.searchParams.get("formRecordsId");

        if (formRecordsId) {
            const { data: summary, error } = await event.locals.supabase
                .from("registrar_form_records")
                .select("*")
                .eq("id", formRecordsId);

            if (summary) {
                const { Signature, ...formData } = summary[0].form_values.superform.data;
                const { paid, draft, released, paidBy } = summary[0].form_values.metadata;

                function wrap(s: any, w: any) {
                    return s.replace(
                        new RegExp(`(?![^\\n]{1,${w}}$)([^\\n]{1,${w}})\\s`, "g"),
                        "$1\n"
                    );
                }

                const orderedBy = [
                    "First name",
                    "Middle name",
                    "Last name",
                    "Student ID",
                    "Year",
                    "Section",
                    "School year",
                    "Former course",
                    "Former course major",
                    "New course",
                    "New course major",
                    "Reason for shifting",
                ];

                const parsedText = Object.entries(formData)
                    .sort(([a]: any, [b]: any) => orderedBy.indexOf(a) - orderedBy.indexOf(b))
                    .map(([label, value]) => {
                        return `${wrap(label.toString(), 32)}: ${wrap(
                            // @ts-ignore
                            value.toString(),
                            32
                        )}\n\n`;
                    })
                    .join("");

                if (!process.env.VERCEL) {
                    setTimeout(async () => {
                        // dynamic imports
                        const USB = (await import("@node-escpos/usb-adapter")).default;
                        const { Printer } = await import("@node-escpos/core");

                        const device = new USB();
                        device.open(async function (err) {
                            if (err) throw new Error("Error", { cause: err });

                            let printer = new Printer(device, {
                                encoding: "GB18030",
                                width: 32,
                            });

                            printer
                                .font("a")
                                .align("LT") // align to left
                                .style("b") // text bold
                                .size(2, 3)
                                .text("CMU Kiosk")
                                .size(1, 1)
                                .text("")
                                .text("City of Malabon University")
                                .text("College of Computer Studies")
                                .text("")
                                .text("ID: " + formRecordsId)
                                .text("")
                                .drawLine()
                                .text("")
                                .text(parsedText)
                                .text("")
                                .tableCustom([
                                    {
                                        text: paid ? "Paid by" : "Unpaid",
                                        width: 0.5,
                                    },
                                    {
                                        text: `${paidBy}`,
                                        width: 0.5,
                                    },
                                ])
                                .tableCustom([
                                    {
                                        text: "Price",
                                        width: 0.5,
                                    },
                                    {
                                        text: "P100.00",
                                        width: 0.5,
                                    },
                                ])
                                .text("")
                                .drawLine()
                                .text("")
                                .text(
                                    wrap(
                                        "Please wait to call your ID or name and show this receipt to the registrar staff for further instructions.",
                                        32
                                    )
                                )
                                .text("");

                            printer.cut().close();
                        });
                    }, 3000);
                }

                return {
                    submitForm,
                    payment,
                    summary,
                };
            }
        }
    }

    return {
        submitForm,
        payment,
    };
}) satisfies PageServerLoad;

export const actions = {
    submitForm: async (event) => {
        const form = await superValidate(event, formSchema, { id: "submitForm" });

        // Convenient validation check:
        if (!form.valid) {
            return fail(400, { form });
        }

        const { data } = await event.locals.supabase
            .from("registrar_form_records")
            .insert([
                {
                    form_values: {
                        metadata: {
                            paid: false,
                            draft: true,
                            released: false,
                        },
                        superform: form,
                    },
                },
            ])
            .select();

        // TODO: Do something with the validated data
        // TODO: Send data to supabase

        if (data) {
            return { formId: data[0].id, form };
        }
    },
    payment: async (event) => {
        const {
            locals: { checkout, supabase },
        } = event;

        const payment = await superValidate(event, paymentSchema, { id: "payment" });

        if (!payment.valid) {
            console.log("there is an invalid input");
            // Again, always return { form } and things will just work.
            return fail(400, { payment });
        }

        const { data: formValues } = await supabase
            .from("registrar_form_records")
            .select("form_values")
            .eq("id", payment.data.formRecordsId);

        if (formValues) {
            event.url.searchParams.set("step", "summary");
            event.url.searchParams.set("formRecordsId", payment.data.formRecordsId.toString());

            const isGCash = payment.data.Method == "gcash";

            const metadata = formValues[0].form_values.metadata;

            metadata.paidBy = isGCash ? "GCash" : "Cash";
            metadata.paid = isGCash ? true : false;
            metadata.draft = isGCash ? false : true;
            metadata.released = false;

            let url: string;

            if (isGCash) {
                const { action } = await checkout.payments({
                    amount: { currency: "PHP", value: 10000 }, // PHP 100.00
                    paymentMethod: {
                        // @ts-ignore
                        type: "gcash",
                    },
                    reference: crypto.randomUUID(),
                    merchantAccount: "VhernielLebisECOM",
                    returnUrl: event.url.href,
                });

                if (action?.url) {
                    url = action.url;
                }
            }

            await supabase
                .from("registrar_form_records")
                .update({ form_values: formValues[0].form_values })
                .eq("id", payment.data.formRecordsId);

            await supabase.from("transactions").insert([
                {
                    registrar_form_records_id: payment.data.formRecordsId,
                    paid: isGCash ? true : false,
                    payment_method: isGCash ? "GCash" : "Cash",
                    released: false,
                    price: 100,
                },
            ]);

            // @ts-ignore
            if (isGCash && url) {
                throw redirect(303, url);
            } else {
                throw redirect(303, event.url.href);
            }
        }

        return { payment };
    },
} satisfies Actions;
