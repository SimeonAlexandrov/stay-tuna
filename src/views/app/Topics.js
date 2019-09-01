import React, { Component } from 'react'
import PropTypes from "prop-types"
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Dimensions,
  Text
} from 'react-native'


const SCREEN_WIDTH = Dimensions.get('window').width

class Topics extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.contentView}>
          <Text>This is where you will pick topics</Text>
        </View>
      </ScrollView>
    )
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

export default Topics
  
