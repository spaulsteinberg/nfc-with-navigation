import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import LandingScreen from '../screens/LandingScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SendDataScreen from '../screens/SendDataScreen';
import { RootStackParamList } from '../types';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: Colors.main.background },
        headerTintColor: Colors.main.text,
        headerTitleAlign: 'center',
        headerRight: () => <Ionicons name="person-circle-outline" size={30} color="white" />
    }}>
      <Stack.Screen name="Landing" component={LandingScreen} options={{title: "Scan Tag"}} />
      <Stack.Screen name="SendData" component={SendDataScreen} options={{title: "Confirm & Send"}} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}