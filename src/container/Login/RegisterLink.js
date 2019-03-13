
import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { t } from '../../utils/common';
import withNavigator from '../../utils/withNavigator';
import { findScreenById } from '../../route';

@withNavigator()
export default class RegisterLink extends Component {

    register() {
        this.props.navigator.push({
            screen: findScreenById('register'),
        });
    }

    render() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: 16,
                }}
                onPress={this.register.bind(this)}
            >
                <Text
                    style={{
                        color: '#fff'
                    }}
                >{t('LOGIN_REQUEST_REGISTER')} </Text>
                <Text
                    style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        textDecorationLine: 'underline'
                    }}
                >{t('LINK_REGISTER')}</Text>
            </TouchableOpacity>
        );
    }
}
