// import { getDishes } from '../utils/getDishes'
// const { default: TestSearch } = require('../component/TestSearch')
import { filterSearch } from "../utils/filterSearch"

const testData = [{"description": null, "dish_created_at": "2024-02-19T14:35:34.108399+00:00", "dish_name": "Chicken Kebab", "id": 21, "pescaterian": true, "price": 6.5, "restaurant_id": 4, "vegan": false, "vegetarian ": true}, {"description": null, "dish_created_at": "2024-02-19T14:37:02.565149+00:00", "dish_name": "Tiramisu ", "id": 22, "pescaterian": true, "price": 5, "restaurant_id": 4, "vegan": false, "vegetarian ": true}, {"description": "Grilled marinated chicken slices with garlic sauce and salad.", "dish_created_at": "2024-02-19T14:39:53.522712+00:00", "dish_name": "Chicken Shawarma Wrap", "id": 23, "pescaterian": false, "price": 6.49, "restaurant_id": 5, "vegan": false, "vegetarian ": false}, {"description": "Falafel Wrap", "dish_created_at": "2024-02-19T14:40:50.373124+00:00", "dish_name": "Falafel Wrap", "id": 24, "pescaterian": true, "price": 6.49, "restaurant_id": 5, "vegan": true, "vegetarian ": true}, {"description": "Charcoal grill chicken breast cubes with garlic sauce and salad.", "dish_created_at": "2024-02-19T14:42:05.864363+00:00", "dish_name": "Chicken Shish Wrap", "id": 26, "pescaterian": false, "price": 7, "restaurant_id": 5, "vegan": false, "vegetarian ": false}]

describe('filterSearch', () => {
  test('returns a new array', () => {
    const input = []
    const copyOfInput = input
    const actualOutput = filterSearch(input, 'chicken')
    expect(Array.isArray(actualOutput)).toBe(true)
    expect(actualOutput).not.toBe(input)
    expect(copyOfInput).toEqual(input)
  })
  test('returns an array with single dish containing chicken', () => {
    const input = [{dish_name: 'chicken'}, {dish_name: 'beef'}]
    const actualOutput = filterSearch(input, 'chicken')
    const expectedOutput = [{dish_name: 'chicken'}]

    expect(actualOutput).toEqual(expectedOutput)
  })
  test('returns an array with single dish containing chicken', () => {
    const input = [{dish_name: 'chicken'}, {dish_name: 'beef'}, {dish_name: 'Chicken Shawarma wrap'}]
    const actualOutput = filterSearch(input, 'chicken wrap')
    const expectedOutput = [{dish_name: 'Chicken Shawarma wrap'}]

    expect(actualOutput).toEqual(expectedOutput)
  })
  test('returns an array with single dish containing chicken', () => {
    const input = [{dish_name: 'chicken', id:1 }, {dish_name: 'beef', id: 2}, {dish_name: 'Chicken Shawarma wrap', id:3}]
    const actualOutput = filterSearch(input, 'chicken kebab wrap')
    const expectedOutput = [{dish_name: 'chicken', id: 1}, {dish_name: 'Chicken Shawarma wrap', id:3}]

    expect(actualOutput).toEqual(expectedOutput)
  })
})