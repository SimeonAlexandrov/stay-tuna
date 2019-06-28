import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Link } from '../routing/routing'

class Register extends Component {
    render() {
        return (
            <View>
                <Text>Register</Text>

                <Link to="/">
                    <Text>Back</Text>
                </Link>
            </View>
        )
    }
}

export default Register