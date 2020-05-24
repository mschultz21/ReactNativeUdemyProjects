import React from 'react';
import { FlatList, Button, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';
import * as cartActions from '../../store/actions/cart';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = (props) => {
	const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  
  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  }

	return (
		<FlatList
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

ProductsOverviewScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'All Products',
		headerRight: () => (
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
    headerLeft: () => (
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

export default ProductsOverviewScreen;