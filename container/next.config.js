const NextFederationPlugin = require("@module-federation/nextjs-mf");
/** @type {import('next').NextConfig} */

const remotes = (isServer) => {
    const location = isServer ? "ssr" : "chunks";
    return {
        auth: `container@http://localhost:3000/_next/static/${location}/remoteEntry.js`,
        container: `list@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
        list: `auth@http://localhost:3002/_next/static/${location}/remoteEntry.js`,
    };
};
const nextConfig = {
    reactStrictMode: true,
    webpack5: true,
    disDir: "build", // Defined build directory
    swcMinify: true,
    webpack: (config, options) => {
        Object.assign(config.experiments, { topLevelAwait: true });
        if (!options.isServer) {
            config.plugins.push(
                new NextFederationPlugin({
                    name: "container",
                    filename: "static/chunks/remoteEntry.js", // remote file name which will used later
                    remotes: remotes(options.isServer), //만들어진 remoteEntry 파일 경로를 입력한다.
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

module.exports = nextConfig;
