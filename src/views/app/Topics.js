import React, { Component } from 'react'
import { connect } from "react-redux"
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Dimensions,
  Text,
  Platform
} from 'react-native'
import { Button, ListItem, Input, Icon, ButtonGroup } from "react-native-elements" 
import TouchableScale from 'react-native-touchable-scale'

import { topicActions } from "../../_actions"
import { TouchableOpacity } from 'react-native-gesture-handler';

const POPULAR_TOPICS = ["Angular", "React", "ML"]

class Topics extends Component {
  constructor(props) {
    super(props)

    this.state = {
        newTopic: "",
        topics: []
    }
  }

  componentDidMount() {
    this.props.dispatch(topicActions.getTopics())
  }

  componentWillReceiveProps(props) {
    if (props.topics.length > 0) {
      this.setState({
        ...this.state,
        topics: props.topics
      })
    }
  }

  onTopicAdd() {
    this.props.dispatch(topicActions.postTopic(this.state.newTopic))
    this.setState({newTopic: ""})
  }

  onPopularTopicPress(id) {
    this.setState({
      newTopic: POPULAR_TOPICS[id]
    })
  }

  render() {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.contentView}>
          <Text>Add topics of interest</Text>
          <View style={{margin: 10}}>
              <Input
                name="newTopic"
                value={this.state.newTopic}
                placeholder="New topic"
                onChangeText={newTopic => this.setState({newTopic})}
              />
          </View>
          <View>
              <TouchableOpacity>
                <Button 
                  title="Add" 
                  onPress={this.onTopicAdd.bind(this)}
                  icon={
                    <Icon
                    name="plus"
                    size={20}
                    iconStyle={{
                      color: "white"
                    }}
                    type="font-awesome"
                  />
                }/>
              </TouchableOpacity>
          </View>
          <View style={{marginTop: 10, width: 200}}>
              <Text>Popular topics:</Text>
              <ButtonGroup
                style={{minWidth: 200}}
                buttons={POPULAR_TOPICS}
                onPress={this.onPopularTopicPress.bind(this)}
              />
          </View>
          <View style={{margin: 10}}>
              <Text>Your topics:</Text>
              {
                  this.state.topics.map( (t, index) => {
                      return (
                        <ListItem
                            component={TouchableScale}
                            friction={90}
                            tension={100}
                            activeScale={0.95}
                            key={t.index}
                            title={t.value}
                            titleStyle={{ color: 'rgb(32, 137, 220)', fontWeight: 'bold' }}
                            containerStyle={{
                            marginHorizontal: 16,
                            marginVertical: 8,
                            borderRadius: 8,
                            borderColor: "black",
                            borderWidth: 2
                            }}
                        />
                      )
                  })
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

function mapStateToProps(state) {
  const { topics, loading } = state.topics
    return {
      loading,
      topics
  }
}

const connectedTopics = connect(mapStateToProps)(Topics)

export { connectedTopics as Topics }
  
