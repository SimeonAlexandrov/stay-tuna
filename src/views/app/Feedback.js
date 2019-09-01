import React, { Component } from 'react'
import { connect } from "react-redux"
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Dimensions,
  Text
} from 'react-native'

import { Rating, Button } from "react-native-elements"
import { TouchableOpacity } from 'react-native-gesture-handler';
import { recommendationActions } from "../../_actions"

class Feedback extends Component {
  constructor(props) {
    super(props)

    this.state = {
        selectedId: null,
        rating: -1
    }
  }

  componentDidMount() {
    const { navigation } = this.props
    const id = navigation.getParam("recommendationId", null)
    if (id) {
        this.setState({
            selectedId: id
        })
    }
  }

  onFinishRating(rating) {
      this.setState({
          ...this.state,
          rating
      })
  }

  onFeedbackPress() {
    this.props.dispatch(recommendationActions.putRecommendation(this.state.selectedId, "rating", this.state.rating))
    this.setState({
      selectedId: null,
      rating: -1
    })
    this.props.navigation.navigate("Home")
  }

  render() {
    return this.state.selectedId ? (
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
            <View style={styles.contentView}>
            <Text>Submit a rating for the recommendation</Text>
            <Rating
                onFinishRating={this.onFinishRating.bind(this)}
            />
            {
                this.state.rating !== -1 ? 
                    <TouchableOpacity>
                      <Button onPress={this.onFeedbackPress.bind(this)} style={{ margin: 10}} title="Submit"/>
                    </TouchableOpacity> :
                    null
            }
            </View>
        </ScrollView>
    ) : (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.contentView}>
          <Text>Select a recommendation from Home to give feedback</Text>
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


function mapStateToProps(state) {
    const { selected, loading } = state.recommendations
      return {
        loading,
        selected
    }
  }
const connectedFeedback = connect(mapStateToProps)(Feedback)
  
export { connectedFeedback as Feedback }

  
