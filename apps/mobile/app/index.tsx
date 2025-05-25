import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { getWebUrl } from '../api/host';
import { useWebUrlStore } from '@/stores/webUrl';
import AppWebView from '@/components/AppWebView';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const {setUrl, url} = useWebUrlStore();

  useEffect(() => {
    const checkUrl = async () => {
      if(url) return;

      try {
        const webUrl = await getWebUrl();

        if (webUrl) setUrl(webUrl);
        else router.replace('/not-found');
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

  return <AppWebView />
}
