// See https://kit.svelte.dev/docs/types#app

import type { SupabaseClient, Session } from "@supabase/supabase-js";
import type { CheckoutAPI } from "@adyen/api-library";

// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            supabase: SupabaseClient;
            getSession(): Promise<Session | null>;
            checkout: CheckoutAPI;
        }
        // interface PageData {}
        // interface Platform {}
    }
}

export {};
