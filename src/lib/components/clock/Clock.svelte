<script>
    // Framework specific
    import { onMount } from "svelte";
    // Icons
    import { Cloudy } from "lucide-svelte";

    // TODO: type any
    export let weatherCondition;
    export let temperature;

    const SECONDS_10 = 10000;

    // prettier-ignore
    const daysOfWeek = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday",
    ];
    // prettier-ignore
    const monthsOfYear = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December",
    ];

    let dateNow = new Date();

    // Time
    $: hours = dateNow.getHours() < 12 ? dateNow.getHours() : dateNow.getHours() - 12;
    $: minutes = dateNow.getMinutes() < 10 ? `0${dateNow.getMinutes()}` : dateNow.getMinutes();
    $: meridiem = dateNow.getHours() < 12 ? "AM" : "PM";

    // Date
    $: day = daysOfWeek[dateNow.getDay()];
    $: month = monthsOfYear[dateNow.getMonth()];
    $: date = dateNow.getDate();
    $: year = dateNow.getFullYear();

    // TODO: not yet implemented for dynamic icons
    async function weatherConditions() {
        const data = await fetch("/weather_conditions.json");
        const response = (await data).json();
        return response;
    }

    onMount(() => {
        console.log(weatherConditions());
        const interval = setInterval(() => {
            dateNow = new Date();
        }, SECONDS_10);

        return () => {
            clearInterval(interval);
        };
    });
</script>

<div class="clock">
    <div class="left">
        <div class="top day-of-week">{day}</div>
        <div class="bottom date">{month} {date}, {year}</div>
    </div>
    <div class="center weather-condition__icon">
        <Cloudy size="2.5rem" />
    </div>
    <div class="right">
        <div>
            <span class="top time">{hours}:{minutes} {meridiem}</span>
        </div>
        <div class="bottom weather-condition__text">{weatherCondition}, {temperature}°C</div>
    </div>
</div>

<style lang="scss">
    .clock {
        display: flex;
        align-items: center;
        line-height: 1.5;
        .left {
            text-align: right;
        }
        .center {
            margin-left: 1rem;
            margin-right: 1rem;
        }
        .right {
        }
        .top {
            font-size: 1.25rem;
            font-weight: bold;
        }
    }
</style>
