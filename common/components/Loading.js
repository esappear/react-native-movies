/**
 * @Author: yxp
 * @Date:   2017-06-03 15:06:24
 * @Last modified by:   yxp
 * @Last modified time: 2017-06-03 22:06:25
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
            <ActivityIndicator
                style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 100}}
                size={this.props.size || 'large'}
                color={this.props.color || 'gray'}
            />
         )
     }
 }
