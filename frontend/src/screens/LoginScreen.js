import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import API from '../api';
import { AuthContext } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../utils/Validation';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');

    if (!email || !password) {
      Toast.show({ type: 'error', text1: 'Fill in all fields' });
      return;
    }
    
    let ok = true;
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      ok = false;
    }
  
    if (!validatePassword(password)) {
      setPasswordError('Password must be ≥6 chars, include letters & numbers');
      ok = false;
    }
   
    if (!ok) return;

    try {
      // console.log('BASE URL:', process.env.EXPO_PUBLIC_API_BASE_URL);
      const res = await API.post('/users/login', { email, password });
      const { token, user } = res.data;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      login(user, token);
      Toast.show({ type: 'success', text1: 'Login successful!' });
    } catch (err) {
      console.log(err.response?.data || err.message);
      Toast.show({ type: 'error', text1: 'Invalid credentials' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={(t) => {
          setEmail(t);
          if (emailError) setEmailError('');
        }}
        style={styles.input}
      />

      {emailError ? (
        <Text style={styles.errorText}>{emailError}</Text>
      ) : null}

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(t) => {
          setPassword(t);
          if (passwordError) setPasswordError('');
        }}
          style={styles.passwordInput}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeButton}
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={22}
            color="gray"
          />
        </TouchableOpacity>
      </View>

     {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
        Don't have an account? Signup
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: width * 0.07,
    marginBottom: height * 0.1,
  },
  heading: {
    fontSize: height * 0.035,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: height * 0.065,
    borderWidth: 1,
    borderColor: '#aaa',
    paddingHorizontal: width * 0.04,
    borderRadius: 5,
    marginBottom: height * 0.025,
    fontSize: height * 0.02,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    marginBottom: height * 0.025,
    paddingHorizontal: width * 0.02,
    height: height * 0.065,
  },
  passwordInput: {
    flex: 1,
    fontSize: height * 0.02,
    paddingHorizontal: width * 0.02,
  },
  eyeButton: {
    paddingHorizontal: width * 0.02,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    paddingVertical: height * 0.02,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: height * 0.015,
  },
  loginButtonText: {
    color: 'white',
    fontSize: height * 0.022,
    fontWeight: 'semibold',
  },
  link: {
    marginTop: height * 0.02,
    color: 'blue',
    textAlign: 'center',
    fontSize: height * 0.018,
  },
  errorText: {
    color: '#dc3545',                 
    fontSize: height * 0.017,         
    marginBottom: height * 0.015,     
    marginTop: -height * 0.005,       
  },
});
