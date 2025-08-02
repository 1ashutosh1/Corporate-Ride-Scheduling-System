import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import API from '../api';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');


const AnalyticsScreen = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const fetchAnalytics = async (from, to) => {
    setLoading(true);
    let url = '/admin/analytics/rides';
    const params = [];
    if (from) params.push(`from=${encodeURIComponent(from.toISOString())}`);
    if (to) params.push(`to=${encodeURIComponent(to.toISOString())}`);
    if (params.length) url += `?${params.join('&')}`;
    try {
      const res = await API.get(url);
      setAnalytics(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
      Toast.show({ type: 'error', text1: 'Failed to load analytics' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(fromDate, toDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate]);

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
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filter by Date</Text>
        <View style={styles.filterRow}>
          <View style={styles.filterCol}>
            <Text style={styles.filterLabel}>From</Text>
            <TouchableOpacity
              style={styles.filterBtn}
              onPress={() => setShowFromPicker(true)}
            >
              <Text style={styles.filterBtnText}>
                {fromDate ? fromDate.toLocaleDateString() : 'Select date'}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={showFromPicker}
              mode="date"
              date={fromDate || new Date()}
              onConfirm={(date) => {
                setShowFromPicker(false);
                setFromDate(date);
              }}
              onCancel={() => setShowFromPicker(false)}
            />
          </View>
          <View style={styles.filterCol}>
            <Text style={styles.filterLabel}>To</Text>
            <TouchableOpacity
              style={styles.filterBtn}
              onPress={() => setShowToPicker(true)}
            >
              <Text style={styles.filterBtnText}>
                {toDate ? toDate.toLocaleDateString() : 'Select date'}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={showToPicker}
              mode="date"
              date={toDate || new Date()}
              onConfirm={(date) => {
                setShowToPicker(false);
                setToDate(date);
              }}
              onCancel={() => setShowToPicker(false)}
            />
          </View>
          {(fromDate || toDate) && (
            <TouchableOpacity
              style={styles.clearBtn}
              onPress={() => {
                setFromDate(null);
                setToDate(null);
              }}
            >
              <Text style={styles.clearBtnText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

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
  filterContainer: {
    backgroundColor: '#f5f8ff',
    borderRadius: 10,
    padding: height * 0.018,
    marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: '#b3c7f9',
    shadowColor: '#b3c7f9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  filterTitle: {
    fontSize: height * 0.022,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: height * 0.01,
    textAlign: 'center',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    flexWrap: 'wrap',
    marginBottom: 0,
  },
  filterCol: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 10,
    minWidth: 110,
  },
  filterLabel: {
    fontSize: height * 0.018,
    color: '#333',
    marginBottom: 2,
    fontWeight: '500',
  },
  filterBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#b3c7f9',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 100,
    alignItems: 'center',
    marginBottom: 2,
    shadowColor: '#b3c7f9',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
    elevation: 1,
  },
  filterBtnText: {
    color: '#007bff',
    fontSize: height * 0.018,
    fontWeight: 'bold',
  },
  clearBtn: {
    backgroundColor: '#dc3545',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginLeft: 10,
    shadowColor: '#dc3545',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.09,
    shadowRadius: 2,
    elevation: 1,
  },
  clearBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: height * 0.018,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
