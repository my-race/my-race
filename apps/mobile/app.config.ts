import "dotenv/config";
import type { ConfigContext, ExpoConfig } from "@expo/config";

const envVariablesBase = {
  APP_ENV: process.env.EXPO_PUBLIC_APP_ENV,
  WEB_URL: process.env.EXPO_PUBLIC_WEB_URL,
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "My Race",
  slug: "my-race",
  version: "1.0.0",
  sdkVersion: "53.0.0",
  ios: {
    bundleIdentifier: "com.myrace.app",
    supportsTablet: false,
  },
  plugins: [],
  extra: {
    ...envVariablesBase,
    eas: {
      projectId: "59cb161f-db78-4895-b0e3-af7e7b995b06",
    },
  },
});
