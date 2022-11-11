import React, { Component, useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import { ToastAndroid } from "react-native";
import { Dimensions } from "react-native";
import {
  View,
  FlatList,
  Switch,
  ActivityIndicator,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ButtonNew from "./MyButton";
import ListItem from "./ListItem";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

const List = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [numColumns, setNumColumn] = useState(5);
  let array = [];

  useEffect(() => {
    componentDidMount();
  }, []);

  const componentDidMount = async () => {
    setLoading(true);
    let { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("brak uprawnień do czytania image-ów z galerii");
    }

    let obj = await MediaLibrary.getAssetsAsync({
      first: 100, // ilość pobranych assetów
      mediaType: "photo", // typ pobieranych danych, photo jest domyślne
    });
    setData(obj.assets);
    setLoading(false);
  };

  const refreshPhotos = async () => {
    console.log("REFRESH PHOTOSÓW");
    setLoading(true);
    let obj = await MediaLibrary.getAssetsAsync({
      first: 100, // ilość pobranych assetów
      mediaType: "photo", // typ pobieranych danych, photo jest domyślne
    });
    setData(obj.assets);
    setLoading(false);
  };

  const goToDetails = (args) => {
    props.navigation.navigate("Details", {
      data: args,
      refresh: refreshPhotos,
    });
  };

  const removeItems = async () => {
    for (let i = 0; i < array.length; i++) {
      console.log(array[i].toString());

      await MediaLibrary.deleteAssetsAsync(array[i].toString());
    }
    console.log(array);

    await refreshPhotos();
  };

  const setSelected = (id) => {
    if (!array.find((element) => element == id)) {
      array.push(id.toString());
    } else {
      array = array.filter((e) => e != id);
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <ButtonNew
          function={() => {
            if (numColumns == 5) setNumColumn(1);
            else setNumColumn(5);
          }}
          text={"LAYOUT"}
          width={100}
        ></ButtonNew>
        <ButtonNew
          function={() => {
            console.log("cos");
            props.navigation.navigate("Camera", {
              refresh: refreshPhotos,
            });
          }}
          text={"CAMERA"}
          width={100}
        ></ButtonNew>
        <ButtonNew
          function={() => removeItems()}
          text={"DELETE"}
          width={100}
        ></ButtonNew>
      </View>

      <View style={styles.style1}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            key={numColumns}
            data={data}
            numColumns={numColumns}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <ListItem
                key={item.id}
                id={item.id}
                data={item}
                numColumns={numColumns}
                function={goToDetails}
                set={setSelected}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    borderRadius: 15,
    fontSize: 48,
  },
  style1: {
    display: "flex",

    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});

export default List;
