import React, { Component } from 'react'
import PropTypes from "prop-types"
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Dimensions,
} from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width

class Logout extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentWillMount() {
    setTimeout(() => this.props.navigation.navigate("Auth"), 0)
  }

  render() {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.contentView}>
          <h1>Bye</h1>
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

Logout.propTypes = {
  loading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  err: PropTypes.object,
}


export default Logout
  
