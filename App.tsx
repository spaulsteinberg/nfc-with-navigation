import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Provider } from 'react-redux';
import store from "./state/redux/store"
import AuthContextProvider, { IAuthContext, useAuthContext } from './state/context/AuthContext';
import { getAuth } from 'firebase/auth';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContextProvider>
          <Provider store={store}>
            <PaperProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar style='light' />
            </PaperProvider>
          </Provider>
        </AuthContextProvider>
      </SafeAreaProvider>
    );
  }
}
