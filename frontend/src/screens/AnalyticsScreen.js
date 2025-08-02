import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import API from '../api';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');

const AnalyticsScreen = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await API.get('/admin/analytics/rides');
        setAnalytics(res.data);
      } catch (err) {
        console.log(err.response?.data || err.message);
        Toast.show({ type: 'error', text1: 'Failed to load analytics' });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!analytics) return null;

  const { totalRides, ridesByStatus, ridesPerDay } = analytics;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Ride Analytics</Text>

      <View style={[styles.card, { backgroundColor: '#17a2b8' }]}>
        <Text style={styles.label}>Total Rides</Text>
        <Text style={styles.count}>{totalRides}</Text>
      </View>

      <View style={[styles.card, { backgroundColor: '#f0ad4e' }]}>
        <Text style={styles.label}>Pending</Text>
        <Text style={styles.count}>{ridesByStatus.pending || 0}</Text>
      </View>

      <View style={[styles.card, { backgroundColor: '#28a745' }]}>
        <Text style={styles.label}>Approved</Text>
        <Text style={styles.count}>{ridesByStatus.approved || 0}</Text>
      </View>

      <View style={[styles.card, { backgroundColor: '#dc3545' }]}>
        <Text style={styles.label}>Cancelled</Text>
        <Text style={styles.count}>{ridesByStatus.cancelled || 0}</Text>
      </View>

      <Text style={styles.subHeading}>Rides Per Day</Text>
      {ridesPerDay.map((entry, index) => (
        <View key={index} style={styles.dailyItem}>
          <Text style={styles.date}>{entry.date}</Text>
          <Text style={styles.dayCount}>{entry.count}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default AnalyticsScreen;

const styles = StyleSheet.create({
  container: {
    padding: width * 0.06,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: height * 0.035,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: height * 0.026,
    fontWeight: 'bold',
    marginTop: height * 0.04,
    marginBottom: height * 0.02,
    color: '#333',
  },
  card: {
    borderRadius: 8,
    padding: height * 0.03,
    marginBottom: height * 0.025,
  },
  label: {
    color: 'white',
    fontSize: height * 0.022,
  },
  count: {
    fontSize: height * 0.03,
    fontWeight: 'bold',
    color: 'white',
    marginTop: height * 0.005,
  },
  dailyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    padding: height * 0.015,
    borderRadius: 5,
    marginBottom: 10,
  },
  date: {
    fontSize: height * 0.02,
    color: '#555',
  },
  dayCount: {
    fontSize: height * 0.022,
    fontWeight: 'bold',
    color: '#007bff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
