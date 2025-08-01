import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
      <Toast />
    </AuthProvider>
  );
}
