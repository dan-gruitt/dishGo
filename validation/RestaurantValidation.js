import * as yup from 'yup' 

export const restaurantSchema = yup.object({
    restaurantName: yup.string().required("Name of restaurant is required").max(60, "Name of restaurant must be under 100 characters"),
    restaurantDescription: yup.string().max(250, "Description must be under 250 characters"),
    cuisine: yup.string().required("Please select a cuisine"),
    placeId: yup.string().required("Please search for and select your restaurant")
  });
  