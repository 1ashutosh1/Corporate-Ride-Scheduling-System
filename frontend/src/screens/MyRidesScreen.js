import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import API from '../api';

const { width, height } = Dimensions.get('window');

const MyRidesScreen = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRides = async () => {
    try {
      const res = await API.get('/rides/getUserRides');
      setRides(res.data.reverse()); // latest first
    } catch (err) {
      console.log(err.response?.data || err.message);
      Toast.show({ type: 'error', text1: 'Failed to fetch rides' });
    } finally {
      setLoading(false);
    }
  };

  const cancelRide = async (rideId) => {
    try {
      await API.delete(`/rides/cancelRide/${rideId}`);
      Toast.show({ type: 'success', text1: 'Ride cancelled' });
      fetchRides(); // refresh
    } catch (err) {
      console.log(err.response?.data || err.message);
      Toast.show({ type: 'error', text1: 'Cancel failed' });
    }
  };

 useFocusEffect(
  useCallback(() => {
    fetchRides();
  }, [])
);

  const renderRide = ({ item }) => (
    <View style={styles.rideCard}>
      <Text style={styles.label}>Pickup: <Text style={styles.value}>{item.pickup}</Text></Text>
      <Text style={styles.label}>Drop: <Text style={styles.value}>{item.dropoff}</Text></Text>
      <Text style={styles.label}>Time: <Text style={styles.value}>{new Date(item.date).toLocaleString()}</Text></Text>
      <Text style={[styles.status, { color: statusColor(item.status) }]}>
        Status: {item.status.toUpperCase()}
      </Text>

      {item.status === 'pending' && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => cancelRide(item._id)}
        >
          <Text style={styles.cancelButtonText}>Cancel Ride</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const statusColor = (status) => {
    switch (status) {
      case 'approved': return 'green';
      case 'cancelled': return 'red';
      default: return '#f0ad4e'; // for pending status
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <FlatList
      data={rides}
      keyExtractor={(item) => item._id}
      renderItem={renderRide}
      contentContainerStyle={styles.list}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No rides found</Text>
      }
    />
  );
};

export default MyRidesScreen;

const styles = StyleSheet.create({
  list: {
    padding: width * 0.05,
  },
  rideCard: {
    backgroundColor: '#f9f9f9',
    padding: width * 0.05,
    borderRadius: 8,
    marginBottom: height * 0.02,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: height * 0.02,
    fontWeight: '600',
  },
  value: {
    fontWeight: '400',
  },
  status: {
    marginTop: height * 0.01,
    fontWeight: 'bold',
    fontSize: height * 0.02,
  },
  cancelButton: {
    marginTop: height * 0.015,
    backgroundColor: '#dc3545',
    paddingVertical: height * 0.015,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: height * 0.018,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: height * 0.2,
    fontSize: height * 0.022,
    color: '#666',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
