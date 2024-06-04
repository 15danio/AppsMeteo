import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TananariveScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informations sur Tananarive</Text>
      <Text style={styles.infoText}>
        Température : 20°C
        {"\n"}
        Pression : 1013 Pa
        {"\n"}
        Vitesse du vent : 10 km/h
        {"\n"}
        {/* Ajoutez d'autres informations pertinentes */}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    lineHeight: 24,
  },
});

export default TananariveScreen;
