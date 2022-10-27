import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import LandingScreen from '../screens/LandingScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SendDataScreen from '../screens/SendDataScreen';
import { RootStackParamList, RootTabParamList } from '../types';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogScreen from '../screens/LogScreen';
import { MaterialIcons } from '@expo/vector-icons';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: Colors.main.background },
      headerTintColor: Colors.main.text,
      headerTitleAlign: 'center',
      headerRight: () => <Ionicons name="person-circle-outline" size={30} color="white" />
    }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="SendData" component={SendDataScreen} options={{ title: "Confirm & Send" }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator<RootTabParamList>()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Landing" component={LandingScreen} options={{ title: "Scan Tag", tabBarIcon: ({ color, size}) => <MaterialIcons name="nfc" size={size} color={color} /> }} />
      <Tab.Screen name="Logging" component={LogScreen} options={{ title: 'Logs', tabBarIcon: ({ color, size}) => <MaterialIcons name="history" size={size} color={color} /> }} />
    </Tab.Navigator>
  )
}
