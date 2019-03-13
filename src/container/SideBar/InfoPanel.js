import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Scale from '../../utils/Scale';
import { getIdentity } from '../../store/selectors/auth';

@connect(
    state => ({
        identity: getIdentity(state)
    }),
    null
)
export default class InfoPanel extends Component {
    onPress() {
        Navigation.handleDeepLink({
            link: 'profile'
        });
    }


    render() {
        if (!this.props.identity) {
            return null;
        }

        const {
            identity: { avatar_url, fullname, id }
        } = this.props;

        return (
            <TouchableOpacity
                style={styles.container}
                onPress={this.onPress.bind(this)}
            >
                <Image
                    source={{ uri: avatar_url }}
                    resizeMode="cover"
                    style={styles.imageUserStyle}
                />
                <View style={styles.wrapUserInfo}>
                    <Text style={styles.txtUsernameStyle}>{fullname}</Text>
                    <Text style={styles.txtUserId}>{id}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: Scale.getSize(10),
        paddingBottom: Scale.getSize(10)
    },
    imageUserStyle: {
        width: Scale.getSize(64),
        height: Scale.getSize(64),
        borderRadius: Scale.getSize(64) / 2
    },
    wrapUserInfo: {
        paddingLeft: Scale.getSize(15),
        justifyContent: 'center'
    },
    txtUsernameStyle: {
        fontSize: Scale.getSize(18),
        fontWeight: '800',
        color: '#fff'
    },
    txtUserId: {
        fontSize: Scale.getSize(15),
        fontWeight: '100',
        color: '#fff'
    }
});
