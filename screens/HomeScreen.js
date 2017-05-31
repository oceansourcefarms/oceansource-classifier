import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { 
  ImagePicker,
  Location,
  Permissions,
} from 'expo';
import Clarifai from 'clarifai'

import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';

// instantiate a new Clarifai app passing in your clientId and clientSecret
const app = new Clarifai.App(
  'VRiqt1gEy3NgDK6qasyJFyF-5SKClISjjZxqi7n_',
  'ymbLtLKCHSzUtwQNZ90yrPklkLfU6PaqeUjbGA0_'
);
//console.log('screens', 'HomeScreen', 'app', app)

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

  state = {
    image: null,
    tagText: <Text>Preview</Text>,
    location: null,
  }

  _showCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [1, 1],
      noData: false,
    })

    console.log('HomeScreen', '_showCamera', 'result.uri', result.uri)
    //console.log('HomeScreen', '_showCamera', 'result.data', result.data)

    if (!result.cancelled) {
      this.setState({ image: result.uri })
      let str = result.uri.replace('file://', '')

      app.models.predict(Clarifai.GENERAL_MODEL, { base64: result.data }).then(
        (res) => {
          // res, res.outputs[0], res.outputs[0].model, res.outputs[0].input
          console.log('Clarifai response', 'res.outputs[0].data.concepts', res.outputs[0].data.concepts);

          let list = res.outputs[0].data.concepts.map((obj) =>
            <Text key={ obj.name }>{ obj.name }</Text>
          )
          this.setState({ tagText: list });

          this._getLocationAsync()
        },
        (error)=>{
          console.error(error);  
        }
      );
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    console.log('HomeScreen', '_getLocationAsync', 'location', location)

    this.setState({ location });
  }

  render() {
    let { image, tagText } = this.state

    return (
      <View style={ styles.container }>
        { Platform.OS === 'ios' && 
          <StatusBar hidden={ true } /> 
        }

        <ScrollView
          style={ styles.container }
          contentContainerStyle={ styles.contentContainer }>

          <View style={styles.welcomeContainer}>
            <Button onPress={ this._showCamera }>
              Open camera
            </Button>
          </View>

          <View style={ styles.welcomeContainer }>
            { image && 
              <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
            }
            { tagText }
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
