/**
 * @Author: yxp
 * @Date:   2017-06-01 17:06:38
 * @Last modified by:   yxp
 * @Last modified time: 2017-06-11 23:06:77
 */
 import React, {Component} from 'react';
 import {
     Text,
     View,
     ListView,
     ScrollView,
     Image,
     TouchableHighlight,
     StyleSheet,
     findNodeHandle,
 } from 'react-native';
 import {StackNavigator, NavigationActions} from 'react-navigation';
 import requests, {resource} from '../services/requests_svc'
 import Loading from '../components/Loading.js';
 import { BlurView } from 'react-native-blur';
 import Stars from '../components/Stars.js';

 export default class Movie extends Component {
     static navigationOptions = ({navigation}) => ({
         title: navigation.state.params.title
     });

     constructor(props) {
        super(props);
        this.state = {
            movie: null,
            loading: !0,
            viewRef: null,
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

     imageLoaded () {
         this.setState({viewRef: findNodeHandle(this.backgroundImage)});
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
                            <View style={{alignItems: 'center', padding: 10, justifyContent: 'center'}}>
                                <Image source={{uri: movie.images.large}} style={styles.absolute} ref={(img) => {this.backgroundImage = img}} onLoadEnd={this.imageLoaded.bind(this)} />
                                {this.state.viewRef && (
                                    <BlurView
                                        style={styles.absolute}
                                        viewRef={this.state.viewRef}
                                        blurType="dark"
                                        blurRadius={25}
                                        blurAmount={25}
                                    />
                                )}
                                <View style={[styles.absolute, styles.cover]}></View>
                                <Image source={{uri: movie.images.large}} style={{width: 150, height: 217}} />
                            </View>
                            <View style={{padding: 10}}>
                                <View style={{flexDirection: 'row', marginVertical: 5}}>
                                    <Stars value={movie.rating.average} full={movie.rating.max} />
                                    <Text style={{marginLeft: 5}}>{movie.rating.average}</Text>
                                </View>
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
     },
     absolute: {
         position: "absolute",
         top: 0, left: 0, bottom: 0, right: 0,
         borderWidth: 0,
     },
     cover: {backgroundColor: 'white', opacity: .3}
 })
