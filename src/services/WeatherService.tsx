import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';

type RootStackParamList = {
  Home: undefined;
  Weather: { city: string };
};

type WeatherScreenRouteProp = RouteProp<RootStackParamList, 'Weather'>;
type WeatherScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Weather'>;

type Props = {
  route: WeatherScreenRouteProp;
  navigation: WeatherScreenNavigationProp;
};

const API_KEY = '3e58c3e084012732a703666bcda6bde6';

const WeatherScreen: React.FC<Props> = ({ route }) => {
  const { city } = route.params;
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Aucune donnée disponible</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{city}</Text>
      <Text style={styles.text}>Température: {weatherData.main.temp}°C</Text>
      <Text style={styles.text}>Pression: {weatherData.main.pressure} Pa</Text>
      <Text style={styles.text}>Vitesse du vent: {weatherData.wind.speed} km/h</Text>
      <Text style={styles.text}>Coordonnées: [{weatherData.coord.lat}, {weatherData.coord.lon}]</Text>
      <Text style={styles.text}>Heure de lever du soleil: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</Text>
      <Text style={styles.text}>Heure de coucher du soleil: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: 'aqua',
    
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default WeatherScreen;
