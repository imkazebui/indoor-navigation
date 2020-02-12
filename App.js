/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  DeviceEventEmitter
} from "react-native";
import Beacons from "react-native-beacons-manager";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

// Request for authorization while the app is open
Beacons.requestAlwaysAuthorization();
// Beacons.requestWhenInUseAuthorization();
// Define a region which can be identifier + uuid,
// identifier + uuid + major or identifier + uuid + major + minor
// (minor and major properties are numbers)
const region = {
  identifier: "GemTot for iOS",
  uuid: "6665542b-41a1-5e00-931c-6a82db9b78c1"
};
// Range for beacons inside the region
Beacons.startRangingBeaconsInRegion(region);
// Beacons.startUpdatingLocation();

export default class App extends Component {
  constructor(props) {
    super(props);
    // Create our dataSource which will be displayed in the ListView

    this.state = {
      bluetoothState: "",
      // region information
      identifier: "GemTot for iOS",
      uuid: "6665542b-41a1-5e00-931c-6a82db9b78c1",
      // React Native ListView datasource initialization
      dataSource: []
    };
  }

  // componentDidMount() {
  //   this.beaconsDidRange = DeviceEventEmitter.addListener(
  //     "beaconsDidRange",
  //     data => {
  //       this.setState({
  //         dataSource: data.beacons
  //       });
  //     }
  //   );
  // }

  // componentWillUnMount() {
  //   this.beaconsDidRange = null;
  // }

  render() {
    const { bluetoothState, dataSource } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.btleConnectionStatus}>
          Bluetooth connection status: {bluetoothState ? bluetoothState : "NA"}
        </Text>
        <Text style={styles.headline}>All beacons in the area</Text>
        {/* {dataSource.map(dt => this.renderRow(dt))} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  btleConnectionStatus: {
    fontSize: 20,
    paddingTop: 20
  },
  headline: {
    fontSize: 20,
    paddingTop: 20
  },
  row: {
    padding: 8,
    paddingBottom: 16
  },
  smallText: {
    fontSize: 11
  }
});
