import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/Home.jsx';
import MeetupDetails from './src/screens/MeetupDetails.jsx';
import UpcomingSurpriseEvent from './src/screens/UpcomingSurpriseEvent.jsx';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
          <Stack.Screen 
            name="UpcomingSurpriseEvent"
            options={{ title: 'Upcoming Surprise Event', headerShown: false }}
          >
            {() => <UpcomingSurpriseEvent subject="Jeffrey" />}
          </Stack.Screen>
          <Stack.Screen 
            name="MeetupDetails"
            component={MeetupDetails}
            options={{ title: 'Meetup Details', headerShown: false }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
