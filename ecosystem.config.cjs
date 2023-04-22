module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        // First application
        {
            name: "kiosk.cityofmalabonuniversity.edu.ph", // name of the process in PM2
            script: "build/index.js",
            env_production: {
                NODE_ENV: "production",
                PORT: 4173, // port the app will be launched on
            },
        },
    ],

    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
        production: {
            user: "admin", // deployer user
            host: "127.0.0.1", // IP address of your server
            ref: "origin/main", // the branch you want to deploy
            repo: "https://github.com/Vherniel/cmu-kiosk-app.git", // the ssh git clone URL
            path: "/home/admin/cmu-kiosk-app/", // the path where you want the project to be
            // code you want to run after the project has been pushed to your server
            "post-deploy":
                "pnpm install && pnpm run build && pm2 reload ecosystem.config.js --env production",
        },
    },
};
