import React, { Component } from 'react';
import {
      View,
      Text,
      StyleSheet,
      Linking,
      TouchableWithoutFeedback,
      StatusBar,
      TouchableOpacity
} from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class AboutScreen extends Component {

      static navigationOptions = ({ navigation }) => {
            return {
                  title: 'About',
                  headerLeft: () => (
                        <TouchableOpacity onPress={async () => {
                                          navigation.goBack();
                        }} style={{ marginLeft: 12 }}>
                              <Icon name={'arrow-back'} color={Colors.textShade} size={25}></Icon>
                        </TouchableOpacity>
                  )
            }
      }

      render() {
            return (
                  <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
                        <StatusBar backgroundColor={Colors.backgroundColor} barStyle={'light-content'} />
                        <View style={styles.container}>
                        <View>
                              <Text style={styles.companyName}>Anirudh Apps</Text>
                              <Text style={styles.infoText}>This is a simple todo app with no fancy stuff. For awesome people like you who want focus on achieving great things.{'\n\n'}Privacy note: All of this app's data such as tasks and usernames are stored locally on your device and not shared with me. The data will get deleted when you uninstall the app or clear it's data through Settings.{'\n\n'}Have any thoughts! Feel free to contact me. Your suggestions or ideas for this app would be my next goal.{'\n\n'}Thank you.{'\n'}- Anirudh B</Text>
                        </View>
                              <TouchableWithoutFeedback onPress={() => { Linking.openURL('https://anirudhabhurke.github.io/') }}>
                                    <Text style={styles.siteLink}>anirudhabhurke.github.io</Text>
                              </TouchableWithoutFeedback>
                        </View>
                        <Text style={[styles.infoText, { textAlign: 'center', bottom: 5 }]}>Version- 1.5</Text>
                  </View>
            );
      }
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            margin: 15,
            justifyContent: 'space-between'
      },
      companyName: {
            fontFamily: 'OpenSans-Bold',
            fontSize: 20,
            alignSelf: 'center',
            margin: 5,
            color: Colors.primaryColor
      },
      infoText: {
            fontFamily: 'OpenSans-Regular',
            fontSize: 15,
            margin: 5,
            color: Colors.textShade
      },
      siteLink: {
            color: Colors.primaryColor,
            borderColor: Colors.primaryColor,
            fontSize: 18,
            alignSelf: 'center',
            padding: 6,
            borderRadius: 10,
            borderWidth: 0.6,
            marginTop: 5,
      }
});