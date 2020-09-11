import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import AllDialogScreen from "./screens/AllDialogScreen";
import DialogScreen from "./screens/DialogScreen";
import SigninScreen from "./screens/SigninScreen";
import {ScreenState} from "./context/ScreenState"
import {ScreenContext} from "./context/screenContext"
import Layout from "./Layout"

export default function App() {
 
  
  return (
    <ScreenState>
<Layout/>
</ScreenState>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "space-around",
  },
  firstBlock: {
    flex: 1,
    justifyContent: "center",
  },
  firstBlockLogo: {
    color: "white",
    fontSize: 100,
    alignItems: "center",
  },
  firstBlockAbout: {
    color: "white",
    fontSize: 20,
  },
  formInputs: {
    width: 300,
    height: 50,
    borderRadius: 30,
    paddingLeft: 30,
    backgroundColor: "#9e1a28",
    textDecorationLine: "none",
    color: "white",
  },
  secondBlock: {
    flex: 1,

    justifyContent: "space-around",
  },
  thirdBlock: {
    flex: 1,
  },
  signInButton: {
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 30,
    height: 50,
    backgroundColor: "white",
    width: 300,
  },
  buttonText: {
    fontSize: 25,
    color: "#dc1950",
  },
});
