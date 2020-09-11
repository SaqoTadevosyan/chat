import React, { useContext, useState, useEffect } from "react";
import fire from "../firebase/config";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { ScreenContext } from "../context/screenContext";
function SigninScreen() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { screenName, changeScreen } = useContext(ScreenContext);
  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user != null) {
        changeScreen("dialogs");
        registerForPushNotification();
      }
    });
    return () => {};
  }, []);

  const registerForPushNotification = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    fire
      .database()
      .ref(`/${fire.auth().currentUser.uid}`)
      .update({ expoToken: token });
  };

  const SignInUser = () => {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        fire
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            fire
              .database()
              .ref(`/${fire.auth().currentUser.uid}`)
              .set({ dialogs: "dialog", name: "poxos" })
              .then(() => {
                changeScreen("dialogs");
                registerForPushNotification();
              });
          });
      });
  };
  const handleChange = (e, type) => {
    if (type === "email") {
      setEmail(e.nativeEvent.text);
      return;
    }
    setPassword(e.nativeEvent.text);
  };
  const logIn = () => {
    fire.auth().signInWithEmailAndPassword(email, password);
  };
  return (
    <View style={styles.container}>
      <View style={styles.firstBlock}>
        <Text style={styles.firstBlockLogo}>HeyU</Text>
        <Text style={styles.firstBlockAbout}>Free chat app template.</Text>
      </View>
      <View style={styles.secondBlock}>
        <TextInput
          style={styles.formInputs}
          placeholder="email"
          onChange={(e) => handleChange(e, "email")}
        />
        <TextInput
          style={styles.formInputs}
          placeholder="password"
          textContentType="password"
          onChange={(e) => handleChange(e, "password")}
        />
      </View>
      <View style={styles.thirdBlock}>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => {
            logIn();
          }}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={{ color: "white", fontSize: 18, marginTop: 10 }}>
          Already have an account? Sign in
        </Text>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => {
            SignInUser();
          }}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
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
export default SigninScreen;
