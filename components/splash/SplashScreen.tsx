import React from "react"
import { View, Text, ActivityIndicator, StyleSheet } from "react-native"

// define the props type
interface SplashScreenProps {
	loading: boolean
	loadingMessage: string
}

const SplashScreen: React.FC<SplashScreenProps> = ({ loading, loadingMessage }) => {
	console.log("loading", loading)
	return (
		<View style={styles.container}>
			{loading ? (
				<>
					<ActivityIndicator
						size="large"
						color="#00ff00"
					/>
					<Text style={styles.text}>{loadingMessage}</Text>
				</>
			) : (
				<Text style={styles.text}>Loading Complete!</Text>
			)}
		</View>
	)
}

export default SplashScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff"
	},
	text: {
		marginTop: 20,
		fontSize: 18,
		color: "#333"
	}
})
