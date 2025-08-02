import { useState, useEffect, useContext } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import API from '../api';
import Toast from 'react-native-toast-message';
import { AuthContext } from '../context/AuthContext';

const { width, height } = Dimensions.get('window');

const MyProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
    if (!name) {
      Toast.show({ type: 'error', text1: 'Name cannot be empty' });
      return;
    }

    if ((oldPassword || newPassword || confirmPassword) && newPassword !== confirmPassword) {
      Toast.show({ type: 'error', text1: 'New passwords do not match' });
      return;
    }

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

      <TextInput
        placeholder="Current Password"
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

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
});
