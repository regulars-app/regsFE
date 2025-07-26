import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/Home.jsx';
import MeetupDetails from './src/screens/MeetupDetails.jsx';
import UpcomingSurpriseEvent from './src/screens/UpcomingSurpriseEvent.jsx';
import NewMeetupDetails from './src/screens/NewMeetupDetails.jsx';
import NewMeetupChooseActivity from './src/screens/NewMeetupChooseActivity.jsx';
import SurpriseEventDetails from './src/screens/SurpriseEventDetails.jsx';
import NewMeetupChooseDate from './src/screens/NewMeetupChooseDate.jsx';
import ChoosePlace from './src/screens/ChoosePlace.jsx';
import AddPlace from './src/screens/AddPlace.jsx';
import PlacePage from './src/screens/PlacePage.jsx';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Home' }}
        /> */}
         <Stack.Screen 
            name="PlacePage"
            component={PlacePage}
            options={{ title: 'Place Page', headerShown: false }}
          />
        <Stack.Screen 
            name="AddPlace"
            component={AddPlace}
            options={{ title: 'Add Place', headerShown: false }}
          />
        <Stack.Screen 
            name="ChoosePlace"
            component={ChoosePlace}
            options={{ title: 'Choose Place', headerShown: false }}
          />
        <Stack.Screen 
            name="NewMeetupChooseDate"
            component={NewMeetupChooseDate}
            options={{ title: 'Choose Date', headerShown: false }}
          />
        <Stack.Screen 
            name="SurpriseEventDetails"
            component={SurpriseEventDetails}
            options={{ title: 'Surprise Event Details', headerShown: false }}
          />
        <Stack.Screen 
            name="NewMeetupChooseActivity"
            component={NewMeetupChooseActivity}
            options={{ title: 'Choose Activity', headerShown: false }}
          />
          <Stack.Screen 
            name="NewMeetupDetails"
            component={NewMeetupDetails}
            options={{ title: 'Meetup Details', headerShown: false }}
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
