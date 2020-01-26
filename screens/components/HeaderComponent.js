import React, { Component } from 'react';
import {
      View,
      Text,
      StyleSheet,
      Animated,
} from 'react-native';
import Colors from '../../constants/Colors';

export default class HeaderComponent extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  currentDay: '',
                  currentDate: '',
            }
      }

      fadeValue = new Animated.Value(0);

      componentDidMount = () => {
            this.getCurrentDate();
            this.startAnimation();
      }

      getCurrentDate = () => {
            this.setState({
                  currentDay: `${this.getToday()}`,
                  currentDate: `${this.getDayNumber()} ${this.getCurrentMonth()}`
            });
      }
      getToday = () => {
            let day = new Date().getDay();
            switch (day) {
                  case 0: return 'Sunday';
                  case 1: return 'Monday';
                  case 2: return 'Tuesday';
                  case 3: return 'Wednesday';
                  case 4: return 'Thursday';
                  case 5: return 'Friday';
                  case 6: return 'Saturday';
                  default:
                        break;
            }
      }
      getDayNumber = () => {
            let date = new Date().getDate();
            return date;
      }
      getCurrentMonth = () => {
            let month = new Date().getMonth();
            switch (month) {
                  case 0: return 'January';
                  case 1: return 'February';
                  case 2: return 'March';
                  case 3: return 'April';
                  case 4: return 'May';
                  case 5: return 'June';
                  case 6: return 'July';
                  case 7: return 'August';
                  case 8: return 'September';
                  case 9: return 'October';
                  case 10: return 'November';
                  case 11: return 'December';
                  default:
                        break;
            }
      }

      startAnimation = () => {
            return Animated.timing(this.fadeValue, {
                  toValue: 1,
                  duration: 400,
                  useNativeDriver: true
            }).start();
      };

      render() {

            const animatedStyle = {
                  transform: [{
                        translateX: this.fadeValue.interpolate({
                              inputRange: [0, 1],
                              outputRange: [50, 0]  // 0 : 150, 0.5 : 75, 1 : 0
                        }),
                  }]
            }

            return (
                  <View>
                        <Animated.View style={[styles.header, animatedStyle]}>
                              <Text style={styles.headerText}>Hello,</Text>
                              <Text style={[styles.headerText, { fontFamily: 'OpenSans-Bold' }]}>{this.props.userName}</Text>
                              <Text style={{ fontWeight: 'bold', color: Colors.textShade, fontFamily: 'OpenSans-Regular' }}>{this.state.currentDay}, <Text style={{ fontWeight: 'normal' }}>{this.state.currentDate}</Text></Text>
                        </Animated.View>
                        {!this.props.isListEmpty ? <Text style={styles.tasksCount}>{`${this.props.completedTasksCount}`} OF {`${this.props.totalTasksCount}`} COMPLETED</Text> : null}
                  </View>
            );
      }
}

const styles = StyleSheet.create({
      header: {
            justifyContent: 'center',
            margin: 20,
            marginBottom: 10,
            
      },
      headerText: {
            fontSize: 30,
            color: Colors.primaryColor,
            fontFamily: 'OpenSans-Regular',
      },
      tasksCount: {
            color: Colors.textShade,
            fontFamily: 'OpenSans-Regular',
            textAlign: 'center',
      }
});