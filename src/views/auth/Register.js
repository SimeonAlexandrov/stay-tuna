import React, { Component } from 'react'
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Text, 
  Dimensions,
  ActivityIndicator,
  AsyncStorage,
  Alert 
} from 'react-native'
import {
  Input,
  Icon,
  Overlay,
  Button,
} from 'react-native-elements'

import { authActions } from "../../_actions"

const SCREEN_WIDTH = Dimensions.get('window').width

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      isOverlayVisible: false
    }
  }

  onInputChange({ target }) {
    this.setState({
      ...this.state,
      [target.id]: target.value
    })
  }

  onSubmit() {
    //TODO Add more validation to form
    const { username, email, password, confirmPassword } = this.state
    if (username && email && password && confirmPassword ) {
      this.props.dispatch(authActions.register({}, {}))
      this.props.navigation.navigate("Login")
    } else {
      // TODO externalize alert for web ant native environments
      Alert.alert(
        'Alert Title',
        'My Alert Msg',
        [
          {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      )
    }
  }

  render() {
    return (
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
              value={this.state.username}
              placeholder="Username"
              onChange={this.onInputChange.bind(this)}
          />
          <Input
            leftIcon={
                <Icon
                  name="email-outline"
                  type="material-community"
                  size={25}
                />
              }
              id="email"
              value={this.state.email}
              placeholder="Email"
              onChange={this.onInputChange.bind(this)}
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
            type="password"
            secureTextEntry
            value={this.state.password}
            placeholder="Password"
            onChange={this.onInputChange.bind(this)}
          />
          <Input
            leftIcon={
              <Icon
                name="lock"
                type="simple-line-icon"
                size={25}
              />
            }
            id="confirmPassword"
            secureTextEntry
            type="password"
            value={this.state.confirmPassword}
            placeholder="Confirm password"
            onChange={this.onInputChange.bind(this)}
          />
          <View>
            <Button
              style={styles.registerButton}
              type="outline" 
              title="Register"
              onPress={this.onSubmit.bind(this)}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  contentView: {
    flex: 1,
    padding: "5%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButton: {
    padding: "10%"
  }
});

Register.propTypes = {
  loading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  err: PropTypes.object,
}


function mapStateToProps(state) {
  const { loading, err } = state.auth
  return {
    loading,
    err
  }
}
const connectedRegister = connect(mapStateToProps)(Register)

export { connectedRegister as Register }
  
