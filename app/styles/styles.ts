import { StyleSheet } from "react-native"

const globalStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 20,
		backgroundColor: "#FFFFFF"
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20,
		color: "#333"
	},
	error: {
		color: "red",
		textAlign: "center",
		marginBottom: 10
	},
	input: {
		marginBottom: 15,
		backgroundColor: "#F5F5F5"
	},
	button: {
		paddingVertical: 5,
		borderRadius: 5,
		marginBottom: 15
	},
	primaryButton: {
		backgroundColor: "#1E90FF"
	},
	primaryButtonText: {
		color: "#FFFFFF",
		fontSize: 16
	},
	secondaryButton: {
		borderColor: "#DB4437",
		borderWidth: 1
	},
	secondaryButtonText: {
		color: "#DB4437",
		fontSize: 16
	},
	orText: {
		textAlign: "center",
		marginVertical: 15,
		color: "#888",
		fontSize: 14
	},
	socialButtonsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20
	},
	socialButton: {
		flex: 1,
		marginHorizontal: 5,
		borderRadius: 5
	},
	socialButtonText: {
		color: "#FFFFFF",
		fontSize: 14
	},
	linkText: {
		textAlign: "center",
		marginTop: 20,
		color: "#888",
		fontSize: 14
	},
	linkHighlight: {
		color: "#1E90FF",
		fontWeight: "bold"
	}
})

export default globalStyles
