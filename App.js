import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fromRight, zoomIn } from 'react-navigation-transitions';
import { enableScreens } from 'react-native-screens';
import Colors from './constants/Colors';
import {HomeScreen, EditTasksScreen, IntroScreen, LoadingScreen, SettingsScreen, AboutScreen} from './screens'

enableScreens();

const handleCustomTransition = ({ scenes }) => {
      const prevScene = scenes[scenes.length - 2];
      const nextScene = scenes[scenes.length - 1];

      if (prevScene
            && prevScene.route.routeName === 'Home'
            && nextScene.route.routeName === 'EditTasks') {
            return zoomIn(500);
      }
      return fromRight(400);
}

const appNavigator = createStackNavigator({
      Home: HomeScreen,
      EditTasks: EditTasksScreen,
      Intro: IntroScreen,
      Loading: LoadingScreen,
      Settings: SettingsScreen,
      About: AboutScreen
}, {
      initialRouteName: "Loading",
      transitionConfig: (nav) => handleCustomTransition(nav),
      defaultNavigationOptions: {
            headerTitleStyle: {
                  fontWeight: '100',
                  alignSelf: 'center',
                  fontFamily: 'OpenSans-Regular',
                  color: Colors.textColor,
            },
            headerStyle: {
                  elevation: 1,
                  backgroundColor: Colors.backgroundColor,
            },
      },
      headerLayoutPreset: 'center',
});

const App = createAppContainer(appNavigator);

export default App;