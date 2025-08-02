import { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AuthContext } from "../context/AuthContext";

// Import all your screens
import BookRideScreen from "../screens/BookRideScreen";
import MyRidesScreen from "../screens/MyRidesScreen";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { user, logout } = useContext(AuthContext);

  return (
    <NavigationContainer>
    <Drawer.Navigator>
      {!user && (
          <>
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="Signup" component={SignupScreen} />
          </>
        )}

        {user && (
          <>
            <Drawer.Screen name="BookRide" component={BookRideScreen} />
            <Drawer.Screen name="MyRides" component={MyRidesScreen} />
            <Drawer.Screen name="MyProfile" component={MyProfileScreen}/>
          </>
        )}

        {user?.role === 'admin' && (
          <>
            <Drawer.Screen name="AdminDashboard" component={AdminDashboardScreen} />
            <Drawer.Screen name="Analytics" component={AnalyticsScreen} />
          </>
        )}
    </Drawer.Navigator>
    </NavigationContainer>
  );
}
