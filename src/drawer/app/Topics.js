import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Topics from '../../views/app/Topics';

const TopicsDrawerItem = createStackNavigator({
  Topics: {
    screen: Topics,

    navigationOptions: ({ navigation }) => ({
      title: 'Topics',
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

TopicsDrawerItem.navigationOptions = {
  drawerLabel: 'Topics',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="tasks"
      size={30}
      iconStyle={{
        width: 30,
        height: 30,
      }}
      type="font-awesome"
      color={tintColor}
    />
  ),
};

export default TopicsDrawerItem;