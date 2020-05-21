import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import MealItem from './MealItem';

const MealList = props => {
  const renderMealItem = (itemData) => {
		return (
			<MealItem
				title={itemData.item.title}
				duration={itemData.item.duration}
				complexity={itemData.item.complexity}
				image={itemData.item.imageUrl}
				affordability={itemData.item.affordability}
				onSelectMeal={() => {
          props.navigation.navigate({routeName: 'MealDetails', params: {mealId: itemData.item.id}})
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