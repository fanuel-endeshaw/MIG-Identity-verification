import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function RequestPermission() {
  return (
    <View style={styles.container}>
      {/* Background */}
      <LinearGradient
        colors={["#000000", "#0f2027"]}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.content}>
        {/* Optional logo */}
        <Image
          source={require("../assets/logo-full.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <ActivityIndicator size="large" color="#00FFD1" />

        <Text style={styles.title}>Preparing Camera</Text>

        <Text style={styles.description}>
          Requesting camera permission. Please wait...
        </Text>
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
    // justifyContent: "center",
    alignItems: "center",
    padding: 25,
    paddingTop: 50,
  },
  logo: {
    width: 160,
    height: 80,
    marginBottom: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginTop: 20,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
  },
});
