import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import ScannerScreen from "./screens/ScannerScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNavigation from "./navigation/BottomNavigation";
const stack = createStackNavigator();
const App = () => {
  //   const navigation = useNavigation();
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{ animation: "fade_from_bottom" }}>
        <stack.Screen
          options={{ title: "Mig Identity Verification", headerShown: false }}
          name="scanner"
          component={BottomNavigation}
        />
        <stack.Screen
          options={{ headerShown: false }}
          name="profile"
          component={ProfileScreen}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
