import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
} from "react-native";
import API from "../api";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get("window");

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Toast.show({ type: "error", text1: "Fill in all fields" });
      return;
    }

    try {
      await API.post("/users/register", { name, email, password });
      Toast.show({ type: "success", text1: "Signup successful!" });
      navigation.navigate("Login");
    } catch (err) {
      console.log(err.response?.data || err.message);
      Toast.show({
        type: "error",
        text1: err.response?.data?.error || "Signup failed",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Signup</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeButton}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Signup</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Already have an account? Login
      </Text>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: width * 0.07,
    marginBottom: height * 0.1,
  },
  heading: {
    fontSize: height * 0.035,
    fontWeight: "bold",
    marginBottom: height * 0.03,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: height * 0.065,
    borderWidth: 1,
    borderColor: "#aaa",
    paddingHorizontal: width * 0.04,
    borderRadius: 5,
    marginBottom: height * 0.025,
    fontSize: height * 0.02,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#aaa",
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

  registerButton: {
    backgroundColor: "#007BFF",
    paddingVertical: height * 0.02, // makes it taller
    borderRadius: 8,
    alignItems: "center",
    marginTop: height * 0.015,
  },

  registerButtonText: {
    color: "white",
    fontSize: height * 0.022,
    fontWeight: "semibold",
  },

  link: {
    marginTop: height * 0.02,
    color: "blue",
    textAlign: "center",
    fontSize: height * 0.018,
  },
});
