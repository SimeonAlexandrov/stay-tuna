import React from 'react';
import AppLoading from "./_components/AppLoading/AppLoading";
import { View, Dimensions } from 'react-native';
import { 
  createAppContainer, 
  createDrawerNavigator,
  createSwitchNavigator, 
  DrawerItems } from 'react-navigation';
import {cacheFonts} from "./caching/AssetsCaching";
import { Provider } from 'react-redux'

import { store } from './_helpers/store'

import { AuthLoadingScreen } from './views/AuthLoadingScreen'

// Auth
import Landing from './drawer/auth/Landing'
import Login from './drawer/auth/Login'
import Register from './drawer/auth/Register'

// App
import Home from './drawer/app/Home'
import Profile from './drawer/app/Profile'
import Logout from './drawer/app/Logout'

const WINDOW_WIDTH = Dimensions.get('window').width;

const CustomDrawerContentComponent = props => (
  <View style={{ flex: 1, backgroundColor: '#43484d' }}>
    <View
      style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}
    >
    </View>
    <View style={{ marginLeft: 10 }}>
      <DrawerItems {...props} />
    </View>
  </View>
);

const AuthStack = createDrawerNavigator(
  {
    Landing: {
      path: '/',
      screen: Landing,
    }, 
    Login: {
      path: '/login',
      screen: Login
    },
    Register: {
      path: '/register',
      screen: Register
    }
  },
  {
    initialRouteName: 'Landing',
    contentOptions: {
      activeTintColor: '#548ff7',
      activeBackgroundColor: 'transparent',
      inactiveTintColor: '#ffffff',
      inactiveBackgroundColor: 'transparent',
      labelStyle: {
        fontSize: 15,
        marginLeft: 0,
      },
    },
    drawerWidth: Math.min(WINDOW_WIDTH * 0.8, 300),
    drawerBackgroundColor: '#43484d',
    contentComponent: CustomDrawerContentComponent,
  }
)

const AppStack = createDrawerNavigator(
  {
    Home: {
      path: '/',
      screen: Home,
    }, 
    Profile: {
      path: '/profile',
      screen: Profile
    }, 
    Logout: {
      path: '/logout',
      screen: Logout
    }
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: '#548ff7',
      activeBackgroundColor: 'transparent',
      inactiveTintColor: '#ffffff',
      inactiveBackgroundColor: 'transparent',
      labelStyle: {
        fontSize: 15,
        marginLeft: 0,
      },
    },
    drawerWidth: Math.min(WINDOW_WIDTH * 0.8, 300),
    drawerBackgroundColor: '#43484d',
    contentComponent: CustomDrawerContentComponent,
  }
)

const MainRoot = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppStack
  },
  {
    initialRouteName: "AuthLoading"
  }
))

export default class AppContainer extends React.Component {
  state = {
    isReady: false,
  };

  async _loadAssetsAsync() {
    const fontAssets = cacheFonts({
      "FontAwesome": require("@expo/vector-icons/fonts/FontAwesome.ttf"),
      "Ionicons": require("@expo/vector-icons/fonts/Ionicons.ttf"),
      "Entypo": require("@expo/vector-icons/fonts/Entypo.ttf"),
      "SimpleLineIcons": require("@expo/vector-icons/fonts/SimpleLineIcons.ttf"),
      "MaterialIcons": require("@expo/vector-icons/fonts/MaterialIcons.ttf"),
      //TODO: What's wrong with MaterialCommunityIcons ???
      "MaterialCommunityIcons": require("@expo/vector-icons/fonts/MaterialCommunityIcons.ttf"),
    });

    await Promise.all([fontAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
        />
      );
    }

    return (
      <Provider store={store}>
        <MainRoot />
      </Provider>
    );
  }
}