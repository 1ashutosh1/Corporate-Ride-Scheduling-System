import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import BookRideScreen from '../screens/BookRideScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {!user ? (
          <>
            <Stack.Screen name="Signup" component={SignupScreen}/>
            <Stack.Screen name="Login"  component={LoginScreen}/>
          </>
        ) : user.role === 'admin' ? (
          <>
            <Stack.Screen name="AdminDashboard" />
            <Stack.Screen name="Analytics" />
          </>
        ) : (
          <>
            <Stack.Screen name="BookRide" component={BookRideScreen}/>
            {/* <Stack.Screen name="MyRides" /> */}
            {/* <Stack.Screen name="MyProfile" /> */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
