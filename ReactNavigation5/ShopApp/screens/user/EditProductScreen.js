import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
	View,
	ScrollView,
	Text,
	TextInput,
	Platform,
	Alert,
	KeyboardAvoidingView,
	ActivityIndicator,
	StyleSheet,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

const FORM_UPDATE = 'REDUCER_UPDATE';

const formReducer = (state, action) => {
	//this is not related to redux!!!
	if (action.type === FORM_UPDATE) {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value,
		};
		const updatedValidities = {
			...state.inputValidities,
			[action.input]: action.isValid,
		};
		let updatedFormIsValid = true;
		for (const key in updatedValidities) {
			updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
		}
		return {
			formIsValid: updatedFormIsValid,
			inputValidities: updatedValidities,
			inputValues: updatedValues,
		};
	}
	return state;
};

const EditProductsScreen = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const prodId = props.route.params ? props.route.params.productId : null;
	const editedProduct = useSelector((state) =>
		state.products.userProducts.find((prod) => prod.id === prodId)
	);

	const dispatch = useDispatch();

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			title: editedProduct ? editedProduct.title : '',
			imageUrl: editedProduct ? editedProduct.imageUrl : '',
			description: editedProduct ? editedProduct.description : '',
			price: '',
		},
		inputValidities: {
			title: editedProduct ? true : false,
			imageUrl: editedProduct ? true : false,
			description: editedProduct ? true : false,
			price: editedProduct ? true : false,
		},
		formIsValid: editedProduct ? true : false,
	});

	useEffect(() => {
		if (error) {
			Alert.alert('Error', error, [{ text: 'Ok' }]);
		}
	}, [error]);

	const submitHandler = useCallback(async () => {
		if (!formState.formIsValid) {
			Alert.alert('Input Error', 'Please check your form', { text: 'Ok' });
			return;
		}

		setError(null);
		setIsLoading(true);
		try {
			if (editedProduct) {
				await dispatch(
					productsActions.updateProduct(
						prodId,
						formState.inputValues.title,
						formState.inputValues.description,
						formState.inputValues.imageUrl
					)
				);
			} else {
				await dispatch(
					productsActions.createProduct(
						formState.inputValues.title,
						formState.inputValues.description,
						+formState.inputValues.price,
						formState.inputValues.imageUrl
					)
				);
			}
			props.navigation.goBack();
		} catch (err) {
			setError(err.message);
		}

		setIsLoading(false);
	}, [dispatch, prodId, formState]);

	useEffect(() => {
		props.navigation.setOptions({
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={HeaderButton}>
					<Item
						title='Save'
						iconName={
							Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
						}
						onPress={submitHandler}
					/>
				</HeaderButtons>
			),
		});
	}, [submitHandler]);

	const inputChangeHandler = useCallback(
		(inputIdentifier, inputValue, inputValidity) => {
			dispatchFormState({
				type: FORM_UPDATE,
				value: inputValue,
				isValid: inputValidity,
				input: inputIdentifier,
			});
		},
		[dispatchFormState]
	);

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size='large' color={Colors.primaryColor} />
			</View>
		);
	}

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior='padding'
			keyboardVerticalOffset={100}
		>
			<ScrollView>
				<View style={styles.form}>
					<Input
						id='title'
						label='Title'
						errorText='Please enter a valid title!'
						keyboardType={'default'}
						autoCapitalize={'sentences'}
						autoCorrect
						returnKeyType={'next'}
						onInputChange={inputChangeHandler}
						initialValue={editedProduct ? editedProduct.title : ''}
						initiallyValid={!!editedProduct}
						required
					/>
					<Input
						id='imageUrl'
						label='Image Url'
						errorText='Please enter a valid image url!'
						keyboardType={'default'}
						returnKeyType={'next'}
						initialValue={editedProduct ? editedProduct.imageUrl : ''}
						onInputChange={inputChangeHandler}
						initiallyValid={!!editedProduct}
						required
					/>
					{editedProduct ? null : (
						<Input
							id='price'
							label='Price'
							errorText='Please enter a valid price!'
							keyboardType={'decimal-pad'}
							returnKeyType={'next'}
							onInputChange={inputChangeHandler}
							required
							min={0.1}
						/>
					)}
					<Input
						id='description'
						label='Description'
						errorText='Please enter a valid description!'
						keyboardType={'default'}
						autoCapitalize={'sentences'}
						autoCorrect
						multiline
						numberOfLines={3}
						initialValue={editedProduct ? editedProduct.description : ''}
						onInputChange={inputChangeHandler}
						initiallyValid={!!editedProduct}
						required
						minLength={5}
					/>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export const screenOptions = (navData) => {
	const routeParams = navData.route.params ? navData.route.params : {};

	return {
		headerTitle: routeParams.productId ? 'Edit Product' : 'Add Product',
	};
};

const styles = StyleSheet.create({
	form: {
		margin: 20,
	},
	centered: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default EditProductsScreen;
