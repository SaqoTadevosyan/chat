import React, { useContext, useEffect, useState } from "react";
import fire from "../firebase/config";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { ScreenContext } from "../context/screenContext";

export default function AllDialogScreen() {
  const [users, setUsers] = useState([]);
  const { screenName, changeScreen } = useContext(ScreenContext);
 
  useEffect(() => {
    fire
      .database()
      .ref(`/${fire.auth().currentUser.uid}/dialogs`)
      .once("value")
      .then((res) => {
        let usersArr = [];
        let receivedUsers = Object.entries(res.val());
        receivedUsers.map((elem, i) => {
          fire
          .database()
          .ref(`/${elem[0]}/name`)
          .once("value")
          .then((res) => {
            fire
            .database()
            .ref(`/${fire.auth().currentUser.uid}/dialogs/${elem[0]}/lastMessage`)
          .once("value")
          .then((snapshot) => {
            usersArr.push([res.val(),elem[0],snapshot.val()]);
            if (receivedUsers.length - 1 == i) {
              setUsers(usersArr);
            }
          })
             
            });
        });
       
      });
    return () => {};
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 50,
          borderBottomColor: "grey",
          borderBottomStyle: "solid",
          borderBottomWidth: 1,
          paddingBottom: 30,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "grey" }}>
          Messages
        </Text>
        <TouchableOpacity onPress={() => fire.auth().signOut().then(changeScreen("login"))}>
          <Text style={{ fontSize: 20, color: "red" }}>search</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {users.map((user) => {
       
          return (
            <TouchableOpacity
              onPress={() => {
                changeScreen({ id: user[0],link:user[1],lastMsg:user[2] });
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{
                      uri:
                        "https://www.thestatesman.com/wp-content/uploads/2019/09/rashford.jpg",
                    }}
                    style={{
                      width: 62,
                      height: 62,
                      borderRadius: 50,
                      marginLeft: 15,
                    }}
                  />
                  <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "600" }}>
                      {user[0]}
                    </Text>
                    <Text style={{ color: !user[2].reade && user[2].type==="received" ? "red":"grey" }}>{user[2].msg}</Text>
                  </View>
                </View>

                <Text style={{ fontSize: 20, color: "grey" }}>{user[2].time.hours+3 + " : " + user[2].time.minutes}</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          borderTopColor: "grey",
          borderTopStyle: "solid",
          borderTopWidth: 1,
          height: 80,
        }}
      >
        <Text>
          <AntDesign name="message1" size={36} color="red" />
        </Text>
        <TouchableOpacity onPress={()=>{changeScreen("search"),console.log("adad")}}>
          <View>

        <Text>
        
          <MaterialIcons name="people-outline" size={36} color="grey" />
        </Text>
          </View>
        </TouchableOpacity>
    
        <Text>
          <AntDesign name="pluscircleo" size={64} color="grey" />
        </Text>
        <Text>
          <MaterialIcons name="format-list-bulleted" size={36} color="grey" />
        </Text>
        <Text>
          <MaterialIcons name="assignment-ind" size={36} color="grey" />
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "space-between",
  },
});
