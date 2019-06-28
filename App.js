import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Router, Route, Link } from "./src/routing/routing";

const Home = () => <Text style={styles.header}>Home</Text>;

const About = () => <Text style={styles.header}>About</Text>;

const Stuff = () => <Text style={styles.header}>Stuff</Text>

const Me = () => <Text style={styles.header}>Me</Text>

class App extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <Router>
          <View>
            <Link to="/" >
                <Text>Home</Text>
              </Link>
            <Link to="/about">
              <Text>About</Text>
            </Link>
            <Link to="/stuff">
              <Text>stuff</Text>
            </Link>
            <Link to="/me">
              <Text>me</Text>
            </Link>
          </View>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/stuff" component={Stuff} />
          <Route path="/me" component={Me} />
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
