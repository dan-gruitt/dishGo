import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import SearchPage from '../pages/SearchPage';
import UserSettings from '../pages/UserSettings';
import UserFavourites from '../pages/UserFavourites'

const NavBar = () => {

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'search', title: 'Search', focusedIcon: 'magnify'},
    { key: 'settings', title: 'Settings', focusedIcon: 'cog' },
    { key: 'favourites', title: 'Favourites', focusedIcon: 'heart' },
  ]);


  const renderScene = BottomNavigation.SceneMap({
    search: SearchPage,
    settings: UserSettings,
    favourites: UserFavourites,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default NavBar;