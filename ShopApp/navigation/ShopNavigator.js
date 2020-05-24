import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import CartScreen from '../screens/shop/CartScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductsScreen from '../screens/user/EditProductScreen';
import Colors from '../constants/Colors';

const defaultNavOptions = { 
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: 'open-sans',
  headerBackTitle: 'Back'
}

const ProductsNavigator = createStackNavigator({  
  ProductsOverview: ProductsOverviewScreen,
  ProductDetail: ProductDetailsScreen,
  Cart: CartScreen
}, {
  defaultNavigationOptions: defaultNavOptions,
  navigationOptions: {
    drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} size={23} color={drawerConfig.tintColor} />
  }
});

const OrdersNavigator = createStackNavigator({
  Orders: OrdersScreen
}, {
  defaultNavigationOptions: defaultNavOptions,
  navigationOptions: {
    drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} size={23} color={drawerConfig.tintColor} />
  }
});

const AdminNavigator = createStackNavigator({
  UserProducts: UserProductsScreen,
  EditProduct: EditProductsScreen
}, {
  defaultNavigationOptions: defaultNavOptions,
  navigationOptions: {
    drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} size={23} color={drawerConfig.tintColor} />
  }
});


const ShopNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Orders: OrdersNavigator,
  Admin: AdminNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.primaryColor
  }
});

export default createAppContainer(ShopNavigator);