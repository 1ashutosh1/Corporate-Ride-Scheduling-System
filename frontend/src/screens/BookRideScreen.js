import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast from "react-native-toast-message";
import API from "../api";

const { width, height } = Dimensions.get("window");

const BookRideScreen = ({ navigation }) => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [rideTime, setRideTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleConfirm = (date) => {
    setShowPicker(false);
    setRideTime(date);
  };

  const handleCancel = () => {
    setShowPicker(false);
  };

  const handleSubmit = async () => {
    if (!pickup || !dropoff || !rideTime) {
      Toast.show({ type: "error", text1: "Fill in all fields" });
      return;
    }

    if (pickup.trim().toLowerCase() === dropoff.trim().toLowerCase()) {
      Toast.show({
        type: "error",
        text1: "Pickup and dropoff cannot be the same",
      });
      return;
    }

    try {
      await API.post("/rides/bookRide", {
        pickup,
        dropoff,
        date: rideTime.toISOString(), // backend expects ISO format
      });

      Toast.show({ type: "success", text1: "Ride booked successfully!" });

      setTimeout(() => {
        navigation.navigate("MyRides");
      }, 500); // delay so toast shows briefly
    } catch (err) {
      console.log(err.response?.data || err.message);
      Toast.show({ type: "error", text1: "Failed to book ride" });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Book a Ride</Text>

      <TextInput
        placeholder="Pickup Location"
        value={pickup}
        onChangeText={setPickup}
        style={styles.input}
      />
      <TextInput
        placeholder="dropoff Location"
        value={dropoff}
        onChangeText={setDropoff}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.dateButtonText}>{rideTime.toLocaleString()}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showPicker}
        mode="datetime"
        minimumDate={new Date()}
        date={rideTime}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      <TouchableOpacity style={styles.bookButton} onPress={handleSubmit}>
        <Text style={styles.bookButtonText}>Book Ride</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookRideScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.07,
    justifyContent: "center",
  },
  heading: {
    fontSize: height * 0.035,
    fontWeight: "bold",
    marginBottom: height * 0.03,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    paddingHorizontal: width * 0.04,
    borderRadius: 5,
    marginBottom: height * 0.025,
    height: height * 0.065,
    fontSize: height * 0.02,
  },
  dateButton: {
    backgroundColor: "#eee",
    padding: height * 0.02,
    borderRadius: 5,
    marginBottom: height * 0.03,
  },
  dateButtonText: {
    textAlign: "center",
    fontSize: height * 0.022,
  },
  bookButton: {
    backgroundColor: "#28a745",
    paddingVertical: height * 0.02,
    borderRadius: 8,
    alignItems: "center",
  },
  bookButtonText: {
    color: "white",
    fontSize: height * 0.022,
    fontWeight: "semibold",
  },
});
