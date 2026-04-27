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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const EMPLOYEES = [
  {
    id: "101",
    name: "Fanuel En",
    address: "Bole, Addis Ababa",
    phone: "+251900000000",
    photo:
      "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?q=80&w=387&auto=format&fit=crop",
  },
  {
    id: "102",
    name: "Abrham",
    address: "Bole, Addis Ababa",
    phone: "+251911111111",
    photo: "https://njaes.rutgers.edu/fs1325/FS1325-1-big.jpg",
  },
];

export default function Search() {
  const [searchId, setSearchId] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigation = useNavigation();

  const handleSearch = () => {
    const trimmedId = searchId.trim();
    if (!trimmedId) {
      Alert.alert(
        "Input Required",
        "Please enter a valid Employee ID to proceed.",
      );
      return;
    }

    const employee = EMPLOYEES.find((emp) => emp.id === trimmedId);

    if (employee) {
      navigation.navigate("profile", { data: employee });
    } else {
      Alert.alert(
        "Verification Failed",
        "No employee found with this ID. Please check the ID and try again.",
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          {/* Back Button (Optional) */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          <View style={styles.headerContainer}>
            <Text style={styles.title}>Verify Identity</Text>
            <Text style={styles.subtitle}>
              Enter the unique employee identification number to view profile
              details.
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
              placeholder="Employee ID (e.g. 101)"
              placeholderTextColor="#999"
              style={styles.input}
              value={searchId}
              onChangeText={setSearchId}
              keyboardType="numeric"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoFocus={true}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={handleSearch}
          >
            <Text style={styles.buttonText}>Search Records</Text>
            <Ionicons name="chevron-forward" size={18} color="white" />
          </TouchableOpacity>

          {/* Quick Info / Security Note */}
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
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  backBtn: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  headerContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 64,
    borderWidth: 1.5,
    borderColor: "#EAEAEA",
    // Subtle shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    // Elevation for Android
    elevation: 2,
  },
  inputFocused: {
    borderColor: "#000",
    backgroundColor: "#FFF",
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
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
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    gap: 6,
  },
  infoText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
});
