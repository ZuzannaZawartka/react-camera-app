import React, { Component, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const CircleButton = (props) => {
  let width = props.width ? props.width : 100;

  const styles = StyleSheet.create({
    styleTouchableO: {
      backgroundColor: "rgba(145, 28, 184,0.3)",
      textAlign: "center",
      justifyContent: "center",
      borderRadius: 15,
      fontSize: 48,
      width: width,
      height: width,
      margin: 5,
      borderRadius: 50,
    },
    imgStyle: {
      height: width,
      width: width,
    },
  });

  return (
    <TouchableOpacity style={styles.styleTouchableO} onPress={props.function}>
      <Image source={props.imgUrl} style={styles.imgStyle} />
    </TouchableOpacity>
  );
};

export default CircleButton;
