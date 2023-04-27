import { PUBLIC_CMU_WP_REST_ENDPOINT } from "$env/static/public";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, url }) => {
    return {
        news: await getCMUNewsData({ perPage: 12 }),
    };

    async function getCMUNewsData({ perPage }: { perPage: number }) {
        const pageNumber = url.searchParams.get("page") || 1;
        let response; // response to be returned

        const requestUrl = new URL(PUBLIC_CMU_WP_REST_ENDPOINT + "/posts?page=" + pageNumber);
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
            return {
                data: await response?.json(),
                totalPages: await response?.headers?.get("x-wp-totalpages"),
            };
        } else {
            return response?.status;
        }
    }
};
