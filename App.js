import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal'; 
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { ONESIGNAL_APP_ID } from 'react-native-dotenv'
import axios from 'axios';

export default class App extends Component {

  constructor (props) {
    super()
    this.state = {
      player_id: 'aa',
    }

    // OneSignal.setLogLevel(7, 0);
    OneSignal.init(ONESIGNAL_APP_ID)
    // , {
    //   kOSSettingsKeyAutoPrompt: true
    // });
    // OneSignal.setLocationShared(true);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.configure();
  }

  // componentWillMount() {
  //   OneSignal.init(ONESIGNAL_APP_ID)
  //   OneSignal.addEventListener('received', this.onReceived);
  //   OneSignal.addEventListener('opened', this.onOpened);
  // }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = notification => {
    console.log("Notification received: ", notification);
  }

  onOpened = openResult => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds = device => {
    this.setState({
      player_id: device.userId
    })
  }

  handleRegistDevice = () => {
    const { player_id } = this.state;
    axios.get('https://7c122e7c.ngrok.io?player_id=' + player_id)
  }

  render() {
    return (
      <View style={styles.container}>
        
        <TouchableHighlight
          
          onPress={this.handleRegistDevice}
        >
          <Text>one signal app!</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
