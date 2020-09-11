import React, { useContext, useEffect, useState, useRef  } from "react";
import fire from "../firebase/config";
import * as Notifications from 'expo-notifications';
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
import { FontAwesome5 } from "@expo/vector-icons";
import { ScreenContext } from "../context/screenContext";

export default function DialogScreen() {
  const scrollViewRef = useRef();
  const [scr, setScr] = useState();
  const { screenName, changeScreen } = useContext(ScreenContext);
  const [msg, setMsg] = useState([]);
  const [newMsg, setNewMsg] = useState();
  const [user, setUser] = useState();
  const [msgInfo, setMsgInfo] = useState(null);
 
  useEffect(() => {
   
    fire
      .database()
      .ref(`/${screenName.link}/name`)
      .once("value")
      .then((res) => {setUser(res.val())
        
      
      });
    fire
      .database()
      .ref(
        `/${fire.auth().currentUser.uid}/dialogs/${screenName.link}/messages`
      )
      .on("value", (snapshot) => {
       
        setMsg(Object.entries(snapshot.val()));
        
      });

    return () => {};
  }, []);
  const handleChange = (e) => {
    setNewMsg(e.nativeEvent.text);
  };
  let scrollToEnd = () => {
    
  }
  const sendMsg = () => {
    let time = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate(),
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    };

    fire
      .database()
      .ref(`/${fire.auth().currentUser.uid}/dialogs/${screenName.link}`)
      .child("messages")
      .push({ msg: newMsg, type: "send", time, reade: false }).then(
        ()=>{
          fire
          .database()
          .ref(`/${fire.auth().currentUser.uid}/dialogs/${screenName.link}/messages`).once("value").then((res)=>{
           let msgs=Object.keys(res.val())
           let sendedBy=msgs[msgs.length-1]
           fire
           .database()
           .ref(`/${screenName.link}/dialogs/${fire.auth().currentUser.uid}`)
           .child("messages")
           .push({ msg: newMsg, type: "received", time, reade: false,sendedAddress:sendedBy })
          })
          
        }
      )
    
    fire
      .database()
      .ref(
        `/${fire.auth().currentUser.uid}/dialogs/${screenName.link}/lastMessage`
      )
      .set({ msg: newMsg, type: "send", time, reade: false });
    fire
      .database()
      .ref(
        `/${screenName.link}/dialogs/${fire.auth().currentUser.uid}/lastMessage`
      )
      .set({ msg: newMsg, type: "received", time, reade: false });
  };
  
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 50,
          alignItems: "center",
          borderBottomColor: "grey",
          borderBottomStyle: "solid",
          borderBottomWidth: 1,
          paddingBottom: 30,
          paddingHorizontal: 15,
        }}
      >
        <TouchableOpacity onPress={() => changeScreen("dialogs")}>
          <FontAwesome5 name="arrow-left" size={24} color="red" />
        </TouchableOpacity>

        <Text style={{ fontSize: 20, fontWeight: "bold", color: "grey" }}>
          {user}
        </Text>
        <TouchableOpacity onPress={scrollToEnd}>

        <AntDesign name="infocirlceo" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <ScrollView ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}> 
        <View style={{ flex: 1, justifyContent: "flex-start" }}>
          {msg.map((item, i) => {
            if (item[1].type === "send") {
              return (
                <TouchableOpacity
                  style={{ justifyContent: "center", alignItems: "flex-end" }}
                  key={i}
                  onLongPress={() => setMsgInfo(i)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {msgInfo === i ? (
                      <Text style={{ marginRight: 10 }}>
                        {item[1].time.hours + 3 + " : " + item[1].time.minutes}
                      </Text>
                    ) : null}
                 
                    <Text
                      style={{
                        backgroundColor: "grey",
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        marginTop: 20,
                        marginRight: 10,
                        borderRadius: 14,
                        borderBottomRightRadius: 0,
                        maxWidth: "45%",
                        fontSize: 15,
                        
                      }}
                    >
                      {item[1].msg}
                    </Text>
                    <View>

                    {item[1].reade && msg.length-1==i ? <Text>ok</Text>:null}
                    </View>
                    
                    </View>
                 
                </TouchableOpacity>
              );
            }
            if (item[1].type === "received" &&  !item[1].received){
              fire
              .database()
              .ref(`/${fire.auth().currentUser.uid}/dialogs/${screenName.link}/messages/${item[0]}/reade`)
               .set(true).then(()=>{
                fire
                .database()
                .ref(`/${screenName.link}/dialogs/${fire.auth().currentUser.uid}/messages/${item[1].sendedAddress}/reade`)
                 .set(true)
               }).catch(e=>console.log(e))
               
               fire
              .database()
              .ref(`/${screenName.link}/dialogs/${fire.auth().currentUser.uid}/lastMessage/reade`)
               .set(true);
               fire
               .database()
               .ref(`/${fire.auth().currentUser.uid}/dialogs/${screenName.link}/lastMessage/reade`)
               .set(true)
            }
           
            return (
              <TouchableOpacity
                  style={{ justifyContent: "center",alignItems: "flex-start" }}
                  key={i}
                  onLongPress={() => setMsgInfo(i)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    
                <Text
                  style={{
                    backgroundColor: "red",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    marginTop: 20,
                    marginLeft: 10,
                    borderRadius: 14,
                    borderBottomLeftRadius: 0,
                    maxWidth: "45%",
                    fontSize: 15,
                  }}
                >
                  {item[1].msg}
                </Text>
                {msgInfo === i ? (
                      <Text style={{ marginLeft: 10 }}>
                        {item[1].time.hours + 3 + " : " + item[1].time.minutes}
                      </Text>
                    ) : null}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={{
            height: 60,
            width: "85%",
            borderColor: "grey",
            borderStyle: "solid",
            borderWidth: 1,
          }}
          onChange={handleChange}
        />
        <TouchableOpacity
          style={{ height: 60, width: "15%" }}
          onPress={sendMsg}
        >
          <View
            style={{
              height: 60,
              backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="send" size={30} color="white" />
          </View>
        </TouchableOpacity>
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
