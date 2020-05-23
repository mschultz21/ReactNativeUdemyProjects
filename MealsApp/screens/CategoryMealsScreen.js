import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux'; //replaces mapStateToProps and mapDispatchToProps

import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

const CategoryMealsScreen = (props) => {
  const categoryId = props.navigation.getParam('categoryId');
  const availableMeals = useSelector(state => state.meals.filteredMeals);
	const displayedMeals = availableMeals.filter(
		(meal) => meal.categoryIds.indexOf(categoryId) >= 0
	);
  
  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content} >
        <DefaultText>No meals found based on your current filter settings...</DefaultText>
      </View>
    )
  }

	return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
	const categoryId = navigationData.navigation.getParam('categoryId');
	const selectedCategory = CATEGORIES.find((cat) => cat.id === categoryId);

	return {
		headerTitle: selectedCategory.title,
	};
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CategoryMealsScreen;
