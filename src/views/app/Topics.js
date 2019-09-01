import React, { Component } from 'react'
import PropTypes from "prop-types"
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

class Topics extends Component {
  constructor(props) {
    super(props)

    this.state = {
        topics: ["JavaScript", "Sth else"]
    }
  }

  render() {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.contentView}>
          <Text>Add topics of interest</Text>
          <View style={{margin: 10}}>
              <Input/>
          </View>
          <View>
              <Button title="New" icon={
                  <Icon
                  name="plus"
                  size={20}
                  iconStyle={{
                    color: "white"
                  }}
                  type="font-awesome"
                />
              }/>
          </View>
          <View style={{marginTop: 10, width: 200}}>
              <Text>Popular topics:</Text>
              <ButtonGroup
                style={{minWidth: 200}}
                buttons={["Angular", "React", "ML"]}
              />
          </View>
          <View style={{margin: 10}}>
              <Text>Your topics:</Text>
              {
                  this.state.topics.map(t => {
                      return (
                        <ListItem
                            component={TouchableScale}
                            friction={90}
                            tension={100}
                            activeScale={0.95}
                            key={t}
                            title={t}
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

export default Topics
  