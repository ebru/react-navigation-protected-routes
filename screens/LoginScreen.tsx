import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { signInUser } from '../redux/auth/actions';

const LoginScreen = ({ navigation }: RootStackScreenProps<'Login'>) => {
  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(signInUser())
    navigation.replace('Root')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <TouchableOpacity onPress={handleSignIn} style={styles.link}>
        <Text style={styles.linkText}>Log the user in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

export default LoginScreen;
