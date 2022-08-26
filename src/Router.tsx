import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginPage from './Pages/Login Page';
import RegisterPage from './Pages/Register Page';
import HomePage from './Pages/Home Page';
import SearchPage from './Pages/Search Page';
import ForumPage from './Pages/Forum Page';
import ProfilePage from './Pages/Profile Page';
import SearchWithoutLoginPage from './Pages/Search Without Login Page';
import FlashMessage from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from './Styles/Colors';
import Fonts from './Styles/Fonts';
import MessagesPage from './Pages/MessagesPage';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Router = () => {
  const [userSession, setUserSession] = useState<boolean>();
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user);
    });
  }, []);
  const LoginRegisterStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen
          name="SearchWithoutLogin"
          component={SearchWithoutLoginPage}></Stack.Screen>
      </Stack.Navigator>
    );
  };
  const LoginnedUserForumStack = ({navigation, route}: any) => {
    useLayoutEffect(() => {
      const routeName = getFocusedRouteNameFromRoute(route);
      if (routeName === 'Messages') {
        navigation.setOptions({tabBarStyle: {display: 'none'}});
      } else {
        navigation.setOptions({tabBarStyle: {display: 'flex'}});
      }
    }, [navigation, route]);
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Forum" component={ForumPage} />
        <Stack.Screen name="Messages" component={MessagesPage} />
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      {userSession ? (
        <Tab.Navigator screenOptions={{headerShown: false}}>
          <Tab.Screen
            name="Home"
            component={HomePage}
            options={{
              tabBarLabel: ({focused}) => {
                return (
                  <Text
                    style={{
                      color: focused ? Colors.darkGreen : Colors.menuGrey,
                      fontFamily: Fonts.defaultRegularFont,
                    }}>
                    Home
                  </Text>
                );
              },
              tabBarIcon: ({focused}) => {
                return (
                  <View>
                    <Icon
                      name="home"
                      size={25}
                      color={
                        focused ? Colors.darkGreen : Colors.menuGrey
                      }></Icon>
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchPage}
            options={{
              tabBarLabel: ({focused}) => {
                return (
                  <Text
                    style={{
                      color: focused ? Colors.darkGreen : Colors.menuGrey,
                      fontFamily: Fonts.defaultRegularFont,
                    }}>
                    Search
                  </Text>
                );
              },
              tabBarIcon: ({focused}) => {
                return (
                  <View>
                    <Icon
                      name="magnify"
                      size={25}
                      color={
                        focused ? Colors.darkGreen : Colors.menuGrey
                      }></Icon>
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="ForumStack"
            component={LoginnedUserForumStack}
            options={{
              tabBarLabel: ({focused}) => {
                return (
                  <Text
                    style={{
                      color: focused ? Colors.darkGreen : Colors.menuGrey,
                      fontFamily: Fonts.defaultRegularFont,
                    }}>
                    Forum
                  </Text>
                );
              },
              tabBarIcon: ({focused}) => {
                return (
                  <View>
                    <Icon
                      name="forum"
                      size={25}
                      color={
                        focused ? Colors.darkGreen : Colors.menuGrey
                      }></Icon>
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfilePage}
            options={{
              tabBarLabel: ({focused}) => {
                return (
                  <Text
                    style={{
                      color: focused ? Colors.darkGreen : Colors.menuGrey,
                      fontFamily: Fonts.defaultRegularFont,
                    }}>
                    Profile
                  </Text>
                );
              },
              tabBarIcon: ({focused}) => {
                return (
                  <View>
                    <Icon
                      name="account"
                      size={25}
                      color={
                        focused ? Colors.darkGreen : Colors.menuGrey
                      }></Icon>
                  </View>
                );
              },
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="LoginRegisterStack"
            component={LoginRegisterStack}></Stack.Screen>
        </Stack.Navigator>
      )}
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};
export default Router;
