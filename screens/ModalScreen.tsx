import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';

// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

const ModalScreen = ({ navigation }: RootStackScreenProps<'Modal'>) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="/screens/ModalScreen.tsx" /> */}

      <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.link}>
        <Text style={styles.linkText}>Logout</Text>
      </TouchableOpacity>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
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

export default ModalScreen;
