const NextFederationPlugin = require("@module-federation/nextjs-mf");
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};

module.exports = {
    ...nextConfig,
    swcMinify: true,
    distDir: "build",
    webpack(config, options) {
        Object.assign(config.experiments, { topLevelAwait: true });
        if (!options.isServer) {
            config.plugins.push(
                new NextFederationPlugin({
                    name: "auth",
                    remotes: {},
                    filename: "static/chunks/remoteEntry.js",
                    exposes: {
                        // 이 곳에 외부에서 가져와 사용할 파일 명을 입력해준다.
                    },
                    shared: {
                        react: {
                            eager: true,
                            singleton: true,
                            requiredVersion: false,
                        },
                    },
                })
            );
        }

        return config;
    },
};
