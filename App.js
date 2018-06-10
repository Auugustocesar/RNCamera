import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { RNCamera } from 'react-native-camera'

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			camBack: true,
			flashOn: true,
		}
	}
	takePicture = async () => {
		if (this.camera) {
			const options = { quality: 0.5, base64: true }
			const data = await this.camera.takePictureAsync(options)
			alert(data.uri)
		}
	}

	changeCamType = () => {
		this.setState({ camBack: !this.state.camBack })
	}
	changeFlash = () => {
		this.setState({ flashOn: !this.state.flashOn })
	}

	render() {
		return (
			<View style={styles.container}>
				<RNCamera
					ref={camera => {
						this.camera = camera
					}}
					style={styles.preview}
					type={this.state.camBack ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
					autoFocus={RNCamera.Constants.AutoFocus.on}
					flashMode={
						this.state.flashOn ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off
					}
					permissionDialogTitle={'Permission to use camera'}
					permissionDialogMessage={'We need your permission to use your camera phone'}
				/>
				<View style={styles.buttonContainer}>
					<TouchableOpacity onPress={this.takePicture} style={styles.capture}>
						<Text style={styles.buttonText}> SNAP </Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.changeCamType} style={styles.capture}>
						<Text style={styles.buttonText}> CAM </Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.changeFlash} style={styles.capture}>
						<Text style={styles.buttonText}> Flash </Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'black',
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	buttonContainer: {
		flex: 0,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	capture: {
		flex: 0,
		backgroundColor: '#fff',
		borderRadius: 5,
		padding: 15,
		paddingHorizontal: 20,
		alignSelf: 'center',
		margin: 20,
	},
	buttonText: {
		fontSize: 14,
	},
})
