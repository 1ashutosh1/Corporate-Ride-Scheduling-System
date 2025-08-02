import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Button,
} from "react-native";
import Toast from "react-native-toast-message";
import API from "../api";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const { width, height } = Dimensions.get("window");

const AdminDashboardScreen = () => {
  const [rides, setRides] = useState([]);
  const [statusFilter, setStatusFilter] = useState(""); // '', 'pending', etc.
  const [loading, setLoading] = useState(true);
  const [openUserPicker, setOpenUserPicker] = useState(false);
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const fetchRides = async () => {
    setLoading(true);

    const params = {};
    if (statusFilter) params.status = statusFilter;
    if (selectedUserId) params.user = selectedUserId;
    if (fromDate) params.from = fromDate.toISOString().split("T")[0];
    if (toDate) params.to = toDate.toISOString().split("T")[0];

    const query = new URLSearchParams(params).toString();

    try {
      const res = await API.get(`/admin/rides?${query}`);
      setRides(res.data.reverse());
    } catch (err) {
      console.log(err.response?.data || err.message);
      Toast.show({ type: "error", text1: "Failed to fetch rides" });
    } finally {
      setLoading(false);
    }
  };

  const approveRide = async (rideId) => {
    try {
      await API.patch(`/admin/rides/${rideId}/approve`);
      Toast.show({ type: "success", text1: "Ride approved" });
      fetchRides();
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err.response?.data?.error || "Approval failed",
      });
    }
  };

  const rejectRide = async (rideId) => {
    try {
      await API.patch(`/admin/rides/${rideId}/reject`);
      Toast.show({ type: "success", text1: "Ride rejected" });
      fetchRides();
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err.response?.data?.error || "Rejection failed",
      });
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/admin/users");
        const options = res.data.map((user) => ({
          label: `${user.email} (${user.name})`,
          value: user._id,
        }));
        setUserOptions(options);
      } catch (err) {
        console.log("User fetch failed:", err.message);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    fetchRides();
  }, [statusFilter]);

  const renderRide = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.label}>
        User: <Text style={styles.value}>{item.user?.email || "N/A"}</Text>
      </Text>
      <Text style={styles.label}>
        Pickup: <Text style={styles.value}>{item.pickup}</Text>
      </Text>
      <Text style={styles.label}>
        Drop: <Text style={styles.value}>{item.dropoff}</Text>
      </Text>
      <Text style={styles.label}>
        Time:{" "}
        <Text style={styles.value}>{new Date(item.date).toLocaleString()}</Text>
      </Text>
      <Text style={[styles.status, { color: statusColor(item.status) }]}>
        Status: {item.status.toUpperCase()}
      </Text>

      {item.status === "pending" && (
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => approveRide(item._id)}
            style={styles.approve}
          >
            <Text style={styles.actionText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => rejectRide(item._id)}
            style={styles.reject}
          >
            <Text style={styles.actionText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const statusColor = (status) => {
    switch (status) {
      case "approved":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "#f0ad4e";
    }
  };

  const FilterButton = ({ value }) => (
    <TouchableOpacity
      onPress={() => setStatusFilter(value)}
      style={[styles.filterBtn, statusFilter === value && styles.activeFilter]}
    >
      <Text style={styles.filterText}>
        {value === "" ? "All" : value.charAt(0).toUpperCase() + value.slice(1)}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <FilterButton value="" />
        <FilterButton value="pending" />
        <FilterButton value="approved" />
        <FilterButton value="cancelled" />
      </View>
     <DropDownPicker
  open={openUserPicker}
  value={selectedUserId}
  items={userOptions}
  setOpen={setOpenUserPicker}
  setValue={setSelectedUserId}
  setItems={setUserOptions}
  placeholder="Filter by user"
  searchable={true}
  containerStyle={{ marginBottom: 10 }}
/>

<TouchableOpacity onPress={() => setShowFromPicker(true)} style={styles.dateButton}>
  <Text>From: {fromDate ? fromDate.toLocaleDateString() : 'Select date'}</Text>
</TouchableOpacity>

<DateTimePickerModal
  isVisible={showFromPicker}
  mode="date"
  onConfirm={(date) => {
    setFromDate(date);
    setShowFromPicker(false);
  }}
  onCancel={() => setShowFromPicker(false)}
/>

<TouchableOpacity onPress={() => setShowToPicker(true)} style={styles.dateButton}>
  <Text>To: {toDate ? toDate.toLocaleDateString() : 'Select date'}</Text>
</TouchableOpacity>

<DateTimePickerModal
  isVisible={showToPicker}
  mode="date"
  onConfirm={(date) => {
    setToDate(date);
    setShowToPicker(false);
  }}
  onCancel={() => setShowToPicker(false)}
/>

<TouchableOpacity style={styles.applyFilterBtn} onPress={fetchRides}>
  <Text style={{ color: 'white', fontWeight: 'bold' }}>Apply Filters</Text>
</TouchableOpacity>

      <FlatList
        data={rides}
        keyExtractor={(item) => item._id}
        renderItem={renderRide}
        contentContainerStyle={{ paddingBottom: height * 0.1 }}
        ListEmptyComponent={<Text style={styles.empty}>No rides found</Text>}
      />
    </View>
  );
};

export default AdminDashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: height * 0.015,
  },
  filterBtn: {
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  activeFilter: {
    backgroundColor: "#007bff",
  },
  filterText: {
    color: "#000",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: width * 0.04,
    borderRadius: 8,
    marginBottom: height * 0.02,
    elevation: 3,
  },
  label: {
    fontSize: height * 0.02,
    fontWeight: "600",
  },
  value: {
    fontWeight: "400",
  },
  status: {
    marginTop: height * 0.01,
    fontWeight: "bold",
    fontSize: height * 0.02,
  },
  actions: {
    flexDirection: "row",
    marginTop: height * 0.015,
    justifyContent: "space-between",
  },
  approve: {
    backgroundColor: "green",
    flex: 1,
    paddingVertical: height * 0.015,
    marginRight: width * 0.02,
    borderRadius: 5,
    alignItems: "center",
  },
  reject: {
    backgroundColor: "red",
    flex: 1,
    paddingVertical: height * 0.015,
    borderRadius: 5,
    alignItems: "center",
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
  },
  empty: {
    marginTop: height * 0.2,
    textAlign: "center",
    fontSize: height * 0.022,
    color: "#666",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  dateButton: {
  backgroundColor: '#eee',
  padding: 12,
  borderRadius: 5,
  marginBottom: 10,
},
applyFilterBtn: {
  backgroundColor: '#007bff',
  padding: 12,
  borderRadius: 5,
  alignItems: 'center',
  marginBottom: 15,
}

});
