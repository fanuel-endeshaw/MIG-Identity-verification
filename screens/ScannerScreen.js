import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (!permission) requestPermission();
  }, []);

  const handleScan = ({ data }) => {
    if (scanned) return;
    setScanned(true);
    navigation.navigate("profile", { data: JSON.parse(data) });
    setTimeout(() => setScanned(false), 2000);
  };

  if (!permission) return <Text>Requesting permission...</Text>;
  if (!permission.granted) return <Text>No camera access</Text>;

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleScan}
      />

      {/* Gradient Overlay */}
      <LinearGradient
        colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.3)"]}
        style={styles.overlay}
      />

      {/* Sleek Header */}
      <View style={styles.header}>
        {/* <LinearGradient
          colors={["#0072FF", "#00C6FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.headerGradient}
        > */}
        <View style={styles.headerGradient}>
          <Image
            style={styles.logo}
            source={require("../assets/logo-full.png")}
            resizeMode="contain"
          />
          <View style={styles.headerTextBox}>
            <Text style={styles.headerTitle}>Mig Identity</Text>
            <Text style={styles.headerSubtitle}>Verification Scanner</Text>
          </View>
        </View>
        {/* </LinearGradient> */}
      </View>

      {/* Scanner Frame */}
      <View style={styles.frame}>
        <View style={styles.cornerTL} />
        <View style={styles.cornerTR} />
        <View style={styles.cornerBL} />
        <View style={styles.cornerBR} />
      </View>

      {/* Instruction */}
      <View style={styles.instructionBox}>
        <Text style={styles.instruction}>
          Center the QR code within the frame
        </Text>
      </View>

      {/* Bottom Buttons */}
      {/* <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.smallBtn}>
          <Text style={styles.btnText}>Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.scanBtn}>
          <LinearGradient
            colors={["#00C6FF", "#0072FF"]}
            style={styles.scanInner}
          >
            <Text style={styles.scanText}>Scan</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },

  overlay: { ...StyleSheet.absoluteFillObject },

  header: {
    width: "100%",
    height: 100,
    position: "absolute",
    top: 0,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  headerGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderRadius: 20,
    backgroundColor: "white",
  },
  logo: { height: 60, width: 60, marginRight: 12 },
  headerTextBox: { flexDirection: "column", alignItems: "flex-start" },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#000000ff" },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "hsla(0, 0%, 16%, 0.85)",
  },

  frame: {
    position: "absolute",
    top: "30%",
    alignSelf: "center",
    width: 260,
    height: 260,
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

  bottomContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  smallBtn: {
    backgroundColor: "#222",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  btnText: { color: "#fff", fontSize: 14 },

  scanBtn: { borderRadius: 50, overflow: "hidden" },
  scanInner: { paddingVertical: 15, paddingHorizontal: 50, borderRadius: 50 },
  scanText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
