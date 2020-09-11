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
import Search from "./screens/Search";

export default function Layout() {
  const {screenName,changeScreen}=useContext(ScreenContext)


  return (
<View style={{flex:1}}>

    {screenName==="login" ? <SigninScreen/>:screenName==="dialogs" ? <AllDialogScreen/>:screenName==="search" ? <Search/>: screenName.id ? <DialogScreen name={screenName.id}/>:null}
</View>
    
    
    
  );
}