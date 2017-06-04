/**
 * @Author: yxp
 * @Date:   2017-06-03 15:06:24
 * @Last modified by:   yxp
 * @Last modified time: 2017-06-04 20:06:75
 */
 import React, { Component } from 'react';
 import {
     Text,
     View,
     ActivityIndicator,
 } from 'react-native';

 export default class Loading extends Component {
     render () {
         return (
             <View style={{position: 'absolute', top:0, right: 0, bottom: 0, left: 0}}>
                <ActivityIndicator
                    style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 100}}
                    size={this.props.size || 'large'}
                    color={this.props.color || 'gray'}
                />
            </View>
         )
     }
 }
