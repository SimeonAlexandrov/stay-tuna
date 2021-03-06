import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { Home } from '../../views/app/Home';

const HomeDrawerItem = createStackNavigator({
  Home: {
    screen: Home,

    navigationOptions: ({ navigation }) => ({
      title: 'Home',
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

HomeDrawerItem.navigationOptions = {
  drawerLabel: 'Home',
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

export default HomeDrawerItem;