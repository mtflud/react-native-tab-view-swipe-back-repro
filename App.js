import * as React from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabView, SceneMap} from 'react-native-tab-view';

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Pressable
        onPress={() => navigation.navigate('Details')}
        style={styles.button}>
        <Text>Press Me to Start</Text>
      </Pressable>
    </View>
  );
}

const FirstTab = () => (
  <View style={[styles.container, {backgroundColor: '#ff4081'}]}>
    <Text>
      I'm the first tab. Try to swipe me from left to right to go back back
      using an iOS device
    </Text>
  </View>
);

const SecondTab = () => (
  <View style={[styles.container, {backgroundColor: '#ff4081'}]}>
    <Text>
      I'm the second tab. Swiping from left to right should take you to the
      first tab
    </Text>
  </View>
);

const renderScene = SceneMap({
  first: FirstTab,
  second: SecondTab,
});

function DetailsScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);

  return (
    <TabView
      onIndexChange={setIndex}
      navigationState={{index, routes}}
      renderScene={renderScene}
      initialLayout={{ width: layout.width }}
    />
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  button: {
    marginTop: 20,
    height: 50,
    backgroundColor: 'grey',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
});

export default App;
