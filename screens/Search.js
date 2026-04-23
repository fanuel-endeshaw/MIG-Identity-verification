import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

// Mock Database - Replace this with your actual API or Database fetch
const EMPLOYEES = [
  {
    id: "101",
    name: "Fanuel en",
    address: "Bole, Addis Ababa",
    phone: "+251900000000",
    photo:
      "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "102",
    name: "abrham",
    address: "Bole, Addis Ababa",
    phone: "+251911111111",
    photo: "https://njaes.rutgers.edu/fs1325/FS1325-1-big.jpg",
  },
];

export default function Search() {
  const [searchId, setSearchId] = useState("");
  const navigation = useNavigation();

  const handleSearch = () => {
    // 1. Basic validation for empty input
    if (!searchId.trim()) {
      Alert.alert("Error", "Please enter an Employee ID");
      return;
    }

    // 2. Search logic
    const employee = EMPLOYEES.find((emp) => emp.id === searchId.trim());

    if (employee) {
      // 3. Navigate if valid
      navigation.navigate("profile", { data: employee });
    } else {
      // 4. Alert if invalid
      Alert.alert(
        "Not Found",
        "The user does not exist or you entered an invalid ID.",
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Find Employee</Text>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Enter Employee ID (e.g., 101)"
          style={styles.input}
          value={searchId}
          onChangeText={setSearchId}
          keyboardType="numeric"
          autoFocus={true}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Verify Identity</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeeeff",
    padding: 20,
    paddingTop: 55,
    // justifyContent: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    color: "#333",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 60,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#000",
  },
  button: {
    backgroundColor: "black",
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
