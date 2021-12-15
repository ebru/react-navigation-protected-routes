import React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { isSignedInSelector } from '../redux/auth/selectors'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import { LoginScreen, ModalScreen, NotFoundScreen, TabOneScreen, TabTwoScreen } from '../screens';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import LinkingConfiguration from './LinkingConfiguration';

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const RootNavigator = () => {
  const isSignedIn = useSelector(isSignedInSelector);
  // could also be like `currentUser` stored in redux from backend login response
  // if we need to store this response in persistent storage for regulatory purposes,
  // then I think we can merge these two in conditional check below like
  // (isSignedIn === true && currentUser data exists in persistent storage etc. ) ? then render authenticated routes
  // if it is not necessary to store accessTokens etc., we can just persist the necessary data like email, name etc.
  // and rely on isSignedIn value only in redux

  return (
    <Stack.Navigator>
      {
        // this condition check will handle authenticated screens automatically
        // without need of navigating manually for auth checks in codebase

        isSignedIn === true ? (
          // user is signed in, authenticated screens are available on top of the stack
          <>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name="Modal" component={ModalScreen} />
            </Stack.Group>
          </>
        ) : (
          // user is not signed in, put all unauthenticated screens on top of the stack
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        )
      }
    </Stack.Navigator>
  );
}

const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) => {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default Navigation
