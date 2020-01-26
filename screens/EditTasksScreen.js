import React, { Component } from 'react';
import {
      View,
      StyleSheet,
      TextInput,
      TouchableOpacity,
      StatusBar,
      Clipboard,
      ToastAndroid
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/Colors';

export default class EditTasksScreen extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  task: '',
                  key: '',
                  isDone: false,
                  isFavorite: false
            }
      }

      static navigationOptions = ({ navigation }) => {
            return {
                  title: 'Edit Task',
                  headerRight: () => (
                        <TouchableOpacity onPress={async () => {
                              await AsyncStorage.removeItem(navigation.getParam('key'))
                                    .then(() => {
                                          navigation.goBack();
                                          ToastAndroid.show('Task deleted', ToastAndroid.SHORT)
                                    })
                                    .catch(error => { })
                        }} style={{ marginRight: 12 }}>
                              <Icon name={'delete'} color={Colors.textShade} size={25}></Icon>
                        </TouchableOpacity>
                  ),
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
            this.props.navigation.addListener('willFocus', () => {
                  let key = this.props.navigation.getParam('key', '')
                  if (key) {
                        this.setState({ key })
                        this.getCurrentTask(key)
                  } else {
                        ToastAndroid.show('No task selected', ToastAndroid.SHORT)
                        this.props.navigation.goBack()
                  }
            })
      }

      getCurrentTask = async (key) => {
            await AsyncStorage.getItem(key)
                  .then(task => {
                        this.setState({
                              task: JSON.parse(task).taskTitle,
                              isDone: JSON.parse(task).isDone,
                              isFavorite: JSON.parse(task).isFavorite
                        });
                  })
                  .catch(error => { })
      }

      updateTask = async () => {
            if (this.state.task !== '') {
                  let taskObject = {
                        taskTitle: this.state.task,
                        isDone: this.state.isDone,
                        isFavorite: this.state.isFavorite
                  }
                  await AsyncStorage.mergeItem(this.state.key, JSON.stringify(taskObject))
                        .then(() => {
                              this.props.navigation.goBack();
                        })
                        .catch(error => { })
            }
            else if (this.state.task == '') {
                  ToastAndroid.show('Empty task discarded', ToastAndroid.SHORT)
                  this.deleteTask();
            }
      }

      deleteTask = async () => {
            await AsyncStorage.removeItem(this.state.key)
                  .then(() => {
                        this.props.navigation.goBack();
                        ToastAndroid.show('Task deleted', ToastAndroid.SHORT)
                  })
                  .catch(error => { })
      }

      copyTaskToClipboard = () => {
            if (this.state.task) {
                  Clipboard.setString(this.state.task);
                  ToastAndroid.show('Copied to Clipboard', ToastAndroid.SHORT);
            }
      }

      pasteFromClipBoard = async () => {
            let content = await Clipboard.getString()
            this.setState({
                  task: this.state.task + content
            });
      }

      render() {
            return (
                  <View style={{ flex: 1 }}>
                        <StatusBar backgroundColor={Colors.backgroundColor} barStyle={'light-content'} />
                        <View style={styles.container}>
                              <TextInput autoFocus autoCapitalize={'sentences'}
                                    placeholder={'Edit Task'}
                                    placeholderTextColor={Colors.textShade}
                                    style={styles.taskInput}
                                    multiline
                                    value={this.state.task}
                                    onChangeText={(task) => { this.setState({ task }) }}
                              ></TextInput>
                              <View style={styles.bottomBar}>
                                    <TouchableOpacity onPress={() => {
                                          this.copyTaskToClipboard();
                                    }}
                                    >
                                          <View style={styles.copyButtonContainer}>
                                                <Icon name={'content-copy'} size={25} color={Colors.textColor}></Icon>
                                          </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                          this.updateTask();
                                    }}
                                    >
                                          <View style={styles.addButtonContainer}>
                                                <Icon name={'done'} size={40} color={Colors.primaryColor}></Icon>
                                          </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                          this.pasteFromClipBoard();
                                    }}
                                    >
                                          <View style={styles.copyButtonContainer}>
                                                <Icon name={'content-paste'} size={25} color={Colors.textColor}></Icon>
                                          </View>
                                    </TouchableOpacity>
                              </View>
                        </View>
                  </View>
            );
      }
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            backgroundColor: Colors.backgroundColor
      },
      taskInput: {
            marginTop: 10,
            marginHorizontal: 20,
            fontSize: 25,
            fontFamily: 'OpenSans-Regular',
            flexGrow: 1,
            marginBottom: 50,
            color: Colors.textColor
      },
      addButtonContainer: {
            backgroundColor: Colors.backgroundShade,
            height: 55,
            width: 55,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 5,
            elevation: 12
      },
      copyButtonContainer: {
            flexDirection: 'row',
            padding: 8,
            height: 45,
            width: 45,
            paddingHorizontal: 10,
            borderRadius: 30,
            borderColor: Colors.primaryColor,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 5,
            alignSelf: 'flex-end',
      },
      bottomBar: {
            width: '100%',
            height: 50,
            bottom: 0,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: "flex-end",
            marginBottom: 4,
            position: 'absolute'
      },
});