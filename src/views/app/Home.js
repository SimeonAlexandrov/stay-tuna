import React, { Component } from 'react'
import { connect } from "react-redux"
import { orderBy } from "lodash"
import moment from "moment"
import PropTypes from "prop-types"
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Dimensions,
  Text,
  Platform,
  TouchableOpacity,
  Linking,
  WebView
} from 'react-native'
import TouchableScale from 'react-native-touchable-scale'
import { Button, ListItem, Divider, Rating } from "react-native-elements"

import { recommendationActions } from "../../_actions"
class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      shouldRenderWebView: false,
      sourceUri: "",
      selectedRecommendation: null
    }
  }

  componentDidMount() {
    this.props.dispatch(recommendationActions.getRecommendations())
  }

  onRequestButtonPress() {
    this.props.dispatch(recommendationActions.postRecommendation())
  }

  onListItemPress(title) {
    const rec = this.props.recommendations
      .filter(r => r.title === title)[0]
    // Linking.openURL(url)

    this.setState({
      ...this.state,
      shouldRenderWebView: true,
      sourceUri: rec.url,
      selectedRecommendation: rec
    }, () => {
      if (Platform.OS === "web") {
        window.open(rec.url, "_blank")
      }
    })
  }

  onRateButtonPress() {
    const selectedRecommendation = this.state.selectedRecommendation
    this.setState({
      ...this.state,
      shouldRenderWebView: false,
      sourceUri: "",
      selectedRecommendation: null
    })
    // TODO change this to Feedback page
    this.props.navigation.push("Feedback", {
      recommendationId: selectedRecommendation._id
    })
  }

  renderSubtitle(rec) {
    return (
      <View>
        <Text>{moment(rec.date_added).calendar()}</Text>
        {
          rec.rating ? (
            <Rating
              readonly
              style={{height: 10}}
              startingValue={rec.rating}
            />
          ) : null
        }
        
      </View>
    )
  }

  renderRecommendations() {
    let recommendations = this.props.recommendations

    const unratedRecs = recommendations.filter(r => !r.rating).reverse()
    const ratedRecs = recommendations.filter(r => r.rating) .reverse()

    recommendations = unratedRecs.concat(ratedRecs)

    return recommendations.map( (rec, index) => (
      <TouchableOpacity onPress={() => this.onListItemPress(rec.title)}>
        <View>  
          <ListItem
            component={TouchableScale}
            friction={90}
            tension={100}
            activeScale={0.95}
            key={index}
            title={rec.title}
            titleStyle={{ color: 'rgb(32, 137, 220)', fontWeight: 'bold' }}
            subtitle={this.renderSubtitle(rec)}
            containerStyle={{
              marginHorizontal: 16,
              marginVertical: 8,
              borderRadius: 8,
              borderColor: "black",
              borderWidth: 2
            }}
          />
        </View>
      </TouchableOpacity>
    ))
  }

  render() {
    return this.state.shouldRenderWebView ? (
      <View style={{flex:1}}>
        <TouchableOpacity>
          <Button 
            title="Rate this recommendation"
            onPress={this.onRateButtonPress.bind(this)}
          />
        </TouchableOpacity>
        { Platform.OS === "web" ? null : <WebView
          source={{uri: this.state.sourceUri}}
          style={{marginTop: 20}}
        />}
      </View>
    ) : (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.contentView}>
          <TouchableOpacity>
            <Button
             loading={this.props.buttonLoading}
             style={{width: 250}}
             onPress={this.onRequestButtonPress.bind(this)}
             title="Request a recommendation"
             />
          </TouchableOpacity>
          
          <View style={{marginTop: 20}}>
            {
              this.props.recommendations ?
                this.renderRecommendations() :
                null
            }
          </View>
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
    alignItems: Platform.OS === "web" ? 'center' : 'stretch',
  }
});

Home.propTypes = {
  loading: PropTypes.bool.isRequired,
  buttonLoading: PropTypes.bool.isRequired,
  recommendations: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  err: PropTypes.object,
}


function mapStateToProps(state) {
  const { recommendations, loading, buttonLoading } = state.recommendations
    return {
      loading,
      recommendations,
      buttonLoading
  }
}

const connectedHome = connect(mapStateToProps)(Home)

export { connectedHome as Home }
  
