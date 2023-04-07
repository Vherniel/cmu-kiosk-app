
import { z } from "zod";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import type { Actions, PageServerLoad } from "./$types";

// TODO: Validation
const schema = z.object({
    "First name": z.string(),
    "Middle name": z.string(),
    "Last name": z.string(),
    "Student ID": z.number(),
    // "E-mail": z.string().email(),
});

export const load = (async (event) => {
    // Server API:
    const form = await superValidate(event, schema);

    // Always return { form } in load and form actions.
    return { form };
}) satisfies PageServerLoad;

export const actions = {
    default: async (event) => {
        // Same syntax as in the load function
        const form = await superValidate(event, schema);
        console.log("POST", form);

        // Convenient validation check:
        if (!form.valid) {
            // Again, always return { form } and things will just work.
            return fail(400, { form });
        }

        const { data, error } = await event.locals.supabase
            .from('form_records')
            .insert([
                { form_values: {
                    metadata: {
                        done: false,
                        draft: true,
                    },
                    superform: form,
                } },
            ])

        

        console.log('data', data);
        console.log('error', error);

        // TODO: Do something with the validated data
        // TODO: Send data to supabase
            // Get currently logged in user so that we know who sends the form
            // Add additional metadata to the form data
                // what is the form
                // route where the form was submitted
                // How many times did the user requested
                // status
                    // is done
                    // is draft
            // Store in the form_values: jsonb
            // 
            

        // Yep, return { form } here too
        return { form };
    },
} satisfies Actions;
