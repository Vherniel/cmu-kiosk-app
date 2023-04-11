/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: "class",

    content: [
        "./src/**/*.{html,js,svelte,ts}",
        // Append the path for the Skeleton NPM package and files:
        require("path").join(
            require.resolve("@skeletonlabs/skeleton"),
            "../**/*.{html,js,svelte,ts}"
        ),
    ],

    theme: {
        extend: {},
    },

    plugins: [
        // Append the Skeleton plugin to the end of this list
        ...require("@skeletonlabs/skeleton/tailwind/skeleton.cjs")(),
    ],
};

module.exports = config;
