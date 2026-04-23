import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScannerScreen from "../screens/ScannerScreen";
import Search from "../screens/Search";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const tab = createBottomTabNavigator();
const BottomNavigation = () => {
  return (
    <tab.Navigator
      screenOptions={{
        // headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
        tabBarStyle: {
          position: "absolute",
          // flex: 1,
          // justifyContent: 'center',
          // alignItems: 'center',
          bottom: 20,
          // left: 20,right: 20,
          height: 60,
          //   backgroundColor: "#3a793aff",
          backgroundColor: "#ffffffff",
          paddingTop: 10,
          borderRadius: 30,
          elevation: 0,
          marginHorizontal: 12,
          justifyContent: "center",
          //   alignItems: "center",
        },

        tabBarLabelStyle: { display: "none" },
      }}
    >
      <tab.Screen
        options={{
          //   title: "Mig Identity Verification",
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) =>
            // <Ionicons size={size} color={color} name="cart"></Ionicons>
            focused ? (
              <View
                style={{
                  padding: 7,
                  backgroundColor: "black",
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: "50%",
                  height: 50,
                  width: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <Octicons name="home-fill" size={20} color="#004d40" /> */}
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={24}
                  color="white"
                />
              </View>
            ) : (
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={24}
                color="#000000ff"
              />
            ),
        }}
        name="scanner"
        component={ScannerScreen}
      />
      <tab.Screen
        options={{
          headerShown: false,
          //   title: "Search Employee By ID",
          tabBarIcon: ({ size, color, focused }) =>
            // <Ionicons size={size} color={color} name="cart"></Ionicons>
            focused ? (
              <View
                style={{
                  padding: 7,
                  backgroundColor: "black",
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: "50%",
                  height: 50,
                  width: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome6 name="id-card" size={24} color="white" />
              </View>
            ) : (
              <FontAwesome6 name="id-card" size={24} color="black" />
            ),
        }}
        name="search"
        component={Search}
      />
    </tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({});
