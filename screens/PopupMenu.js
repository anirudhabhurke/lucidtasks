import React, { Component } from 'react'
import { View, UIManager, TouchableOpacity, findNodeHandle, } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import Colors from '../constants/Colors';

export default class PopupMenu extends Component {
      static propTypes = {
            actions: PropTypes.arrayOf(PropTypes.string).isRequired,
            onPress: PropTypes.func.isRequired
      }

      constructor(props) {
            super(props)
            this.state = {
                  icon: null
            }
      }

      onError() {
            alert("Something Happened")
      }

      onPress = () => {
            if (this.state.icon) {
                  UIManager.showPopupMenu(
                        findNodeHandle(this.state.icon),
                        this.props.actions,
                        this.onError,
                        this.props.onPress
                  )
            }
      }

      render() {
            return (
                  <View>
                        <TouchableOpacity onPress={this.onPress} style={{ padding: 10}}>
                              <Icon
                                    name='more-vert'
                                    size={30}
                                    color={Colors.primaryColor}
                                    ref={this.onRef}
                              />
                        </TouchableOpacity>
                  </View>
            )
      }

      onRef = icon => {
            if (!this.state.icon) {
                  this.setState({ icon })
            }
      }
}