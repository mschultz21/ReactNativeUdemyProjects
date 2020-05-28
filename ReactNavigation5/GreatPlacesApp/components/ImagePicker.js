import React, { useState } from 'react';
import { View, Button, Text, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState();

	const verifyPermissions = async () => {
		const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
		if (result.status !== 'granted') {
			Alert.alert(
				'Camera Permissions Denied',
				'We need your permission to use the camera. If you change your mind, go to settings and grant permission',
				[{ text: 'Ok' }]
      );
      return false;
    }
    return true;
	};

	const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }
		const image = await ImagePicker.launchCameraAsync({
       allowsEditing: true,
       aspect: [16, 9],
       quality: 0.75
    });

    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
	};

	return (
		<View style={styles.imagePicker}>
			<View style={styles.imagePreview}>
				{!pickedImage ? (<Text>No Image Selected</Text>) 
				: (<Image style={styles.image} source={{ uri: pickedImage }}/>)}
			</View>
			<Button
				title='Take Image'
				color={Colors.primaryColor}
				onPress={takeImageHandler}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	imagePicker: {
    alignItems: 'center',
    marginBottom: 15
	},
	imagePreview: {
		width: '100%',
		height: 200,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#ccc',
		borderWidth: 1,
	},
	image: {
		width: '100%',
		height: '100%',
	},
});

export default ImgPicker;
