import { useState, useEffect, useContext } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import API from '../api';
import Toast from 'react-native-toast-message';
import { AuthContext } from '../context/AuthContext';
import { validatePassword } from '../utils/Validation';
import { Ionicons } from '@expo/vector-icons'; // Add this import

const { width, height } = Dimensions.get('window');

const MyProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Add visibility states
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Fetch current profile
    const getProfile = async () => {
      try {
        const res = await API.get('/users/profile');
        setName(res.data.name);
        setEmail(res.data.email);
      } catch (err) {
        Toast.show({ type: 'error', text1: 'Failed to load profile' });
      }
    };

    getProfile();
  }, []);

  const handleUpdate = async () => {
    setOldPasswordError('');
    setNewPasswordError('');
    setConfirmPasswordError('');

    if (!name) {
      Toast.show({ type: 'error', text1: 'Name cannot be empty' });
      return;
    }

    let valid = true;

    const wantsChange = oldPassword || newPassword || confirmPassword;
    if (wantsChange) {
      if (!validatePassword(oldPassword)) {
        setOldPasswordError('Current password Must be ≥6 chars and include a number and a letter');
        valid = false;
      }
      if (!validatePassword(newPassword)) {
        setNewPasswordError('Must be ≥6 chars and include a number and a letter');
        valid = false;
      }
      if (!validatePassword(confirmPassword)) {
        setConfirmPasswordError('Must be ≥6 chars and include a number and a letter');
        valid = false;
      }
      if (newPassword && confirmPassword && newPassword !== confirmPassword) {
        setNewPasswordError('Passwords do not match');
        setConfirmPasswordError('Passwords do not match');
        valid = false;
      }
    }

    if (!valid) return;

    try {
      const payload = { name };
      if (oldPassword && newPassword) {
        payload.oldPassword = oldPassword;
        payload.newPassword = newPassword;
      }

      await API.patch('/users/update', payload);
      Toast.show({ type: 'success', text1: 'Profile updated successfully' });

      // Clear password fields
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: err.response?.data?.error || 'Update failed',
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>My Profile</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        editable={false}
        style={[styles.input, styles.disabledInput]}
      />

      {/* Current Password */}
      <View style={styles.passwordInputContainer}>
        <TextInput
          placeholder="Current Password"
          value={oldPassword}
          onChangeText={(t) => {
            setOldPassword(t);
            if (oldPasswordError) setOldPasswordError('');
          }}
          secureTextEntry={!showOldPassword}
          style={[styles.input, { flex: 1 }]}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowOldPassword((prev) => !prev)}
        >
          <Ionicons
            name={showOldPassword ? 'eye' : 'eye-off'}
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      {oldPasswordError ? (
        <Text style={styles.errorText}>{oldPasswordError}</Text>
      ) : null}

      {/* New Password */}
      <View style={styles.passwordInputContainer}>
        <TextInput
          placeholder="New Password"
          value={newPassword}
          onChangeText={(t) => {
            setNewPassword(t);
            if (newPasswordError) setNewPasswordError('');
          }}
          secureTextEntry={!showNewPassword}
          style={[styles.input, { flex: 1 }]}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowNewPassword((prev) => !prev)}
        >
          <Ionicons
            name={showNewPassword ? 'eye' : 'eye-off'}
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      {newPasswordError ? (
        <Text style={styles.errorText}>{newPasswordError}</Text>
      ) : null}

      {/* Confirm New Password */}
      <View style={styles.passwordInputContainer}>
        <TextInput
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChangeText={(t) => {
            setConfirmPassword(t);
            if (confirmPasswordError) setConfirmPasswordError('');
          }}
          secureTextEntry={!showConfirmPassword}
          style={[styles.input, { flex: 1 }]}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowConfirmPassword((prev) => !prev)}
        >
          <Ionicons
            name={showConfirmPassword ? 'eye' : 'eye-off'}
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      {confirmPasswordError ? (
        <Text style={styles.errorText}>{confirmPasswordError}</Text>
      ) : null}

      <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
        <Text style={styles.updateBtnText}>Update Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutBtnText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: width * 0.06,
    paddingTop: height * 0.08,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: height * 0.035,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: height * 0.015,
    borderRadius: 5,
    marginBottom: height * 0.02,
    fontSize: height * 0.02,
  },
  disabledInput: {
    backgroundColor: '#eee',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  eyeIcon: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: width * 0.04
  },
  updateBtn: {
    backgroundColor: '#28a745',
    padding: height * 0.02,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  updateBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: height * 0.022,
  },
  logoutBtn: {
    backgroundColor: '#dc3545',
    padding: height * 0.02,
    borderRadius: 6,
    alignItems: 'center',
  },
  logoutBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: height * 0.022,
  },
  errorText: {
    color: '#dc3545',
    fontSize: height * 0.017,
    marginBottom: height * 0.015,
    marginTop: -height * 0.005,
  },
});
