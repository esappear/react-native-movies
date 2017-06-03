/**
 * @Author: yxp
 * @Date:   2017-06-01 17:06:38
 * @Last modified by:   yxp
 * @Last modified time: 2017-06-03 19:06:13
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
 import Loading from '../components/Loading.js';
 // import { BlurView } from 'react-native-blur';

 export default class Movie extends Component {
     static navigationOptions = ({navigation}) => ({
         title: navigation.state.params.title
     });

     constructor(props) {
        super(props);
        this.state = {
            movie: null,
            loading: !0,
        }
     }

     fetchDetail () {
         resource(requests.movieReq, {id: this.id}).then(responseJson => {
             this.setState({
                 movie: responseJson,
                 loading: !1,
             });
         });
     }

     fetchReviews () {
         resource(requests.movieReviewsReq, {id: this.id}).then(responseJson => {
             console.log(responseJson);
             this.setState({
                 reviews: responseJson
             })
         })
     }

     fetchComments () {
         resource(requests.movieCommentsReq, {id: this.id}).then(responseJson => {
             console.log(responseJson);
             this.setState({
                 comments: responseJson
             })
         })
     }

     componentWillMount () {
         if (this.props.navigation) {
             this.id = this.props.navigation.state.params.id;
         }
         this.fetchDetail();
        //  this.fetchComments();
        //  this.fetchReviews();
     }

     render () {
         const movie = this.state.movie;
         const comments = this.state.comments;
        //  const reviews = this.state.reviews;
         return (
            <View style={{backgroundColor: 'white', flex: 1}}>
                {this.state.loading ? <Loading /> :
                    (movie && (
                        <ScrollView>
                            <View style={{alignItems: 'center', paddingTop: 10}}>
                                <Image source={{uri: movie.images.large}} style={{width: 150, height: 217}}></Image>
                            </View>
                            <View style={{padding: 10}}>
                                <Text style={styles.title}>电影简介</Text>
                                <Text>{movie.summary}</Text>
                                <Text style={styles.title}>导演</Text>
                                {movie.directors.map(item => <Text key={item.id}>{item.name}</Text>)}
                                <Text style={styles.title}>演员</Text>
                                {movie.casts.map(item => <Text key={item.id}>{item.name}</Text>)}
                            </View>
                            {comments && (
                                <View>
                                {comments.map(item => <Text>{item}</Text>)}
                                </View>
                            )}
                        </ScrollView>
                    ))
                }
             </View>
         )
     }
 }

 const styles = StyleSheet.create({
     title: {
         fontWeight: 'bold', fontSize: 14, marginTop: 5,
     }
 })
