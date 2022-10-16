import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// screens
import Home from './screens/Home';
import Settings from './screens/Settings';
import AddPlace from './screens/AddPlace';
import DetailPlace from './screens/DetailPlace';

// database
import { init } from './util/database'

const { Screen, Navigator } = createBottomTabNavigator()
const App = () => {


  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="auto" />
      <NavigationContainer>
        <Navigator screenOptions={screenOptions}>
          <Screen name="Home" component={Home} options={homeOptions} />
          <Screen name="Add Place" component={AddPlace} options={addPlaceOptions} />
          <Screen name="Settings" component={Settings} options={settingsOptions}/>
          <Screen name="DetailPlace" component={DetailPlace} options={detailPlaceOptions}/>
        </Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const homeOptions = {
  tabBarIcon: ({ size, color }) => (
    <Ionicons name="home" size={size} color={color} />
  )
}

const addPlaceOptions = {
  tabBarIcon: ({ size, color }) => (
    <Ionicons name="add-circle" size={size} color={color} />
  )
}

const settingsOptions = {
  tabBarIcon: ({ size, color }) => (
    <Ionicons name="information" size={size} color={color} />
  )
}

const detailPlaceOptions = {
  tabBarButton: () => null
}

const screenOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarActiveTintColor: '#000',
  tabBarStyle: {
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 25,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight,
    margin: 20,
  },
});

export default App;
