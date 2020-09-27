/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import {Header} from 'react-native-elements';

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header
          centerComponent={{
            text: 'Profile',
            style: {color: '#fff'},
          }}
        />
      </View>
      <Text style={styles.nameContainer}>
        Name: {firebase.auth().currentUser.displayName}
      </Text>
      <Text style={styles.emailContainer}>
        E-mail: {firebase.auth().currentUser.email}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    color: 'blue',
    fontSize: 20,
    alignItems: 'center',
    position: 'absolute',
  },
  emailContainer: {
    color: 'blue',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 300,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    width: 500,
  },
});
