import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
	createDrawerNavigator,
	DrawerItemList,
} from '@react-navigation/drawer';
import { View, SafeAreaView, Button, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import ProductsOverviewScreen, {
	screenOptions as productOverviewScreenOptions,
} from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen, {
	screenOptions as productDetailsScreenOptions,
} from '../screens/shop/ProductDetailsScreen';
import OrdersScreen, {
	screenOptions as ordersScreenOptions,
} from '../screens/shop/OrdersScreen';
import CartScreen, {
	screenOptions as cartScreenOptions,
} from '../screens/shop/CartScreen';
import UserProductsScreen, {
	screenOptions as userProductsScreenOptions,
} from '../screens/user/UserProductsScreen';
import EditProductsScreen, {
	screenOptions as editProductScreenOptions,
} from '../screens/user/EditProductScreen';
import AuthScreen, {
	screenOptions as authScreenOptions,
} from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const defaultNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
	headerTitleStyle: {
		fontFamily: 'open-sans-bold',
	},
	headerBackTitleStyle: 'open-sans',
	headerBackTitle: 'Back',
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
	return (
		<ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
			<ProductsStackNavigator.Screen
				name='ProductsOverview'
				component={ProductsOverviewScreen}
				options={productOverviewScreenOptions}
			/>
			<ProductsStackNavigator.Screen
				name='ProductDetail'
				component={ProductDetailsScreen}
				options={productDetailsScreenOptions}
			/>
			<ProductsStackNavigator.Screen
				name='Cart'
				component={CartScreen}
				options={cartScreenOptions}
			/>
		</ProductsStackNavigator.Navigator>
	);
};

// const ProductsNavigator = createStackNavigator(
// 	{
// 		ProductsOverview: ProductsOverviewScreen,
// 		ProductDetail: ProductDetailsScreen,
// 		Cart: CartScreen,
// 	},
// 	{
// 		defaultNavigationOptions: defaultNavOptions,
// 		navigationOptions: {
// 			drawerIcon: (drawerConfig) => (
// 				<Ionicons
// 					name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
// 					size={23}
// 					color={drawerConfig.tintColor}
// 				/>
// 			),
// 		},
// 	}
// );

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
	return (
		<OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
			<OrdersStackNavigator.Screen
				name='Orders'
				component={OrdersScreen}
				options={ordersScreenOptions}
			/>
		</OrdersStackNavigator.Navigator>
	);
};

// const OrdersNavigator = createStackNavigator(
// 	{
// 		Orders: OrdersScreen,
// 	},
// 	{
// 		defaultNavigationOptions: defaultNavOptions,
// 		navigationOptions: {
// 			drawerIcon: (drawerConfig) => (
// 				<Ionicons
// 					name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
// 					size={23}
// 					color={drawerConfig.tintColor}
// 				/>
// 			),
// 		},
// 	}
// );

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
	return (
		<AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
			<AdminStackNavigator.Screen
				name='UserProducts'
				component={UserProductsScreen}
				options={userProductsScreenOptions}
			/>
			<AdminStackNavigator.Screen
				name='EditProduct'
				component={EditProductsScreen}
				options={editProductScreenOptions}
			/>
		</AdminStackNavigator.Navigator>
	);
};

// const AdminNavigator = createStackNavigator(
// 	{
// 		UserProducts: UserProductsScreen,
// 		EditProduct: EditProductsScreen,
// 	},
// 	{
// 		defaultNavigationOptions: defaultNavOptions,
// 		navigationOptions: {
// 			drawerIcon: (drawerConfig) => (
// 				<Ionicons
// 					name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
// 					size={23}
// 					color={drawerConfig.tintColor}
// 				/>
// 			),
// 		},
// 	}
// );

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
	const dispatch = useDispatch();

	return (
		<ShopDrawerNavigator.Navigator
			drawerContentOptions={{
        activeTintColor: Colors.primaryColor
      }}
			drawerContent={(props) => {
				return (
					<View style={{ flex: 1, paddingTop: 20 }}>
						<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
							<DrawerItemList {...props} />
							<Button
								title='Logout'
								color={Colors.primaryColor}
								onPress={() => {
									dispatch(authActions.logout());
									//props.navigation.navigate('Auth');
								}}
							/>
						</SafeAreaView>
					</View>
				);
			}}
		>
			<ShopDrawerNavigator.Screen
				name='Products'
				component={ProductsNavigator}
				options={{
					drawerIcon: (props) => (
						<Ionicons
							name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
							size={23}
							color={props.color}
						/>
					),
				}}
			/>
			<ShopDrawerNavigator.Screen
				name='Orders'
				component={OrdersNavigator}
				options={{
					drawerIcon: (props) => (
						<Ionicons
							name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
							size={23}
							color={props.color}
						/>
					),
				}}
			/>
			<ShopDrawerNavigator.Screen
				name='Admin'
				component={AdminNavigator}
				options={{
					drawerIcon: (props) => (
						<Ionicons
							name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
							size={23}
							color={props.color}
						/>
					),
				}}
			/>
		</ShopDrawerNavigator.Navigator>
	);
};

// const ShopNavigator = createDrawerNavigator(
// 	{
// 		Products: ProductsNavigator,
// 		Orders: OrdersNavigator,
// 		Admin: AdminNavigator,
// 	},
// 	{
// 		contentOptions: {
// 			activeTintColor: Colors.primaryColor,
// 		},
// 		contentComponent: (props) => {
// 			const dispatch = useDispatch();
// 			return (
// 				<View style={{ flex: 1, paddingTop: 20 }}>
// 					<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
// 						<DrawerItems {...props} />
// 						<Button
// 							title='Logout'
// 							color={Colors.primaryColor}
// 							onPress={() => {
// 								dispatch(authActions.logout());
// 								//props.navigation.navigate('Auth');
// 							}}
// 						/>
// 					</SafeAreaView>
// 				</View>
// 			);
// 		},
// 	}
// );

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
	return (
		<AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
			<AuthStackNavigator.Screen
				name='Auth'
				component={AuthScreen}
				options={authScreenOptions}
			/>
		</AuthStackNavigator.Navigator>
	);
};

// const AuthNavigator = createStackNavigator(
// 	{
// 		Auth: AuthScreen,
// 	},
// 	{
// 		defaultNavigationOptions: defaultNavOptions,
// 	}
// );

// const MainNavigator = createSwitchNavigator({
// 	Startup: StartupScreen,
// 	Auth: AuthNavigator,
// 	Shop: ShopNavigator,
// });

// export default createAppContainer(MainNavigator);
