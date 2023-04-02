// export const actions = {
//     default: async (event) => {
//         console.log(await event.request.formData());
//     },
// } satisfies Actions;

import { z } from "zod";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import type { Actions, PageServerLoad } from "./$types";

const schema = z.object({
    Name: z.string(),
    Age: z.number(),
    "E-mail": z.string().email(),
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

        // TODO: Do something with the validated data

        // Yep, return { form } here too
        return { form };
    },
} satisfies Actions;
