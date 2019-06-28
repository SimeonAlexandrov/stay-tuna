import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Link } from '../routing/routing'

class Login extends Component {
    render() {
        return (
            <View>
                <Text>Login</Text>

                <Link to="/">
                    <Text>Back</Text>
                </Link>
            </View>
        )
    }
}

export default Login