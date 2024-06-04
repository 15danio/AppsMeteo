import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
  Home: undefined;
  Tananarive: undefined;
  Weather: { city: string };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const API_KEY = '3e58c3e084012732a703666bcda6bde6';

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [weatherTana, setWeatherTana] = useState(null);
  const [weatherTama, setWeatherTama] = useState(null);
  const [weatherAntsi, setWeatherAntsi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDaytime, setIsDaytime] = useState(true);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const tanaResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Antananarivo&units=metric&appid=${API_KEY}`);
      const tamaResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Toamasina&units=metric&appid=${API_KEY}`);
      const antsiResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Antsiranana&units=metric&appid=${API_KEY}`);

      setWeatherTana(tanaResponse.data);
      setWeatherTama(tamaResponse.data);
      setWeatherAntsi(antsiResponse.data);
      setLoading(false);


      const currentTime = new Date().getHours();
      setIsDaytime(currentTime >= 6 && currentTime < 18);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city) {
      navigation.navigate('Weather', { city });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.weatherHead}>
        <Image source={require('../../img/header.jpg')} style={styles.headerImage} />
        <Text style={styles.title}>Meteo</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Entrez le nom de la ville"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Rechercher" onPress={handleSearch} />
      <View style={styles.weatherContainer}>
        <View style={styles.column}>
          <TouchableOpacity style={styles.weatherBox} onPress={() => navigation.navigate('Tananarive')}>
            <Image source={require('../../img/Tananarive.jpg')} style={styles.weatherImage} />
            <Text style={styles.weatherText}>
              Tananarive{"\n"}<Text style={styles.bld}>{weatherTana?.main?.temp}°C</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.weatherBox} onPress={() => navigation.navigate('Tamatave')}>
            <Image source={require('../../img/Tamatave.jpg')} style={styles.weatherImage} />
            <Text style={styles.weatherText}>
              Tamatave{"\n"}<Text style={styles.bld}>{weatherTama?.main?.temp}°C</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.weatherBoxLarge} onPress={() => navigation.navigate('Antsiranana')}>
          <Image source={require('../../img/Antsiranana.jpg')} style={styles.weatherImage2} />
          <Text style={styles.weatherText}>
            Antsiranana{"\n"}<Text style={styles.bld}>T :{weatherAntsi?.main?.temp}°C</Text>{"\n"}P: {weatherAntsi?.main?.pressure} Pa{"\n"}V: {weatherAntsi?.wind?.speed} km/h
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bar}>
        <View style={styles.iconContainer}>
          <Icon name={isDaytime ? 'sunny' : 'moon'} size={35} color="#000" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 20,
    backgroundColor: '#fff',
    height: '100%',
  },
  weatherHead: {
    height: '20%',
    marginBottom: 30,
    marginHorizontal: 0,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 20,
    borderRadius: 20,
  },
  bar: {
    height: 50,
    backgroundColor: '#6a8fc4',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  iconContainer: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 5,
  },
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
    marginHorizontal: 5,
    height: '50%',
  },
  column: {
    flex: 1,
    marginRight: 15,
  },
  weatherBox: {
    flex: 1,
    backgroundColor: '#a2a7a79c',
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
    minHeight:70
  },
  weatherBoxLarge: {
    flex: 1,
    backgroundColor: '#a2a7a79c',
    borderRadius: 20,
    alignItems: 'center',
  },
  weatherImage: {
    width: '100%',
    height: '70%',
    marginBottom: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  weatherImage2: {
    width: '100%',
    height: '70%',
    marginBottom: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerImage: {
    width: '100%',
    height: '90%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  weatherText: {
    fontSize: 16,
    textAlign: 'left',
    color: '#000',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: -10
  },
  bld: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
