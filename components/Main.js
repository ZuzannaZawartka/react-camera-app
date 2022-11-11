import React, { useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import * as Font from "expo-font";

const Main = (props) => {
  const [fontloaded, setFont] = useState(false);

  const componentDidMount = async () => {
    await Font.loadAsync({
      myfont: require("./fonts/PoorStory-Regular.ttf"), // Uwaga: proszę w nazwie fonta nie używać dużych liter
      myfont2: require("./fonts/Montserrat-VariableFont_wght.ttf"), // Uwaga: proszę w nazwie fonta nie używać dużych liter
      myfont3: require("./fonts/Anton-Regular.ttf"), // Uwaga: proszę w nazwie fonta nie używać dużych liter
    });
    setFont(true);
  };

  componentDidMount();

  return (
    <View style={styles.view1}>
      {fontloaded == false ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.view2}>
          <Text
            onPress={() => props.navigation.navigate("List")}
            style={styles.text}
          >
            Camera App
          </Text>

          <Text style={styles.text2}>
            Show gallery pictures take picture from camera save photo to device
            delete photo from device share photo
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "myfont3",
    fontSize: 80,
    textAlign: "center",
  },
  text2: {
    fontFamily: "myfont2",
    fontSize: 25,
    textAlign: "center",
    padding: 5,
    color: "white",
  },
  view1: {
    flex: 1,
    justifyContent: "center",
  },
  view2: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#C093C3",
  },
});

export default Main;
