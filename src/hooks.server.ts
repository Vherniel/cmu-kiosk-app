import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public";
import { PRIVATE_ADYEN_API_KEY } from "$env/static/private";
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
import adyen from "@adyen/api-library";
import type { Handle } from "@sveltejs/kit";

const { Client, CheckoutAPI } = adyen;

export const handle = (async ({ event, resolve }) => {
    event.locals.supabase = createSupabaseServerClient({
        supabaseUrl: PUBLIC_SUPABASE_URL,
        supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
        event,
    });

    const adyenClient = new Client({
        apiKey: PRIVATE_ADYEN_API_KEY,
        environment: "TEST",
    });

    event.locals.checkout = new CheckoutAPI(adyenClient);

    /**
     * a little helper that is written for convenience so that instead
     * of calling `const { data: { session } } = await supabase.auth.getSession()`
     * you just call this `await getSession()`
     */
    event.locals.getSession = async () => {
        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession();
        return session;
    };

    return resolve(event, {
        /**
         * There´s an issue with `filterSerializedResponseHeaders` not working when using `sequence`
         *
         * https://github.com/sveltejs/kit/issues/8061
         */
        // @ts-ignore
        filterSerializedResponseHeaders(name) {
            return name == "content-range";
        },
    });
}) satisfies Handle;
