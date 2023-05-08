import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  function barStyle() {
    if (Platform.OS === "android") {
      return (barStyle = "light-content");
    } else {
      return (barStyle = "dark-content");
    }
  }
  return (
    <SafeAreaView style={styles.outer_div}>
      <StatusBar barStyle={barStyle()} />
      <View style={styles.h1_con}>
        <Text style={styles.h1}>Welcome to Interview Helper by Ai</Text>
      </View>

      <View style={styles.btn_view}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.btn}
        >
          <Text style={styles.txt}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={styles.btn_1}
        >
          <Text style={styles.txt}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outer_div: {
    flex: 1,
    backgroundColor: "#3268a8",
  },
  h1_con: {
    maxWidth: "90%",
    marginLeft: 20,
    marginTop: "20%",
  },
  h1: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
  btn_view: {
    flex: 1,
    justifyContent: "center",
  },
  btn: {
    alignItems: "center",
    borderWidth: 0,
    borderRadius: 12,
    padding: 18,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "#a9c4ab",
  },
  btn_1: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    padding: 18,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "#3268a8",
  },
  txt: {
    fontWeight: "bold",
    color: "white",
    letterSpacing: 2,
    fontSize: 15,
  },
});
