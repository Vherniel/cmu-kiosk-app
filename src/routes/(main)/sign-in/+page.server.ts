import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { PUBLIC_KIOSK_GUEST_EMAIL, PUBLIC_KIOSK_GUEST_PASS } from "$env/static/public";
import { invalidate } from "$app/navigation";

export const load = (async () => {}) satisfies PageServerLoad;

export const actions = {
    default: async ({ url, request, locals: { getSession, supabase } }) => {
        const formData = await request.formData();

        const continueAsGuest = formData.get("signin") == "guest";

        const {
            data: { session },
            error,
        } = await supabase.auth.signInWithPassword({
            email: continueAsGuest ? PUBLIC_KIOSK_GUEST_EMAIL : `${formData.get("username")}`,
            password: continueAsGuest ? PUBLIC_KIOSK_GUEST_PASS : `${formData.get("password")}`,
        });

        const redirectURL = url.searchParams.get("redirect");

        if (!redirectURL) throw redirect(302, "/");

        if (error || !session) {
            throw invalidate("/sign-in");
        }

        throw redirect(302, redirectURL);

        // if (error)

        // async function onSignIn(event: SubmitEvent) {
        //     const asGuest = event.submitter?.className.includes("continue-as-guest");

        //     const { data, error } = await supabase.auth.signInWithPassword({
        //         email: asGuest ? PUBLIC_KIOSK_GUEST_EMAIL : signInEmail,
        //         password: asGuest ? PUBLIC_KIOSK_GUEST_PASS : signInPassword,
        //     });

        //     goto($page.url.searchParams.get("redirect") || "/");
        // }
    },
} satisfies Actions;
