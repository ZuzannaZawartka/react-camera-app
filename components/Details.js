import React, { Component, useState } from "react";
import * as Sharing from "expo-sharing";
import { Dimensions } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { View, Image, Share, StyleSheet } from "react-native";
import ButtonNew from "./MyButton";

const Details = (props) => {
  const share = async () => {
    try {
      console.log(props.route.params.data.uri);

      // const result = await Sharing.shareAsync(props.route.params.data.uri);
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
        url: "file://" + props.route.params.data.uri.slice(5),
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteImage = async () => {
    await MediaLibrary.deleteAssetsAsync([props.route.params.data.id]);
    props.route.params.refresh();
    props.navigation.navigate("List");
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 2,
          backgroundColor: props.color,
          marginLeft: Dimensions.get("window").width / 100,
          marginRight: Dimensions.get("window").width / 100,
        }}
      >
        <Image
          source={{
            uri: props.route.params.data.uri,
          }}
          resizeMode={"contain"}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-around",
          flex: 1,
          flexDirection: "row",
        }}
      >
        <ButtonNew
          text={"SHARE"}
          function={async () => {
            share();
          }}
        ></ButtonNew>
        <ButtonNew
          function={async () => {
            await deleteImage();
          }}
          text={"DELETE"}
        ></ButtonNew>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: 48 },
});

export default Details;
