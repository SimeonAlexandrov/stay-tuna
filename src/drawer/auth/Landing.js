import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Landing from '../../views/auth/Landing';

const LandingDrawerItem = createStackNavigator({
  Landing: {
    screen: Landing,

    navigationOptions: ({ navigation }) => ({
      title: 'Stay Tuna',
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

LandingDrawerItem.navigationOptions = {
  drawerLabel: 'Stay Tuna',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="fish"
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

export default LandingDrawerItem;