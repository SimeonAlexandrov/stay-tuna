import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
  StyleSheet
} from 'react-native';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.checkToken();
  }
  checkToken = async () => {
    //TODO dispatch checkToken action
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

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

export default AuthLoadingScreen