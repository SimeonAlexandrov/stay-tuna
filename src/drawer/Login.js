import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Login from '../views/Login';

const LoginDrawerItem = createStackNavigator({
  Login: {
    screen: Login,

    navigationOptions: ({ navigation }) => ({
      title: 'Login',
      headerLeft: (
        <Icon
          name="menu"
          size={30}
          type="entypo"
          iconStyle={{ paddingLeft: 10 }}
          onPress={navigation.toggleDrawer}
        />
      ),
    }),
  },
});

LoginDrawerItem.navigationOptions = {
  drawerLabel: 'Login',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="check"
      size={30}
      iconStyle={{
        width: 30,
        height: 30,
      }}
      type="material"
      color={tintColor}
    />
  ),
};

export default LoginDrawerItem;