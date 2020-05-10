import React, { Component } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../../constants/Colors';

export default class AddTaskComponent extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  taskTitle: '',
            };
      }

      addTask = async () => {
            //checks if task only contain whitespaces
            if (!this.state.taskTitle.replace(/\s/g, '').length) {
                  this.setState({
                        taskTitle: '',
                  });
                  return;
            } else {
                  //create task object
                  let task = {
                        taskTitle: this.state.taskTitle,
                        isDone: false,
                        isFavorite: false,
                  };
                  await AsyncStorage.setItem(Date.now().toString(), JSON.stringify(task))
                        .then(() => {
                              this.setState({
                                    taskTitle: '',
                              });
                              this.props.refreshTasks();
                        })
                        .catch((error) => {});
            }
      };

      render() {
            return (
                  <View style={styles.surface}>
                        <KeyboardAvoidingView enabled behavior={'height'} style={styles.keyboardContainer}>
                              <TextInput
                                    placeholder={'Add New Task'}
                                    style={styles.taskInput}
                                    placeholderTextColor={Colors.textShade}
                                    value={this.state.taskTitle}
                                    onChangeText={(taskTitle) => {
                                          this.setState({ taskTitle });
                                    }}
                                    onSubmitEditing={this.addTask}
                              />
                              <TouchableOpacity onPress={this.addTask} style={styles.addButton}>
                                    <Icon name={'send'} size={25} color={Colors.primaryColor} />
                              </TouchableOpacity>
                        </KeyboardAvoidingView>
                  </View>
            );
      }
}

const styles = StyleSheet.create({
      surface: {
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 12,
            backgroundColor: Colors.backgroundShade,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
      },
      keyboardContainer: {
            bottom: 0,
            backgroundColor: Colors.backgroundColor,
            borderRadius: 10,
            paddingHorizontal: 5,
            marginHorizontal: 5,
            padding: 0,
            marginVertical: 5,
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
      },
      taskInput: {
            fontFamily: 'OpenSans-Regular',
            fontSize: 18,
            paddingVertical: 5,
            width: '90%',
            color: Colors.textColor,
      },
      addButton: {
            height: 35,
            alignItems: 'center',
            flexGrow: 1,
            alignItems: 'center',
            width: '5%',
            justifyContent: 'center',
      },
});
