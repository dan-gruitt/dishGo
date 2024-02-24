import * as yup from 'yup' 

export const dishSchema = yup.object({
    dishName: yup.string().required("Name of dish is required").max(60, "Name of dish must be under 60 characters"),
    description: yup.string().required("Description is required").max(250, "Description must be under 250 characters"),
    price: yup.number().required("Price is required").typeError("Price must be a number").test(
      "maxDigitsAfterDecimal",
      "Price must be a whole number or a number to 2 decimal places ",
      (number) => /^\d+(\.\d{1,2})?$/.test(number)
    )
  });
  