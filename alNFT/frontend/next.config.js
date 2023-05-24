/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
	reactStrictMode: true,
};

module.exports = {
	env: {
		ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
		ALCHEMY_NETWORK: process.env.ALCHEMY_NETWORK,
		NEXT_PUBLIC_DEFAULT_CHAIN: process.env.NEXT_PUBLIC_DEFAULT_CHAIN,
	},
	webpack: (config, { isServer }) => {
        if (!isServer) {
            // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
            config.resolve.fallback = {
                fs: false
            }
        }

        return config;
    }
};

module.exports = nextConfig;
