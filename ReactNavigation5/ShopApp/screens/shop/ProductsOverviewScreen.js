import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Button, Platform, ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
	const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => { //will only run after page is reloaded (ie navigating away and coming back)
    const unsubscribe = props.navigation.addListener('focus', loadProducts);

    return () => {
      unsubscribe();
    }
  }, [loadProducts]);

  useEffect(() => { //need this so that products are loaded the first time
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);
  
  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error has ocurred...</Text>
        <Button title='Try Again' onPress={loadProducts} color={Colors.primaryColor} />
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primaryColor} />
      </View>
    )
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found</Text>
      </View>
    )
  }

	return (
		<FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
			data={products}
			keyExtractor={(item) => item.id}
			renderItem={(itemData) => (
				<ProductItem
					title={itemData.item.title}
					price={itemData.item.price}
					image={itemData.item.imageUrl}
					onSelect={() => {selectItemHandler(itemData.item.id, itemData.item.title)}}
				>
          <Button
            color={Colors.primaryColor}
            title='Details'
            onPress={() => {selectItemHandler(itemData.item.id, itemData.item.title)}}
          />
          <Button
            color={Colors.primaryColor}
            title='Add To Cart'
            onPress={() => {dispatch(cartActions.addToCart(itemData.item))}}
          />
        </ProductItem>
			)}
		/>
	);
};

export const screenOptions = (navData) => {
	return {
		headerTitle: 'All Products',
		headerRight: (props) => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Cart'
					iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
					onPress={() => {
						navData.navigation.navigate({routeName: 'Cart'})
					}}
				/>
			</HeaderButtons>
    ),
    headerLeft: (props) => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
	};
};

const styles = StyleSheet.create({
  centered: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ProductsOverviewScreen;
