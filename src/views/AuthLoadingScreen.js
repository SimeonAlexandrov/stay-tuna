import React from 'react'
import { connect } from "react-redux"
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
  StyleSheet
} from 'react-native';

import { authActions } from "../_actions"
class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(authActions.checkTokenInStorage(this.props.navigation))
  }

  render() {
    return (
        <View style={[styles.container, styles.contentView]}>
            <ActivityIndicator size="large" />
            <StatusBar barStyle="default"/>
        </View>
    );
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
    }
});

function mapStateToProps(state) {
  const { loading, err } = state
  return {
    loading,
    err
  }
}

const connectedAuthLoadingScreen = connect(mapStateToProps)(AuthLoadingScreen)

export { connectedAuthLoadingScreen as AuthLoadingScreen }