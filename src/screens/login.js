/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import configureStore from '../redux/configureStore';

const Login = (props) => {
  //initializing states for email and password
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const emailInput = (email) => {
    setEmail(email);
  };
  const passInput = (pass) => {
    setPass(pass);
  };
  const store = configureStore();

  //sign in method
  const signIn = () => {
    auth()
      .signInWithEmailAndPassword(email, pass)

      .then(() => {
        console.log('User signed in!');

        store.dispatch({
          type: 'LOGIN_USER',
          email,
          pass,
        });

        store.subscribe(
          () => console.log('state updated'),
          console.log(store.getState()),
        );
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }

        if (error.code === 'auth/user-not-found') {
          Alert.alert('Invalid e-mail address');
        }
      });
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/logo-instagram-png-13554.png')}
        />
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
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loginButton: {
    width: 100,
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
  image: {
    width: 100,
    height: 100,
    marginLeft: 140,
    marginBottom: 50,
  },
});

const mapStateToProps = (state) => ({
  email: state.email,
  pass: state.pass,
});

export default connect(mapStateToProps)(Login);
