import { PUBLIC_CMU_WP_REST_ENDPOINT } from "$env/static/public";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
    return {
        news: await getCMUNewsData({ perPage: 3 }),
    };

    async function getCMUNewsData({ perPage }: { perPage: number }) {
        let response; // response to be returned

        const requestUrl = new URL(PUBLIC_CMU_WP_REST_ENDPOINT + "/posts");
        const params = requestUrl.searchParams;
        params.append("per_page", `${perPage}`);

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
