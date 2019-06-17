import React from 'react';
import { 
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-paper';
import pokemon from './pokemonStore';

import Icon from 'react-native-vector-icons/MaterialIcons';
const myIcon = <Icon name="add_a_photo" size={30} color="#900" />;

const Home = props => {
  const handlePress = pokemon => {
    props.selectPokemon(pokemon);
    props.history.push('/pokemon');
  };
  return (
    <View>
      <Button icon="add-a-photo" mode="contained" onPress={() => console.log('Pressed')}>
        Press me
      </Button>
      <FlatList
        keyExtractor={pokemon => pokemon.number}
        data={pokemon}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;