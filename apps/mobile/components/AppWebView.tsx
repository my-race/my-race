import { useWebUrlStore } from "@/stores/webUrl";
import WebView from "react-native-webview";

const allowedHosts = [
  "my-race.local",
  "localhost",
  "172.30.1.66",
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
    return null; // URL이 없으면 아무것도 렌더링하지 않음
  }

  return (
    <WebView
      source={{ uri: url }} // 기본 시작 주소
      style={{ flex: 1 }}
      originWhitelist={["*"]} // 개발 중이면 일단 열어두고, 실제 차단은 아래에서
      onShouldStartLoadWithRequest={(request) => {
        const isAllowed = isAllowedHost(request.url);
        if (!isAllowed) {
          console.warn("❌ Blocked navigation to:", request.url);
        }
        return isAllowed;
      }}
      onNavigationStateChange={(navState) => {
        if (navState.url && isAllowedHost(navState.url)) {
          setUrl(navState.url); // 현재 페이지 주소로 store 업데이트
        }
      }}
    />
  );
}
