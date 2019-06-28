import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Link } from '../routing/routing'
 
class Home extends Component {
    render() {
        return (
            <View>
                <Text>Home</Text>

                <Link to="/login">
                    <Text>Login</Text>
                </Link>
                <Link to="/register">
                    <Text>Register</Text>
                </Link>
            </View>
        )
    }
}

export default Home