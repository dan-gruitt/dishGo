export const DataSortingForAutocomplete = (data) => {
    const sortedDishes =  data.map((dish)=> {
        return {
            id: `${dish.id}`,
            title: dish.dish_name
        }
    })
    return sortedDishes;
}