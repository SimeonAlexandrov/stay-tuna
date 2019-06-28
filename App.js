import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Router, Route } from "./src/routing/routing";

import { Home, Login, Register} from './src/screens'

class App extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Router>
    </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  body1White: {
    color: 'white',
  },
  Container: {
    flex: 1,
  },
  header: {
    fontSize: 20
  },
  title: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: '#B0BEC5',
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
});
