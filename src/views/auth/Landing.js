import React from 'react';
import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';

class Landing extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.titleText}>Welcome to Stay Tuna</Text>
        </View>
        <ScrollView style={styles.viewContainer}>
          <Text
            style={[
              styles.subtitleText,
            ]}
          >
            The project's purpose is to develop a full stack application with React-Native-Web.
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headingContainer: {
    paddingTop: 50,
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    fontFamily: Platform.OS === 'ios' ? 'Menlo-Bold' : null,
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : null,
    color: '#34495e',
  },
  viewContainer: {
    flex: 1,
  },
});

export default Landing;
