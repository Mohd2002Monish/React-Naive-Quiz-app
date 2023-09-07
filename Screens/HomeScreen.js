import { Pressable, Text, View, Button } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";

const HomeScreen = () => {
  const [data, setData] = useState(null);
  const FetchData = () => {
    axios
      .get("http://localhost:8080")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    FetchData();
  }, []);

  const navigation = useNavigation();

  return (
    <View>
      <Text style={{ fontSize: 20, textAlign: "center", marginTop: 20 }}>
        Quiz
      </Text>
      <Pressable
        onPress={() => navigation.navigate("Quiz")}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Text style={{ fontSize: 20, textAlign: "center", marginTop: 20 }}>
          Start Quiz
        </Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
