import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { findScreenById } from '../../route';
import { t } from '../../utils/common';
import withNavigator from '../../utils/withNavigator';

@withNavigator()
export default class ForgotLink extends Component {
    render() {
        const { navigator } = this.props;


        return (
            <TouchableOpacity
                onPress={() => navigator.push({
                    screen: findScreenById('forgot_password')
                })}
            >
                <Text
                    style={{
                        color: '#fff',
                        fontSize: 12,
                        textAlign: 'right',
                        paddingVertical: 15,
                    }}
                >{t('LOGIN_FORGOT_LINK')}</Text>
            </TouchableOpacity>
        );
    }
}
