/**
 * @Author: yxp
 * @Date:   2017-06-03 15:06:24
 * @Last modified by:   yxp
 * @Last modified time: 2017-06-03 16:06:88
 */
 import React, { Component } from 'react';
 import {
     Text,
     View,
 } from 'react-native';

 export default class Loading extends Component {
     render () {
         return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 100}}>
                <Text>Loading...</Text>
            </View>
         )
     }
 }
