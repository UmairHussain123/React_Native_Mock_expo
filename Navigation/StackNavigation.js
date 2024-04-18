import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

import Login from "../Screens/Login";
import Home from "../Screens/Home";
import Profile from "../Screens/Profile";
import EditProfile from "../Screens/EditProfile";
import Cart from "../Screens/Cart";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const handleLogout = async () => {
    try {
      // Clear the userData key from AsyncStorage
      await AsyncStorage.removeItem("userData");
      // Navigate to the Login screen
      await navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerTitle: "Home",
            headerTitleAlign: "center", // Center align the header title
            headerLeft: () => (
              <TouchableOpacity
                style={styles.profileIconContainer}
                onPress={() => navigation.navigate("Profile")}
              >
                <Ionicons
                  name="person-circle-outline"
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                style={styles.logoutIconContainer}
                onPress={async () => {
                  try {
                    await AsyncStorage.removeItem("userData");

                    await navigation.replace("Login");
                  } catch (error) {
                    console.error("Error logging out:", error);
                  }
                }}
              >
                <Ionicons name="log-out-outline" size={30} color="black" />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: true, headerTitle: "Product" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({
  profileIconContainer: {
    marginRight: 20,
  },
  logoutIconContainer: {
    marginLeft: 20,
  },
});
