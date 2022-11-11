import React from "react";

import { Text, StyleSheet, TouchableOpacity } from "react-native";

const ButtonNew = (props) => {
  let width = props.width ? props.width : 100;

  const styles = StyleSheet.create({
    touchableOpacity: {
      backgroundColor: "#b5b5b5",
      borderRadius: 15,
      fontSize: 48,
      width: width,
      margin: 5,
    },
    textStyle: { textAlign: "center", color: "white", padding: 10 },
  });

  return (
    <TouchableOpacity style={styles.touchableOpacity} onPress={props.function}>
      <Text style={styles.textStyle}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonNew;
