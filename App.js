import { StatusBar } from "expo-status-bar";
import HomeScreen from "./Screens/HomeScreen";
import Register from "./Screens/Register";
import UserScreen from "./Screens/UserScreen";
import LoginScreen from "./Screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false, presentation: "modal" }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Register"
          options={{ headerShown: false, presentation: "fullScreenModal" }}
          component={Register}
        />
        <Stack.Screen
          name="User"
          options={{ headerShown: false, presentation: "fullScreenModal" }}
          component={UserScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
