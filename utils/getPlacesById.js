import axios from "axios";

const BASE_URL = "https://maps.googleapis.com/maps/api/place/details/json?place_id=";
const API_KEY = "AIzaSyAFMe9JfdeVAeADJdfKiWQI1IrntSi8_9Y";

export const getPlacesById = (places_id) => {
  return axios.get(
    BASE_URL +
      places_id + "&key=" + API_KEY
  );
};

export default { getPlacesById };

// useEffect(() => {
//     getPlacesById(placeTest).then((response) => {
//       console.log(response.data.result.website);
//     })
//   },[])