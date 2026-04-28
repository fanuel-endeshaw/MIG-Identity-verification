import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const route = useRoute();
  const { data } = route.params;
  const navigation = useNavigation();
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Result: 1995-05-09
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Identity Verified</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Profile Card */}
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="cover"
              source={{
                uri: "http://192.168.1.65:5000/uploads/1777359160688-laptop_girl.jpeg",
              }}
              // source={{ uri: data.photo_url }}
              style={styles.avatar}
            />
            <View style={styles.verifiedBadge}>
              <MaterialCommunityIcons
                name="check-decagram"
                size={20}
                color="#00FFD1"
              />
              <Text style={styles.verifiedText}>VERIFIED</Text>
            </View>
          </View>

          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Employee Details</Text>

            <DetailItem
              label="Full Name"
              value={data.full_name}
              icon="person-outline"
            />

            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <DetailItem
                  label="ID Number"
                  value={data.id_number || "101"}
                  icon="finger-print"
                />
              </View>
              {/* <View style={{ flex: 1 }}>
                <DetailItem
                  label="Status"
                  value="Active"
                  icon="ellipse"
                  iconColor="#4CAF50"
                />
              </View> */}
            </View>

            <DetailItem
              label="Date of Birth"
              value={formatDate(data.date_of_birth) || "July 22, 2003"}
              icon="calendar-outline"
            />

            <DetailItem
              label="Primary Address"
              value={data.address}
              icon="location-outline"
            />

            {/* <DetailItem
              label="Phone Number"
              value={data.phone || "N/A"}
              icon="call-outline"
            /> */}
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => navigation.navigate("scanner")}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const DetailItem = ({ label, value, icon, iconColor = "#666" }) => (
  <View style={styles.detailRow}>
    <View style={styles.labelRow}>
      <Ionicons
        name={icon}
        size={14}
        color={iconColor}
        style={{ marginRight: 6 }}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 60,
    paddingTop: 10,
    // paddingBottom: 15,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  card: {
    alignSelf: "center",
    width: "92%",
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    overflow: "hidden",
    marginTop: 10,
    // Soft Elevation
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  imageContainer: {
    position: "relative",
  },
  avatar: {
    width: "100%",
    height: 280,
    backgroundColor: "#f0f0f0",
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backdropFilter: "blur(10px)",
  },
  verifiedText: {
    color: "#00FFD1",
    fontSize: 10,
    fontWeight: "800",
    marginLeft: 4,
    letterSpacing: 1,
  },
  content: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    gap: 15,
  },
  detailRow: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  doneButton: {
    marginTop: 25,
    marginHorizontal: 20,
    backgroundColor: "#000",
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
