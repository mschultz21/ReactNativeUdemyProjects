import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MealItem from './MealItem';

const MealList = (props) => {
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

	const renderMealItem = (itemData) => {
    const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id);

		return (
			<MealItem
				title={itemData.item.title}
				duration={itemData.item.duration}
				complexity={itemData.item.complexity}
				image={itemData.item.imageUrl}
				affordability={itemData.item.affordability}
				onSelectMeal={() => {
					props.navigation.navigate({
						routeName: 'MealDetails',
						params: {
							mealId: itemData.item.id,
							mealTitle: itemData.item.title,
              isFav: isFavorite
						},
					});
				}}
			/>
		);
	};

	return (
		<View style={styles.screen}>
			<FlatList
				style={{ width: '100%', padding: 15 }}
				data={props.listData}
				keyExtractor={(item, index) => item.id}
				renderItem={renderMealItem}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default MealList;
