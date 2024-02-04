import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function CarbonFootprintScreen() {
  return (
    <View style={styles.container}>
      <Text>Carbon Footprint Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CarbonFootprintScreen;