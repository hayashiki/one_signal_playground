import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal'; 
import { StyleSheet, Text, View } from 'react-native';
// import { ONESIGNAL_APP_ID } from 'react-native-dotenv';

export default class App extends Component {

  componentWillMount() {
      OneSignal.init(process.env.ONESIGNAL_APP_ID);    
      OneSignal.addEventListener('received', this.onReceived);
      OneSignal.addEventListener('opened', this.onOpened);
      OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
      OneSignal.removeEventListener('received', this.onReceived);
      OneSignal.removeEventListener('opened', this.onOpened);
      OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
      console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
  console.log('Device info: ', device);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>one signal app!</Text>
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
