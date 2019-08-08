import React, { Component } from 'react'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Dimensions,
} from 'react-native'

import { authActions } from "../../_actions"

const SCREEN_WIDTH = Dimensions.get('window').width

class Logout extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentWillMount() {
    this.props.dispatch(authActions.logout(this.props.navigation))
  }

  render() {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.contentView}>
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

function mapStateToProps(state) {
  const { loading, err } = state.auth
  return {
    loading, 
    err
  }
}

const connectedLogout = connect(mapStateToProps)(Logout)
export { connectedLogout as Logout }