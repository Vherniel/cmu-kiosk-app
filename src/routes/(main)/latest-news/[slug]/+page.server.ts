import { PUBLIC_CMU_WP_REST_ENDPOINT } from "$env/static/public";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, url, params }) => {
    return {
        post: await getCMUNewsPostData(),
    };

    async function getCMUNewsPostData() {
        const pageNumber = url.searchParams.get("page") || 1;
        let response; // response to be returned

        const requestUrl = new URL(PUBLIC_CMU_WP_REST_ENDPOINT + "/posts/" + params.slug);

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
