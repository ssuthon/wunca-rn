import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import Forecast from './Forecast'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      zip: '22000', //Chanthaburi
      forecast: {
        main: '-',
        description: '-',
        temp: 0
      }
    }
  }

  componentWillMount = () => {
    console.log('componentWillMount running... state: ', this.state);

    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + this.state.zip + ',th&units=metric&APPID=fd68c0f2039c5a25f666a9ff374bc93e')
      .then((response) => response.json())
      .then((responseJSON) => {

        console.log('reponseJSON: ', responseJSON);

        this.setState(
          {
            forecast: {
              main: responseJSON.weather[0].main,
              description: responseJSON.weather[0].description,
              temp: responseJSON.main.temp
            }
          });
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./weather-bg.jpg')}
          resizeMode='cover'
          style={styles.backdrop}>

          <View style={styles.overlay}>
            <Text style={styles.mainText}>
              Chanthaburi zip code is {this.state.zip}.
            </Text> 

            <Forecast main={this.state.forecast.main} description={this.state.forecast.description} temp={this.state.forecast.temp} /> 
          </View>

        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column'
  },
  overlay: {
    height: 200,
    paddingTop: 30,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center'
  },
  mainText: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  }

});

