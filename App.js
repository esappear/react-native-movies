/**
 * @Author: yxp
 * @Date:   2017-06-02 14:06:33
 * @Last modified by:   yxp
 * @Last modified time: 2017-06-02 14:06:34
 */
 import React, {Component} from 'react';
 import {AppRegistry, StyleSheet, Text, Button, View} from 'react-native';

 import {StackNavigator} from 'react-navigation';
 // import codePush from "react-native-code-push";

 import Movies from './common/components/Movies.js';
 import Movie from './common/components/Movie.js';


 const App = StackNavigator({
     Home: {
         screen: Movies
     },
     MovieDetail: {
         screen: Movie
     },
 });

 const styles = StyleSheet.create({
     container: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: '#F5FCFF'
     },
     welcome: {
         fontSize: 20,
         textAlign: 'center',
         margin: 10
     },
     instructions: {
         textAlign: 'center',
         color: '#333333',
         marginBottom: 5
     }
 });

 AppRegistry.registerComponent('movies', () => App);
