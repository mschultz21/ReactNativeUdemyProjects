import React, { useState, useEffect } from 'react';
import { View, Button, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';
import MapPreview from './MapPreview';

const LocationPicker = props => {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const mapPickedLocation = props.navigation.getParam('pickedLocation');

  const {onLocationPicked} = props;

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
		if (result.status !== 'granted') {
			Alert.alert(
				'Camera Permissions Denied',
				'We need your permission to use location. If you change your mind, go to settings and grant permission',
				[{ text: 'Ok' }]
      );
      return false;
    }
    return true;
  }

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeInterval: 5000,
      });
      setPickedLocation({lat: location.coords.latitude, lng: location.coords.longitude});
      props.onLocationPicked({lat: location.coords.latitude, lng: location.coords.longitude});
    } catch (err) {
      Alert.alert('Location Error', 'Try again, or pick a location on the map.', [{text: 'Ok'}]);
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate('Map');
  };

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        <MapPreview styles={styles.mapPreview} location={pickedLocation} onPress={pickOnMapHandler}>
          {isFetching 
            ? <ActivityIndicator size='large' color={Colors.primaryColor} />
            : <Text>No Location Selected</Text>}
        </MapPreview>
      </View>
      <View style={styles.buttonContainer} >
        <Button title='Get Location' color={Colors.primaryColor} onPress={getLocationHandler} />
        <Button title='Select on Map' color={Colors.primaryColor} onPress={pickOnMapHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row'
  }
});

export default LocationPicker;