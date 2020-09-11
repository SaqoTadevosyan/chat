import React, { useState, useEffect,useContext } from 'react'
import fire from "../firebase/config"
import { ScreenContext } from "../context/screenContext";

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
  } from "react-native";
function Search() {
    const [users, setUsers] = useState([]);
  const { screenName, changeScreen } = useContext(ScreenContext);
   
    useEffect(() => {
        fire.database().ref("/").once("value").then((snapshot)=>{
            let usersArray=Object.entries(snapshot.val())
            let deletingIndex=-1
            usersArray.map((elem,i)=>{
                deletingIndex=elem.indexOf(fire.auth().currentUser.uid)
                if(deletingIndex>=0){
                  usersArray.splice(i,1)
                }})
               
                setUsers(usersArray)
               
        })
        return () => {
            
        };
    }, []);
    return (
        <View style={{flex:1,justifyContent:"space-around"}}>
                {users.length>0 ? users.map((singleUser,k)=>{
                  return ( 
                      <TouchableOpacity style={{borderColor:"red",borderWidth:1,borderStyle:"solid"}} onPress={()=>changeScreen({ id: singleUser[1].name,link:singleUser[0] })}>

                  <Text style={{color:"black"}}>{singleUser[1].name}</Text>
                  </TouchableOpacity>

                  )
                }):null}
        </View>
    )
}

export default Search
