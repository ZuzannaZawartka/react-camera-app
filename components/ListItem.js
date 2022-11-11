import React, { Component, useState } from "react";
import { Dimensions } from "react-native";

import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

const ListItem = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);

  let margin = 5;
  let left = 1;
  let top = 2;
  let width = Dimensions.get("window").width / props.numColumns - 2 * margin;
  let widthSecondImage =
    (Dimensions.get("window").width / props.numColumns - 2 * margin) / 1.2;
  let height = width;

  if (props.numColumns != 5) {
    height =
      Dimensions.get("window").width / (props.numColumns + 1) - 2 * margin;
    widthSecondImage =
      (Dimensions.get("window").width / (props.numColumns + 1) - 2 * margin) /
      2;
    left = 35;
    top = 25;
  }

  const long_press = () => {
    setIsEnabled(true);
    props.set(props.data.id);
  };

  const press = () => {
    if (isEnabled == true) {
      setIsEnabled(false);
      props.set(props.data.id);
    } else props.function(props.data);
  };

  const styles = StyleSheet.create({
    text: {
      position: "absolute",
      top: "70%",
      left: "10%",
      color: "white",
      fontSize: 7,
    },
    firstImage: {
      height: height,
      width: width,
      margin: margin,
      borderRadius: 10,
    },
    secondImage: {
      height: widthSecondImage,
      width: widthSecondImage,
      margin: margin,
      borderRadius: 10,
      position: "absolute",
      left: left + "%",
      top: top + "%",
    },
    secondView: {
      height: height,
      width: width,
      margin: margin,
      borderRadius: 10,
      position: "absolute",
      backgroundColor: "rgba(72, 70, 70, 0.8)",
    },
  });

  return (
    <View>
      <TouchableOpacity
        onLongPress={() => long_press()}
        onPress={() => press()}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={{
              uri: props.data.uri,
            }}
            style={styles.firstImage}
          />

          {isEnabled ? (
            <View style={styles.secondView}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/16/16057.png",
                }}
                style={styles.secondImage}
              />
            </View>
          ) : (
            <View></View>
          )}
        </View>
        <Text style={styles.text}>{props.data.creationTime}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;
