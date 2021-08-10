
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createSwitchNavigator,createAppContainer} from 'react-navigation'
import Login from './screens/Login';
import Landing from './screens/Landing';
import Register from './screens/Register';
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA2Q9_PRpqLQfqyyVzt1Ss6dfCoxGlAkwU",
    authDomain: "instagram-6ce8d.firebaseapp.com",
    projectId: "instagram-6ce8d",
    storageBucket: "instagram-6ce8d.appspot.com",
    messagingSenderId: "413581306942",
    appId: "1:413581306942:web:466cb543abf1fe1cefb56f"
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
  }

export default class App extends React.Component {
 render() {
    return <AppContainer />;
  }
}


const SwitchNavigator= createSwitchNavigator({
  Landing : Landing,
  Register:Register,
  Login : Login


})

const AppContainer = createAppContainer(SwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
