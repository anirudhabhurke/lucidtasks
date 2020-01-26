import React, { Component } from 'react';
import {
      View,
      Text,
      StyleSheet,
      StatusBar,
      TouchableWithoutFeedback,
      ToastAndroid,
      Keyboard,
      ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PopupMenu from './PopupMenu';
import AddTaskComponent from './components/AddTaskComponent';
import HeaderComponent from './components/HeaderComponent';
import SwipeItemComponent from './components/SwipeItemComponent';
import Colors from '../constants/Colors';

export default class HomeScreen extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  userName: '',
                  tasks: [],
                  favoriteTasks: [],
                  isListEmpty: false,
                  totalTasksCount: 0,
                  completedTasksCount: 0
            };
      }

      static navigationOptions = {
            header: null,
      }

      componentDidMount = () => {
            this.props.navigation.addListener('willFocus', () => {
                  this.getName();
                  this.getMessages();
            });
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

      getMessages = async () => {
            await AsyncStorage.getAllKeys()
                  .then(keys => {
                        AsyncStorage.multiGet(keys)
                              .then((resultingTasks) => {
                                    if (resultingTasks.length > 1) {
                                          this.setState({
                                                tasks: resultingTasks.filter((task) => {
                                                      if (task[0] !== 'userName') {
                                                            if (!JSON.parse(task[1]).isFavorite) {
                                                                  return task;
                                                            }
                                                      }
                                                }),
                                                isListEmpty: false,
                                                favoriteTasks: resultingTasks.filter((task) => {
                                                      if (task[0] !== 'userName') {
                                                            if (JSON.parse(task[1]).isFavorite) {
                                                                  return task;
                                                            }
                                                      }
                                                }),
                                                totalTasksCount: resultingTasks.filter((task) => {
                                                      if (task[0] !== 'userName') {
                                                            return task;
                                                      }
                                                }).length,
                                                completedTasksCount: resultingTasks.filter((task) => {
                                                      if (task[0] !== 'userName') {
                                                            if (JSON.parse(task[1]).isDone) {
                                                                  return task;
                                                            }
                                                      }
                                                }).length
                                          });
                                    }
                                    else {
                                          this.setState({ isListEmpty: true })
                                    }
                              })
                              .catch(error => {  })
                  })
                  .catch(error => {  })
      }

      completeTask = async (key, task, isDone, isFavorite) => {
            let taskObject = {
                  taskTitle: task,
                  isDone: !isDone,
                  isFavorite: isFavorite,
            }
            await AsyncStorage.mergeItem(key, JSON.stringify(taskObject))
                  .then(() => {
                        this.getMessages();
                  })
                  .catch(error => {});
            ToastAndroid.show(!isDone ? 'TASK COMPLETED' : 'TASK INCOMPLETE', ToastAndroid.SHORT)
      }

      markFavorite = async (key, task, isDone, isFavorite) => {
            let taskObject = {
                  taskTitle: task,
                  isDone: isDone,
                  isFavorite: !isFavorite,
            }
            await AsyncStorage.mergeItem(key, JSON.stringify(taskObject))
                  .then(() => {
                        this.getMessages();
                  })
                  .catch(error => {});
      }

      deleteTask = async (key) => {
            await AsyncStorage.removeItem(key)
                  .then(() => {
                        this.getMessages();
                  })
                  .catch(error => {  })
      }

      onPopupEvent = (eventName, index) => {
            if (eventName !== 'itemSelected') return;
            if (index === 0) this.props.navigation.navigate("Settings");
            if (index === 1) this.props.navigation.navigate("About");
      };

      sliceTask = (fullTask) => {
            let words = fullTask.split(' ');
            let string = (words.slice(0, 10)).join(' ')
            if (words.length < 10)
                  return string;
            return `${string} ...`
      }

      renderTaskItem = (item) => {
            return (
                  <SwipeItemComponent
                        key = {item[0]}
                        item = {item}
                        completeTask = {this.completeTask}
                        markFavorite = {this.markFavorite}
                        deleteTask = {this.deleteTask}
                        navigate = {this.props.navigation.navigate}
                        sliceTask = {this.sliceTask}
                  ></SwipeItemComponent>
            )
      }

      renderTasks = () => {
            if (this.state.isListEmpty)
                  return (
                        <View style={styles.emptyView}>
                              <Text style={styles.emptyHead}>A fresh start</Text>
                              <Text style={styles.emptyText}>Ready to do great things!</Text>
                        </View>
                  )
            return (
                  <ScrollView style={{flex: 1}}>
                        <View style={styles.tasksView}>
                              {this.state.favoriteTasks.length > 0 ? <Text style={styles.taskHead}>Favorites</Text> : null}
                              {
                                    this.state.favoriteTasks.map((item) => {
                                          return this.renderTaskItem(item)
                                    })
                              }
                        </View>
                        <View style={styles.tasksView}>
                              {this.state.tasks.length > 0 ? <Text style={styles.taskHead}>All Tasks</Text> : null}
                              {
                                    this.state.tasks.map((item) => {
                                          return this.renderTaskItem(item)
                                    })
                              }
                        </View>
                  </ScrollView>
            )
      }

      render() {
            return (
                  <View style={{ flex: 1 }}>
                        <StatusBar backgroundColor={Colors.backgroundColor} barStyle={'light-content'} />
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                              <View style={styles.container}>
                                    <HeaderComponent
                                          userName={this.state.userName}
                                          completedTasksCount={this.state.completedTasksCount}
                                          totalTasksCount={this.state.totalTasksCount}
                                          isListEmpty={this.state.isListEmpty}
                                    />
                                          {
                                                this.renderTasks()
                                          }
                                    <View style={styles.popup}>
                                          <PopupMenu actions={['Settings', 'About']} onPress={this.onPopupEvent} />
                                    </View>
                                    <AddTaskComponent refreshTasks={this.getMessages} />
                              </View>
                        </TouchableWithoutFeedback>
                  </View>
            )
      }
}

const styles = StyleSheet.create({
      container: {
            flexGrow: 1,
            backgroundColor: Colors.backgroundColor
      },
      tasksView: {
            paddingHorizontal: 5,
      },
      taskHead: {
            fontWeight: 'normal',
            color: Colors.primaryColor,
            fontFamily: 'OpenSans-Regular',
            textAlign: 'center',
            marginTop: 7
      },
      popup: {
            position: 'absolute',
            top: 5,
            right: 0,
      },
      emptyView: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 9,
            opacity: 0.65,
      },
      emptyHead: {
            fontFamily: 'KaushanScript-Regular',
            fontSize: 30,
            color: Colors.textColor
      },
      emptyText: {
            fontFamily: 'KaushanScript-Regular',
            fontSize: 20,
            color: Colors.textColor
      },

});