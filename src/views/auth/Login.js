import React, { Component } from 'react';
import { connect } from "react-redux"
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import {
  Input,
  Icon,
  Button,
  Overlay,
  Text
} from 'react-native-elements'

import { authActions } from "../../_actions/"


const SCREEN_WIDTH = Dimensions.get('window').width

class Login extends Component {
    constructor(props) {
      super(props)

      this.state = {
        username: "",
        password: "",
        isOverlayVisible: false
      }
    }

    onInputChange(event) {
      const { target, text, name } = event.nativeEvent
      console.log(event.nativeEvent)
      this.setState({
        ...this.state,
        [name]: text
      }, () => console.log(this.state))
    }

    onSubmit() {
      const { username, password } = this.state

      if (username && password) {
        this.props.dispatch(authActions.login({ 
          username, 
          password
          }, this.props.navigation
        ))
      } else {
        this.setState({
          ...this.state,
          isOverlayVisible: true
        })
      }
    }

    render() {
      return this.state.isOverlayVisible ? (
        <Overlay
            isVisible={this.state.isOverlayVisible}
            width="auto"
            height="auto"
            onBackdropPress={() => this.setState({ isVisible: false })}
          >
          <Text> Oops, please enter valid username and password </Text>
          <Button onPress={() => this/this.setState({isOverlayVisible: false})} title="OK" />
        </Overlay>
      ) : (
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.contentView}>
            <Input
              leftIcon={
                  <Icon
                    name="user"
                    type="simple-line-icon"
                    size={25}
                  />
                }
                id="username"
                name="username"
                value={this.state.username}
                placeholder="Username"
                onChangeText={username => this.setState({username})}
            />

            <Input
              leftIcon={
                <Icon
                  name="lock"
                  type="simple-line-icon"
                  size={25}
                />
              }
              id="password"
              name="password"
              type="password"
              secureTextEntry
              value={this.state.password}
              placeholder="Password"
              onChangeText={password => this.setState({password})}
            />
            <View>
              <Button 
                type="outline" 
                title="Log in"
                onPress={this.onSubmit.bind(this)}
              />
            </View>
          </View>
        </ScrollView>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
    contentView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  function mapStateToProps(state) {
    const { loading, err} = state.auth
    return {
      loading,
      err
    }
  }

  const connectedLogin = connect(mapStateToProps)(Login)
  
  export { connectedLogin as Login }
  
