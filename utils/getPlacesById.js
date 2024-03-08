import axios from "axios";

const BASE_URL = "https://maps.googleapis.com/maps/api/place/details/json?place_id=";
const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

export default function getPlacesById (places_id) {
  return axios.get(
    BASE_URL +
      places_id + "&key=" + API_KEY
  );
};
