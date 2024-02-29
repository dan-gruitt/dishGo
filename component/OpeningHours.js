import * as React from 'react';
import { List, Surface } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import RestaurantInfo from "../component/RestaurantInfo";

const OpeningHours = ({styles, restaurantPlace, restaurant}) => {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <List.Section style={stylesAcc.accordion} title="">
      <List.Accordion style={stylesAcc.innerAccordion} 
      titleStyle={{color:'#4C5B61', fontWeight:"bold"}}
      title="Opening Hours">
         <RestaurantInfo
          styles={styles}
          open_now={restaurantPlace.current_opening_hours.open_now}
          weekday_text={restaurantPlace.current_opening_hours.weekday_text}
          website={restaurantPlace.website}
          address={restaurantPlace.formatted_address}
          restaurantName={restaurant.name}
        />
      </List.Accordion>
    </List.Section>
  );
};

export default OpeningHours;

const stylesAcc = StyleSheet.create({
    accordion: {
     marginHorizontal: 18,
     borderRadius: 8,
     borderRadius: 8,
     overflow: "hidden",
     border:"#4C5B61",
     marginTop: 20
    },
    innerAccordion: {
    borderRadius: 8,
        borderColor:"#4C5B61",
    borderWidth: 2,
    marginBottom: 20
    }
  });