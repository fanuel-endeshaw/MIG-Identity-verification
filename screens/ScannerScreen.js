import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [lastScan, setLastScan] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (!permission) requestPermission();
  }, []);

  const handleScan = ({ data }) => {
    if (scanned) return;
    setScanned(true);
    setLastScan(data);
    navigation.navigate("profile", { data: data });

    // Reset after short delay
    setTimeout(() => setScanned(false), 2000);
  };

  if (!permission) return <Text>Requesting permission...</Text>;
  if (!permission.granted) return <Text>No camera access</Text>;

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={handleScan}
      />

      {/* Overlay */}
      <View style={styles.overlay} />

      {/* Scanner Frame */}
      <View style={styles.frame}>
        <View style={styles.cornerTL} />
        <View style={styles.cornerTR} />
        <View style={styles.cornerBL} />
        <View style={styles.cornerBR} />
      </View>

      <Text style={styles.instruction}>
        Center the QR code within the frame
      </Text>

      {/* {lastScan && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>LAST SCANNED</Text>
          <Text numberOfLines={1} style={styles.link}>
            {lastScan}
          </Text>
        </View>
      )} */}

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        {/* <TouchableOpacity style={styles.smallBtn}>
          <Text style={styles.btnText}>Gallery</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity style={styles.scanBtn}>
          <LinearGradient
            colors={["#00C6FF", "#0072FF"]}
            style={styles.scanInner}
          >
            <Text style={styles.scanText}>Scan</Text>
          </LinearGradient>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  frame: {
    position: "absolute",
    top: "30%",
    alignSelf: "center",
    width: 250,
    height: 250,
  },

  cornerTL: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#00FFD1",
  },
  cornerTR: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#00FFD1",
  },
  cornerBL: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#00FFD1",
  },
  cornerBR: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: "#00FFD1",
  },

  instruction: {
    position: "absolute",
    top: "60%",
    alignSelf: "center",
    color: "#ccc",
    fontSize: 14,
  },

  resultBox: {
    position: "absolute",
    bottom: 120,
    alignSelf: "center",
    backgroundColor: "#111",
    padding: 10,
    borderRadius: 10,
    width: "80%",
  },

  resultText: {
    color: "#aaa",
    fontSize: 10,
  },

  link: {
    color: "#00FFD1",
    fontSize: 12,
  },

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
    padding: 10,
    borderRadius: 10,
  },

  btnText: {
    color: "#fff",
  },

  scanBtn: {
    borderRadius: 50,
    overflow: "hidden",
  },

  scanInner: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
  },

  scanText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
