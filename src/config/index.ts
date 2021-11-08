interface ConfigOptions {
  API_URL: string;
}

interface Config {
  default: ConfigOptions;
  production: Partial<ConfigOptions>;
}

const config: Config = {
  default: {
    API_URL: "http://localhost:4000",
  },
  production: {
    API_URL: "https://apiv2.davinciboardgame.com",
  },
};

const getConfig = <T extends keyof ConfigOptions>(configKey: T) => {
  const allConfig = {
    ...config.default,
    ...(process.env.NODE_ENV === "production" ? config.production : {}),
  };

  return allConfig[configKey];
};

export default getConfig;
