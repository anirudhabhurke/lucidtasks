import React, { Component } from 'react';
import {
      View,
      Text,
      StyleSheet,
      TouchableOpacity,
      TextInput,
      Image,
      StatusBar,
      TouchableWithoutFeedback,
      Keyboard,
      ToastAndroid
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/Colors';

export default class IntroScreen extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  userName: '',
            }
      }

      static navigationOptions = {
            header: null,
      }

      _onPress = () => {
            if (!this.state.userName.replace(/\s/g, '').length || !this.state.userName) {
                  ToastAndroid.show('Please add name', ToastAndroid.SHORT)
                  this.setState({
                        userName: ''
                  })
                  return;
            }
            else {
                  this.setName(this.state.userName);
                  this.props.navigation.replace('Home');
            }
      }


      setName = async (userName) => {
            try {
                  await AsyncStorage.setItem('userName', userName);
            }
            catch (error) {

            }
      }

      render() {
            return (
                  <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
                        <StatusBar backgroundColor={Colors.backgroundColor} barStyle={'light-content'} />
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                              <View style={styles.container}>
                                    <View style={styles.header}>
                                          <Image source={require('../assets/heroImage.png')} style={styles.heroImage}></Image>
                                          <Text style={styles.headerText}>Welcome to</Text>
                                          <Text style={[styles.headerText, { fontFamily: 'OpenSans-Bold' }]}>Lucid Tasks</Text>
                                    </View>
                                    <View style={styles.inputView}>
                                          <TextInput
                                                placeholder={'Enter your name'}
                                                style={styles.nameInput}
                                                placeholderTextColor={Colors.textShade}
                                                maxLength={20}
                                                onChangeText={(userName) => { this.setState({ userName }) }}
                                                autoCompleteType={'off'}
                                                onSubmitEditing={() => {
                                                      this._onPress();
                                                }}
                                                value={this.state.userName}
                                          ></TextInput>
                                          <TouchableOpacity onPress={this._onPress}>
                                                <Icon name={'arrow-forward'} size={30} color={Colors.primaryColor}></Icon>
                                          </TouchableOpacity>
                                    </View>
                              </View>
                        </TouchableWithoutFeedback>
                  </View>
            );
      }
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            backgroundColor: Colors.backgroundColor,
            justifyContent: 'space-evenly'
      },
      inputView: {
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: Colors.backgroundShade,
            width: "95%",
            borderRadius: 5,
            elevation: 1,
            alignSelf: 'center'
      },
      nameInput: {
            fontSize: 30,
            fontWeight: 'bold',
            fontFamily: 'OpenSans-Bold',
            width: '85%',
            color: Colors.textColor,
      },
      header: {
            alignItems: 'center',
            justifyContent: 'center',
      },
      heroImage: {
            height: 100,
            width: 100
      },
      headerText: {
            fontSize: 30,
            color: Colors.primaryColor,
            fontFamily: 'OpenSans-Regular',
      }
});