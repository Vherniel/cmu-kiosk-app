import { z } from "zod";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import type { Actions, PageServerLoad } from "./$types";

// install escpos-usb adapter module manually
import { Printer, Image } from "@node-escpos/core";
// Select the adapter based on your printer type
import USB from "@node-escpos/usb-adapter";
import { join } from "path";

const device = new USB();

device.open(async function (err) {
    if (err) {
        // handle error
        return;
    }

    // encoding is optional
    const options = { encoding: "GB18030" /* default */ };
    let printer = new Printer(device, options);

    // Path to png image
    const filePath = join("/PATH/TO/IMAGE");
    const image = await Image.load(filePath);

    printer
        .font("a")
        .align("ct")
        .style("bu")
        .size(1, 1)
        .text("May the gold fill your pocket")
        .text("恭喜发财")
        .barcode(112233445566, "EAN13", { width: 50, height: 50 })
        .table(["One", "Two", "Three"])
        .tableCustom(
            [
                { text: "Left", align: "LEFT", width: 0.33, style: "B" },
                { text: "Center", align: "CENTER", width: 0.33 },
                { text: "Right", align: "RIGHT", width: 0.33 },
            ],
            { encoding: "cp857", size: [1, 1] } // Optional
        );

    // inject qrimage to printer
    printer = await printer.qrimage("https://github.com/node-escpos/driver");
    // inject image to printer
    printer = await printer.image(
        image,
        "s8" // changing with image
    );

    printer.cut().close();
});

// TODO: Validation
const formSchema = z.object({
    "First name": z.string(),
    "Middle name": z.string(),
    "Last name": z.string(),
    "Student ID": z.number(),
    Year: z.number(),
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
        const { data: summary, error } = await event.locals.supabase
            .from("registrar_form_records")
            .select("*")
            .eq("id", formRecordsId);

        return {
            submitForm,
            payment,
            summary,
        };
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
                            done: false,
                            draft: true,
                        },
                        superform: form,
                    },
                },
            ])
            .select();

        // TODO: Do something with the validated data
        // TODO: Send data to supabase

        return { formId: data[0].id, form };
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

        if (payment.data.Method == "gcash") {
            event.url.searchParams.set("step", "summary");
            event.url.searchParams.set("formRecordsId", payment.data.formRecordsId.toString());
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

            const { data: formValues } = await event.locals.supabase
                .from("registrar_form_records")
                .select("form_values")
                .eq("id", payment.data.formRecordsId);

            formValues[0].form_values.metadata.done = true;
            formValues[0].form_values.metadata.draft = false;

            await event.locals.supabase
                .from("registrar_form_records")
                .update({ form_values: formValues[0].form_values })
                .eq("id", payment.data.formRecordsId);

            const { data, error } = await event.locals.supabase.from("transactions").insert([
                {
                    registrar_form_records_id: payment.data.formRecordsId,
                    is_paid: true,
                    price: 10000,
                },
            ]);

            // create transaction data to the database and set it to paid
            // update form_values in registrar_form_records object metadata of done -> true, draft -> false

            if (action?.url) throw redirect(303, action.url);
            // what to do after redirecting?
        }

        if (payment.data.Method == "cash") {
            const { data, error } = await supabase.from("transactions").insert([
                {
                    registrar_form_records_id: payment.data.formRecordsId,
                    is_paid: false,
                    price: 10000,
                },
            ]);
            // create transaction data to the database and set it to unpaid
            // generate qr or id number that when accessed,
            // triggers a database update when scanned/accessed
            // update form_values in registrar_form_records object metadata of done -> true, draft -> false
        }

        return { payment };
    },
} satisfies Actions;
