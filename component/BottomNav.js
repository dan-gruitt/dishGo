import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchPage from '../pages/SearchPage';
import LandingPage from '../pages/LandingPage';

const Tab = createBottomTabNavigator();

function BottomNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="SearchPage" component={SearchPage} />
      <Tab.Screen name="LandingPage" component={LandingPage} />
    </Tab.Navigator>
  );
}

export default BottomNav;