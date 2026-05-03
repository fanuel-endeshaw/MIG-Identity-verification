import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator, // Added for loading state
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function Search() {
  const [searchId, setSearchId] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false); // New state
  const navigation = useNavigation();

  const handleSearch = async () => {
    const trimmedId = searchId.trim();

    // 1. Basic empty check
    if (!trimmedId) {
      Alert.alert("Input Required", "Please enter an Employee ID.");
      return;
    }

    // 2. Validate: Must be exactly 8 digits and numeric
    const isValidId = /^\d{8}$/.test(trimmedId);
    if (!isValidId) {
      Alert.alert(
        "Invalid Format",
        "Employee IDs must be exactly 8 digits long (e.g., 40133847).",
      );
      return;
    }

    setLoading(true);

    try {
      console.log("Starting engi");

      // 3. API Call (Replace localhost with your machine's IP)
      // Example: http://192.168.1.5:5000/v1/user?token=...
      const response = await fetch(
        `http://192.168.1.39:5000/api/users/verify?token=${trimmedId}`,
      );

      if (response.ok) {
        console.log(response);

        const userData = await response.json();
        Keyboard.dismiss();
        setSearchId("");
        navigation.navigate("profile", { data: userData });
      } else {
        // Navigate to your custom error page or show alert
        navigation.navigate("error", {
          details: "No employee found with this ID in the Mig database.",
        });
      }
    } catch (error) {
      Alert.alert(
        "Connection Error",
        "Could not reach the server. Please check your internet.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          {/* Status Bar Padding for Android */}
          <View style={styles.androidPadding} />
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          <View style={styles.headerContainer}>
            <Text style={styles.title}>Verify Identity</Text>
            <Text style={styles.subtitle}>
              Enter the 8-digit unique employee identification number to view
              profile details.
            </Text>
          </View>

          <View style={[styles.inputWrapper, isFocused && styles.inputFocused]}>
            <Ionicons
              name="id-card-outline"
              size={22}
              color={isFocused ? "#000" : "#999"}
              style={styles.icon}
            />
            <TextInput
              placeholder="e.g. 40133847"
              placeholderTextColor="#999"
              style={styles.input}
              value={searchId}
              onChangeText={setSearchId}
              keyboardType="numeric"
              maxLength={8} // Limit input length
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
              editable={!loading} // Disable input while loading
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button, loading && { backgroundColor: "#444" }]}
            onPress={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text style={styles.buttonText}>Search Records</Text>
                <Ionicons name="chevron-forward" size={18} color="white" />
              </>
            )}
          </TouchableOpacity>

          <View style={styles.infoBox}>
            <Ionicons name="lock-closed-outline" size={14} color="#666" />
            <Text style={styles.infoText}>
              All verification attempts are logged for security purposes.
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  androidPadding: {
    height: Platform.OS === "android" ? 40 : 0,
  },
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  inner: { flex: 1, padding: 24, justifyContent: "center" },
  backBtn: {
    position: "absolute",
    top: Platform.OS === "android" ? 50 : 60,
    left: 20,
  },
  headerContainer: { marginBottom: 40 },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  subtitle: { fontSize: 16, color: "#666", lineHeight: 22 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 64,
    borderWidth: 1.5,
    borderColor: "#EAEAEA",
  },
  inputFocused: { borderColor: "#000", backgroundColor: "#FFF" },
  icon: { marginRight: 12 },
  input: { flex: 1, fontSize: 18, fontWeight: "500", color: "#000" },
  button: {
    flexDirection: "row",
    backgroundColor: "#000",
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    gap: 8,
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "600" },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    gap: 6,
  },
  infoText: { fontSize: 12, color: "#888", textAlign: "center" },
});
