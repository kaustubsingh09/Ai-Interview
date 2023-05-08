import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, Card, Input, Button, Overlay, Icon } from "@rneui/themed";
import { XCircleIcon } from "react-native-heroicons/solid";

export default function Register() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userSigned, setUserSigned] = useState("");

  const toggleOverlay = () => {
    setHasError(!hasError);
  };

  function submitHandler() {
    const userInfo = {
      name,
      email,
      password,
      confirmPassword,
    };
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("Please Fill all the inputs!");
      return setHasError(!hasError);
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return setHasError(!hasError);
    } else if (!emailRegex.test(email)) {
      setErrorMessage("Please provide valid email");
      return setHasError(!hasError);
    } else {
      fetch("http://172.20.10.4:5000/signup", {
        mode: "cors",
        method: "Post",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.password,
          confirmPassword: userInfo.confirmPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setUserSigned(data.msg);
          if (data.errorMsg === "Email already exists") {
            setErrorMessage("Email already exists");
            setHasError(true);
          } else {
            setHasError(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(userInfo);

      console.log(userSigned);
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#3268a8" }}>
      {hasError && (
        <Overlay isVisible={hasError} onBackdropPress={toggleOverlay}>
          <View style={{ width: 250 }}>
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
        <Text style={{ color: "white", fontSize: 23 }}>Hello New User</Text>
        <XCircleIcon
          onPress={() => navigation.goBack()}
          size={40}
          color="#00CCBB"
        />
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            {userSigned ? (
              <Card containerStyle={{ padding: 20 }}>
                <Text style={{ marginBottom: 20 }}>{userSigned}</Text>
                <Button
                  onPress={() => navigation.navigate("Login")}
                  title="Login"
                />
              </Card>
            ) : (
              <Card containerStyle={{ marginTop: 15, borderRadius: 5 }}>
                <Card.Title>Register</Card.Title>
                <Card.Divider />
                <Text style={styles.fonts}>Name</Text>
                <Input onChangeText={(value) => setName(value)} />
                <Text style={styles.fonts}>Email</Text>
                <Input onChangeText={(value) => setEmail(value)} />

                <Text style={styles.fonts}>Password</Text>
                <Input
                  onChangeText={(value) => setPassword(value)}
                  secureTextEntry={true}
                />

                <Text style={styles.fonts}>Confirm Password</Text>
                <Input
                  onChangeText={(value) => setConfirmPassword(value)}
                  secureTextEntry={true}
                />

                {/* <Text style={styles.fonts}>Normal Text</Text> */}
                <Button onPress={submitHandler} title="Submit" />
                <View
                  style={{
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                    style={{ padding: 5 }}
                  >
                    <Text style={{ color: "#7ea5f2", fontSize: 15 }}>
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
              </Card>
            )}
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
