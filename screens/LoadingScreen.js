import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator, StatusBar } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Colors from "../constants/Colors";

export default class LoadingScreen extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  userName: null
            };
      }

      static navigationOptions = {
            header: null
      };

      componentDidMount = async () => {
            await this.getName()
                  .then(() => {
                        if (this.state.userName) {
                              this.props.navigation.replace("Home");
                        } else {
                              this.props.navigation.replace("Intro");
                        }
                  })
                  .catch(error => {});
      };

      getName = async () => {
            try {
                  let userName = await AsyncStorage.getItem("userName");
                  if (userName !== "") {
                        this.setState({ userName });
                  }
            } catch (error) {
                  // Error retrieving data
            }
      };

      render() {
            return (
                  <View style={styles.container}>
                        <StatusBar
                              backgroundColor={Colors.backgroundColor}
                              barStyle={"light-content"}
                        />
                        <ActivityIndicator
                              size={"large"}
                              color={Colors.primaryColor}
                        ></ActivityIndicator>
                  </View>
            );
      }
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.backgroundColor
      }
});
