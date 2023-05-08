import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, Card, Input, Button, Overlay, Icon } from "@rneui/themed";
import { XCircleIcon } from "react-native-heroicons/solid";

export default function LoginScreen() {
  const [userEmail, setUserEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  if (loggedIn) {
    navigation.navigate("User", user);
  }

  const toggleOverlay = () => {
    setHasError(!hasError);
  };

  function submit() {
    if (!userEmail || !userPassword) {
      setErrorMessage("Please Fill all the inputs!");
      return setHasError(!hasError);
    }

    const loginInfo = {
      userEmail,
      userPassword,
    };

    fetch("http://172.20.10.4:5000/login", {
      mode: "cors",
      method: "Post",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginInfo.userEmail,
        password: loginInfo.userPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        console.log(data); // check if data is received correctly
        if (data && data?.token) {
          setIsLoggedIn(!loggedIn);
        } else {
          setErrorMessage("Provided wrong email or password");
          setHasError(!hasError);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#3268a8" }}>
      {hasError && (
        <Overlay isVisible={hasError} onBackdropPress={toggleOverlay}>
          <View style={{ width: 300 }}>
            <Text
              style={{
                marginBottom: 20,
                padding: 10,
                color: "red",
                fontSize: 16,
              }}
            >
              {errorMessage}
            </Text>
            <Button
              // buttonStyle={styles.submit}
              icon={
                <Icon
                  type="font-awesome"
                  color="white"
                  size={25}
                  iconStyle={{ marginRight: 10 }}
                />
              }
              title="Okay"
              onPress={toggleOverlay}
            />
          </View>
        </Overlay>
      )}

      <View
        style={{
          alignItems: "center",
          //   marginBottom: 30,
          padding: 20,
          maxHeight: "30%",
          flexDirection: "row",
          marginHorizontal: 30,
          marginVertical: 10,
          justifyContent: "space-around",
        }}
      >
        <Text style={{ color: "white", fontSize: 23 }}>Welcome back!</Text>
        <XCircleIcon
          onPress={() => navigation.goBack()}
          size={40}
          color="#00CCBB"
        />
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Card containerStyle={{ marginTop: 15, borderRadius: 5 }}>
              <Card.Title>Login</Card.Title>
              <Card.Divider />

              <Text style={styles.fonts}>Email</Text>
              <Input onChangeText={(value) => setUserEmail(value)} />

              <Text style={styles.fonts}>Password</Text>
              <Input
                onChangeText={(value) => setUserPassword(value)}
                secureTextEntry={true}
              />

              {/* <Text style={styles.fonts}>Normal Text</Text> */}
              <Button onPress={submit} title="Login" />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity></TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text style={{ color: "#7ea5f2", fontSize: 15 }}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fonts: {
    marginBottom: 8,
    fontSize: 20,
  },
  user: {
    flexDirection: "row",
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
});
