import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("userData");
      if (jsonValue !== null) {
        setUserData(JSON.parse(jsonValue));
        console.log(">> flag userData", jsonValue);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const handleRefresh = () => {
    // Call the loadUserData function again to refresh the data
    loadUserData();
  };
  console.log(">>>?", userData?.profileImage);
  const proImg = userData?.profileImage;
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Avatar.Image
          size={100}
          source={
            proImg == null
              ? require("../assets/profileImg.jpg")
              : { uri: userData.profileImage }
          }
        />
        <Title style={styles.userName}>{userData?.name}</Title>
        <Paragraph style={styles.userEmail}>{userData?.email}</Paragraph>
        <Paragraph style={styles.userPhone}>{userData?.phone}</Paragraph>
        <Button
          icon="playlist-edit"
          mode="outlined"
          onPress={() => navigation.navigate("EditProfile")}
        >
          Edit Profile
        </Button>
      </View>
      <Card style={styles.card}>
        <Card.Content>
          <Title>About Me</Title>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Paragraph>
        </Card.Content>
      </Card>
      <List.Section>
        <List.Subheader>Settings</List.Subheader>
        <List.Item
          title="Notification Preferences"
          left={() => <List.Icon icon="bell" />}
          onPress={() => console.log("Notification Preferences pressed")}
        />
        <List.Item
          title="Privacy Settings"
          left={() => <List.Icon icon="lock" />}
          onPress={() => console.log("Privacy Settings pressed")}
        />
      </List.Section>
      <Button onPress={handleRefresh}>Refresh Data</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 50,
  },
  userName: {
    marginTop: 10,
    fontSize: 20,
  },
  userEmail: {
    fontSize: 14,
  },
  userPhone: {
    fontSize: 14,
  },
  card: {
    marginBottom: 20,
  },
});

export default Profile;
