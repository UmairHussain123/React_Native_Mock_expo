import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import LogoImage from "../assets/Logo/logo-bg-r.png";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginScreen({ navigation }) {
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      if (userDataString) {
        navigation.replace("Home");
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  const handleLogin = async (values) => {
    const { email, password } = values;

    if (
      email === "interview@eclatechsolutions.com" &&
      password === "testing123"
    ) {
      console.log("Login successful");

      // Set user data in AsyncStorage
      const userData = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1234567890",
        profileImage: require("../assets/profileImg.jpg"),
      };
      await AsyncStorage.setItem("userData", JSON.stringify(userData));

      navigation.replace("Home");
    } else {
      console.log("Login failed");
      setSnackbarVisible(true);
    }
  };

  const onDismissSnackbar = () => {
    setSnackbarVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Image source={LogoImage} style={styles.logo} />

      {/* Formik form */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleLogin(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              label="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              style={styles.input}
              keyboardType="email-address"
              error={touched.email && errors.email}
            />
            {touched.email && errors.email && (
              <Snackbar visible={snackbarVisible} onDismiss={onDismissSnackbar}>
                {errors.email}
              </Snackbar>
            )}

            <TextInput
              label="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              style={styles.input}
              secureTextEntry
              error={touched.password && errors.password}
            />
            {touched.password && errors.password && (
              <Snackbar visible={snackbarVisible} onDismiss={onDismissSnackbar}>
                {errors.password}
              </Snackbar>
            )}

            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
            >
              Login
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});
