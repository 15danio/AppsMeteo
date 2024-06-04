// // WelcomeScreen.tsx
// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../AppNavigator';

// type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

// type Props = {
//   navigation: WelcomeScreenNavigationProp;
// };

// const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.navigate('Home');
//     }, 3000);

//     return () => clearTimeout(timer); // Cleanup the timer on component unmount
//   }, [navigation]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Météo</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#87CEEB',
//   },
//   text: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
// });

// export default WelcomeScreen;
