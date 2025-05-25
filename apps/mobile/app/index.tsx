import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { getWebUrl } from './api/host';

export default function Index() {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUrl = async () => {
      try {
        const webUrl = await getWebUrl();

        if (webUrl) {
          setUrl(webUrl);
        } else {
          router.replace('/not-found');
        }
      } catch (err) {
        console.warn('getWebUrl failed:', err);
        router.replace('/not-found');
      } finally {
        setLoading(false);
      }
    };

    checkUrl();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!url) return null;

  return <WebView source={{ uri: url }} style={{ flex: 1 }} />;
}
