import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {!user ? (
          <>
            <Stack.Screen name="Login"  />
            <Stack.Screen name="Register" />
          </>
        ) : user.role === 'admin' ? (
          <>
            <Stack.Screen name="AdminDashboard" />
            <Stack.Screen name="Analytics" />
          </>
        ) : (
          <>
            <Stack.Screen name="BookRide" />
            <Stack.Screen name="MyRides" />
            <Stack.Screen name="MyProfile" />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
