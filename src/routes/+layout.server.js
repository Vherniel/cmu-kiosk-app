/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch, locals: { getSession } }) {
    return {
        weather: (await getWeatherData()).forecast.forecastday[0].hour[0],
        session: getSession(),
    };

    async function getWeatherData() {
        const requestUrl = new URL("http://api.weatherapi.com/v1/forecast.json");
        const params = requestUrl.searchParams;
        params.append("key", "fb9dc671848c4e9b81d120617230903");
        params.append("q", "14.6536,120.9602");
        params.append("days", "1");
        params.append("hour", new Date().getHours().toString());
        params.append("aqi", "no");
        params.append("alert", "no");

        const data = await fetch(requestUrl);
        const response = (await data).json();

        return response;
    }
}
