import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ImagePicker } from 'expo';
//import Clarifai from 'clarifai'

import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';

// instantiate a new Clarifai app passing in your clientId and clientSecret
/*
const app = new Clarifai.App(
  'VRiqt1gEy3NgDK6qasyJFyF-5SKClISjjZxqi7n_',
  'ymbLtLKCHSzUtwQNZ90yrPklkLfU6PaqeUjbGA0_'
);
console.log('screens', 'HomeScreen', 'app', app)
*/

function Button(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}> 
      <Text style={styles.buttonText}>{props.children}</Text>
    </TouchableOpacity>
  );
}

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }

  showCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({})
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

          <View style={styles.welcomeContainer}>
            <Button onPress={this.showCamera}>
              Open camera
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 80,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 3,
    backgroundColor: Colors.tintColor,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
  },
});
