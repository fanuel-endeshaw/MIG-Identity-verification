import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import NoPermissionScreen from "./NoPermissionScreen";

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false); // To show a loader during API call
  const navigation = useNavigation();

  useEffect(() => {
    if (!permission) requestPermission();
  }, []);

  const handleScan = async ({ data }) => {
    if (scanned || loading) return;

    // 1. Validate: 8-digit integer check
    const isValidToken = /^\d{8}$/.test(data);

    if (isValidToken) {
      setLoading(true);
      setScanned(true);

      try {
        console.log("started try");
        console.log(data);
        console.log(typeof data);

        // 2. API Call to your backend
        const response = await fetch(
          `http://192.168.1.56:5000/api/users/verify?token=${data}`,
        );

        if (response.ok) {
          console.log("ok");

          const userData = await response.json();
          console.log(userData);

          // 3. Navigate to profile with the fetched user object
          navigation.navigate("profile", { data: userData });
        } else {
          // Handle backend errors (e.g., 404 User Not Found)
          console.log("error");

          navigation.navigate("error", {
            details: "User not found in the Mig Identity database.",
          });
        }
      } catch (error) {
        // Handle network errors
        navigation.navigate("error", {
          details: "Network error. Please check your connection.",
        });
      } finally {
        setLoading(false);
        // Reset scanner after a delay to allow for the next scan if they come back
        setTimeout(() => setScanned(false), 2000);
      }
    } else {
      // 4. Invalid token format (not 8 digits or not integer)
      navigation.navigate("error", {
        details:
          "Invalid QR Format. Please scan a valid QR code or Try to use ID verification .",
      });
    }
  };

  if (!permission) return <Text>Requesting permission...</Text>;
  if (!permission.granted)
    return (
      <NoPermissionScreen
        permission={permission}
        requestPermission={requestPermission}
        onGoBack={() => navigation.goBack()}
      ></NoPermissionScreen>
    );

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleScan}
      />

      <LinearGradient
        colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.3)"]}
        style={styles.overlay}
      />

      <View style={styles.header}>
        <View style={styles.headerGradient}>
          <Image
            style={styles.logo}
            source={require("../assets/logo-full.png")}
            resizeMode="stretch"
          />
          <View style={styles.headerTextBox}>
            <Text style={styles.headerTitle}>Mig Identity</Text>
            <Text style={styles.headerSubtitle}>Verification Scanner</Text>
          </View>
        </View>
      </View>

      <View style={styles.frame}>
        <View style={styles.cornerTL} />
        <View style={styles.cornerTR} />
        <View style={styles.cornerBL} />
        <View style={styles.cornerBR} />
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#00FFD1" />
          </View>
        )}
      </View>

      <View style={styles.instructionBox}>
        <Text style={styles.instruction}>
          {loading ? "Verifying..." : "Center the QR code within the frame"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  overlay: { ...StyleSheet.absoluteFillObject },
  header: {
    width: "100%",
    // Handle Android Status Bar overlap
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    position: "absolute",
    top: 0,
    zIndex: 10,
  },
  headerGradient: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "white",
    paddingTop: 30,
    paddingBottom: 10,
    gap: 12,
  },
  logo: { height: 75, width: 150, marginRight: 12 },
  headerTextBox: { flexDirection: "column", alignItems: "flex-start" },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#000" },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: "400",
    color: "rgba(0,0,0,0.6)",
  },
  frame: {
    position: "absolute",
    top: "30%",
    alignSelf: "center",
    width: 260,
    height: 260,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingOverlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
    borderRadius: 15,
  },
  cornerTL: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 35,
    height: 35,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#00FFD1",
    borderRadius: 8,
  },
  cornerTR: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 35,
    height: 35,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#00FFD1",
    borderRadius: 8,
  },
  cornerBL: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 35,
    height: 35,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#00FFD1",
    borderRadius: 8,
  },
  cornerBR: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 35,
    height: 35,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: "#00FFD1",
    borderRadius: 8,
  },
  instructionBox: {
    position: "absolute",
    top: "65%",
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  instruction: { color: "#fff", fontSize: 15, fontWeight: "500" },
});
