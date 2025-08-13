import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Test from './src/screens/Test.jsx';
import UpcomingMeetupDetails from './src/screens/UpcomingMeetupDetails.jsx';
import UpcomingSurpriseEvent from './src/screens/UpcomingSurpriseEvent.jsx';
import NewMeetupDetails from './src/screens/NewMeetupDetails.jsx';
import NewMeetupChooseActivity from './src/screens/NewMeetupChooseActivity.jsx';
import SurpriseEventDetails from './src/screens/SurpriseEventDetails.jsx';
import NewMeetupChooseDate from './src/screens/NewMeetupChooseDate.jsx';
import ChoosePlace from './src/screens/ChoosePlace.jsx';
import AddPlace from './src/screens/AddPlace.jsx';
import PlacePage from './src/screens/PlacePage.jsx';
import GroupMeetups from './src/screens/GroupMeetups.jsx';
import AllMeetups from './src/screens/AllMeetups.jsx';
import DailyChallengeCreating from './src/screens/DailyChallengeCreating.jsx';
import DailyChallengeView from './src/screens/DailyChallengeView.jsx';
import DailyChallengeEvidence from './src/screens/DailyChallengeEvidence.jsx';
import DailyDiaryPosting from './src/screens/DailyDiaryPosting.jsx';
import DailyDiaryReceived from './src/screens/DailyDiaryReceived.jsx';
import EditDietaryPreferences from './src/screens/EditDietaryPreferences.jsx';
import EditInterestPreferences from './src/screens/EditInterestPreferences.jsx';
import Profile from './src/screens/Profile.jsx';
import Camera from './src/screens/Camera.jsx';
import Memories from './src/screens/Memories.jsx';
import Home from './src/screens/Home.jsx';
import GroupPage from './src/screens/GroupPage.jsx';
import GroupChatPage from './src/screens/GroupChatPage.jsx';
import SignUp from './src/screens/SignUp.jsx';
import SignIn from './src/screens/SignIn.jsx';

const Stack = createStackNavigator();

function App(): React.JSX.Element {

const [initializing, setInitializing] = useState(true);
const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

// Handle user state changes
function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
  setUser(user);
  if (initializing) {
    setInitializing(false);
  }
}

useEffect(() => {
  const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  return subscriber; // unsubscribe on unmount
});

if (initializing) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Home" : "SignIn"}>
        <Stack.Screen 
          name="SignIn" 
          component={SignIn} 
          options={{ title: 'Sign In', headerShown: false }}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUp} 
          options={{ title: 'Sign Up', headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{ title: 'Home', headerShown: false }}
        />
        <Stack.Screen 
          name="GroupChatPage"
          component={GroupChatPage}
          options={{ title: 'Group Chat Page', headerShown: false }}
        />
        <Stack.Screen 
          name="GroupPage"
          component={GroupPage}
          options={{ title: 'Group Page', headerShown: false }}
        />
        <Stack.Screen 
          name="Memories"
          component={Memories}
          options={{ title: 'Memories', headerShown: false }}
        />
        <Stack.Screen 
          name="Camera"
          component={Camera}
          options={{ title: 'Camera', headerShown: false }}
        />
        <Stack.Screen 
          name="Profile"
          options={{ title: 'Profile', headerShown: false }}
        >
          {() => <Profile name="John Doe" username="john_doe" />}
        </Stack.Screen>
        <Stack.Screen 
          name="EditInterestPreferences"
          component={EditInterestPreferences}
          options={{ title: 'Edit Interest Preferences', headerShown: false }}
        />
        <Stack.Screen 
          name="EditDietaryPreferences"
          component={EditDietaryPreferences}
          options={{ title: 'Edit Dietary Preferences', headerShown: false }}
        />
        <Stack.Screen 
          name="DailyDiaryReceived"
          component={DailyDiaryReceived}
          options={{ title: 'Daily Diary Received', headerShown: false }}
        />
        <Stack.Screen 
          name="DailyDiaryPosting"
          component={DailyDiaryPosting}
          options={{ title: 'Daily Diary Posting', headerShown: false }}
        />      
        <Stack.Screen 
          name="DailyChallengeEvidence"
          component={DailyChallengeEvidence}
          options={{ title: 'Daily Challenge Evidence', headerShown: false }}
        />
        <Stack.Screen 
          name="DailyChallengeView"
          component={DailyChallengeView}
          options={{ title: 'Daily Challenge View', headerShown: false }}
        />
        <Stack.Screen 
          name="DailyChallengeCreating"
          component={DailyChallengeCreating}
          options={{ title: 'Daily Challenge Creating', headerShown: false }}
        />
        <Stack.Screen 
          name="AllMeetups"
          component={AllMeetups}
          options={{ title: 'All Meetups', headerShown: false }}
        />
        <Stack.Screen 
          name="GroupMeetups"
          component={GroupMeetups}
          options={{ title: 'Group Meetups', headerShown: false }}
        />
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
          name="UpcomingMeetupDetails"
          component={UpcomingMeetupDetails}
          options={{ title: 'Upcoming Meetup Details', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
