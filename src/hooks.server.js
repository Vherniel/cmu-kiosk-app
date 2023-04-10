import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public";
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
import adyen from "@adyen/api-library";
const { Client, CheckoutAPI } = adyen;

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
    event.locals.supabase = createSupabaseServerClient({
        supabaseUrl: PUBLIC_SUPABASE_URL,
        supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
        event,
    });

    const client = new Client({
        apiKey: "AQEohmfuXNWTK0Qc+iSGmmEqqe2eRKdID5pZu1tcNt+kSK0vXPbV6uOedxDBXVsNvuR83LVYjEgiTGAH-lK7XM+9HUEU2tMVmPa42H0PZmktYJF1lZoHTC8l+Qoo=->Z%6?;t>IsNT#dVm",
        environment: "TEST",
    });

    event.locals.checkout = new CheckoutAPI(client);

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
};
