/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
    return {
        data: (await getWeatherData()).forecast.forecastday[0].hour[0],
    };
}

async function getWeatherData() {
    /**
     * Note: update every 2hrs
     *
     * http://api.weatherapi.com/v1/forecast.json?
     * key=fb9dc671848c4e9b81d120617230903
     * q=14.6536,120.9602
     * days=1
     * aqi=no
     * alerts=no
     * hour=(dateNow.getHours() + 2) > 23 ? hour - 24 + 2
     * hour=23
     *
     */

    // getWeatherData().then((data) => console.log(data));
    const data = await fetch(
        "http://api.weatherapi.com/v1/forecast.json?key=fb9dc671848c4e9b81d120617230903&q=14.6536,120.9602&days=1&hour=23&aqi=no&alerts=no"
    );
    const response = (await data).json();

    return response;
}
