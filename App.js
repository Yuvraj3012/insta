import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { View, Text } from 'react-native'

import * as firebase from 'firebase'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))


const firebaseConfig = {
  apiKey: "AIzaSyAKFIwBIGgMBMh2c6io0GAkqE8-Ft2ri9w",
  authDomain: "instagram-b8004.firebaseapp.com",
  projectId: "instagram-b8004",
  storageBucket: "instagram-b8004.appspot.com",
  messagingSenderId: "747663622108",
  appId: "1:747663622108:web:a1962968f7c336c32c5919"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'
import CommentScreen from './components/main/Comment'


const Stack = createStackNavigator();


export class App extends Component {
  constructor(props) {
    super()
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer >
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Comment" component={CommentScreen} navigation={this.props.navigation}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App