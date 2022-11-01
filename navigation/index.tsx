import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import LandingScreen from '../screens/LandingScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SendDataScreen from '../screens/SendDataScreen';
import { RootStackParamList, RootTabParamList } from '../types';
import Colors from '../constants/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogScreen from '../screens/LogScreen';
import { MaterialIcons } from '@expo/vector-icons';
import LogDetailScreen from '../screens/LogDetailScreen';
import SignInScreen from '../screens/SignInScreen';
import { useAuthContext } from '../state/context/AuthContext';
import HeaderIconWithActions from '../components/nav/HeaderIconWithActions';

type NavComponentProps = {
  colorScheme: ColorSchemeName
}

export default function Navigation({ colorScheme }: NavComponentProps) {
  const user = useAuthContext()
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      { user?.user ? <RootNavigator /> : <UnAuthorizedNavigator /> }
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const UnAuthorizedNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: Colors.main.background },
      headerTintColor: Colors.main.text,
      headerTitleAlign: 'center',
      headerRight: () => null
    }}>
      <Stack.Screen
        name="SignIn" 
        component={SignInScreen} 
        options={{title: "NFC Analytic App"}} 
      />
    </Stack.Navigator>
  )
}


const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: Colors.main.background },
      headerTintColor: Colors.main.text,
      headerTitleAlign: 'center',
      headerRight: () => <HeaderIconWithActions />
    }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{title: 'Scan App'}} />
      <Stack.Screen name="SendData" component={SendDataScreen} options={{ title: "Confirm & Send" }} />
      <Stack.Screen name="LogDetail" component={LogDetailScreen} />
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
