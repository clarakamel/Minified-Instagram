/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {ReactNativeFirebase} from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
export default function Login() {

//initializing states for email and password
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const emailInput = (email) => {
    setEmail(email);
  };
  const passInput = (pass) => {
    setPass(pass);
  };

  //sign in method
  const signIn = () => {
    auth()
      .signInWithEmailAndPassword(email, pass)

      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputFields}
        placeholder="E-mail"
        onChangeText={emailInput}
      />
      <TextInput
        style={styles.inputFields}
        placeholder="Password"
        onChangeText={passInput}
      />
      <View style={styles.loginButton}>
        <Button title="Login" color="#841584" onPress={() => signIn()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loginButton: {
    width: 100,
    // marginTop: 200,
    alignSelf: 'center',
  },
  inputFields: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    width: 250,
    borderStyle: 'dashed',
    alignSelf: 'center',
  },
});
