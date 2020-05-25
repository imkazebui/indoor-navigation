/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Beacons from "react-native-beacons-manager";

// Request for authorization while the app is open
Beacons.requestWhenInUseAuthorization();
// Beacons.requestAlwaysAuthorization();
// Define a region which can be identifier + uuid,
// identifier + uuid + major or identifier + uuid + major + minor
// (minor and major properties are numbers)
const region = {
  identifier: "Tan Binh",
  uuid: "B5B182C7-EAB1-4988-AA99-B5C1517008D9",
};
// Range for beacons inside the region
Beacons.startMonitoringForRegion(region);
Beacons.startRangingBeaconsInRegion(region);

Beacons.startUpdatingLocation();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      distance: -1,
      img: "",
      beacon: {
        minor: "",
      },
    };

    this.detectClosestBeacon = this.detectClosestBeacon.bind(this);
    this.getSuggetionFromServer = this.getSuggetionFromServer.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

  componentDidMount() {
    this.beaconsDidRange = Beacons.BeaconsEventEmitter.addListener(
      "beaconsDidRange",
      (data) => {
        const { beacons = [] } = data;

        this.detectClosestBeacon(beacons);
      }
    );
  }

  componentDidUpdate(preProps, preState) {
    const { beacon, distance } = this.state;

    if (distance !== -1) {
      if (beacon.minor != preState.beacon.minor) {
        this.getSuggetionFromServer(beacon);
      }
    }
  }

  componentWillUnMount() {
    this.beaconsDidRange = null;
  }

  detectClosestBeacon(beacons) {
    // the first element of array is the closest

    if (beacons[0]) {
      this.setState({
        distance: beacons[0].accuracy,
        beacon: beacons[0],
      });
    } else {
      this.setState({
        distance: -1,
      });
    }
  }

  sendRequest(beacon) {
    return new Promise((resolve) => {
      let image = require("./image-3.png");
      if (beacon.minor == 4) {
        image = require("./image-4.png");
      }

      return resolve(image);
    });
  }

  getSuggetionFromServer(beacon) {
    // send request and get response from server
    this.sendRequest(beacon).then((data) => {
      this.setState({
        img: data,
      });
    });
  }

  render() {
    const { distance, img } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.headline}>
          Distance: {distance != -1 ? distance : "out of range"}
        </Text>
        {distance != -1 && (
          <Image source={img} style={{ width: "100%", height: "100%" }} />
        )}
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
    backgroundColor: "#F5FCFF",
  },
  btleConnectionStatus: {
    fontSize: 20,
    paddingTop: 20,
  },
  headline: {
    fontSize: 20,
    paddingTop: 20,
  },
  row: {
    padding: 8,
    paddingBottom: 16,
  },
  smallText: {
    fontSize: 11,
  },
});
