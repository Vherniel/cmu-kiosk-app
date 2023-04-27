import { PRIVATE_WEATHERAPI_KEY } from "$env/static/private";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ fetch, locals: { getSession, supabase } }) => {
    return {
        session: await getSession(),
        user: await getUser(),
        formRecords: await getFormRecords(), // should be not here?
        weather: (await getWeatherData())?.forecast?.forecastday[0]?.hour[0],
    };

    async function getUser() {
        const session = await getSession();

        if (session) {
            const { data, error } = await supabase
                .from("users_detail")
                .select("*")
                .eq("user_id", session.user.id);

            // we can safely assume that this only returns 1 item
            return data ? data[0] : null;
        }
    }

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
        params.append("key", PRIVATE_WEATHERAPI_KEY);
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
};
