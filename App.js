import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import JapanFishPalette from './screens/JapanFishPalette.js';
import KarbonStatistics from './screens/KarbonStatisticsScreen.js';
import KarbonCalculator from './screens/KarbonCalculator.js';
import EducationScreen from './screens/EducationScreen';
import KarbonMap from './screens/KarbonMapScreen.js';
import HomeScreen from './screens/HomeScreen.js';

import Profile from './screens/Profile';
import Step1 from './screens/Step1';
import Step2 from './screens/Step2';

const carLoanColor = require('./assets/icons/car-loan-color.png');
const direction = require('./assets/icons/direction.png');
const directionColor = require('./assets/icons/direction-color.png');
const home = require('./assets/icons/home.png');
const homeColor = require('./assets/icons/home-color.png');
const analytics = require('./assets/icons/analytics.png');
const analyticsColor = require('./assets/icons/analytics-color.png');
const carLoan = require('./assets/icons/car-loan.png');
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeStack">
      <Stack.Screen name="HomeStack" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="CarbonFootprintScreen" component={KarbonCalculator} />
      <Stack.Screen name="Details" component={KarbonStatistics} options={{ headerShown: false }} />
      <Stack.Screen name="Realtime Updates" component={KarbonMap} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function EducationStack() {
  return (
    <Stack.Navigator initialRouteName="EducationHome">
      <Stack.Screen name="EducationHome" component={EducationScreen} options={{ title: 'Education', headerShown: false }} />
      <Stack.Screen name="Step1" component={Step1} options={{ title: 'First' }} />
      <Stack.Screen name="Step2" component={Step2} options={{ title: 'Second' }} />
    </Stack.Navigator>
  );
}

function CarbonFootprintStack() {
  return (
    <Stack.Navigator initialRouteName="CarbonFootprint">
      <Stack.Screen name="CarbonFootprint" component={CarbonFootprintScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ 
      flexDirection: 'row', 
      justifyContent: 'space-around', 
      paddingBottom: 10, 
      backgroundColor: 'white',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      position: "absolute",
      bottom: 0,
    }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}
          >
            <View style={{ padding: 10 }}>
              {label === 'Home' ? (
                <Image source={isFocused ? homeColor : home} style={{width: 30, height: 30}} />
              ) : label === 'Karbon Calculator' ? (
                <Image source={isFocused ? carLoanColor : carLoan} style={{width: 30, height: 30}} />
              ) : label === 'Karbon Statistics' ? (
                <Image source={isFocused ? analyticsColor : analytics} style={{width: 30, height: 30}} />
              ) : label === 'Karbon Map' ? (
                <Image source={isFocused ? directionColor : direction} style={{width: 30, height: 30}} />
              ) : (
                <Icon name="circle-o" size={30} color={isFocused ? '#4caf50' : '#222'} />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}


export default function App() {
  let [fontsLoaded] = useFonts({
    'Codec': require('./assets/fonts/Codec.ttf'),
    'Horizon': require('./assets/fonts/Horizon.ttf'),
    'Montserrat-Light': require('./assets/fonts/Montserrat Light.otf'),
    'Roc': require('./assets/fonts/Roc.otf')
  });

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }
    const Tab = createBottomTabNavigator();
  
    return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Home" tabBar={props => <CustomTabBar {...props} />}>

        <Tab.Screen 
          name="Home" 
          component={HomeStack} 
          options={{
            headerShown: true,
            headerTitle: '',
            headerStyle: { height: 250 }, 
            headerRight: () => (
              <TouchableOpacity onPress={() => {Profile}} style={{ position: 'absolute', right: 15, top: 15 }}>
                <Icon name="user" size={40} style={{ marginRight: 10, }} />
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontFamily: 'Codec', fontSize: 30, bottom: 15, fontWeight: 'bold' }}>Welcome, name!</Text>
                <Text style={{ fontFamily: 'Roc', left: 60, fontSize: 40, textAlign: 'center', top: 0, fontWeight: 'bold' }}>Welcome to</Text>
                <Text style={{ fontFamily: 'Roc', left: 60, fontSize: 40, textAlign: 'center', top: 0 }}>KARBON</Text>
                <Text style={{ fontFamily: 'Montserrat-Light', left: 60, fontSize: 10, textAlign: 'center', top: 10, fontWeight: 'bold' }}>Your journey to a sustainable</Text>
                <Text style={{ fontFamily: 'Montserrat-Light', left: 60, fontSize: 10, textAlign: 'center', top: 10, fontWeight: 'bold' }}>tomorrow starts here.</Text>
              </View>
            ),
          }}
        />

      <Tab.Screen 
        name="Karbon Calculator" 
        component={KarbonCalculator} 
        options={{ headerShown: false }}
      />

      <Tab.Screen 
        name="Karbon Map" 
        component={KarbonMap} 
        options={{ headerShown: false }}
      />

      <Tab.Screen 
        name="Karbon Statistics" 
        component={KarbonStatistics} 
        options={{ headerShown: false }}
      />

        </Tab.Navigator>
      </NavigationContainer>
    );
  }