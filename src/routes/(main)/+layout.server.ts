import { PUBLIC_CMU_WP_REST_ENDPOINT } from "$env/static/public";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ fetch, locals: { getSession, supabase } }) => {
    return {
        weather: (await getWeatherData())?.forecast?.forecastday[0]?.hour[0],
        session: getSession(),
        news: await getCMUNewsData(),
        formRecords: await getFormRecords(),
    };

    async function getFormRecords() {
        const session = await getSession();

        if (session) {
            const { data, error } = await supabase
                .from("registrar_form_records")
                .select("*")
                .eq("user_id", session.user.id);

            return data;
        }
    }

    async function getWeatherData() {
        let response; // response to be returned

        const requestUrl = new URL("http://api.weatherapi.com/v1/forecast.json");
        const params = requestUrl.searchParams;
        params.append("key", "fb9dc671848c4e9b81d120617230903");
        params.append("q", "14.6536,120.9602");
        params.append("days", "1");
        params.append("hour", new Date().getHours().toString());
        params.append("aqi", "no");
        params.append("alert", "no");

        const controller = new AbortController();
        const signal = controller.signal;

        // Cancel the fetch request in 500ms
        setTimeout(() => controller.abort(), 3000);

        try {
            response = await fetch(requestUrl, { signal });
        } catch (error) {
            console.log("There was an error:", error);
        }

        if (response?.ok) {
            return response?.json();
        } else {
            return response?.status;
        }
    }

    async function getCMUNewsData() {
        let response; // response to be returned

        const requestUrl = new URL(PUBLIC_CMU_WP_REST_ENDPOINT + "/posts");
        const params = requestUrl.searchParams;
        params.append("per_page", "12");

        const controller = new AbortController();
        const signal = controller.signal;

        // Cancel the fetch request in 500ms
        setTimeout(() => controller.abort(), 3000);

        try {
            response = await fetch(requestUrl, { signal });
        } catch (error) {
            console.log("There was an error:", error);
        }

        if (response?.ok) {
            return response?.json();
        } else {
            return response?.status;
        }
    }
}) satisfies LayoutServerLoad;
