import { useWebUrlStore } from "@/stores/webUrl";
import WebView from "react-native-webview";

const allowedHosts = [
  "my-race.local",
  "localhost",
  "172.20.10.6",
  "dev.my-race.com",
  "my-race.com",
];

function isAllowedHost(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    return allowedHosts.includes(url.hostname);
  } catch {
    return false;
  }
}

export default function AppWebView() {
  const { url, setUrl } = useWebUrlStore();
  if (!url) {
    console.warn("No URL set in WebView");
    return null;
  }

  return (
    <WebView
      source={{ uri: url }}
      style={{ flex: 1 }}
      originWhitelist={["*"]}
      onShouldStartLoadWithRequest={(request) => {
        const isAllowed = isAllowedHost(request.url);
        if (!isAllowed) {
          console.warn("❌ Blocked navigation to:", request.url);
        }
        return isAllowed;
      }}
      onNavigationStateChange={(navState) => {
        if (navState.url && isAllowedHost(navState.url)) {
          setUrl(navState.url);
        }
      }}
    />
  );
}
