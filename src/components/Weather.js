import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

import LottieView from 'lottie-react-native'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      sunRise: false,
      sunSet: false
    };

    this.isNearlySunset = this.isNearlySunset.bind(this)
  }

  componentDidMount() {
    return fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=Napier,NZ&appid=6077bc0c24cd3abfdf63f56070c1d010&units=metric"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  isNearlySunset(sunsetTime) {
    let currentTime = new Date().getTime() / 1000;
    return currentTime > sunsetTime - 60 * 60 * 2;
  }

  render() {
    const data = this.state.dataSource;
    if (this.state.isLoading) {
      return (
        <View styles={StyleSheet.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <LottieView
          source={(this.isNearlySunset(data.sys.sunset)) ?
            require('../../assets/ani/sunset.json') : require('../../assets/ani/sunrise.json')}
          autoPlay
          loop
        >
          <View style={styles.container}>
            <Text style={styles.title}> {data.name}</Text>
            <Text style={styles.subtitle}>{data.sys.country}</Text>
            <Text style={styles.tempstyle}>{`${data.main.temp}°`}</Text>
            <Text style={styles.descrip}>{data.weather[0].description}</Text>
          </View>
        </LottieView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 100,
    padding: 20
  },
  bgStyle: {
    resizeMode: "stretch"
  },
  title: {
    fontSize: 50,
    position: "absolute",
    top: 50,
    left: 10,
    fontWeight: "bold",
    color: "white"
  },
  subtitle: {
    fontSize: 20,
    position: "absolute",
    top: 110,
    left: 235,
    color: "white",
    fontWeight: "700"
  },
  tempstyle: {
    fontSize: 80,
    color: "white",
    position: "absolute",
    top: 300,
    left: 20,
    fontWeight: "700"
  },
  descrip: {
    fontSize: 20,
    color: "white",
    fontWeight: "700",
    position: "absolute",
    top: 350,
    left: 150
  }
});
