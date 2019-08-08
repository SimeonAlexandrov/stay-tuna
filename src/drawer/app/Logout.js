import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { Logout } from '../../views/app/Logout'

const LogoutDrawerItem = createStackNavigator({
  Logout: {
    screen: Logout,

    navigationOptions: ({ navigation }) => ({
      title: 'Logout',
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

LogoutDrawerItem.navigationOptions = {
  drawerLabel: 'Logout',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="logout-variant"
      size={30}
      iconStyle={{
        width: 30,
        height: 30,
      }}
      type="material-community"
      color={tintColor}
    />
  ),
};

export default LogoutDrawerItem;