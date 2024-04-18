import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
});

const EditProfileScreen = () => {
  const [profileImage, setProfileImage] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      // Request permission for image library access
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access image library required.");
      }
    })();
  }, []);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log("ImagePicker result:", result);
      if (!result.cancelled) {
        console.log("Selected image URI:", result.assets[0].uri);
        setProfileImage(result.assets[0].uri); // Set the URI of the selected image
      } else {
        console.log("Image selection cancelled or no URI returned.");
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  const saveProfileData = async (values) => {
    console.log("save Profile Data", values, profileImage);
    try {
      // Include profileImage in the values object
      const data = { ...values, profileImage: profileImage };
      console.log("data", data);
      await AsyncStorage.setItem("userData", JSON.stringify(data));
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  const handleSave = async (values) => {
    await saveProfileData(values);
    console.log("Profile data saved:", values);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ name: "", email: "", phone: "", profileImage: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSave}
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
            <View style={styles.imageContainer}>
              <Image
                source={
                  profileImage
                    ? { uri: profileImage }
                    : require("../assets/profileImg.jpg")
                }
                style={styles.profileImage}
              />
              <Button
                mode="contained"
                onPress={selectImage}
                style={styles.selectImageButton}
              >
                Select Image
              </Button>
            </View>
            <TextInput
              label="Name"
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              style={styles.input}
            />
            {touched.name && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}
            <TextInput
              label="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              style={styles.input}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              label="Phone"
              value={values.phone}
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              style={styles.input}
            />
            {touched.phone && errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
            >
              Save
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 8,
    marginTop: 50,
  },
  selectImageButton: {
    width: 150,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
});

export default EditProfileScreen;
