import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { Register } from '../../views/auth/Register';

const RegisterDrawerItem = createStackNavigator({
  Register: {
    screen: Register,

    navigationOptions: ({ navigation }) => ({
      title: 'Register',
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

RegisterDrawerItem.navigationOptions = {
  drawerLabel: 'Register',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="plus"
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

export default RegisterDrawerItem;