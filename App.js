import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./components/Main";
import List from "./components/List";
import Cam from "./components/Camera";
import Details from "./components/Details";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
            title: "title",
            headerStyle: {
              backgroundColor: "#ff0000",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          options={{ title: "Zdjęcia z folderu DCIM" }}
          name="List"
          component={List}
        />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Camera" component={Cam} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
