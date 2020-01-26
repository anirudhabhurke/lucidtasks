import React, { Component } from 'react';
import {
      View,
      Text,
      StyleSheet,
      TouchableOpacity,
      TextInput,
      TouchableWithoutFeedback,
      Keyboard,
      Alert,
      StatusBar,
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

      static navigationOptions = ({ navigation }) => {
            return {
                  title: 'Settings',
                  headerLeft: () => (
                        <TouchableOpacity onPress={async () => {
                                          navigation.goBack();
                        }} style={{ marginLeft: 12 }}>
                              <Icon name={'arrow-back'} color={Colors.textShade} size={25}></Icon>
                        </TouchableOpacity>
                  )
            }
      }

      componentDidMount = () => {
            this.getName();
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
                  this.setName(this.state.userName)
                        .then(() => {
                              this.props.navigation.goBack();
                              ToastAndroid.show('Username changed', ToastAndroid.SHORT)
                        })
            }
            
      }


      setName = async (userName) => {
            try {
                  await AsyncStorage.setItem('userName', userName);
            }
            catch (error) {
            }
      }
      getName = async () => {
            try {
                  let userName = await AsyncStorage.getItem('userName');
                  if (userName !== null) {
                        this.setState({ userName })
                  }
            } catch (error) {
                  // Error retrieving data
            }
      }

      deleteButtonHandler = () => {
            Alert.alert(
                  'Really!',
                  'This will permanently erase all tasks...',
                  [
                        {
                              text: 'Cancel',
                              style: 'cancel',
                        },
                        { text: 'SURE', onPress: () => this.deleteAllTasks() },
                  ],
                  { cancelable: false },
            );
      }

      deleteAllTasks = async () => {
            await AsyncStorage.getAllKeys()
                  .then(keys => {
                        const taskKeys = keys.filter((key) => key !== "userName");
                        if (taskKeys.length > 0) {
                              AsyncStorage.multiRemove(taskKeys, () => {
                                    ToastAndroid.show('ALL CLEAR', ToastAndroid.SHORT)
                              })
                        }
                        else {
                              ToastAndroid.show('Nothing to clear', ToastAndroid.SHORT)
                        }

                  })
                  .catch(error => {  })
      }

      render() {
            return (
                  <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
                        <StatusBar backgroundColor={Colors.backgroundColor} barStyle={'light-content'} />
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.container}>
                              <View style={styles.inputView}>
                                    <Text style={styles.nameLabel}>Change name:</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                          <TextInput
                                                placeholder={'Enter name'}
                                                placeholderTextColor={Colors.textShade}
                                                style={styles.nameInput}
                                                maxLength={20}
                                                onChangeText={(userName) => { this.setState({ userName }) }}
                                                value={this.state.userName}
                                          ></TextInput>
                                          <TouchableOpacity style={styles.submitButton} onPress={this._onPress}>
                                                <Icon name='save' size={22} color={Colors.primaryColor}></Icon>
                                                <Text style={styles.submitText}>save</Text>
                                          </TouchableOpacity>
                                    </View>
                              </View>
                              <View>
                                    <TouchableOpacity style={[styles.submitButton, { borderColor: '#EF6B54', alignSelf: 'center', marginTop: 20 }]} onPress={this.deleteButtonHandler}>
                                          <Icon name={'delete-forever'} size={22} color={'#EF6B54'}></Icon>
                                          <Text style={[styles.submitText, { color: '#EF6B54' }]}>Delete All Tasks</Text>
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
            marginVertical: 20,
      },
      inputView: {
            padding: 10,
            marginHorizontal: 15,
            marginVertical: 20,
      },
      nameInput: {
            fontSize: 20,
            fontFamily: 'OpenSans-Regular',
            width: '60%',
            paddingHorizontal: 10,
            paddingBottom: 2,
            marginVertical: 10,
            borderRadius: 2,
            backgroundColor: Colors.backgroundShade,
            color: Colors.textColor
      },
      nameLabel: {
            fontSize: 18,
            fontFamily: 'OpenSans-Regular',
            color: Colors.textColor
      },
      submitButton: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderColor: Colors.primaryColor,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
            borderWidth: 0.8,
      },
      submitText: {
            fontFamily: 'OpenSans-Regular',
            textTransform: "uppercase",
            fontSize: 16,
            textAlignVertical: 'center',
            color: Colors.primaryColor,
            marginLeft: 5,
      }
});