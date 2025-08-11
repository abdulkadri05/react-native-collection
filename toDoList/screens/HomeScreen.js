import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to my To-Do List App</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d2350',
    alignItems: 'center',
    justifyContent: 'top',
    paddingTop: 80,
  },
  text: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
});
