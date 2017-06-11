/**
 * @Author: yxp
 * @Date:   2017-06-05 11:06:45
 * @Last modified by:   yxp
 * @Last modified time: 2017-06-11 23:06:26
 */


import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
} from 'react-native';

export default class Stars extends Component {
    render () {
        const widthUnit = 11;
        const change = this.props.value - ~~this.props.value;
        const width = this.props.full * widthUnit;
        return (
            <View style={[styles.relative, {width: width}]}>
                <View style={styles.absolute}>
                    {Array.apply(null, Array(this.props.full)).map((item, index) => <Star color="gray" key={index} />)}
                </View>
                <View style={styles.absolute}>
                    {Array.apply(null, Array(~~this.props.value)).map((item, index) => <Star key={index} />)}
                    <Star width={Math.ceil(change * widthUnit) + 1}  />
                </View>
            </View>
        )
    }
}

class Star extends Component {
    render () {
        const file = this.props.color == 'gray' ? require('../../res/images/icon_star_gray.png') : require('../../res/images/icon_star.png');
        return (
            <View style={[styles.starWrap, {width: this.props.width || 11}]}>
                <Image source={file} style={styles.star} />
            </View>
        )
    }
}

Stars.defaultProps = {
    full: 10,
    value: 5,
}

const styles = StyleSheet.create({
    relative: {
        position: 'relative',
        height: 10,
    },
    absolute: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        flexDirection: 'row',
    },
    starWrap: {
        width: 11,
        paddingVertical: 3,
        overflow: 'hidden',
    },
    star: {
        width: 11,
        height: 10,
        marginLeft: 1,
        flex: 1,
    }
})
