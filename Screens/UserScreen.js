import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {
  View,
  //   Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  // TextInput,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, Button, Overlay, Icon, Input } from "@rneui/themed";
import { ArrowRightIcon, UserCircleIcon } from "react-native-heroicons/solid";

export default function UserScreen() {
  const navigation = useNavigation();
  const {
    params: { user },
  } = useRoute();
  const [aiData, setAiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  function submitPrompt() {
    fetch("http://172.20.10.4:5000/prompt", {
      mode: "cors",
      method: "Post",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
      }),
    })
      .then((response) => response.json())
      .then(setIsLoading(true))
      .then((data) => {
        const lines = data.message
          .trim()
          .split("\n")
          .filter((line) => line.length > 0);
        setAiData(lines);
        setIsLoading(false);
        toggleOverlay();
        // check if data is received correctly
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <UserCircleIcon size={20} color="#00CCBB" />
          <Text style={{ marginLeft: 10 }}>{user ? user?.name : "User"}</Text>
        </View>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 12,
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={{ marginRight: 5 }}>Logout</Text>
          <ArrowRightIcon size={20} color="#00CCBB" />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flex: 1 }} bounces={false}>
          <Button
            title="Give Prompt to AI"
            onPress={toggleOverlay}
            buttonStyle={styles.button}
          />

          <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <View style={{ width: 300 }}>
              <Input
                onChangeText={(text) => setPrompt(text)}
                placeholder="6 lines interview questions on javascript"
                style={styles.textSecondary}
              />
              <Button
                buttonStyle={styles.submit}
                icon={
                  <Icon
                    type="font-awesome"
                    color="white"
                    size={25}
                    iconStyle={{ marginRight: 10 }}
                  />
                }
                title={
                  isLoading ? "Ai is calibrating your request..." : "Submit"
                }
                onPress={submitPrompt}
              />
            </View>
          </Overlay>
          <View
            style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
          >
            <View style={{ marginTop: 20 }}>
              <Text>Your Response Here</Text>
            </View>
            <ScrollView style={{ flexGrow: 1 }}>
              {aiData &&
                aiData?.map((el) => (
                  <View
                    style={{ padding: 10, marginVertical: 1, marginTop: 20 }}
                  >
                    <Text
                      style={{
                        marginBottom: 10,
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                      key={el}
                    >
                      {el}
                    </Text>
                  </View>
                ))}
            </ScrollView>
            <View>
              <Text></Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
  textSecondary: {
    marginBottom: 10,
    // textAlign: "center",
    // borderWidth: 0.3,
    borderRadius: 5,
    padding: 20,
    fontSize: 12,
  },
  submit: {
    marginHorizontal: 30,
    padding: 5,
    borderRadius: 5,
  },
});
