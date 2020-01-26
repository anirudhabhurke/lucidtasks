import React from 'react';
import {
      View,
      Text,
      StyleSheet,
      TouchableOpacity,
      TouchableWithoutFeedback,
} from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';

const SwipeItemComponent = (props) => {

      const { item, completeTask, markFavorite, deleteTask, sliceTask, navigate } = props;

      return (
            <SwipeRow
                  disableRightSwipe={true}
                  rightOpenValue={-60}
                  useNativeDriver={true}
                  friction={12}
                  tension={30}
                  style={{
                        borderRadius: 10,
                        margin: 5,
                        overflow: 'hidden',
                        elevation: 1.5,
                        backgroundColor: '#0B101C'
                  }}

            >
                  <View>
                        <TouchableOpacity onPress={() => (deleteTask(item[0]))}>
                              <View style={styles.deleteSwipeButton}>
                                    <Icon name={'delete-sweep'} size={30} color={Colors.textColor}></Icon>
                              </View>
                        </TouchableOpacity>
                  </View>
                  <View style={[styles.taskItem, { backgroundColor: (JSON.parse(item[1]).isDone) ? Colors.backgroundColor : Colors.backgroundShade, borderRadius: 10 }]}>
                        <TouchableOpacity onPress={() => {
                              completeTask(item[0], JSON.parse(item[1]).taskTitle, JSON.parse(item[1]).isDone, JSON.parse(item[1]).isFavorite);

                        }}>
                              <View style={[styles.iconContainer, {
                              }]}>
                                    <Icon name={(JSON.parse(item[1]).isDone) ? 'check-circle' : 'radio-button-unchecked'} size={30} color={(JSON.parse(item[1]).isDone) ? Colors.textShade : Colors.primaryColor}></Icon>
                              </View>
                        </TouchableOpacity>
                        <TouchableWithoutFeedback
                              style={styles.taskTextView}
                              onPress={() => {
                                    navigate('EditTasks', {
                                          key: item[0]
                                    })
                              }}
                        >
                              <View style={{ flex: 1, justifyContent: 'center'}}>
                                    <Text style={[styles.taskText, { textDecorationLine: (JSON.parse(item[1]).isDone) ? 'line-through' : 'none' }]}>
                                          {sliceTask(JSON.parse(item[1]).taskTitle)}
                                    </Text>
                              </View>
                        </TouchableWithoutFeedback>
                        <TouchableOpacity onPress={() => {
                              markFavorite(item[0], JSON.parse(item[1]).taskTitle, JSON.parse(item[1]).isDone, JSON.parse(item[1]).isFavorite);
                        }}>
                              <View style={[styles.iconContainer, {
                              }]}>
                                    <Icon name={JSON.parse(item[1]).isFavorite ? 'star' : 'star-border'} size={30} color={'#E8B202'}></Icon>
                              </View>
                        </TouchableOpacity>
                  </View>
            </SwipeRow>
      )
}

export default SwipeItemComponent;

const styles = StyleSheet.create({
      taskItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: "center"
      },
      taskTextView: {
            padding: 10,
      },
      taskText: {
            margin: 5,
            fontFamily: 'OpenSans-Regular',
            fontSize: 18,
            color: Colors.textColor
      },
      iconContainer: {
            height: 45,
            width: 45,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
      },
      deleteSwipeButton: {
            height: "100%",
            alignItems: 'flex-end',
            paddingEnd: 15,
            borderRadius: 12,
            justifyContent: 'center',
            backgroundColor: "#0B101C",
            borderWidth: 2,
            borderColor: Colors.backgroundShade
      }
});