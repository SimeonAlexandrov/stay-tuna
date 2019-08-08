import React from 'react';
import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';

class Landing extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.titleText}>Landing</Text>
          <Text style={styles.subtitleText}>Welcome</Text>
        </View>
        <ScrollView style={styles.viewContainer}>
          <Text
            style={[
              styles.titleText,
              { marginTop: 30, color: '#e74c3c', fontSize: 22 },
            ]}
          >
            Descriptive description
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
    color: '#27ae60',
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
