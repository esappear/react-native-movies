/**
 * @Author: yxp
 * @Date:   2017-06-01 17:06:38
 * @Last modified by:   yxp
 * @Last modified time: 2017-06-02 16:06:86
 */
 import React, {Component} from 'react';
 import {
     Text,
     View,
     ListView,
     ScrollView,
     Image,
     TouchableHighlight,
     StyleSheet
 } from 'react-native';
 import {StackNavigator, NavigationActions} from 'react-navigation';
 import requests, {resource} from '../services/requests_svc'

 export default class Movie extends Component {
     static navigationOptions = ({navigation}) => ({
         title: navigation.state.params.title
     });

     constructor(props) {
        super(props);
        this.state = {
            movie: null
        }
     }

     fetchDetail () {
         resource(requests.movieReq, {id: this.id}).then(responseJson => {
             this.setState({
                 movie: responseJson
             });
         });
     }

     fetchReviews () {
         resource(requests.movieReviewsReq, {id: this.id}).then(responseJson => {
             this.setState({
                 reviews: responseJson
             })
         })
     }

     fetchComments () {
         resource(requests.movieCommentsReq, {id: this.id}).then(responseJson => {
             this.setState({
                 comment: responseJson
             })
         })
     }

     componentWillMount () {
         if (this.props.navigation) {
             this.id = this.props.navigation.state.params.id;
         }
         this.fetchDetail();
         this.fetchComments();
         this.fetchReviews();
     }

     render () {
         const movie = this.state.movie;
         return (
             <ScrollView style={{backgroundColor: 'white', padding: 10, flex: 1}}>
                {movie && (
                    <View>
                        <Image source={{uri: movie.images.large}} style={{width: 150, height: 217}}></Image>
                        <Text style={{marginTop: 10}}>电影简介</Text>
                        <Text style={{marginTop: 10}}>{movie.summary}</Text>
                    </View>
                )}
             </ScrollView>
         )
     }
 }
