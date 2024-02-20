import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";




//routes
const SearchRoute = () => {
  <Text>Search</Text>;
};

const SettingsRoute = () => {
  <Text>Settings</Text>;
};

const FavoritesRoute = () => {
  <Text>Recents</Text>;
};



const FooterNav = () => {
  //states
  const [index, setIndex] = React.useState(0);

  console.log(index, "<<< inside app after state");

  const [routes] = React.useState([
    { key: "search", title: "Search", focusedIcon: "magnify",},
    { key: "settings", title: "Settings", focusedIcon: "cog", unfocusedIcon: "cog-outline" },
    { key: "favorites", title: "Favorites", focusedIcon: "heart", unfocusedIcon: "heart-outline"},
  ]);


  const renderScene = BottomNavigation.SceneMap({
    search: SearchRoute,
    settings: SettingsRoute,
    favorites: FavoritesRoute,
  });

  return (
    <>
    <Text>Im the footer element?</Text>
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
    </>
  );
};

export default FooterNav;
