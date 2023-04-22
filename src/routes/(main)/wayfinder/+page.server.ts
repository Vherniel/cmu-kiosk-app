import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch }) => {
    return {
        roomEvents: await loadRoomEvents(),
    };

    async function loadRoomEvents() {
        const response = await fetch("/events.json");

        if (!response.ok) {
            throw new Error(`Error fetching room events: ${response.text}`, {
                cause: response,
            });
        }

        return response.json();
    }
}) satisfies PageServerLoad;
