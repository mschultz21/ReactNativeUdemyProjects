import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font'; //couldn't use expo-font because it was being a cunt - this is the workaround i found
import { composeWithDevTools } from 'redux-devtools-extension';
//import * as Font from 'expo-font';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import ShopNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
});

const store = createStore(rootReducer);

// const fetchFonts = async () => {
// 	await Font.loadAsync({
// 		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
// 		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
// 	});
// };

export default function App() {
  let [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

  // const [fontLoaded, setFontLoaded] = useState(false);

	// if (!fontLoaded) {
	// 	return (
	// 		<AppLoading
	// 			startAsync={fetchFonts}
	// 			onFinish={() => setFontLoaded(true)}
	// 		/>
	// 	);
  // }
  

  if (!fontsLoaded) {
    return <AppLoading/>
  } else {
    return (
      <Provider store={store}>
        <ShopNavigator/>
      </Provider>
    );
  }
}
