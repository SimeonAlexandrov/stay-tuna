import React from 'react';
import HybridApp from './src/App'
import { Provider as PaperProvider } from 'react-native-paper'


console.log('Loaded!')
export default class App extends React.Component {
  render() {
    return (
      <PaperProvider>
        <HybridApp/>
      </PaperProvider>
    );
  }
}