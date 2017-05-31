import React from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { MapView } from 'expo';

import Layout from '../constants/Layout';

const REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default class MapsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Maps',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      isGoogleMap: false,
    };
  }

  render() {
    let providerProps = this.state.isGoogleMap ? { provider: 'google' } : {};
    return (
      <ScrollView style={StyleSheet.absoluteFill}>
        <MapView
          ref={ref => {
            this._mapView = ref;
          }}
          style={{ width: Layout.window.width, height: 300 }}
          initialRegion={REGION}
          {...providerProps}
        />
        {this._renderGoogleMapsSwitch()}
        {this._renderJumpToCoordButton()}
      </ScrollView>
    );
  }

  _renderGoogleMapsSwitch = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Switch
          style={{ margin: 10, flex: 1 }}
          onValueChange={isGoogleMap => {
            this.setState({ isGoogleMap });
          }}
          value={this.state.isGoogleMap}
        />
        <Text style={{ margin: 10, flex: 5 }}>
          Use Google maps
        </Text>
      </View>
    );
  };

  _renderJumpToCoordButton = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Button
          onPress={this._animateToRandomCoord}
          title="Animate to Random Coord"
        />
      </View>
    );
  };

  _animateToRandomCoord = () => {
    if (this._mapView) {
      this._mapView.animateToCoordinate({
        latitude: REGION.latitude +
          (Math.random() - 0.5) * (REGION.latitudeDelta / 2),
        longitude: REGION.longitude +
          (Math.random() - 0.5) * (REGION.longitudeDelta / 2),
      });
    }
  };
}
