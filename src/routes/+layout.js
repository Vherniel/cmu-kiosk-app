// src/routes/+layout.ts
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
import { createSupabaseLoadClient } from "@supabase/auth-helpers-sveltekit";

/** @type {import('./$types').LayoutLoad} */
export async function load({ fetch, data, depends }) {
    depends("supabase:auth");

    const supabase = createSupabaseLoadClient({
        supabaseUrl: PUBLIC_SUPABASE_URL,
        supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
        event: { fetch },
        serverSession: data.session,
    });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    return {
        weather: data.weather,
        supabase,
        session,
    };
}
