import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font'; //couldn't use expo-font because it was being a cunt - this is the workaround i found
//import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import AppNavigator from './navigation/AppNavigator';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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
        <AppNavigator />
      </Provider>
    );
  }
}
