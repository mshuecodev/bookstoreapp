import React, { useState } from "react"
import { Text, View, TouchableOpacity, ActivityIndicator, Alert } from "react-native"
import { TextInput, Button } from "react-native-paper"
import { useAuth } from "@/features/auth/useAuth"
import globalStyles from "@/styles/styles"
import { useRouter } from "expo-router"

export default function LoginScreen() {
	const { handleLogin, loading, error } = useAuth()
	const router = useRouter()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const navigateToSignup = () => {
		console.log("Navigating to signup...")
		router.push("/signup")
	}

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}

	const handleLoginWithValidation = async () => {
		if (!email || !password) {
			Alert.alert("Error", "Both email and password are required")
			return
		}

		if (!validateEmail(email)) {
			Alert.alert("Error", "Please enter a valid email address")
			return
		}

		// Attempt to log in
		const success = await handleLogin(email, password)
		if (success) {
			router.replace("/") // Navigate to the protected home screen
		} else {
			Alert.alert("Error", error || "Login failed. Please try again.")
		}
	}

	return (
		<View style={globalStyles.container}>
			<Text style={globalStyles.title}>Login to your Account</Text>
			{error && <Text style={globalStyles.error}>{error}</Text>}
			<TextInput
				label="Email"
				value={email}
				onChangeText={(text) => setEmail(text)}
				style={globalStyles.input}
				mode="outlined"
				theme={{ colors: { primary: "#1E90FF" } }}
			/>
			<TextInput
				label="Password"
				value={password}
				onChangeText={(text) => setPassword(text)}
				style={globalStyles.input}
				mode="outlined"
				secureTextEntry
				theme={{ colors: { primary: "#1E90FF" } }}
			/>
			{loading ? (
				<ActivityIndicator
					size="large"
					color="#1E90FF"
				/>
			) : (
				<Button
					mode="contained"
					onPress={handleLoginWithValidation}
					style={[globalStyles.button, globalStyles.primaryButton]}
					labelStyle={globalStyles.primaryButtonText}
				>
					Sign In
				</Button>
			)}
			<Text style={globalStyles.orText}>- Or sign in with -</Text>
			<View style={globalStyles.socialButtonsContainer}>
				<Button
					mode="contained"
					onPress={() => {}}
					style={[globalStyles.socialButton, { backgroundColor: "#DB4437" }]}
					labelStyle={globalStyles.socialButtonText}
				>
					Google
				</Button>
			</View>
			<TouchableOpacity onPress={navigateToSignup}>
				<Text style={globalStyles.linkText}>
					Don't have an account? <Text style={globalStyles.linkHighlight}>Sign up</Text>
				</Text>
			</TouchableOpacity>
		</View>
	)
}
