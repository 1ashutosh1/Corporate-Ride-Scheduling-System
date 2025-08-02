import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import DrawerNavigator from './navigation/DrawerNavigation';

export default function App() {
  return (
    <AuthProvider>
      <DrawerNavigator/>
      <Toast position='bottom'/>
    </AuthProvider>
  );
}
