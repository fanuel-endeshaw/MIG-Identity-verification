import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export default function ProfileScreen() {
  const route = useRoute();
  const { data } = route.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          // hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons name="cancel" size={27} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Identity Check System</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.card}>
        <Image
          resizeMode="cover"
          source={{ uri: data.photo }}
          style={styles.avatar}
        />

        <View style={styles.infoContainer}>
          <DetailItem label="Full Name" value={data.name} />
          <DetailItem label="ID Number" value={data.id || "101"} />
          <DetailItem label="Date of Birth" value={data.dob || "1985-07-22"} />
          <DetailItem label="Address" value={data.address} />
        </View>
      </View>
    </SafeAreaView>
  );
}

// Reusable component for clean data rows
const DetailItem = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingTop: 25,
  },
  headerRow: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 15,
    color: "#1A1A1A",
    fontFamily: "System", // Cleanest default font
  },
  card: {
    alignSelf: "center",
    width: "92%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    // Subtle shadow for modern depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  avatar: {
    width: "100%",
    height: 240,
    borderRadius: 16, // Softer corners
    marginBottom: 20,
  },
  infoContainer: {
    paddingHorizontal: 4,
  },
  detailRow: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0", // Subtle separator
    paddingBottom: 8,
  },
  label: {
    fontSize: 12,
    color: "#6C757D", // Secondary color for label
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
    fontFamily: "System",
  },
  value: {
    fontSize: 17,
    fontWeight: "600",
    color: "#212529",
    fontFamily: "System",
  },
});
