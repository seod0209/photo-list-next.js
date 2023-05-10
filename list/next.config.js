const NextFederationPlugin = require("@module-federation/nextjs-mf");
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};

const remotes = (isServer) => {
    const location = isServer ? "ssr" : "chunks";
    return {
        auth: `auth@http://localhost:3000/_next/static/${location}/remoteEntry.js`,
        container: `container@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
        list: `list@http://localhost:3002/_next/static/${location}/remoteEntry.js`,
    };
};

module.exports = {
    ...nextConfig,
    webpack5: true,
    swcMinify: true,
    distDir: "build",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    devServer: {
        port: 3002,
    },
    webpack(config, options) {
        Object.assign(config.experiments, { topLevelAwait: true });
        if (!options.isServer) {
            config.plugins.push(
                new NextFederationPlugin({
                    name: "list",
                    remoteType: "var",
                    remotes: remotes(options.isServer), //만들어진 remoteEntry 파일 경로를 입력한다.
                    filename: "static/chunks/remoteEntry.js",
                    exposes: {
                        "./header": "./src/component/Header.tsx", // 이 곳에 외부에서 가져와 사용할 파일 명을 입력해준다.
                        "./photoList": "./src/component/PhotoList.tsx",
                    },
                    shared: {
                        react: {
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
