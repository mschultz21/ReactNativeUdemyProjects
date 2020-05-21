import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';

import Colors from '../constants/Colors';

const defaultStackNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
	},
	headerTitleStyle: {
		fontFamily: 'open-sans-bold',
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
	headerBackTitle: 'Back',
	headerBackTitleStyle: {
		fontFamily: 'open-sans',
	},
};

const MealsNavigator = createStackNavigator(
	{
		Categories: {
			screen: CategoriesScreen,
			navigationOptions: {
				headerTitle: 'Meal Categories',
			},
		},
		CategoryMeals: {
			screen: CategoryMealsScreen,
		},
		MealDetails: MealDetailsScreen,
	},
	{
		defaultNavigationOptions: defaultStackNavOptions,
	}
);

const FavNavigator = createStackNavigator(
	{
		Favorites: FavoritesScreen,
		MealDetails: MealDetailsScreen,
	},
	{
		defaultNavigationOptions: defaultStackNavOptions,
	}
);

const tabScreenConfig = {
	Meals: {
		screen: MealsNavigator,
		navigationOptions: {
			tabBarIcon: (tabInfo) => {
				return (
					<Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
				);
			},
			tabBarColor: Colors.primaryColor,
			tabBarLabel:
				Platform.OS === 'android' ? (
					<Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>
				) : (
					'Meals'
				),
		},
	},
	Favorites: {
		screen: FavNavigator,
		navigationOptions: {
			tabBarIcon: (tabInfo) => {
				return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />;
			},
			tabBarColor: Colors.secondaryColor,
			tabBarLabel:
				Platform.OS === 'android' ? (
					<Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text>
				) : (
					'Favorites'
				),
		},
	},
};

const MealsFavTabNavigator =
	Platform.OS === 'android'
		? createMaterialBottomTabNavigator(tabScreenConfig, {
				activeColor: 'white',
				shifting: true,
		  })
		: createBottomTabNavigator(tabScreenConfig, {
				tabBarOptions: {
					activeTintColor: Colors.secondaryColor,
					labelStyle: {
						fontFamily: 'open-sans-bold',
					},
				},
		  });

const FiltersNavigator = createStackNavigator(
	{
		Filters: FiltersScreen,
	},
	{
		navigationOptions: {
			drawerLabel: 'Filters',
		},
		defaultNavigationOptions: defaultStackNavOptions,
	}
);

const MainNavigator = createDrawerNavigator(
	{
		MealsFavs: {
			screen: MealsFavTabNavigator,
			navigationOptions: {
				drawerLabel: 'Meals',
			},
		},
		Filters: FiltersNavigator,
	},
	{
		contentOptions: {
			activeTintColor: Colors.secondaryColor,
			labelStyle: {
				fontFamily: 'open-sans-bold',
			},
		},
	}
);

export default createAppContainer(MainNavigator);
