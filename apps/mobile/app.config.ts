import 'dotenv/config';
import type { ExpoConfig } from '@expo/config';

const ENV = process.env.APP_ENV ?? 'development';

const envVariablesBase = {
    APP_ENV: process.env.EXPO_PUBLIC_APP_ENV,
    WEB_URL: process.env.EXPO_PUBLIC_WEB_URL,
}

const CONFIG: Record<string, ExpoConfig> = {
  development: {
    name: 'My race (Development)',
    slug: 'my-race-development',
    extra: {
        ...envVariablesBase,
    },
  },
  production: {
    name: 'My race (Production)',
    slug: 'my-race-production',
    extra: {
        ...envVariablesBase,
    },
  },
  staging: {
    name: 'My race (staging)',
    slug: 'my-race-staging',
    extra: {
        ...envVariablesBase,
    },
  },
};

export default (): ExpoConfig => {
  return CONFIG[ENV];
};

