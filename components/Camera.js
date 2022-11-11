import React, { Component, useState, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import { ToastAndroid, Text } from "react-native";
import { View, StyleSheet } from "react-native";
import * as MediaLibrary from "expo-media-library";
import CircleButton from "./CircleButton";

const Cam = (props) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    // (async () => {
    //   // let { status } = await Camera.requestCameraPermissionsAsync();
    //   requestPermission(await Camera.requestCameraPermissionsAsync());
    //   if (permission === false) {
    //     console.log("ODMOWIONO");
    //   } else {
    //     console.log("Przyznano");
    //   }

    //   console.log(permission);
    // })();
    props.route.params.refresh();
    permisionFunction();
  }, []);

  const permisionFunction = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    console.log(cameraPermission.status);
    requestPermission(cameraPermission.status === "granted");
  };

  function toggleCameraType() {
    console.log(CameraType);
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePicture = async () => {
    console.log(permission);
    if (camera) {
      let foto = await camera.takePictureAsync();
      let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyślnie zapisuje w folderze DCIM
      alert(JSON.stringify(asset, null, 4));
      await props.route.params.refresh();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      {permission == true ? (
        <View>
          <Text>Odmowiono</Text>
        </View>
      ) : (
        <Camera
          ref={(ref) => {
            setCamera(ref); // Uwaga: referencja do kamery używana później
          }}
          style={{ flex: 1 }}
          type={type}
        >
          <View style={styles.buttons}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                margin: 50,
              }}
            >
              <CircleButton
                function={() => toggleCameraType()}
                text="change camera"
                width={80}
                imgUrl={require("./img/arrowback.png")}
              ></CircleButton>
              <CircleButton
                function={async () => {
                  console.log(props.route.params);
                  await takePicture();
                  await props.route.params.refresh();
                }}
                text="take photo"
                imgUrl={require("./img/takePhoto.png")}
              ></CircleButton>
              <CircleButton text="none" width={80}></CircleButton>
            </View>
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    borderRadius: 15,
    fontSize: 48,
  },
  text: {
    backgroundColor: "green",
    borderRadius: 15,
    fontSize: 48,
  },
  buttons: {
    flex: 2,
    alignItems: "center",
    alignContent: "center",
    display: "flex",
    justifyContent: "flex-end",
  },
});

export default Cam;
