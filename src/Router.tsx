import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './Pages/Login Page';
import RegisterPage from './Pages/Register Page';
const Stack = createNativeStackNavigator();
const Router=()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="Register" component={RegisterPage} />
                
        </Stack.Navigator>
    </NavigationContainer>
    )
}
export default Router;