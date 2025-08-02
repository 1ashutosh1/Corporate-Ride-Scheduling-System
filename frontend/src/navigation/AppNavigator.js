import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import BookRideScreen from '../screens/BookRideScreen';
import MyRidesScreen from '../screens/MyRidesScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';

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
            <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen}/>
            <Stack.Screen name="Analytics" component={AnalyticsScreen}/>
          </>
        ) : (
          <>
            <Stack.Screen name="BookRide" component={BookRideScreen}/>
            <Stack.Screen name="MyRides" component={MyRidesScreen}/>
            {/* <Stack.Screen name="MyProfile" /> */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
