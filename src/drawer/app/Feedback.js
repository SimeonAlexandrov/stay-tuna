import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { Feedback } from '../../views/app/Feedback';

const FeedbackDrawerItem = createStackNavigator({
  Feedback: {
    screen: Feedback,

    navigationOptions: ({ navigation }) => ({
      title: 'Feedback',
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

FeedbackDrawerItem.navigationOptions = {
  drawerLabel: 'Feedback',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="edit"
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

export default FeedbackDrawerItem;