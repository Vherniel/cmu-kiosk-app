<script>
    // Framework specific
    import { onMount } from "svelte";
    // Icons
    import { Cloudy } from "lucide-svelte";

    /** @type {string} */
    export let weatherCondition;
    /** @type {string} */
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

    let remount = false;

    onMount(() => {
        console.log("remount");

        const interval = setInterval(() => {
            dateNow = new Date();
        }, SECONDS_10);

        // TODO: FOR REMOUNTING
        // /** @type {null | NodeJS.Timeout} */
        // let watchClock;

        // if (weatherCondition || temperature) {
        //     watchClock = setTimeout(() => (remount = !remount), 60000);
        // }

        return () => {
            // if (watchClock) clearTimeout(watchClock);
            clearInterval(interval);
        };
    });
</script>

<div
    class="clock"
    on:mouseup={() => {
        // FOR REMOUNTING
        // (remount = !remount)
        window.location.reload();
    }}>
    <div class="left">
        <div class="top day-of-week">
            <p>{day}</p>
        </div>
        <div class="bottom date">
            <p>{month} {date}, {year}</p>
        </div>
    </div>
    <div class="center weather-condition__icon">
        <Cloudy size="2.5rem" />
    </div>
    <div class="right">
        <div>
            <span class="top time">
                <p>{hours}:{minutes} {meridiem}</p>
            </span>
        </div>
        {#if temperature || weatherCondition}
            <div class="bottom weather-condition__text">
                <p>
                    {#if temperature}
                        {temperature}
                    {/if}, {#if weatherCondition}
                        {weatherCondition || "Loading"}°C
                    {/if}
                </p>
            </div>
        {/if}
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
        /* .right {
        } */
        .top p {
            font-size: 1.25rem;
            font-weight: var(--font-bold);
        }
    }
</style>
