import React, { useEffect} from 'react';
import { View, ActivityIndicator, AsyncStorage, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import * as authActions from '../store/actions/auth';
import Colors from '../constants/Colors';

const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        //props.navigation.navigate('Auth');
        dispatch(authActions.setDidTryAutoLogin());
        return;
      }
      const transformedData = JSON.parse(userData);
      const {token, userId, expiryDate} = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate < new Date() || !token || !userId) {
        //props.navigation.navigate('Auth');
        dispatch(authActions.setDidTryAutoLogin());
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      //props.navigation.navigate('Shop');
      dispatch(authActions.authenticate(userId, token, expirationTime));
    }

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size='large' color={Colors.primaryColor} />
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StartupScreen;