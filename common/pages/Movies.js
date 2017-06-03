/**
 * @Author: yxp
 * @Date:   2017-05-31 17:05:68
 * @Last modified by:   yxp
 * @Last modified time: 2017-06-03 18:06:41
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    Image,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';
import requests from '../services/requests_svc'
import {
    StackNavigator,
    TabNavigator,
    NavigationActions,
} from 'react-navigation';
import Loading from '../components/Loading.js';

export default class Movies extends Component {
    static navigationOptions = {
        title: '电影'
    };

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            movies: ds.cloneWithRows([]),
            loading: !0,
        }
    }

    fetchData () {
        fetch(requests[this.props.type || 'moviesTopReq']).then(response => response.json()).then(responseJson => {
            this.setState({
                movies: this.state.movies.cloneWithRows(responseJson.subjects),
                loading: !1,
                title: responseJson.title
            });
        })
    }

    componentWillMount () {
        this.fetchData();
    }

    _onPressButton (rowData) {
        const {navigate} = this.props.navigation;
        navigate('MovieDetail', {id: rowData.id, title: rowData.title});
    }

    render () {
        return (
            <View style={{flex: 1}}>
                {this.state.loading ? <Loading /> :
                    <ListView
                    dataSource={this.state.movies}
                    renderRow={(rowData) => <MovieItem onPress={() => {this._onPressButton(rowData)}}>{rowData}</MovieItem>}
                    enableEmptySections={true}
                    />
                }
            </View>
        )
    }
}

export class MoviesShowing extends Component {
    static navigationOptions = {
        title: '影院热映'
    };
    render () {
        return (
            <Movies type="moviesShowingReq" navigation={this.props.navigation} />
        )
    }
}

export class MoviesTop extends Component {
    static navigationOptions = {
        title: '电影Top250'
    };
    render () {
        return (
            <Movies type="moviesTopReq" navigation={this.props.navigation} />
        )
    }
}

class MovieItem extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        const movie = this.props.children;
        return (
            <TouchableHighlight onPress={this.props.onPress} style={{marginTop: 10}}>
                <View style={{backgroundColor: 'white', padding: 15, flexDirection: 'row'}}>
                    <Image source={{uri: movie.images.large}} style={{width: 150, height: 217}}></Image>
                    <View style={{paddingHorizontal: 10, flex: 1}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{movie.title}</Text>
                        <Text style={styles.title}>导演</Text>
                        {movie.directors.map(item => <Text key={item.id}>{item.name}</Text>)}
                        <Text style={styles.title}>演员</Text>
                        {movie.casts.map(item => <Text key={item.id}>{item.name}</Text>)}
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold', fontSize: 14, marginTop: 5,
    }
})
