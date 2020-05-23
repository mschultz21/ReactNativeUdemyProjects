import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: []
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return {
          ...state,
          favoriteMeals: updatedFavMeals
        }
      } else {
        return {
          ...state,
          favoriteMeals: state.favoriteMeals.concat(state.meals.find(meal => meal.id === action.mealId))
        }
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const filteredMeals = state.meals.filter(meal => {
        if (appliedFilters.glutenFree && !meal.glutenFree) {
          return false;
        } else if (appliedFilters.lactoseFree && !meal.lactoseFree) {
          return false;
        } else if (appliedFilters.vegetarian && !meal.vegetarian) {
          return false;
        } else if (appliedFilters.vegan && !meal.vegan) {
          return false;
        }
        return true;
      });
      return {...state, filteredMeals: filteredMeals};
    default:
      return state;
  }

  return state;
};

export default mealsReducer;
