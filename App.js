import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ScannerScreen from "./screens/ScannerScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { createStackNavigator } from "@react-navigation/stack";
const stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{ animation: "fade_from_bottom" }}>
        <stack.Screen
          options={{ headerShown: false, title: "Mig Identity Verification" }}
          name="scanner"
          component={ScannerScreen}
        />
        <stack.Screen
          options={{
            // headerShown: false,
            presentation: "modal",
            // gestureEnabled: true,
            // gestureDirection: "vertical",
          }}
          name="profile"
          component={ProfileScreen}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
