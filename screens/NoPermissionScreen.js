import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import { CameraView, useCameraPermissions } from "expo-camera";

export default function NoPermissionScreen({
  permission,
  requestPermission,
  onGoBack,
}) {
  const handlePermission = async () => {
    if (permission?.canAskAgain) {
      await requestPermission();
    } else {
      Linking.openSettings(); // 🔥 fallback when blocked
    }
  };

  const isBlocked = permission && !permission.canAskAgain;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#000000", "#0f2027"]}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Camera Permission Required</Text>

        <Text style={styles.description}>
          {isBlocked
            ? "Camera access is permanently denied. Please enable it from settings."
            : "We need camera access to scan QR codes."}
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handlePermission}
        >
          <Text style={styles.primaryButtonText}>
            {isBlocked ? "Open Settings" : "Allow Camera Access"}
          </Text>
        </TouchableOpacity>

        {/* {onGoBack && (
          <TouchableOpacity onPress={onGoBack}>
            <Text style={styles.backText}>Go Back</Text>
          </TouchableOpacity>
        )} */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: "#ffffffff",
    // backgroundColor: "#00FFD1",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    marginBottom: 15,
  },
  secondaryText: {
    color: "#1f9bd4ff",
    // color: "#00FFD1",
    fontSize: 14,
  },
  backText: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 10,
  },
});
