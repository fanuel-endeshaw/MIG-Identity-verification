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

export default function NoPermissionScreen({ onRequestPermission, onGoBack }) {
  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={["#000000", "#0f2027"]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Content */}
      <View style={styles.content}>
        {/* Optional Image */}
        <Image
          source={require("../assets/no-camera.png")} // replace if needed
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>Camera Permission Required</Text>

        <Text style={styles.description}>
          This app needs access to your camera to scan QR codes for identity
          verification.
        </Text>

        {/* Allow Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={onRequestPermission}
        >
          <Text style={styles.primaryButtonText}>Allow Camera Access</Text>
        </TouchableOpacity>

        {/* Open Settings */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => Linking.openSettings()}
        >
          <Text style={styles.secondaryText}>Open Settings</Text>
        </TouchableOpacity>

        {/* Go Back */}
        {onGoBack && (
          <TouchableOpacity onPress={onGoBack}>
            <Text style={styles.backText}>Go Back</Text>
          </TouchableOpacity>
        )}
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
    backgroundColor: "#00FFD1",
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
    color: "#00FFD1",
    fontSize: 14,
  },
  backText: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 10,
  },
});
